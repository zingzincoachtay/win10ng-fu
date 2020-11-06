SET INDEX=%USERPROFILE%\DESKTOP\fileIndex.csv

:: https://stackoverflow.com/questions/52564694/how-do-i-make-certutil-recursively-go-into-my-folders-and-subfolders
::
for /r H:\ %f in (*) do (
  (
  certutil -hashfile "%f" MD5 | find /V ":"
  <nul set /p ".= \tH:\%f\t%~nxf\t%~zf Bytes"
  ) >> %INDEX%
)
