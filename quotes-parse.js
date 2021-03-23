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
      if (SheetType.isnew) {
        //readExcel.push({'sheet':addr,'total':pickLatest(SheetType.newcellhist.values),'sub':SheetType.newcellsubs.values,'age':'new'});
        readExcel.push({'sheet':addr,'age':'new','total':pickLatest(SheetType.newcellhist.values)});
        //console.log({'sheet':addr,'total':pickNonzero(SheetType.newcellhist),'sub':SheetType.newcellsubs});
      }
      if (SheetType.isold) {
        //readExcel.push({'sheet':addr,'total':pickLatest(SheetType.oldcellhist.values),'sub':SheetType.oldcellsubs.values,'age':'old'});
        readExcel.push({'sheet':addr,'age':'old','total':pickLatest(SheetType.oldcellhist.values)});
        //console.log({'sheet':addr,'total':pickNonzero(SheetType.oldcellhist),'sub':SheetType.oldcellsubs});
      }
    }
  });
  return readExcel;
}
const theIterableField = (data,field,values) => {
  for(let k=1;k<field.length;k++){
    let profile = field[k];
    for (const [key,jetty] of Object.entries(profile))
      values[k][key] = (typeof data[jetty] === 'undefined') ? values[k][key] : data[jetty].v;
  }
  return field;
}
const getFieldValues = (data,values,todo) => {
  values.head.pnum = (typeof data[todo.head.pnum] === 'undefined') ? values.head.pnum : data[todo.head.pnum].v;//"C7"
  values.head.pnam = (typeof data[todo.head.pnam] === 'undefined') ? values.head.pnam : data[todo.head.pnam].v;//"I7"
  values.basic.fdate = (typeof data[todo.basic.fdate] === 'undefined') ? values.basic.fdate : data[todo.basic.fdate].v;//"E12&F12&G12"
  values.basic.qdate = (typeof data[todo.basic.qdate] === 'undefined') ? values.basic.qdate : data[todo.basic.qdate].v;//"E13&F13&G13"
  values.basic.vnam  = (typeof data[todo.basic.vnam]  === 'undefined') ? values.basic.vnam  : data[todo.basic.vnam ].v;//"E14"
  values.basic.vrep  = (typeof data[todo.basic.vrep]  === 'undefined') ? values.basic.vrep  : data[todo.basic.vrep ].v;//"I14"
  values.basic.model = (typeof data[todo.basic.model] === 'undefined') ? values.basic.model : data[todo.basic.model].v;//"E15"
  let ghost = {};
  ghost = theIterableField(data,[null, todo.mat.para],[null, values.mat.para]);
  values.mat.para  = ghost[1];
  values.mat.prof  = theIterableField(data, todo.mat.prof, values.mat.prof);
  ghost = theIterableField(data,[null,todo.vmat.para],[null,values.vmat.para]);
  values.vmat.para = ghost[1];
  values.vmat.prof = theIterableField(data,todo.vmat.prof,values.vmat.prof);
  ghost = theIterableField(data,[null,todo.proc.para],[null,values.proc.para]);
  values.proc.para = ghost[1];
  values.proc.prof = theIterableField(data,todo.proc.prof,values.proc.prof);
  ghost = theIterableField(data,[null,todo.pack.para],[null,values.pack.para]);
  values.pack.para = ghost[1];
  values.pack.prof = theIterableField(data,todo.pack.prof,values.pack.prof);
  values.latest["sga%"] = (typeof data[todo.latest["sga%"]] === 'undefined') ? values.latest["sga%"] : data[todo.latest["sga%"]].v;
  values.latest["profit%"] = (typeof data[todo.latest["profit%"]] === 'undefined') ? values.latest["profit%"] : data[todo.latest["profit%"]].v;
  values.latest.total = (typeof data[todo.latest.total] === 'undefined') ? values.latest.total : data[todo.latest.total].v;
  values.latest.mat_subtot  = (typeof data[todo.latest.mat_subtot]  === 'undefined') ? values.latest.mat_subtot  : data[todo.latest.mat_subtot].v;
  values.latest.vmat_subtot = (typeof data[todo.latest.vmat_subtot] === 'undefined') ? values.latest.vmat_subtot : data[todo.latest.vmat_subtot].v;
  values.latest.proc_subtot = (typeof data[todo.latest.proc_subtot] === 'undefined') ? values.latest.proc_subtot : data[todo.latest.proc_subtot].v;
  values.latest.pack_subtot = (typeof data[todo.latest.pack_subtot] === 'undefined') ? values.latest.pack_subtot : data[todo.latest.pack_subtot].v;
  values.latest.matvmat_subtot = (typeof data[todo.latest.matvmat_subtot] === 'undefined') ? values.latest.matvmat_subtot : data[todo.latest.matvmat_subtot].v;
  values.latest.process_subtot = (typeof data[todo.latest.process_subtot] === 'undefined') ? values.latest.process_subtot : data[todo.latest.process_subtot].v;
  values.latest.sga = (typeof data[todo.latest.sga] === 'undefined') ? values.latest.sga : data[todo.latest.sga].v;
  values.latest.profit = (typeof data[todo.latest.profit] === 'undefined') ? values.latest.profit : data[todo.latest.profit].v;
  values.latest.packing = (typeof data[todo.latest.packing] === 'undefined') ? values.latest.packing : data[todo.latest.packing].v;
  return values;
}
const iterableFields = (target,fields,cells) => {
  let Sheet = getWBp(target);
  for(let i in cells)
    fields[i] = getFieldValues(Sheet,fields[i],cells[i]);
  return fields;
}
const ExcelSwitch = (_para,_addr) => Object.assign(_para,
  (para.age == 'new') ? iterableFields(_addr,scope.setNewFormDefault(),scope.getNewCellPositions()) : iterableFields(_addr,scope.setOldFormDefault(),scope.getOldCellPositions())
);
const dumpExcel = function(uri){
  let readExcel = [];
  let relativity = new Map();
  uri.forEach((addr, i) => {
    relativity.set(i,addr);
    let SheetType = getSheetType(addr);
    //console.log(addr); console.log(SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    if (!SheetType.isnew && !SheetType.isold) {
      // Maybe the sheet name is unexpected.
      // Maybe the sheet is not a quote.
      console.log(addr,SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    } else {
      if (SheetType.isnew) {
        //readExcel.push({'sheet':addr,'total':pickLatest(SheetType.newcellhist.values),'sub':SheetType.newcellsubs.values,'age':'new'});
        readExcel.push( ExcelSwitch({'sheet':i,'age':'new'},addr) );
        //console.log({'sheet':addr,'total':pickNonzero(SheetType.newcellhist),'sub':SheetType.newcellsubs});
      }
      if (SheetType.isold) {
        //readExcel.push({'sheet':addr,'total':pickLatest(SheetType.oldcellhist.values),'sub':SheetType.oldcellsubs.values,'age':'old'});
        readExcel.push( ExcelSwitch({'sheet':i,'age':'old'},addr) );
        //console.log({'sheet':addr,'total':pickNonzero(SheetType.oldcellhist),'sub':SheetType.oldcellsubs});
      }
    }
  });
  return readExcel;
}

const pickLatest = (vals) => (vals.length==0) ? 0 : (vals[0]>0) ? vals[0] : pickLatest(vals.slice(1));
const readCellValue = (data,jetty) => (typeof data[jetty] === 'undefined') ? 0 : data[jetty].v;
const json2sheet = (o,h) => Excel.utils.json_to_sheet(o,{header:h});
const exportCSV = (o,colnames) => Excel.utils.sheet_to_csv(json2sheet(o,colnames), {FS:"\t",blankrows:false});

module.exports.getColumn = getColumn;
module.exports.getDigest = getDigest;
module.exports.dumpExcel = dumpExcel;
module.exports.exportCSV = exportCSV;
