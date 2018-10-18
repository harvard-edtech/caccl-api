const fs = require('fs');
const config = require('../../endpoints/config.js');
const doctrine = require('doctrine');
const path = require('path');

const endpointsPath = path.join(__dirname, '../../endpoints');

const genH1 = (body) => {
  return '#' + body;
};
const genH2 = (body, noLine) => {
  return '## ' + body;
};

fs.readdir(endpointsPath, (categoryError, items) => {
  if (categoryError) {
    console.log('An error occurred while reading categories:', categoryError);
    return;
  }

  // Create introduction
  let intro = genH1('Endpoints Documentation') + '\n\n';

  intro += '<!-- Embedded styles: -->\n';
  intro += '<style>\n' + fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8') + '\n</style>\n';

  // Add normal intro
  intro += 'Usefule endpoint facts:\n\n';
  intro += '* Each endpoint accepts an `options` object that contains all inputs as properties.\n';
  intro += '* Each endpoint returns a promise.\n';
  intro += '* To call a endpoint, use: `category.funcName(...)`. The subcategory does not affect how you call the endpoint.\n';
  intro += '* In addition to defined inputs, you can always include any of the following options:\n';
  intro += '  * `ignoreCache` - If true, endpoint won\'t return the cached version if it exists.\n';
  intro += '  * `dontCache` - If true, endpoint response won\'t be cached.\n\n';

  // Add table of contents
  intro += genH2('Table of Contents');
  let firstTOCCreated = false;

  let doc = '';

  items.forEach((category) => {
    if (!fs.lstatSync(endpointsPath + '/' + category).isDirectory()) {
      // Not a directory (not a category)
      return;
    }

    if (!config[category]) {
      // Category isn't included in config. Skip it!
      return;
    }

    // This is a valid category!
    // Get all files inside it
    const endpointsFiles = fs.readdirSync(endpointsPath + '/' + category);

    const catId = 'category-' + category;
    doc += '<a name="' + catId + '"></a>\n';
    doc += genH1('Category: ' + category) + '\n\n';
    if (firstTOCCreated) {
      // Add toc divider
      intro += '\n\n<hr>\n';
    }
    firstTOCCreated = true;
    intro += '\n\n**Category: [' + category + '](#' + catId + ')**\n\n';

    for (let fileIndex = 0; fileIndex < endpointsFiles.length; fileIndex++) {
      const endpointsFile = endpointsFiles[fileIndex];
      const lines = fs.readFileSync('../../endpoints/' + category + '/'
        + endpointsFile, 'utf-8').split('\n');

      const subcatName = endpointsFile.split('.')[0];
      const subcatId = 'subcategory-' + category + '-' + subcatName;
      doc += '<a name="' + subcatId + '"></a>\n';
      doc += genH2('Subcategory: ' + subcatName, fileIndex === 0) + '\n\n';
      intro += '* Subcategory: [' + subcatName + '](#' + subcatId + ')\n';
      const endpointDefinitions = (
        require('../../endpoints/' + category + '/' + endpointsFile)
      );

      // Split file into endpoints
      const endpointParts = [];
      let currPart = '';
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '/**') {
          // Found a new endpoint!
          endpointParts.push(currPart);
          currPart = '';
        } else {
          currPart += lines[i] + '\n';
        }
      }
      endpointParts.push(currPart);
      // Remove first code (not an endpoint)
      endpointParts.shift();

      for (let i = 0; i < endpointParts.length; i++) {
        const endpointPart = endpointParts[i];
        // Split off jsdoc
        const endIndex = endpointPart.indexOf('*/');
        let jsdoc = endpointPart.substring(0, endIndex + 2);
        // Fix multiline strings and extract status
        const newDocLines = [];
        let status = 'normal';
        jsdoc.split('\n').forEach((line) => {
          if (line.trim().startsWith('* @status ')) {
            status = line.split('@status')[1].trim().toLowerCase();
            return;
          }
          if (line.trim().startsWith('*   ')) {
            // Continued line
            const addon = ' ' + line.trim().substring(1).trim();
            newDocLines[newDocLines.length - 1] += addon;
          } else {
            // New line
            newDocLines.push(line);
          }
        });
        jsdoc = newDocLines.join('\n');
        // Parse jsdoc
        const jsdocParsed = doctrine.parse(jsdoc, { unwrap: true });

        // Add divider (if not first)
        if (i > 0) {
          doc += '<hr>\n\n';
        }

        // Add title
        const endpointDefinition = endpointDefinitions[i];
        const functionName = endpointDefinition.name;
        const funcId = 'function-' + category + '-' + subcatName + '-' + functionName + '\n';
        doc += '<a name="' + funcId + '"></a>\n';
        doc += '### ' + category + '.' + functionName + '(options)\n';
        intro += '    * [' + category + '.' + functionName + '(options)](#' + funcId + ')\n';

        // Add description
        doc += jsdocParsed.description + '\n\n';

        // Split up tags
        const params = [];
        let returnDescription;
        jsdocParsed.tags.forEach((tag) => {
          if (tag.title === 'param') {
            // Parameter
            params.push(tag);
          } else if (tag.title === 'return') {
            returnDescription = tag.description;
          }
        });

        // Add params
        if (params.length > 0) {
          doc += '**Inputs:**\n\n';

          params.forEach((param) => {
            let { description } = param;

            // Extract default
            let defDescription = description.match(/\(default: .*\)/g);
            if (defDescription) {
              description = description.replace(' ' + defDescription, '');
              defDescription = defDescription[0];
              defDescription = defDescription.substring(
                defDescription.indexOf(': ') + 1,
                defDescription.length - 1
              );
            }

            // Extract optional
            let isOptional = false;
            if (description.trim().startsWith('Optional. ')) {
              description = description.trim().substring(10);
              isOptional = true;
            }

            doc += '* **' + param.name + '** [' + param.type.name + '] – ' + description;

            if (defDescription) {
              doc += '<br>&nbsp;&nbsp;_- Optional. Defaults to: ' + defDescription + '_';
            } else if (isOptional) {
              doc += '<br>&nbsp;&nbsp;_- Optional_';
            }

            doc += '\n';
          });

          doc += '\n\n';
        }

        // Add return
        if (returnDescription) {
          doc += '**Resolves to:** ';

          // Try to parse link out
          try {
            const link = 'http'
              + returnDescription.split('(see: http')[1].split(')')[0];
            const description = returnDescription.split('(see: http')[0].trim();
            if (!link || !description) {
              throw new Error('Could not parse out return link');
            }
            doc += '[' + description + '](' + link + ')\n\n';
          } catch (err) {
            // Couldn't parse out link. Just include as plain text
            doc += ' \n' + returnDescription + '\n\n';
          }
        }

        // Add status (if not normal)
        if (status !== 'normal') {
          if (status === 'unlisted') {
            doc += '<div class="alert alert-danger"><strong>Danger: Endpoint Unlisted</strong><br>This endpoint is not documentated, supported by Instructure, or even listed in the Canvas online API docs. It may change, be removed, or completely stop working at any moment.</div>\n\n';
          } else if (status === 'beta') {
            doc += '<div class="alert alert-warning"><strong>Warning: Endpoint in Beta</strong><br>Though this endpoint is officially documented by Instructure, they specifically noted that this endpoint is still in "beta". Thus, it may change or completely stop working at any moment.</div>\n\n';
          }
        }
      }
    }

    fs.writeFileSync(path.join(__dirname, '../endpoints.md'), intro + '\n\n' + doc);
  });
});
