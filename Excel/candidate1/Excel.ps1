// PROBLEM 1 - $WS.CELLS(#,#).VALUE2 ONLY TAKES INTEGER VALUES FOR COLUMNS, NOT ALPHABETS.
//              APPLICATION IS CALLED A HASHTABLE
$COL = @{A=1,B=2,C=3,D=4,E=5,F=6,G=7,H=8,I=9,J=10,K=11,L=12,M=13,N=14,O=15,P=16,Q=17,R=18,S=19,T=20,U=21,V=22,W=23,X=24,Y=25,Z=26,AA=27,AB=28}

// https://www.concurrency.com/blog/july-2019/basics-of-powershell-excel-json-parsing

$Excel = new-object -comobject excel.application
>> $Workbook = $Excel.Workbooks.Open("H:\PURCHASING\02 QUOTES\01 MATERIAL & COMPONENT Suppliers\Heritage\S13009350 REINF R CP HR3\01 Current Quote\S13009350 REINF R CP HR3.xlsx")

$Worksheet = $Workbook.Worksheets.Item("Sheet1")
$Worksheet.activate()

$Worksheet.Cells(1,$COL['R']).Value2
