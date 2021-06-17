var coplay = [];
coplay.push('H:\\PURCHASING\\02 QUOTES\\01 MATERIAL & COMPONENT Suppliers');
coplay.push('H:\\PURCHASING\\02 QUOTES\\02 MOLDED PART Suppliers');
const URIlist = 'C:\\Users\\kaoki\\Desktop\\current-parts.csv';
const URIColumn = 'G';
const SheetNamesVariants = [/^Sheet\d$/,/^Return form\s?\(\d\)$/];
const includeFiles = [/01 Current Quote.+xlsx?$/];
const excludeFiles = [/SERVICE|BUILDOUT|~/];
const dependencies = ['D:\\node-v14.16.0-win-x64\\xlsx'];
const dbKeyDefCol = { // [#Column Name#,#Hash Key#,#_default_#,#_cell pos_#]
  "Referrer" : [
    ['File Path','',null,null]
  ],
  "basic.para" : [
    ["Part Number","pnum"],         ["Part Name","pnam"],           ["Quote Number","qnum"],
    ["Vendor Quote Number","vqnum"],["Vendor Part Number","vpnum"]
  ],
  "basic.prof" : [
    ["Effective Date","fdate"],     ["Quoted Date","qdate"],        ["Vendor Name","vnam"],
    ["Sales Rep","vrep"],           ["Model Code","model"]
  ],
  "mat.para" : [
    ["Part Weight","weight"]
  ],
  "mat.prof" : [
    ["WT","_wt"],
    ["Grade"     ,"_grade"    ],["Material","_type" ],["Description","_desc"],
    ["Unit Price","_unit_cost"],["Ratio"   ,"_ratio"],["QTY"        ,"_qty" ],
    ["Subtotal","_subtot"]
  ],
  "vmat.para" : [
  ],
  "vmat.prof" : [
    ["WT","_wt"],
    ["Grade"     ,"_grade"    ],["Material","_type" ],["Description","_desc"],
    ["Unit Price","_unit_cost"],["Ratio"   ,"_ratio"],["QTY"        ,"_qty" ],
    ["Subtotal","_subtot"]
  ],
  "proc.para" : [
  ],
  "proc.prof" : [
    ['',''],
    ["Process"   ,"_type"      ],["Tool"      ,"_machine"   ],["Description","_desc"    ],
    ["Cycle Time","_cycle_time"],["Press Rate","_press_rate"],["Cavities"   ,"_cavities"],
    ["Subtotal","_subtot"]
  ],
  "pack.para" : [
  ],
  "pack.prof" : [
    ['',''],
    ["Pack"      ,"_id"      ],["Tool"      ,"_machine"   ],["Description","_desc"],
    ["Unit Price","_mat_cost"],["Labor Rate","_labor_cost"],["QTY"        ,"_qty" ],
    ["Subtotal","_subtot"]
  ],
  "tally.para" : [
    ["SG&A %","sga%"],["Profit %","profit%"]
  ],
  "tally.prof" : [
    ["Current Total","total"]                       ,
    ["Material Sub","mat_subtot"]                   ,
    ["Vendor Material Sub","vmat_subtot"]           ,
    ["Process Sub","proc_subtot"]                   ,
    ["Pack Sub","pack_subtot"]                      ,
    ["SG&A Sub","sga"]                              ,
    ["Profit Sub","profit"]                         ,
    ["Packing Sub","packing"]                       ,
    ["Previous Total","ptotal"]                     ,
    ["Previous Material Sub","mat_psubtot"]         ,
    ["Previous Vendor Material Sub","vmat_psubtot"] ,
    ["Previous Process Sub","proc_psubtot"]         ,
    ["Previous Pack Sub","pack_psubtot"]            ,
    ["Previous SG&A Sub","psga"]                    ,
    ["Previous Profit Sub","pprofit"]               ,
    ["Previous Packing Sub","ppacking"]
    //"matvmat_subtot",  "process_subtot",
  ]
};
console.log( JSON.stringify(
  {
    "projectrootfolders" : [
      "H:\\PURCHASING\\02 QUOTES\\01 MATERIAL & COMPONENT Suppliers",
      "H:\\PURCHASING\\02 QUOTES\\02 MOLDED PART Suppliers"
    ],
    "URIlist"   : "C:\\Users\\kaoki\\Desktop\\current-parts.csv",
    "URIColumn" : "G",
    "SheetNamesVariants" : ["/^Sheet\d$/","/^Return form\s?\(\d\)$/"],
    "includeFiles" : includeFiles,
    "excludeFiles" : excludeFiles,
    "dependencies" : dependencies,// Maybe for the future feature
    "dbKeyDefCol"  : [
      "Referrer",
      "basic.para","basic.prof",
       "mat.para",     "mat.prof",
      "vmat.para",    "vmat.prof",
      "proc.para",    "proc.prof",
      "pack.para",    "pack.prof",
      "tally.para","tally.prof"
    ],
    "dbDefCol"     : dbKeyDefCol
  }
) );
