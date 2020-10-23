@echo off

echo[
echo Create CSV file of all quotes in file
echo Utilize Grep (GNUWin) package
echo Utilize Sed (GNUWin) package
rem Linux `grep` is aliased to `alias grep='grep --colour=auto'` in most distributions.
rem https://www.howtogeek.com/496056/how-to-use-the-grep-command-on-linux/
rem Windows Command Prompt does not support coloration, but I retain it for cross-compatibility.
rem Also, Windows filenames do not distinguish cases, `-i` for all queries.
set grep=%USERPROFILE%\Documents\coreutils\bin\grep.exe --colour=auto -i
rem `sed` does not use the extended regular expressions like Perl
rem Would require escaping `{` `}` `+` `(` `)` and `?`
:: SED does in-place replace (-i) and I need no backup file.
:: GNUWin Sed creates a temporary file before overwriting.
:: However, this temporary file is not deleted automatically at the end of execution.
set sed=%USERPROFILE%\Documents\coreutils\bin\sed.exe -E

set today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)
echo Today's Timestamp %today%

ECHO[
echo First, concatenate (Linux:cat-equivalent) all lists of the same context
echo Then, filter through only XLS(X) files
rem Would love to use Perl to do grep + sed, but

set spit=%USERPROFILE%\Desktop\current-parts %today%.csv
:: 
:: :: Only include EXCEL files under "01 Current Quote"
:: :: Exclude files for "SERVICE ONLY" parts and "BUILDOUT" parts
ECHO[
ECHO File is output to %spit%
type "%~1" "%~2" | %grep% "01 Current Quote" | %grep% "\.xlsx\?$" | %grep% -v "SERVICE ONLY" | %grep% -v "BUILDOUT" > "%spit%"

::        (HASH)           ((supplier-(part no) (part desc)-subfolder)-(file)(.ext))    vendor_part no_part desc_HASH_PATH_folder_ext
%sed% "s/^([A-z0-9]{32})\s+((.+\\([^\\]+)\\([^\\ ]+?) ([^\\]+)\\[^\\]+\\)([^\\]+)(\.xlsx?))$/\4\t\5\t\6\t\1\t\3\t\7\8/" "%spit%" > "%USERPROFILE%\Desktop\current-parts.csv"
:: :: Instead of in-place edit and leaving a temporary file at every execution,
:: ::     write into a common file to be shared with Excel,
:: ::     then copy the common file to dated file.
copy "%USERPROFILE%\Desktop\current-parts.csv" "%spit%"

::
:: :: Third argument is optional
:: https://stackoverflow.com/questions/830565/how-can-i-check-if-an-argument-is-defined-when-starting-calling-a-batch-file
:: :: Third argument is the output file. If specified, copy the common file to the destination.
::
:: :: [%~3]==[] did not work with a path with whitespace.
:: :: if not [%~3]==[] ( set spit=%~3 )
if not [%3]==[] ( copy "%USERPROFILE%\Desktop\current-parts.csv" "%~3" )

echo[
pause
