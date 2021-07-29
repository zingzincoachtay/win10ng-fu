const pump = require('./main.js');

const summing = (zero,v) => (v.length==0) ? zero : summing(zero+v[0],v.slice(1));
const sumOf = function(spreadsheet,col,k,j){
  let series = (new Array(j-k+1)).fill(undefined).map((_,i)=>`${col}`+(k+i));
  return summing(0,series.map((s)=>spreadsheet[s].v));
}
// order of objects
const orderofobjects = [
  "SUPPLIER","W",
  "MAT","COLORANT","MAT%","COLOR%","MAT$","COLOR$","M OTH","M COST",  "MAT COST","SCRAP",
  "CAV","PRESS","PRESS W","CYCLE TIME","PRESS RATE","P OTH","P COST",  "PROC COST",
  "SG&A%","PROFIT%","SG&A","PROFIT","PACKAG",  "S&G REAL","PROFIT REAL",
  "TOTAL",  "TOTAL REAL","NO FILL",
  "DATEM","DATED","DATEY",  "SHIPPING","PER PIECE"
];
let seek_new = {
  "SUPPLIER":"E14","W":"E19","DATEM":"E12","DATED":"F12","DATEY":"G12",
  "MAT":"C21","COLORANT":"C22","MAT%":"F21","COLOR%":"","MAT$":"H21","COLOR$":"H22","M OTH":"","M COST":"I31",
  "CAV":"F33","PRESS":"C33","PRESS W":"","CYCLE TIME":"G33","PRESS RATE":"H33","P OTH":"","P COST":"I40",
  "SG&A%":"H41","PROFIT%":"H42","SG&A":"I41","PROFIT":"I42","PACKAG":"I43","TOTAL":"I46"
};
let seek_old = {// FLAIR
  "SUPPLIER":"E14","W":"E19","DATEM":"E12","DATED":"F12","DATEY":"G12",
  "MAT":"C25","COLORANT":"C26","MAT%":"G23","COLOR%":"","MAT$":"G25","COLOR$":"G26","M OTH":"","M COST":"I31",
  "CAV":"G33","PRESS":"C34","PRESS W":"","CYCLE TIME":"G34","PRESS RATE":"H34","P OTH":"","P COST":"I40",
  "SG&A%":"H41","PROFIT%":"H42","SG&A":"I41","PROFIT":"I42","PACKAG":"I43","TOTAL":"I46"
};
//const config = "configurations.json";
//const pump = require('./configurations.js');

let target = pump.yargs(pump.pc.argv);
let Sheets = pump.Excel.readFile(target[0]) || [];
let namedSheet = Sheets.SheetNames[0];
let Sheet = Sheets.Sheets[namedSheet] || [];

let useOutdated = (typeof Sheet["F13"] === 'undefined' || typeof Sheet["H16"] === 'undefined');
// If "F13" or "H16" ("G13" or "I16") exists, assume that RFQ Form is new. Otherwise, it is outdated. Backward compatibility..
let seek = (useOutdated) ? seek_old : seek_new;

for(let ooo of orderofobjects)
  seek[ooo] = (typeof Sheet[seek[ooo]] === 'undefined') ? "" : Sheet[seek[ooo]].v;
// exceptions
seek["COLOR%"] = 1-seek["MAT%"];
seek["M OTH"] = (useOutdated) ? sumOf(Sheet,"I",27,30) : sumOf(Sheet,"I",23,30);
seek["P OTH"] = (useOutdated) ? sumOf(Sheet,"I",35,39) : sumOf(Sheet,"I",34,39);
seek["DATEM"] = `${seek["DATEM"]} ${seek["DATED"]}, ${seek["DATEY"]}`;

let tracking = orderofobjects.map((ooo)=>seek[ooo]);
console.log( tracking.join("\t") );
pump.pbcopy.writeSync( tracking.join("\t") );
