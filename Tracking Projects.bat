@ECHO OFF
CALL "default-tools.bat"
%find% "H:\PURCHASING\02 QUOTES\01 MATERIAL & COMPONENT Suppliers" "H:\PURCHASING\02 QUOTES\02 MOLDED PART Suppliers" -type f -regex ".+01 Current Quote.+\.xlsx?" -exec %hash% "{}" ; | ^
%grep% -iv "SERVICE ONLY|BUILDOUT|~" | %sed% -e "s/\//\\/g" | %sed% -e "s/\\\\/\\/g" | sort /+35 > "%USERPROFILE%\Desktop\%today% quotes.sum"

%sed% "s/^\W?([A-z0-9]{32})\s+\W?([A-Z]:\\.+?\\{1,2}([^\\\/]+)\\{1,2}(\S+?)\s+([^\\\/]+)\\{1,2}[^\\\/]+\\{1,2}(\S+?)\s+([^\\\/]+)\.xlsx?)$/\3\t\4\t\5\t\6\t\7\t\1\t\2\t\0/" "%USERPROFILE%\Desktop\%today% quotes.sum" > "%USERPROFILE%\Desktop\current-parts.csv"

%find% "H:\PURCHASING\08 COST REDUCTION STUFF" -type f -regex "\.xlsx?" -exec %hash% "{}" ; | %sed% -e "s/\//\\/g" | %sed% -e "s/\\\\/\\/g" | sort /+35 > "%USERPROFILE%\Desktop\%today% cr.sum"
