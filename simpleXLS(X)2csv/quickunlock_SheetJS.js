const quick = require('./quick-main.js');

let target = quick.yargs(quick.process.argv);
let Sheets = quick.Excel.readFile(target[0]) || [];

console.log(Sheets);
console.log(Sheets.SheetNames);

//let Sheet = Sheets.Sheets.Sheet1 || [];
let namedSheets = Sheets.SheetNames[0];
console.log( JSON.stringify(Sheets.Sheets,null,2) );
console.log(namedSheets);
//console.log( JSON.stringify(Sheets.Sheets[namedSheets],null,2) );

let BOOK = quick.Excel.utils.book_new();
quick.Excel.utils.book_append_sheet(BOOK, Sheets.Sheets[namedSheets], "Sheet0");
quick.Excel.writeFile(Sheets, 'out.xlsx');
