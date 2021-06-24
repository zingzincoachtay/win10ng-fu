const fs = (typeof require !== 'undefined') ? require('fs') : {};
const Excel = (typeof require !== 'undefined') ? require('xlsx') : {};

const json2sheet = (o,h) => Excel.utils.json_to_sheet(o,{header:h});
const aoa2sheet  = (o,h) => Excel.utils.aoa_to_sheet( o,{header:h});
const json2csv = (_o,_h) => Excel.utils.sheet_to_csv(json2sheet(_o,_h), {FS:"\t",RS:"\n",blankrows:false,forceQuotes:true});
const traverse = (trails,O) => (trails.length>0) ? traverse(trails.slice(1),O[trails[0]]) : O;

module.exports.courier = function(relpath,content){
  console.log("Attempt to write: "+relpath);
  if(typeof relpath !== 'undefined')
    fs.writeFile(relpath, content, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });
  return 1;
}
module.exports.courierXLSX = function(relpath,Sheet){
  console.log("Attempt to write: "+relpath+'.xlsx');
  Excel.writeFile(Sheet, relpath+'.xlsx');
  return 1;
}
module.exports.makeCSV  = (_o,_h) => json2csv(_o,_h);
module.exports.makeXLSX = (_o,_h) => {
  let wb = Excel.utils.book_new();
  Excel.utils.book_append_sheet(wb, json2sheet(_o,_h), "Sheet0");
  return wb;
}
module.exports.makeIndexImportable = (data,source,bp, rows=[] ) => {
  for(let [i,row] of source)// Map object
    rows.push( [...row.slice(0,-1),i,...row.slice(-1),i] );
  return rows;
};
const flattenOOO = (prepend,orderofobjects,reps) => reps.slice(1).map( (o)=>prepend.concat(orderofobjects.map((e)=>o[e])) );
module.exports.makeDumpImportable = (data,source,bp, rows=[] ) => {// source is `new Map()` object with a relational data
  for(let headless of bp.dbKeyDefCol.slice(2))
      rows.push( [bp.Referrer.path,bp.Referrer["basic.para"],bp.Referrer["basic.prof"],[headless],bp.Referrer[headless]].flat() );
  data.forEach((datum, i) => {
    let fileProperty = source.get(datum.sheet);
    let freeze = fileProperty.slice(-1).concat(// Will always keep the full file path at the end of Array object
                    ...flattenOOO([],bp.Referrer["basic.para"],datum.basic.para),
                    ...flattenOOO([],bp.Referrer["basic.prof"],datum.basic.prof)
                 );
    for(let dbKey of bp.dbKeyDefCol.slice(2))
        rows.push( ...flattenOOO(freeze.concat(dbKey),bp.Referrer[dbKey], traverse(dbKey.split(/\W+/g),datum)) );// `traverse` points to an object
  });
  return rows;
};
