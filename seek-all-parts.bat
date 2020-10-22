@echo off

echo[
echo Create CSV file of all quotes in file
echo Utilize Grep (GNUWin) package
echo Utilize Sed (GNUWin) package
rem Linux `grep` is aliased to `alias grep='grep --colour=auto'` in most distributions.
rem https://www.howtogeek.com/496056/how-to-use-the-grep-command-on-linux/
rem Windows Command Prompt does not support coloration, but I retain it for cross-compatibility.
rem Also, Windows filenames do not distinguish cases, `-i` for all queries.
set grep=C:\Users\kaoki\Documents\coreutils\bin\grep.exe --colour=auto -i
rem `sed` does not use the extended regular expressions like Perl
rem Would require escaping `{` `}` `+` `(` `)` and `?`
set sed=C:\Users\kaoki\Documents\coreutils\bin\sed.exe -i -E

echo[
echo First, concatenate (Linux:cat-equivalent) all lists of the same context
echo Then, filter through only XLS(X) files
rem Would love to use Perl to do grep + sed, but alas

rem Third argument is optional
rem https://stackoverflow.com/questions/830565/how-can-i-check-if-an-argument-is-defined-when-starting-calling-a-batch-file
rem Third argument is the output file. If unspecified, defaults to spit out file on Desktop

set spit=%USERPROFILE%\Desktop\all-parts.csv
if not [%~3]==[] ( set spit=%~3 )
rem Only include EXCEL files under "01 Current Quote"
rem Exclude files for "SERVICE ONLY" parts and "BUILDOUT" parts
type "%~1" "%~2" | %grep% "01 Current Quote" | %grep% "\.xlsx\?$" | %grep% -v "SERVICE ONLY" | %grep% -v "BUILDOUT" > %spit%

rem       (HASH)  ((supplier-(part no) (part desc)-subfolder)-(file)(.ext))  vendor_part no_part desc_HASH_PATH_folder_ext
set quotes=%USERPROFILE%\Desktop\Daily Project Progresses by HASH\quotes
%sed% "s/^([A-z0-9]{32})\s+((.+\\([^\\]+)\\([^\\ ]+?) ([^\\]+)\\[^\\]+\\)([^\\]+)(\.xlsx?))$/\4\t\5\t\6\t\1\t\3\t\7\8/" %spit%

echo[
pause
