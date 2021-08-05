const fs = (typeof require !== 'undefined') ? require('fs') : {};

const config = "configurations";

const importJSONdata = function(file,data={}){
  try {
      data = fs.readFileSync(file+".json", 'utf8');
  } catch (err) {
      console.log(`Error reading '${file}' from disk: ${err}`);
      try {
        fs.writeFileSync(file+".json",data);  //fs.writeFileSync(configJSON, monitor.settings.default);
      } catch(err) {
        console.error(`Failed to create '${file}' into disk: ${err}`);
      }
  }
  return JSON.parse(data);
}
//const range = (k,j) => (k === j) ? [k] : [k, ...range(k+1,j)];
const range = (k,j) => (new Array(j-k+1)).fill(undefined).map((_,i)=>k+i);
const constructXY = (xyr,xyc) => xyr.map((r)=>xyc.map( (c)=>c+r ));  // yield an array of arrays
const constructRepeatables = function(constructed,keys,aoa){
  let O = (keys.length==0) ? {} : Object.assign(...aoa);
  let aoacount = [];  let setcount = [];
      aoacount = keys.map((e)=>O[e].length);
      setcount = keys.map((e)=>O[e].map((l)=>l.length) ).flat();
  let r = aoacount.sort( (a,b)=>b-a ).shift();  // ascending, minimum row size
  let c = setcount.sort( (a,b)=>b-a ).shift();  // ascending, minimum col size
  for(let k=0;k<c;k++){
    let bloc = [true];
    for(let j=0;j<r;j++)
      bloc.push( Object.assign(...keys.map( (e)=>({ [e]:O[e][j][k] }) )) );
    constructed[k] = bloc;
  }
  return constructed;
}
const traverse = (trails,O) => (trails.length>0) ? traverse(trails.slice(1),O[trails[0]]) : O;
const mapobj = (trails,_O) => ({[trails[0]]:(trails.length>1) ? mapobj(trails.slice(1),_O) : _O});

let configurations = importJSONdata(config);
let setEmptyRowsize = {};//"n":0,"o":0
let setEmptyRevsize = {};//"n":0,"o":0
for(let name of configurations.dbKeyDefCol){
  let elename = configurations.dbDefCol[name];
  for(let key of Object.keys(elename)){
    let pos = elename[key].pos;
    for(let ageism of Object.keys(pos)){
        let rowsize = (typeof pos[ageism].r === 'undefined') ? pos[ageism].map((e)=>e.length).sort((a,b)=>a-b) : [pos[ageism].r[1]-pos[ageism].r[0]];
        let revsize = (typeof pos[ageism].c === 'undefined') ? pos[ageism].length                              : pos[ageism].c.length;
        if(setEmptyRowsize[ageism] === 'undefined')  setEmptyRowsize[ageism] = rowsize[0];
        else  setEmptyRowsize[ageism] = (setEmptyRowsize[ageism]>rowsize[0]) ? setEmptyRowsize[ageism] : rowsize[0];
        if(setEmptyRevsize[ageism] === 'undefined')  setEmptyRevsize[ageism] = revsize;
        else  setEmptyRevsize[ageism] = (setEmptyRevsize[ageism]>revsize   ) ? setEmptyRevsize[ageism] : revsize;
    }
  }
}
configurations.Referrer = (configurations.EnableReferrerPrefill) ? configurations.Referrer : Object.assign(configurations.Referrer,...Object.keys(configurations.dbDefCol).map( (e)=>({[e]:Object.keys(configurations.dbDefCol[e]).sort()}) ))
configurations.bookmark = Object.assign(...configurations.dbKeyDefCol.map( (e)=>mapobj(e.split(/\W+/g),e) ));

console.log( JSON.stringify(configurations,null,2) );
for(let name of configurations.dbKeyDefCol){
  //
  //  First make all O.pos.(n|o) into an array of arrays
  //
  for(let [col,par] of Object.entries(configurations.dbDefCol[name])){
      Object.keys(par.pos).forEach((bc) => {  // 'n' or 'o', e.g.
        let xy = par.pos[bc];
        par.pos[bc] = (typeof xy.r === 'undefined' || typeof xy.c === 'undefined') ? xy : constructXY(range(xy.r[0],xy.r[1]),xy.c);
      });
  }
}
console.log( JSON.stringify(configurations,null,2) );
let dbDefCol = {};
for(let name of configurations.dbKeyDefCol){
  dbDefCol[name] = { "init":[],"pos":{} };  // 'init' - array of arrays, 'pos' - array of arrays of objects (rows)
  //
  //  Second divvy up into an array of objects {_col_:_val_,..}
  //
  let elename = configurations.dbDefCol[name];
  let keys = Object.keys(elename);
      dbDefCol[name].init     = (keys.length==0) ? [[]] : constructRepeatables([],keys, keys.map((e)=>({[e]:[[elename[e].init]]})) );
  let ageism = keys.map( (e)=>Object.keys(elename[e].pos) ).flat();
  for(let age of Array.from( new Set((ageism.length==0) ? Object.keys(setEmptyRowsize) : ageism) ))  // allow empty objects
      dbDefCol[name].pos[age] = (ageism.length==0) ? (new Array(setEmptyRowsize[age])).fill([false,{}]) : constructRepeatables([],keys, keys.map((e)=>({[e]:elename[e].pos[age]})) );
}
console.log( JSON.stringify(dbDefCol,null,2) );
let SubsForm0MallocEach2 = {};
let SubsForm0CoordEach2  = {};
for(let age of Object.keys(setEmptyRevsize)){
  SubsForm0MallocEach2[age] = [];
  SubsForm0CoordEach2[ age] = [];
  for(let k of range(0,setEmptyRevsize[age]-1)){
    SubsForm0MallocEach2[age][k] = {};
    SubsForm0CoordEach2[ age][k] = {};
    for(let bookmark of Object.keys(configurations.bookmark)){
        let para_init = dbDefCol[bookmark+".para"].init[0][1];
        let prof_init = dbDefCol[bookmark+".prof"].init[0][1];
        let para_pos = (typeof dbDefCol[bookmark+".para"].pos[age][k] === 'undefined') ? dbDefCol[bookmark+".para"].pos[age][0] : dbDefCol[bookmark+".para"].pos[age][k];
        let prof_pos = dbDefCol[bookmark+".prof"].pos[age][k];
        Object.assign(SubsForm0MallocEach2[age][k], {[bookmark]:{ para:para_init,rows: [],prof:prof_init}} );
        Object.assign(SubsForm0CoordEach2[ age][k], {[bookmark]:{ para:para_pos ,rows: [],prof:prof_pos }} );
    }
  }
}
console.log( JSON.stringify(SubsForm0MallocEach2,null,2) );
const SubsInNewForm = (header0,mat0,vmat0,proc0,pack0,totals0) => ({
   "basic": header0

  , "mat" :  mat0
  ,"vmat" : vmat0
  ,"proc" : proc0
  ,"pack" : pack0

  ,"tally": totals0
});
const SubsForm0MallocEach = () => SubsInNewForm(
   { para:dbDefCol["basic.para"].init[0][1],rows: [],prof:dbDefCol["basic.prof"].init[0][1] }
  // MATERIAL
  ,{ para:dbDefCol[  "mat.para"].init[0][1],rows: [],prof:dbDefCol[  "mat.prof"].init[0][1] }
  //// Vendor MATERIAL -- dormant, placeholder
  ,{ para:dbDefCol[ "vmat.para"].init[0][1],rows: [],prof:dbDefCol[ "vmat.prof"].init[0][1] }
  // Production process
  ,{ para:dbDefCol[ "proc.para"].init[0][1],rows: [],prof:dbDefCol[ "proc.prof"].init[0][1] }
  // Any packaging -- dormant, placeholder
  ,{ para:dbDefCol[ "pack.para"].init[0][1],rows: [],prof:dbDefCol[ "pack.prof"].init[0][1] }
  // tally
  ,{ para:dbDefCol["tally.para"].init[0][1],rows: [],prof:dbDefCol["tally.prof"].init[0][1] }
);
const SubsForm0CoordEach = (age,k) => SubsInNewForm(
   { para:dbDefCol["basic.para"].pos[age][0],rows: [],prof:dbDefCol["basic.prof"].pos[age][k] }
  // MATERIAL
  ,{ para:dbDefCol[  "mat.para"].pos[age][k],rows: [],prof:dbDefCol[  "mat.prof"].pos[age][k] }
  //// Vendor MATERIAL -- dormant, placeholder
  ,{ para:dbDefCol[ "vmat.para"].pos[age][k],rows: [],prof:dbDefCol[ "vmat.prof"].pos[age][k] }
  // Production process
  ,{ para:dbDefCol[ "proc.para"].pos[age][k],rows: [],prof:dbDefCol[ "proc.prof"].pos[age][k] }
  // Any packaging -- dormant, placeholder
  ,{ para:dbDefCol[ "pack.para"].pos[age][k],rows: [],prof:dbDefCol[ "pack.prof"].pos[age][k] }
  // tally
  ,{ para:dbDefCol["tally.para"].pos[age][k],rows: [],prof:dbDefCol["tally.prof"].pos[age][k] }
);

const regexify = (RE) => RE.map((rule)=>{
  if(typeof rule === 'object')  return rule;
  let expression = rule.match(/^([\W\{])(.+)[\1\}]$/);
  if( expression !== null )  rule = expression[2];
  return (new RegExp(rule));
});

module.exports = {
  DisableExcelligator : configurations.DisableExcelligator,
  projectfolders   : configurations.projectrootfolders,
  projectdatabases : configurations.projectdatabases,
  osURIlist      : configurations.osURIlist,
  URIColumn      : configurations.URIColumn,
  FlattenDB      : configurations.FlattenDB,
  includeFilesRegex  : regexify(configurations.includeFiles),
  excludeFilesRegex  : regexify(configurations.excludeFiles),
  loadDependencies   : configurations.dependencies,
  SubsNewForm0Malloc : [
    //SubsForm0MallocEach(    ),SubsForm0MallocEach(    ),SubsForm0MallocEach(    )
    SubsForm0MallocEach2.n[0],SubsForm0MallocEach2.n[0],SubsForm0MallocEach2.n[0]
  ],
  SubsNewForm0Position: [
    //SubsForm0CoordEach('n',0),SubsForm0CoordEach('n',1),SubsForm0CoordEach('n',2)
    SubsForm0CoordEach2.n[0],SubsForm0CoordEach2.n[1],SubsForm0CoordEach2.n[2]
  ],
  SubsOldForm0Malloc : [
    SubsForm0MallocEach2.o[0]
  ],
  SubsOldForm0Position: [
    //SubsForm0CoordEach('o',0)
    SubsForm0CoordEach2.o[0]
  ],
  SheetNamesVariants : regexify(configurations.SheetNamesVariants),
  dbCols : configurations.dbKeyDefCol,
  dbBlueprint : configurations,
  importJSONdata : importJSONdata
};
