'use strict';

var objectifyRoutes = function(folderPath) {
    var filename = '';
    var output = {};
    var folderContents = fs.readdirSync('./' + folderPath);
    for (var i = 0; i < folderContents.length; i++) {
        if (fs.statSync(folderPath + '/' + folderContents[i]).isFile()) {
            filename = folderContents[i].split('.')[0];
            if (filename != 'index' && filename != 'Index') {
                output[filename] = require('../' + folderPath + '/' + folderContents[i]);
            }
        } else if (fs.statSync(folderPath + '/' + folderContents[i]).isDirectory()) {
            filename = folderContents[i];
            output[filename] = objectifyRoutes(folderPath + '/' + filename);
        }
    }
    return output;
};

module.exports = objectifyRoutes;
