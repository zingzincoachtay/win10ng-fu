@echo off
echo[
echo The day starts with checking for changes in the project folders.
echo The data files may be updated or new files may have been added yesterday.

rem https://oscarliang.com/change-date-ouput-format-windows-batch-script/
echo[
rem set today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)%Time:~0,2%-%Time:~3,2%-%Time:~6,2%
set today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)
echo Today's Timestamp %today%

echo[
echo Use either the md5deep package or md5sum package
set md5=C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe
echo[
echo Set directories to check
set here[1]="H:PURCHASING\02 QUOTES\01 MATERIAL & COMPONENT Suppliers"
set here[2]="H:PURCHASING\02 QUOTES\02 MOLDED PART Suppliers"
echo[
echo Set output files
set this[1]="C:\Users\kaoki\Desktop\02quotes01 %today%.sum"
set this[2]="C:\Users\kaoki\Desktop\02quotes02 %today%.sum"

for /l %%k in (1,1,2) do (
  call :hashfile %%this[%%k]%% %%here[%%k]%%
)

echo[
set CR="C:\Users\kaoki\Desktop\08cost reduction %today%.sum"
if not exist %CR% (
  echo Moving along.. Digesting any updates to the cost reduction proposal estimates.
  %md5%    "H:PURCHASING\08 COST REDUCTION STUFF\*"         |          sort /+35 > %CR%
  %md5% -r "H:\PURCHASING\08 COST REDUCTION STUFF\IMPACT CALCULATOR" | sort /+35 >> %CR%
  echo ...Done
)

echo[
echo Reminder -- next step, Drag and Drop "*.sum" files from yesterday to the respective digests to compare changes and track the progress.

pause
goto :EOF

:hashfile
if not exist %1 (
  echo Digesting all quotes in %2
  %md5% -r %2 | sort /+35 > %1
  echo ...Done
)
exit /b
