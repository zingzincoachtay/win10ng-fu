@ECHO OFF
SET INDEX=%USERPROFILE%\DESKTOP\fileIndex.csv

:: https://stackoverflow.com/questions/52564694/how-do-i-make-certutil-recursively-go-into-my-folders-and-subfolders
:: https://stackoverflow.com/questions/52185375/windows-batch-file-format-certutil-output-and-filename-and-size-in-single-line
::   <nul set /p ".= %%~nxf\t%%~zf Bytes"
:: ECHO FILE  BYTE  HASH > %INDEX%
SET  "TAB=	"
ECHO FILE%TAB%HASH > %INDEX%
for /r C:\Users\kaoki\Desktop\lg\limited-map %%f in (*) do (
  (
  <nul set /p ".= %%f\%%~nxf%TAB%"
  certutil -hashfile "%%f" MD5 | find /V ":"
  ) >> %INDEX%
)
