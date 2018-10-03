const fs = require('fs');
const config = require('../endpoints/config.js');
const doctrine = require('doctrine');

const endpointsPath = __dirname + '/../endpoints';

fs.readdir(endpointsPath, (categoryError, items) => {
  if (categoryError) {
    console.log('An error occurred while reading categories:', categoryError);
    return;
  }

  let doc = '# Endpoints Documentation\n\n';

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

    doc += '# Category: ' + category + '\n\n';

    for (let fileIndex = 0; fileIndex < endpointsFiles.length; fileIndex++) {
      const endpointsFile = endpointsFiles[fileIndex];
      const lines = fs.readFileSync('../endpoints/' + category + '/'
        + endpointsFile, 'utf-8').split('\n');

      doc += '## Subcategory: ' + endpointsFile.split('.')[0] + '\n\n';
      const endpointDefinitions =
        require('../endpoints/' + category + '/' + endpointsFile)({});

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
        // Fix multiline strings
        const newDocLines = [];
        jsdoc.split('\n').forEach((line) => {
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
        doc += '### ' + category + '.' + functionName + '(options)\n';

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
            let description = param.description;

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

            doc += '* **' + param.name + '** – ' + description;

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

          if (returnDescription.includes('(see: http')) {
              // Parse link
              const link = returnDescription
          }

        }

      }
    }

    fs.writeFileSync(__dirname + '/endpoints.md', doc);
  });
});
