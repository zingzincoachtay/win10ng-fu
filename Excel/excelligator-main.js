const pc = require('process');//console.log(pc.argv);
const path = require('path');
//__dirname
//__filename
const scope = require('./excelligator-scope.js');
const crawl = require('./excelligator-crawl.js');
const parse = require('./excelligator-parse.js');
const ofile = require('./excelligator-output.js');

const DisableExcelligator = false;console.log( JSON.stringify(scope.getNewCellPositions,null,2) );

console.log("Ready to crawl...");
    // Get the URIs in CSV as a list -- pick one
    // 1 - Get from a pre-made list with FindUtil and Grep Gnuwin32 tools
    //      function(
    //        arg1 ... path to the CSV file that lists the paths to the Excel files
    //        arg2 ... column that contains the paths to the target Excel files
    // 2 - Build a list by crawling
    var URI = (DisableExcelligator) ? parse.getColumn(scope.getURITarget,scope.getURIColumn) : crawl.getEssentials( crawl.findFiles(scope.getProjectURI),scope.getIncludeRegex,scope.getExcludeRegex );
    URI = URI.map( (e)=>(typeof e === 'string') ? path.normalize(e) : e );
console.log("N(Target Files): "+URI.length);
console.log("Finished crawling.");

console.log("Ready to read...");
    var digest = (DisableExcelligator) ? scope.importJSONdata(pc.argv[2]+".json","[]") : parse.getDigest(URI);
        ofile.courier (pc.argv[2]+".json",JSON.stringify(digest));
        ofile.courier (pc.argv[2]        ,ofile.makeCSV(digest,['sheet','total','age']));
        ofile.makeXLSX(pc.argv[2]        ,              digest,['sheet','total','age'] );
console.log("Digest complete.");

console.log("Ready to read...");
    var detail = (DisableExcelligator) ? {"dump":scope.importJSONdata(pc.argv[3],"[]"),"index":new Map(scope.importJSONdata(pc.argv[3]+"i","[]"))} : parse.getDetail(URI);
        ofile.courier (pc.argv[3]        ,JSON.stringify(           detail.dump  ) );
        ofile.courier (pc.argv[3]+"i"    ,JSON.stringify(Array.from(detail.index)) );// Map object
        ofile.courier (scope.getURITarget,ofile.makeCSV(ofile.makeIndexImportable(detail.dump,detail.index,scope.getDatabaseBlueprint),[]));
        ofile.makeXLSX(scope.getURITarget,              ofile.makeIndexImportable(detail.dump,detail.index,scope.getDatabaseBlueprint),[] );
        ofile.courier (pc.argv[4]        ,ofile.makeCSV(ofile.makeDumpImportable (detail.dump,detail.index,scope.getDatabaseBlueprint),[]));
        ofile.makeXLSX(pc.argv[4]        ,              ofile.makeDumpImportable (detail.dump,detail.index,scope.getDatabaseBlueprint),[] );
console.log("Aggregator complete.");
