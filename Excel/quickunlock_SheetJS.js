const quick = require('./quick-main.js');

let target = quick.yargs(quick.process.argv);
let Sheets = quick.Excel.readFile(target[0]) || [];

//let Sheet = (typeof Sheets.Sheets.Sheet1 !== 'undefined') ? Sheets.Sheets.Sheet1 : [];
let namedSheets = Sheets.SheetNames[0];
console.log( JSON.stringify(Sheets) );
console.log( JSON.stringify(Sheets.Sheets[namedSheets]) );

//Excel.writeFile(Sheets, 'out.xlsx');
