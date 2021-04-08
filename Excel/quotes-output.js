const fs = require('fs');
var Excel;
if(typeof require !== 'undefined') Excel = require('xlsx');

const flattenJSON = function(leader,pairs,headers){
  let data = [];
  for(let h of headers)
    data.push( pairs[h] )
  return [ [...leader,...headers],[...leader,...data] ];
}
const flattenO = function(_leader,pairs){
  let data = [];console.log(pairs,_leader);
  let headers = [...Object.keys(pairs.para).sort(),...Object.keys(pairs.prof[1]).sort()];
  for(let k=1;k<pairs.prof.length;k++)
    data.push( ...flattenJSON(_leader,Object.assign({},pairs.para,pairs.prof[k]),headers) );
  return [data];
}
const makeImportable = function(data){
  let categories = ["mat","vmat","proc","pack"];
  let rows = [];
  for(let e of data){  let datum = e[0];
    rows.push( ...flattenJSON([e.sheet,e.age,    "head"],datum.head,Object.keys(datum.head).sort()) );
    rows.push( ...flattenJSON([e.sheet,e.age,   "basic"],datum.basic,Object.keys(datum.basic).sort()) );
    rows.push( ...flattenJSON([e.sheet,e.age,  "latest"],datum.latest,Object.keys(datum.latest).sort()) );
    rows.push( ...flattenJSON([e.sheet,e.age,"previous"],datum.previous,Object.keys(datum.previous).sort()) );
    for(let cat of categories)
      rows.push( ...flattenO([e.sheet,e.age,cat],datum[cat]) );
  }
  return rows;
}
const courier = function(relpath,content){
  if(typeof relpath !== 'undefined')
    fs.writeFile(relpath, content, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });
  return 1;
}

const json2sheet = (o,h) => Excel.utils.json_to_sheet(o,{header:h});
const exportCSV = (o,colnames) => Excel.utils.sheet_to_csv(json2sheet(o,colnames), {FS:"\t",blankrows:false});

module.exports.courier = courier;
module.exports.exportCSV = exportCSV;
module.exports.makeImportable = makeImportable;
