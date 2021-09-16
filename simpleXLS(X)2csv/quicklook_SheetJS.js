const quick = require('./quick-main.js');

let target = quick.yargs(quick.process.argv);
let Sheets = quick.Excel.readFile(target[0]) || [];
const DeepObjSearch = function(re,o){
  for(let kay of Object.keys(o).filter((e)=>re.test(e)))
      console.log(`o - ${kay} , ${o[kay]}`);
  let branches = Object.values(o).filter((e)=>(typeof e === 'object'));
  if( branches.length==0 )  return 1;
  for(let kay of branches)  DeepObjSearch(re,kay);
}

console.log(Sheets);
console.log(Sheets.SheetNames);

const SheetNamesVariants = [/^Sheet\d$/,/^Return form$/,/^Return form\s?\(\d\)$/];
Sheets.SheetNames.forEach((item) => {
  for(let reItem of SheetNamesVariants)
    console.log(`${reItem}.test(${item}): `+reItem.test(item));
});
let namedSheets = Sheets.SheetNames.filter( (n)=>{
  let isValid = SheetNamesVariants.map( (reItem)=>reItem.test(n) );
  return isValid.includes(true);
});
console.log(namedSheets);

let Sheet = Sheets.Sheets[namedSheets[0]] || [];
console.log(Sheet);
console.log( Object.keys(Sheet).filter((e)=>/^!/.test(e)) );
DeepObjSearch(/^!/i,Sheets);
