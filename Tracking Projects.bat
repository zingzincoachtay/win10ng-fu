@echo off
echo The day starts with checking for changes in the project folders.
echo The data files may be updated or new files may have been added yesterday.
echo[

rem https://oscarliang.com/change-date-ouput-format-windows-batch-script/



set today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)%Time:~0,2%-%Time:~3,2%-%Time:~6,2%

set today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)

echo[
set Qone="C:\Users\kaoki\Desktop\02quotes01 %today%.sum"
if not exist %Qone% (
echo Digesting all quotes in "MATERIAL & COMPONENT Suppliers"
C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe -r "H:PURCHASING\02 QUOTES\01 MATERIAL & COMPONENT Suppliers" | sort /+35 > %Qone%
echo ...Done
)
echo[
set Qtwo="C:\Users\kaoki\Desktop\02quotes02 %today%.sum"
if not exist %Qtwo% (
echo Digesting all quotes in "MOLDED PART Suppliers"
C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe -r "H:PURCHASING\02 QUOTES\02 MOLDED PART Suppliers" | sort /+35 > %Qtwo%
echo ...Done
)

echo[
set CR="C:\Users\kaoki\Desktop\08cost reduction %today%.sum"
if not exist %CR% (
echo Moving along.. Digesting any updates to the cost reduction proposal estimates.
C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe  "H:PURCHASING\08 COST REDUCTION STUFF\*" | sort /+35 > %CR%
C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe -r "H:\PURCHASING\08 COST REDUCTION STUFF\IMPACT CALCULATOR" | sort /+35 >> %CR%
echo ...Done
)

echo[
echo Reminder -- next step, Drag and Drop "*.sum" files from yesterday to the respective digest checkers to verify changes and track the progress.


pause
