const scope = require('./quotes-scope.js');
var Excel;
if(typeof require !== 'undefined') Excel = require('xlsx');

const pickSheetName = function(proposedNames){
  if(proposedNames.length==1) return proposedNames[0];
  let validNames = proposedNames.filter(function(n){
    let isValid = new Set();
    scope.setSheetNamesVariants().forEach( (reItem, i) => isValid.add(reItem.test(n)) )
    return isValid.has(true);
  });
  return (validNames.length>0) ? validNames[0] : '';
}
const getWBp = function(target){
  let Sheets = (typeof Excel.readFile(target) !== 'undefined') ? Excel.readFile(target) : [];
  let SheetName = (typeof Sheets.SheetNames !== 'undefined') ? pickSheetName(Sheets.SheetNames) : '';
  if(SheetName.length==0) return [];//will stop when Sheets.SheetNames was undefined
  let Sheet = (typeof Sheets.Sheets[SheetName] !== 'undefined') ? Sheets.Sheets[SheetName] : [];
  return Sheet;
}
const getColumn = function(target,column){
  const eye = new RegExp('^'+column,'i');
  let Sheet = getWBp(target);
  var Lookout = Object.keys(Sheet).filter( (c)=>eye.test(c) );
  return Lookout.map( (r)=>Sheet[r].v );
}
const getColumns = function(target,columns){
  let values = [];
  columns.forEach((column, i) => {
    values.push( getColumn(target,column) );
  });
  return values;
}

const getSheetType = function(target){
  let Sheet = getWBp(target);
  let fp = {
    'newcellhist':{},
    'newcellsubs':{},
    'oldcellhist':{},
    'oldcellsubs':{},
    'isnew':false,
    'isold':false
  };
  fp.newcellhist = testType(Sheet,scope.getNewCellHistFingerprint());
  fp.newcellsubs = testType(Sheet,scope.getNewCellSubsFingerprint());
  fp.oldcellhist = testType(Sheet,scope.getOldCellHistFingerprint());
  fp.oldcellsubs = testType(Sheet,scope.getOldCellSubsFingerprint());
  fp.isnew = (fp.newcellhist.likely && fp.newcellsubs.likely);
  // If the new form was not detected, assume the old form and be backward compatible.
  // Judge by Sheet['!ref']?
  //fp.isold = (!fp.isnew && fp.oldcellhist.likely && fp.oldcellsubs.likely);
  fp.isold = (!fp.isnew);
  return fp;
}
const testType = function(data,fp){
  let values = [];
  //Workbook or Sheets were unexpected.
  //Sheets were malformed.
  let isUndef = new Set( fp.map( (jetty)=>(typeof data[jetty] === 'undefined') ));
  fp.forEach((item, i) => {
    values.push( (typeof data[item] === 'undefined') ? 0 : data[item].v );
  });
  return {'likely':!isUndef.has(true),'values':values};
}

const getDigest = function(uri){
  let readExcel = [];
  uri.forEach((addr, i) => {
    let SheetType = getSheetType(addr);
    //console.log(addr); console.log(SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    if (!SheetType.isnew && !SheetType.isold) {
      // Maybe the sheet name is unexpected.
      // Maybe the sheet is not a quote.
      console.log(addr,SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    } else {
      readExcel.push(
        (SheetType.isnew) ? {'sheet':addr,'age':'new','total':pickLatest(SheetType.newcellhist.values)} :
        (SheetType.isold) ? {'sheet':addr,'age':'old','total':pickLatest(SheetType.oldcellhist.values)} :
                            {'sheet':i,'addr':addr,'error':'Irregular exception error: getDigest'}
      );
    }
  });
  return readExcel;
}
const iterableField = (data,values,field) => {
  for(let k=1;k<field.length;k++){
    for (const [key,jetty] of Object.entries(field[k]))
      values[k][key] = (typeof data[jetty] === 'undefined') ? values[k][key] : data[jetty].v;
  }
  return field;
}
const getFieldValues = (data,v,xy) => {//console.log(JSON.stringify(v));console.log(JSON.stringify(xy));
  v.basic.para = iterableField(data,[null,v.basic.para],[null,xy.basic.para]);
  v.basic.prof = iterableField(data,[null,v.basic.prof],[null,xy.basic.prof]);
  v.mat.para  = iterableField(data,[null, v.mat.para],[null, xy.mat.para]);  v.mat.prof  = iterableField(data, v.mat.prof , xy.mat.prof );
  v.vmat.para = iterableField(data,[null,v.vmat.para],[null,xy.vmat.para]);  v.vmat.prof = iterableField(data, v.vmat.prof, xy.vmat.prof);
  v.proc.para = iterableField(data,[null,v.proc.para],[null,xy.proc.para]);  v.proc.prof = iterableField(data, v.proc.prof, xy.proc.prof);
  v.pack.para = iterableField(data,[null,v.pack.para],[null,xy.pack.para]);  v.pack.prof = iterableField(data, v.pack.prof, xy.pack.prof);
  v.tally.para = iterableField(data,[null,v.tally.para],[null,xy.tally.para]);
  v.tally.prof = iterableField(data,[null,v.tally.prof],[null,xy.tally.prof]);
  return v;
}
const iterablePage = (target,fields,cells) => {
  let Sheet = getWBp(target);
  for(let i in cells)
    fields[i] = getFieldValues(Sheet,fields[i],cells[i]);
  return fields;
}
const dumpExcel = function(uri){
  let readExcel = [];
  let relativity = new Map();
  uri.forEach((addr, i) => {
    relativity.set(i,addr);
    let template = scope.initForm();console.log(JSON.stringify(template.setOldFormDefault));console.log(JSON.stringify(template.setOldFormDefault));
    let SheetType = getSheetType(addr);//console.log(addr);console.log(JSON.stringify(scope.setOldFormDefault()));console.log(JSON.stringify(scope.getOldCellPositions()));
    if (!SheetType.isnew && !SheetType.isold) {
      // Maybe the sheet name is unexpected.
      // Maybe the sheet is not a quote.
      console.log(addr,SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    } else {
      readExcel.push(
        (SheetType.isnew) ? Object.assign( {},{'sheet':i,'age':'new'}, iterablePage(addr,scope.setNewFormDefault(),scope.getNewCellPositions()) ) :
        (SheetType.isold) ? Object.assign( {},{'sheet':i,'age':'old'}, iterablePage(addr,scope.setOldFormDefault(),scope.getOldCellPositions()) ) :
                            {'sheet':i,'addr':addr,'error':'Irregular exception error: dumpExcel'}
      );
    }
  });
  return readExcel;
}

const pickLatest = (vals) => (vals.length==0) ? 0 : (vals[0]>0) ? vals[0] : pickLatest(vals.slice(1));
const readCellValue = (data,jetty) => (typeof data[jetty] === 'undefined') ? 0 : data[jetty].v;

module.exports.getColumn = getColumn;
module.exports.getDigest = getDigest;
module.exports.dumpExcel = dumpExcel;
