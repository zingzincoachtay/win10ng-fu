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
set here[1]="H:"
set here[2]="H:"
set here[3]="H:"
echo[
echo Set output files
set this[1]="C:"
set this[2]="C:"
set this[3]="C:"

for /l %%k in (1,1,3) do (
  call :hashfile %%this[%%k]%% %%here[%%k]%%
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
