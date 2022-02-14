/**
 * Functions for sending graphQL requests
 * @namespace api.graphQL
 */

const EndpointCategory = require('../../classes/EndpointCategory');

class GraphQL extends EndpointCategory {
  constructor(config) {
    super(config, GraphQL);
  }
}

/*------------------------------------------------------------------------*/
/*                              Helper Class                              */
/*------------------------------------------------------------------------*/

class QLItem {
  /**
   * Create a new QL Item
   * @ignore
   * @author Gabe Abrams
   * @param {string|string[]} query - the query text or lines to parse
   * @param {boolean} [parentHasCursor] - if true, a parent has a cursor so
   *   any cursors found here or in children will be ignored
   */
  constructor(query, parentHasCursor = false) {
    // Get list of lines
    const lines = (
      Array.isArray(query)
        ? query
        : query.trim().split('\n')
    );

    // Create a cursor
    this.cursor = null;

    // Separate lines into firstLine, innerLines, lastLine
    const firstLine = lines[0];
    const innerLines = [];
    for (let i = 1; i < lines.length - 1; i++) {
      innerLines.push(lines[i].trim());
    }

    // Name
    this.name = (
      firstLine
        .trim()
        .match(/^[^({]+/)[0]
        .trim()
    );

    // Connection
    this.isPagedConnection = (
      !parentHasCursor
      && this.name.endsWith('Connection')
    );

    // Params
    this.params = null;
    if (firstLine.includes('(')) {
      this.params = {};
    }
    if (firstLine.match(/\((.*:.*)\)/)) {
      const paramString = firstLine.match(/\((.*:.*)\)/)[0];

      // Process the string
      paramString
        // Remove parentheses
        .substring(1, paramString.length - 1)
        // Split into params
        .split(',')
        // Trim whitespace
        .map((param) => {
          return param.trim();
        })
        // Filter the "after" param
        .filter((param) => {
          return !param.startsWith('after:');
        })
        // Parse
        .forEach((param) => {
          try {
            const [left, right] = param.split(':');

            this.params[left.trim()] = JSON.parse(right.trim());
          } catch (err) {
            throw new Error(`Param "${param}" could not be processed in "${firstLine}"`);
          }
        });
    }

    // Recurse for children
    this.children = [];
    let additionalIndentation = 0;
    let thisChildsLines = [];
    innerLines.forEach((line) => {
      // Add the current line to the child's array
      thisChildsLines.push(line);

      // Check for open/close
      if (line.endsWith('{')) {
        // Open! Increment indentation
        additionalIndentation += 1;
      } else if (line === '}') {
        // Close! Decrement indentation
        additionalIndentation -= 1;
      }

      // Check for finished child
      if (additionalIndentation === 0) {
        // Child finished!

        // Create child
        this.children.push(
          new QLItem(
            thisChildsLines,
            this.isPagedConnection || parentHasCursor
          )
        );

        // Reset
        thisChildsLines = [];
      }
    });

    // If paged connection, flatten "node"
    if (this.isPagedConnection) {
      this.children = (
        // Go through our children
        this.children
          // Get the node child and extract its children
          .filter((child) => {
            return (child.getName() === 'nodes');
          })[0].children
      );
    }
  }

  /**
   * Get info on the cursor
   * @ignore
   * @author Gabe Abrams
   * @return {function} data merger that takes two arguments: current data and
   *   data returned from the new request and returns the merged data object
   */
  getDataMerger(propArray = []) {
    // Check if we found the cursor
    if (this.isPagedConnection) {
      return (data, newData) => {
        // If no data yet, just use the new data
        if (!data) {
          return newData;
        }

        // Data exists. Add new entries to the old data
        // > Find the location in both data objects
        let dataObj = data;
        let newDataObj = newData;
        propArray.forEach((prop) => {
          dataObj = dataObj[prop];
          newDataObj = newDataObj[prop];
        });
        // > Copy items over
        newDataObj.nodes.forEach((item) => {
          dataObj.nodes.push(item);
        });
        // > Remove useless page info
        delete dataObj.pageInfo;

        return data;
      };
    }

    // Haven't found cursor yet. Try with all children
    for (let i = 0; i < this.children.length; i++) {
      // Update prop array
      const newPropArray = [...propArray];
      newPropArray.push(this.children[i].getName());

      // Recurse
      const dataMerger = this.children[i].getDataMerger(newPropArray);

      if (dataMerger) {
        return dataMerger;
      }
    }
  }

  /**
   * Get the name of this item
   * @ignore
   * @author Gabe Abrams
   * @return {string} name
   */
  getName() {
    return this.name;
  }

  /**
   * Get the next query text
   * @ignore
   * @author Gabe Abrams
   * @param {boolean} [isSubItem] - true if this item is a sub item
   * @return {string} text for the next query
   */
  getNextQuery(isSubItem) {
    const lines = [];

    // Prefix based on indentation
    const prefix = (
      isSubItem
        ? '  '
        : ''
    );

    // Add first line
    // > Hardcoded params
    let paramPart = '';
    if (this.params !== null) {
      const innerText = (
        Object.keys(this.params)
          .map((key) => {
            const value = this.params[key];
            return `${key}: ${JSON.stringify(value)}`;
          })
          .join(', ')
      );
      paramPart = `(${innerText})`;
    }
    // > Cursor param
    if (this.cursor) {
      // Add spacer
      if (paramPart.length > 2) { // More than the parens
        paramPart = paramPart.replace(')', ', )');
      }

      // Add "after"
      paramPart = paramPart.replace(')', `after: "${this.cursor}")`);
    }
    // > Open parens
    const opener = (
      this.children.length > 0
        ? ' {'
        : ''
    );
    lines.push(`${prefix}${this.name}${paramPart}${opener}`);

    // Add before-children part if is connection
    let additionalChildPrefix = '';
    if (this.isPagedConnection) {
      // Add "nodes {" part
      lines.push(`${prefix}  nodes {`);
      additionalChildPrefix = '  ';
    }

    // Add lines from children
    this.children.forEach((child) => {
      const childLines = child.getNextQuery(true);

      childLines.forEach((line) => {
        lines.push(`${prefix}${additionalChildPrefix}${line}`);
      });
    });

    // Add after-children part if is connection
    if (this.isPagedConnection) {
      // Add node closer
      lines.push(`${prefix}  }`);

      // Add pageInfo request
      lines.push(`${prefix}  pageInfo {`);
      lines.push(`${prefix}    endCursor`);
      lines.push(`${prefix}    hasNextPage`);
      lines.push(`${prefix}  }`);
    }

    // Add last line
    if (this.children.length > 0) {
      // Closer
      lines.push(`${prefix}}`);
    }

    // Return
    return (
      isSubItem
        ? lines
        : lines.join('\n')
    );
  }

  /**
   * Ingest the response
   * @ignore
   * @author Gabe Abrams
   * @param {object} data - the contents of the data object
   * @return {object} status in the form { cursorUpdated, hasNextPage }
   *   true if another page needs to be fetched
   */
  ingestResponse(data) {
    // Get the container of the data for the children
    const childDataContainer = (
      this.isPagedConnection
        ? data.nodes
        : data
    );

    // Check if we found a cursor
    if (
      this.isPagedConnection
      && data.pageInfo
      && data.pageInfo.endCursor
    ) {
      // Found a cursor that needs to be updated
      this.cursor = data.pageInfo.endCursor;

      // Current item needs another page
      return {
        cursorUpdated: true,
        hasNextPage: !!data.pageInfo.hasNextPage,
      };
    }

    // This item doesn't have a cursor. Check children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      // Get the data for the child
      const childData = childDataContainer[child.getName()];
      const status = child.ingestResponse(childData);

      if (status.cursorUpdated) {
        return status;
      }
    }

    return { cursorUpdated: false };
  }
}

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * Send a GraphQL request to Canvas and fetch all pages. Note: for paged
 *   responses, only the first top-level paged connection is supported (nested
 *   pagination is not supported).
 * @author Gabe Abrams
 * @method sendQuery
 * @memberof api.graphQL
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {string} options.query - the GraphQL query string
 * @param {function} [options.onNewPage] - handler to call when there
 *   is a new page (called with all data up until now)
 * @return {object} GraphQL response
 */
GraphQL.sendQuery = function (options) {
  // Create a helper object
  const qlItem = new QLItem(options.query);
  const mergeData = (
    qlItem.getDataMerger()
    // Use replacer function if no merger
    || (
      (_, y) => {
        return y;
      }
    )
  );

  // Keep track of all data
  let allData;

  // Helper function for fetching another page
  const fetchPage = () => {
    // Get the next query
    const query = qlItem.getNextQuery();

    // Send the request
    return this.visitEndpoint({
      path: '/api/graphql',
      method: 'POST',
      params: { query },
    })
      .then((response) => {
        // Get data from the response
        const { data } = response;

        // Merge data
        allData = mergeData(allData, data);

        // Call handler
        if (options.onNewPage) {
          options.onNewPage(allData);
        }

        // Check if we need to send another request
        const { hasNextPage } = qlItem.ingestResponse(data);

        // Either finish or send another request
        if (hasNextPage) {
          // More data
          return fetchPage();
        }
        // All done!
        return allData;
      });
  };

  // Kick off the domino effect of getting pages
  return fetchPage();
};
GraphQL.sendQuery.action = 'get a batch of data from Canvas';
GraphQL.sendQuery.requiredParams = ['query'];
GraphQL.sendQuery.scopes = [];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = GraphQL;
