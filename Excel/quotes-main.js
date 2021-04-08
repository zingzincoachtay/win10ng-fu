const pc = require('process');//console.log(pc.argv);
const scope = require('./quotes-scope.js');
const parse = require('./quotes-parse.js');
const ofile = require('./quotes-output.js');

// Get the path to the CSV file that lists the paths to the Excel files
var URItarget = scope.getURITarget();
// Within the CSV file (in `target`), get the column that contain the paths to the Excel files
var URIcolumn = scope.getURIColumn();
// Get the URIs in CSV as a list
var URI = parse.getColumn(URItarget,URIcolumn);

//var digest = parse.getDigest(URI);  ofile.courier( pc.argv[2],ofile.exportCSV(digest,['sheet','total','age']) );
//console.log(JSON.stringify(digest));
//console.log(ofile.exportCSV(digest,['sheet','total','age']));

var dump = parse.dumpExcel(URI);  ofile.courier( pc.argv[3],JSON.stringify(dump) );
//console.log(JSON.stringify(dump));
//console.log(ofile.exportCSV(ofile.makeImportable(dump),[]));
