@ECHO OFF

ECHO Disclaimer: Only the internal commands (installed with Windows system) are executed.
ECHO Four programs: SET
ECHO              : WMIC (a new text file in Desktop)
ECHO              : COPY (the text file is copied to my USB
ECHO              : DEL (the text file is erased from Desktop)
ECHO.
REM http://www.computerhope.com/wmic.htm

ECHO I am looking for specific information about programs installed on your computer.
ECHO Six values: "Name" of each program
ECHO           : "Name" of author of each progarm
ECHO           : "Version" of each program
ECHO           : "Website" for each program
ECHO           : "InstallState" of each program
ECHO           : "Language" which the each program is run
ECHO.
REM http://answers.microsoft.com/en-us/windows/forum/windows_vista-performance/what-is-the-dos-command-for-displaying-all/094b4418-19f3-435b-87be-6957f1be0944?msgId=444c8982-128a-4b42-89de-9e885901fed8
REM http://www.windows-commandline.com/current-logged-in-user-name-command/
REM http://blogs.msdn.com/b/oldnewthing/archive/2005/01/28/362565.aspx


REM wmic /output:"mine.txt" csproduct list full
REM wmic /output:"mine.txt" computersystem list full
REM wmic /output:"mine.txt" bios list full
REM wmic /output:"mine.txt" softwareelement list full
REM wmic /output:"mine.txt" softwarefeature list full


SET list="C:\Users\%username%\Desktop\programs-%username%.txt"

wmic /output:%list% product get name,vendor,version,description,installstate

if not exist "%CD%\list\" (
  ECHO Please create the `list` folder here: %CD%
  PAUSE
) else (
  copy %list% "%CD%\list\%username%.txt" /V
  del %list%
)


ECHO Task is complete!
ECHO.

PAUSE
