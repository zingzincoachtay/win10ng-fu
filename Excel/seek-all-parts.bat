@ECHO OFF

ECHO[
ECHO Generate CHECKSUM of all files within the target directories

ECHO[
CALL "default-tools.bat"
CALL "tracking-masked.bat"
ECHO Today's Timestamp %today%

ECHO[
ECHO First, find files and execute a hash algorithm
ECHO Then, filter through only XLS(X) files
SET current=%USERPROFILE%\Desktop\%today% current-parts .csv
:: set exception=%USERPROFILE%\Desktop\%today% parts-exception .csv
SET spit=%USERPROFILE%\Desktop\current-parts.csv
SET hurl=%USERPROFILE%\Desktop\parts-exception.csv

%find% "" -type f  %xProject%  -exec %hash% "{}" ; >
%find% "%~2" -type f | %grep% -iv "01 Current Quote" | %grep% -iv "02 Previous Quotes" | %grep% -iv "03 Other Documents" | %grep% -iv "04 Service Quotes" | %grep% -i -e "current quote" -e "previous quote" -e "other document" -e "service quote" > "%hurl%"



::
:: :: Only include EXCEL files under "01 Current Quote"
:: :: Exclude files for "SERVICE ONLY" parts and "BUILDOUT" parts
ECHO[
COPY "%~1" "%current%"
DEL "%~1"
::        (HASH)           ((asb       (supplier)\(part no) +(desc)\subf    \)(part no)(file)(.ext))    vendor_part no_part desc_HASH_PATH_folder_ext
%sed% "s/^([A-z0-9]{32})\s+(([A-Z]:\\.+?\\([^\\]+)\\(\S+) +([^\\]+)\\[^\\]+\\)(\S+) +([^\\]+)\.xlsx?)$/\4\t\5\t\6\t\7\t\8\t\1\t\3\t\2/" "%current%" > "%spit%"
:: :: Instead of in-place edit and leaving a temporary file at every execution, GNUwin SED behavior,
:: ::     write into a common file to be shared with Excel,
:: ::     then copy the common file to dated file. Look for Third argument option.

ECHO[
ECHO Select out-of-ordinary to %hurl%
%find% "%~2" -type f | %grep% -iv "01 Current Quote" | %grep% -iv "02 Previous Quotes" | %grep% -iv "03 Other Documents" | %grep% -iv "04 Service Quotes" | %grep% -i -e "current quote" -e "previous quote" -e "other document" -e "service quote" > "%hurl%"
:: Use this to test the actual %hurl% output
::   from coreutlis\bin folder
:: find "" -type f | grep -iv "01 Current Quote" | grep -iv "02 Previous Quotes" | grep -iv "03 Other Documents" | grep -iv "04 Service Quotes"


::
:: :: Third argument is optional
:: https://stackoverflow.com/questions/830565/how-can-i-check-if-an-argument-is-defined-when-starting-calling-a-batch-file
:: :: Third argument is the output file. If specified, copy the common file to the destination.
::
:: :: [%~3]==[] did not work with a path with whitespace.
:: :: if not [%~3]==[] ( set spit=%~3 )
if not [%3]==[] ( copy %spit% "%~3" )

echo[
pause
