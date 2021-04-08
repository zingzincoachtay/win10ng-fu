@ECHO OFF
SETLOCAL ENABLEEXTENSIONS

:: SET TARGET=H:\PURCHASING\02 QUOTES\02 MOLDED PART Suppliers\Par 4\S22008210 Ring Cover Front\01 Current Quote\S22008210  Ring Cover Front.xls
SET TARGET=H:\PURCHASING\02 QUOTES\02 MOLDED PART Suppliers\Fuji Component Parts\S87004990 PAD RF OBK SUN C LH-GC7\01 Current Quote\S87004990 PAD FR OBK SUN C RH, LH--GC7.xlsx

:: I46, R46, or AA66
SET QREVAMP=I46
SET QLEGACY=A1

SET ZIP=D:\7za.exe
SET XML=D:\xml.exe
SET WC=%USERPROFILE%\Desktop\GetGnuWin32\gnuwin32\bin\wc.exe -l
:: CALL "%USERPROFILE%\Documents\tracking_target.bat"

%ZIP% e -so "%TARGET%" xl/worksheets/sheet1.xml | %XML% sel -t -v "/worksheet"
ECHO[
:: %ZIP% e -so "%TARGET%" xl/sharedStrings.xml
ECHO[

:: Different Excel types
::   xlsx -
::   xls  - CAB type archive, and all files in the root are binary; can't read.
::   odf  -
