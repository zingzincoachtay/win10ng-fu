const fs = require('fs');
var Excel;
if(typeof require !== 'undefined') Excel = require('xlsx');

const flattenOOO = function(prepend,reps,orderofobjects){
  let organized = [];
  for(let k=1;k<reps.length;k++){
    let item = reps[k];
    organized.push( [...prepend,...orderofobjects.map((e)=>item[e[1]])] );
  }
  return organized;
}

const json2sheet = (o,h) => Excel.utils.json_to_sheet(o,{header:h});
const sheet2csv = (_o,_h) => Excel.utils.sheet_to_csv(json2sheet(_o,_h), {FS:"\t",blankrows:false,forceQuotes:true});

module.exports.courier = (relpath,content) => {
  if(typeof relpath !== 'undefined')
    fs.writeFile(relpath, content, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });
  return 1;
};
module.exports.exportCSV = sheet2csv;
module.exports.makeImportable = (data,source,orderof) => {// source is `new Map()` object with a relational data
  let rows = [];
  let freeze = [orderof["Referrer"][0][0],...orderof["basic"].map( (e)=>e[0] )];
  rows.push( [...freeze, "mat.para",...orderof[ "mat.para"].map( (e)=>e[0] )] );
  rows.push( [...freeze, "mat.prof",...orderof[ "mat.prof"].map( (e)=>e[0] )] );
  rows.push( [...freeze,"vmat.para",...orderof["vmat.para"].map( (e)=>e[0] )] );
  rows.push( [...freeze,"vmat.prof",...orderof["vmat.prof"].map( (e)=>e[0] )] );
  rows.push( [...freeze,"proc.para",...orderof["proc.para"].map( (e)=>e[0] )] );
  rows.push( [...freeze,"proc.prof",...orderof["proc.prof"].map( (e)=>e[0] )] );
  rows.push( [...freeze,"pack.para",...orderof["pack.para"].map( (e)=>e[0] )] );
  rows.push( [...freeze,"pack.prof",...orderof["pack.prof"].map( (e)=>e[0] )] );
  rows.push( [...freeze,"tally.para",...orderof["tally.para"].map( (e)=>e[0] )] );
  rows.push( [...freeze,"tally.prof",...orderof["tally.prof"].map( (e)=>e[0] )] );
  data.forEach((datum, i) => {
    let prepend = flattenOOO([source.get(datum.sheet)],[null,Object.assign(datum[0].basic.para,datum[0].basic.prof)],orderof["basic"]).flat();
    rows.push( ...flattenOOO([...prepend, "mat.para"],[null,datum[0].mat.para ],orderof[ "mat.para"]) );
    rows.push( ...flattenOOO([...prepend, "mat.prof"],      datum[0].mat.prof  ,orderof[ "mat.prof"]) );
    rows.push( ...flattenOOO([...prepend,"vmat.para"],[null,datum[0].vmat.para],orderof["vmat.para"]) );
    rows.push( ...flattenOOO([...prepend,"vmat.prof"],      datum[0].vmat.prof ,orderof["vmat.prof"]) );
    rows.push( ...flattenOOO([...prepend,"proc.para"],[null,datum[0].proc.para],orderof["proc.para"]) );
    rows.push( ...flattenOOO([...prepend,"proc.prof"],      datum[0].proc.prof ,orderof["proc.prof"]) );
    rows.push( ...flattenOOO([...prepend,"pack.para"],[null,datum[0].pack.para],orderof["pack.para"]) );
    rows.push( ...flattenOOO([...prepend,"pack.prof"],      datum[0].pack.prof ,orderof["pack.prof"]) );
    rows.push( ...flattenOOO([...prepend,"tally.para"],[null,datum[0].tally.para],orderof["tally.para"]) );
    rows.push( ...flattenOOO([...prepend,"tally.prof"],      datum[0].tally.prof ,orderof["tally.prof"]) );
    //console.log(rows);let;
  });
  return sheet2csv(rows,[]);
};
module.exports.loadTestJSON = function(file){
  try {
      const data = fs.readFileSync(file, 'utf8');
      return JSON.parse(data);
  } catch (err) {
      console.log(`Error reading file from disk: ${err}`);
  }
}
