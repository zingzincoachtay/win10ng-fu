const fs = require('fs');
const pc = require('process');//console.log(pc.argv);
const scope = require('./quotes-scope.js');
const parse = require('./quotes-parse.js');

const makeImportable = function(relpath,content){
  if(typeof relpath !== 'undefined')
    fs.writeFile(relpath, content, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });
  return 1;
}

// Get the path to the CSV file that lists the paths to the Excel files
var URItarget = scope.getURITarget();
// Within the CSV file (in `target`), get the column that contain the paths to the Excel files
var URIcolumn = scope.getURIColumn();
// Get the URIs in CSV as a list
var URI = parse.getColumn(URItarget,URIcolumn);

//var digest = parse.getDigest(URI);
//console.log(JSON.stringify(digest));
//makeImportable( pc.argv[2],parse.exportCSV(digest,['sheet','total','age']) );
//console.log(parse.exportCSV(digest,['sheet','total','age']));// Change to an export module

var dump = parse.dumpExcel(URI);
console.log(JSON.stringify(dump));
makeImportable( pc.argv[3],JSON.stringify(dump) );
