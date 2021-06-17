ECHO Utilize FindUtils (GNUWin) package
SET find=%USERPROFILE%\Documents\coreutils\bin\find.exe

ECHO Utilize CoreUtils (GNUWin) package
SET hash=%USERPROFILE%\Documents\coreutils\bin\md5sum.exe

:: Linux `grep` is aliased to `alias grep='grep --colour=auto'` in most distributions.
:: https://www.howtogeek.com/496056/how-to-use-the-grep-command-on-linux/
:: Windows Command Prompt does not support coloration, but I retain it for cross-compatibility.
:: Also, Windows filenames do not distinguish cases unless specified, `-i` for all queries.
ECHO Utilize Grep (GNUWin) package
SET grep=%USERPROFILE%\Documents\coreutils\bin\grep.exe --colour=auto -i

:: `sed` does not use the extended regular expressions like Perl
:: Would require escaping `{` `}` `+` `(` `)` and `?`
:: SED does in-place replace (-i) and I need no backup file.
:: GNUWin Sed creates a temporary file before overwriting.
:: However, this temporary file is not deleted automatically at the end of execution.
ECHO Utilize Sed (GNUWin) package
SET sed=%USERPROFILE%\Documents\coreutils\bin\sed.exe -E

:: `find` did not follow some paths. Perhaps, a permission trouble.
:: An alternative to `find` + `md5sum`, md5deep has a built-in recursive mode.
:: While the output is slightly different (w/o single \W character denoting the file
::   type at the head of hash value and file paths), the difference can be nullified
::   using the RegExp.
ECHO Utilize md5deep (http://md5deep.sourceforge.net) package
SET md5=%USERPROFILE%\Documents\md5deep-4.4\md5deep64.exe -r -e -k -o -f

:: https://oscarliang.com/change-date-ouput-format-windows-batch-script/
:: SET today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)%Time:~0,2%-%Time:~3,2%-%Time:~6,2%
SET today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)
