const fs = require('fs');
const scope = require('./quotes-scope.js');
const parse = require('./quotes-parse.js');

var target = scope.getTarget();
var column = scope.getColumn();
//var target = parse.getFiles(scope.getParent(),[]);

var URI = parse.getURI(target,column);
var digest = parse.getDigest(URI);

//console.log(scope.getParent());
////console.log(target);
//console.log(Object.keys(data));
//console.log(Workbook.Sheets.Sheet1);
//console.log(Lookout);
////console.log(URI);
////console.log(digest);
