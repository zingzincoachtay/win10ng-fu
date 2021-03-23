var Excel;
if(typeof require !== 'undefined') Excel = require('xlsx');

var process;
if(typeof require !== 'undefined') process = require('process');
if(process.argv.length<3){console.log("No Target File.");exit;}
let yargs = process.argv.slice(2);
let target = (yargs.length>0) ? yargs[0] : [];

let Sheets = (typeof Excel.readFile(target) !== 'undefined') ? Excel.readFile(target) : [];
//console.log(Sheets);
console.log(Sheets.SheetNames);

const SheetNamesVariants = [/^Sheet\d$/,/^Return form\s?\(\d\)$/];

Sheets.SheetNames.forEach((item, i) => {
  SheetNamesVariants.forEach((reItem, i) => {
    console.log(item+": "+reItem.test(item));
  });

});

//let Sheet = (typeof Sheets.Sheets.Sheet1 !== 'undefined') ? Sheets.Sheets.Sheet1 : [];
let namedSheets = Sheets.SheetNames.filter( (n)=>{
  let isValid = new Set();
  SheetNamesVariants.forEach((reItem, i) => {
    isValid.add(reItem.test(n));
  });
  return isValid.has(true);
});
//console.log(JSON.stringify( Sheets.Sheets[namedSheets[0]] ));
console.log( Sheets.Sheets[namedSheets[0]] );
console.log(namedSheets[0]);
console.log(target);
