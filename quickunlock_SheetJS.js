var Excel;
if(typeof require !== 'undefined') Excel = require('xlsx');

var process;
if(typeof require !== 'undefined') process = require('process');
if(process.argv.length<3){console.log("No Target File.");exit;}
let yargs = process.argv.slice(2);
let target = (yargs.length>0) ? yargs[0] : [];

let Sheets = (typeof Excel.readFile(target) !== 'undefined') ? Excel.readFile(target) : [];

//let Sheet = (typeof Sheets.Sheets.Sheet1 !== 'undefined') ? Sheets.Sheets.Sheet1 : [];
let namedSheets = Sheets.SheetNames[0];
console.log(JSON.stringify( Sheets ));
//console.log( Sheets.Sheets[namedSheets] );
console.log(target);

Excel.writeFile(Sheets, 'out.xlsx');
