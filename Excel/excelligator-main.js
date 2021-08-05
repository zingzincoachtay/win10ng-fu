const pc = (typeof require !== 'undefined') ? require('process') : {};
const path = (typeof require !== 'undefined') ? require('path') : {};
//__dirname
//__filename
const scope = require('./excelligator-scope.js');
const crawl = require('./excelligator-crawl.js');
const parse = require('./excelligator-parse.js');
const ofile = require('./excelligator-output.js');

//DisableExcelligator =; false - crawl, not read from db; true - not crawl, read from db
const digestDB = pc.argv[2] || scope.getProjectDBF[2];
const detailDB = pc.argv[3] || scope.getProjectDBF[3];

console.log("Ready to crawl...");
    // Get the URIs as a list -- pick one
    // 1 - Get a list from db
    //       arg1 ... path to the db that lists the paths to the target Excel files
    //       arg2 ... column in the db that lists the paths to the target Excel files
    // 2 - Build a list by crawling
	//       arg1 ... all files found in the given directories
	//         arg1 ... a list of directories to crawl
	//       arg2 ... filename rules to include files
	//       arg3 ... filename rules to exclude files
    var URI = (scope.DisableExcelligator) ? parse.getColumn(scope.getURITarget,scope.getURIColumn) : crawl.getEssentials( crawl.findFiles(scope.getProjectURI),scope.getIncludeRegex,scope.getExcludeRegex );
    URI = URI.map( (e)=>(typeof e === 'string') ? path.normalize(e) : e );
console.log("N(Target Files): "+URI.length);
console.log("Finished crawling.");
// db will also be made

console.log("Ready to read...");
    var digest = (scope.DisableExcelligator) ? scope.importJSONdata(digestDB,"{}") : parse.getDigest(URI);
        ofile.courier    (digestDB,ofile.makeCSV (digest,['sheet','total','age']));
        ofile.courierXLSX(digestDB,ofile.makeXLSX(digest,['sheet','total','age']));
console.log("Digest complete.");
// json will also be made
        ofile.courier    (digestDB+".json",JSON.stringify(digest));

console.log("Ready to read...");
    var detail = (scope.DisableExcelligator) ? {"dump":scope.importJSONdata(scope.getParsedData,"{}"),"index":new Map(scope.importJSONdata(scope.getParsedData+"i","{}"))} : parse.getDetail(URI);
        ofile.courier    (scope.getURITarget,ofile.makeCSV (ofile.makeIndexImportable(detail.dump,detail.index,scope.getDatabaseBlueprint),[]));
        ofile.courierXLSX(scope.getURITarget,ofile.makeXLSX(ofile.makeIndexImportable(detail.dump,detail.index,scope.getDatabaseBlueprint),[]));
        ofile.courier    (          detailDB,ofile.makeCSV (ofile.makeDumpImportable(detail.dump,detail.index,scope.getDatabaseBlueprint),[]));
        ofile.courierXLSX(          detailDB,ofile.makeXLSX(ofile.makeDumpImportable(detail.dump,detail.index,scope.getDatabaseBlueprint),[]));
console.log("Detail complete.");
// dump will also be made - used to be `quoted.db`
        ofile.courier    (scope.getParsedData+ ".json",JSON.stringify(           detail.dump  ,null,2) );
        ofile.courier    (scope.getParsedData+"i.json",JSON.stringify(Array.from(detail.index),null,2) );// Map object

console.log("Aggregator complete.");
