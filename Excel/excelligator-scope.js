const masked = require('./excelligator-masked.js');
//console.log(JSON.stringify(masked.getSubsNewFormDefault()));console.log(JSON.stringify(masked.getSubsNewFormPosition()));
let NewFormVisibleCells = masked.SubsNewForm0Position;
//console.log(JSON.stringify(masked.getSubsOldFormDefault()));console.log(JSON.stringify(masked.getSubsOldFormPosition()));
let OldFormVisibleCells = masked.SubsOldForm0Position;

const MakerColumn = 'A';
const PartColumn  = 'B';
// columns where values should always be available
// = ['AA46','R46','I46'];
const NewHistCell = [
  NewFormVisibleCells[0].tally.prof[1].total,
  NewFormVisibleCells[1].tally.prof[1].total,
  NewFormVisibleCells[2].tally.prof[1].total
];
// = [46,40,31];
const NewSubsCell = [
  NewFormVisibleCells[2].tally.prof[1].total,
  NewFormVisibleCells[2].tally.prof[1].proc_subtot,
  NewFormVisibleCells[2].tally.prof[1].mat_subtot
];
// = ['I69','J69'];
const OldHistCell = [
  OldFormVisibleCells[0].tally.prof[1].total,
  OldFormVisibleCells[0].tally.prof[1].ptotal
];
// = [69,48,35,25];
const OldSubsCell = [
  OldFormVisibleCells[0].tally.prof[1].total,
  OldFormVisibleCells[0].tally.prof[1].proc_subtot,
  OldFormVisibleCells[0].tally.prof[1].vmat_subtot,
  OldFormVisibleCells[0].tally.prof[1].mat_subtot
];

module.exports = {
  getProjectURI : masked.projectfolders,
  getIncludeRegex : masked.includeFilesRegex,
  getExcludeRegex : masked.excludeFilesRegex,
  getDependencies : masked.loadDependencies,
  getURITarget : masked.osURIlist,
  getURIColumn : masked.URIColumn,
  initSpread : {'maker':MakerColumn,'ospart':PartColumn,'target':masked.URIColumn},
  getCellFingerprint: {
    "getNewCellHistFingerprint": NewHistCell,
    "getNewCellSubsFingerprint": NewSubsCell,
    "getOldCellHistFingerprint": OldHistCell,
    "getOldCellSubsFingerprint": OldSubsCell
  },
  getNewCellHistFingerprint: NewHistCell,
  getNewCellSubsFingerprint: NewSubsCell,
  getOldCellHistFingerprint: OldHistCell,
  getOldCellSubsFingerprint: OldSubsCell,
  initForm : JSON.stringify({// Must Deep Copy <!-- https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/ -->
    "setNewFormDefault"  : masked.SubsNewForm0Malloc,
    "getNewCellPositions": masked.SubsNewForm0Position,
    "setOldFormDefault"  : masked.SubsOldForm0Malloc,
    "getOldCellPositions": masked.SubsOldForm0Position,
  }),
  setNewFormDefault   : masked.SubsNewForm0Malloc,
  getNewCellPositions : masked.SubsNewForm0Position,
  setOldFormDefault   : masked.SubsOldForm0Malloc,
  getOldCellPositions : masked.SubsOldForm0Position,
  setSheetNamesVariants : masked.SheetNamesVariants,
  getDatabaseBlueprint  : masked.dbBlueprint,
  importJSONdata  : masked.importJSONdata
}
