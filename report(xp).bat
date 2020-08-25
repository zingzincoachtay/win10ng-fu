@ECHO OFF

ECHO Disclaimer: Only the internal commands (installed with Windows system) are executed.
ECHO Four programs: SET
ECHO    (in order): REG EXPORT (a new text file in Desktop)
ECHO              : COPY (the text file is copied to my USB
ECHO              : DEL (the text file is erased from Desktop)
ECHO.
REM http://www.computerhope.com/reg.htm

ECHO I am looking for specific information about programs installed on your computer.
ECHO Six values: "Name" of each program
ECHO           : "Name" of author of each progarm
ECHO           : "Version" of each program
ECHO           : "Website" for each program
ECHO           : "InstallState" of each program
ECHO           : "Language" which the each program is run
ECHO.
REM http://stackoverflow.com/questions/673233/wmi-installed-query-different-from-add-remove-programs-list



SET list="C:\Users\%username%\Desktop\programs1-%username%.txt"

REM REG QUERY HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Uninstall /s > %list%
REG EXPORT HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Uninstall %list%
REM (this should be an identical list) REG EXPORT HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall %list%
REM REG EXPORT HKEY_CLASSES_ROOT\Installer\Products %list%

copy %list% "%CD%\list\1%username%(xp).txt" /V

del %list%

ECHO Task is complete!
ECHO.

PAUSE
