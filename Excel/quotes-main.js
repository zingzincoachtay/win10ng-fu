const pc = require('process');//console.log(pc.argv);
const path = require('path');
const crawl = require('./quotes-crawl.js');
const scope = require('./quotes-scope.js');
const parse = require('./quotes-parse.js');
const ofile = require('./quotes-output.js');

// Get the path to the CSV file that lists the paths to the Excel files
var URItarget = scope.getURITarget;
// Within the CSV file (in `target`), get the column that contain the paths to the Excel files
var URIcolumn = scope.getURIColumn;
// Get the URIs in CSV as a list -- pick one
// 1 - Get from a pre-made list with FindUtil and Grep Gnuwin32 tools
var URI = parse.getColumn(URItarget,URIcolumn);  URI = URI.map( (e)=>path.normalize(e) );  console.log("N(Target Files): "+URI.length);
// 2 - Build a list by crawling
//var URI = crawl.essentialFiles( crawl.findFiles(scope.getProjectURI),scope.getIncludeRegex,scope.getExcludeRegex );  URI = URI.map( (e)=>path.normalize(e) );  console.log("N(Target Files): "+URI.length);

var digest = parse.getDigest(URI);  ofile.courier( pc.argv[2],ofile.exportCSV(digest,['sheet','total','age']) );
//console.log(JSON.stringify(digest));
//console.log(ofile.exportCSV(digest,['sheet','total','age']));

var detail = parse.getDetail(URI);  ofile.courier( pc.argv[3],JSON.stringify(detail.dump) );  ofile.courier( pc.argv[3]+"i",JSON.stringify(Array.from(detail.index)) );
    ofile.courier( pc.argv[4],ofile.makeImportable(detail.dump,detail.index,scope.getDatabaseKeys) );

//var detail = {"dump":ofile.loadTestJSON('./quoted.db'),"index":new Map(ofile.loadTestJSON('./quoted.dbi'))};
  //  ofile.courier( pc.argv[4],ofile.makeImportable(detail.dump,detail.index,scope.getDatabaseKeys) );
//console.log(JSON.stringify(detail.dump));
//console.log(ofile.makeImportable(detail.dump,detail.index,scope.getDatabaseKeys));
