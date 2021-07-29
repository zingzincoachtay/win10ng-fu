const pc = require('process');//console.log(pc.argv);
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const getAllFiles = (root, files) => {
  let contents = fs.readdirSync(root);
  files = files || [];

  contents.forEach(function(content) {
    if (fs.statSync(root + "\\" + content).isDirectory())
      files = getAllFiles(root + "\\" + content, files);
    else
      files.push(path.join(root, "\\", content));
  });
  return files;
}
const isMatch = (o,pos,neg,flags = []) => {  // `and` operand, default
  for(let rule of pos)
    flags.push(  rule.test(o) );
  for(let rule of neg)
    flags.push( !rule.test(o) );
  return !flags.includes(false);
}
const essentialFiles = (files, irules, xrules) => files.filter( (file)=>isMatch(file,irules,xrules) );
const expressions = (args,expr,last) => {
    for(let ex of expr){
        if( typeof args[ex] !== 'undefined' && !operands(last) ){
          // allow repeat of '-iname's, but avoids merging '-iname' and '-not -iname'
          last = ex;
        } else if ( /^\-/.test(ex) && operands(last) ){
          delete args[last];
          last = `${last} ${ex}`;
          args[last] = [];
        } else if ( /^\-/.test(ex) ) {
          last = ex;
          args[last] = [];
        } else {
          args[last].push( ex );
        }
        // please accept multiple `-iname`s
        if(last.length == 0)  console.log("Review the command.");
    }
    args.irules = makerules([],args,Object.keys(args).filter( (e)=>/^(\-i?name|\-i?regex)$/.test(e) ));
    args.xrules = makerules([],args,Object.keys(args).filter( (e)=>/^\-not (\-i?name|\-i?regex)$/.test(e) ));
    return args;
}
const makerules = (rules,ruble,rulekeys) => {
  for(let rulekey of rulekeys){
      let rexp = ruble[rulekey].map( regexp_safe );  // wildcard '*' is also trimmed, if enclosing
      let     patterns = rexp.map( (r)=>(new RegExp(r                     ,/\-i/.test(rulekey) ? "i" : "")) );
            if ( /\-i?name/.test(rulekey) || /\-not\s+\-i?name/.test(rulekey) ){
              patterns = rexp.map( (r)=>(new RegExp(r.replace(/\*/g,".$1"),/\-i/.test(rulekey) ? "i" : "")) );
      //} else if ( /\-i?regex/.test(rulekey) || /\-not\s+\-i?regex/.test(rulekey) ) {
            }
      rules.push( ...patterns );
  }
  return rules;
}
const importable = (_ws,f) => xlsx.book_new(_ws);
const stringify = (_o,f) => {
  if( /json/.test(f) )  return JSON.stringify(o);
  if( /txt/.test(f) )  return xlsx.sheet_to_csv( xlsx.json_to_sheet(_o),{FS:",",forceQuotes:false});
  if( /csv/.test(f) )  return xlsx.sheet_to_csv( xlsx.json_to_sheet(_o),{FS:",",forceQuotes:true});
  if( /sql/.test(f) )  return o2sql(_o);
  if( /html|xml/.test(f) )  return xlsx.sheet_to_html( xlsx.json_to_sheet(_o));
  return _o;
}
const operands = (e) => /^(\-not|\-and|\-a|\-or?)$/.test(e);
const commands = (e) => /^(\-print0?|\-ls|\-empty|\-true|\-false|\-delete)$/.test(e);
const regexp_safe = (rule) => {
  let rexp_str = (typeof rule !== 'string') ? rule.toString() : rule;
  let rexp_substr = rule.match(/^([\W\{])(.+)[\1\}]$/);
  return (rexp_substr !== null) ? rexp_substr[2] : rexp_str;
}
const exists = (e) => (typeof e !== 'undefined');

let roots = [pc.argv[2]];
let files = [];
let args = expressions({},pc.argv.slice(3),'');
console.log(args);

  for(let root of roots)
    files = getAllFiles(root,files);

console.log("N(Found): "+files.length);

let items = essentialFiles( (args["-type"][0] == "f") ? files : files.filter( (e)=>fs.statSync(e).isDirectory() ),args.irules,args.xrules);
console.log(items);

Object.keys(args).map( (e)=>/\-json|\-txt|\-csv|\-sql|\-xml|\-html/.test(e) ).forEach((item, i) => {
  console.log( stringify(items,item) );
});

if( /xlsx/.test(f) )  return o2xlsx(_o,{sep:",",quote:""});

Object.keys(args).map( (e)=>/\-xlsx?/.test(e) ) ).forEach((item, i) => {
  let extension = e.match(/\-(.+)/);
  xlsx.writeFile( xlsx.book_new(xlsx.json_to_sheet(o)),"result"+extension[1] );
});
