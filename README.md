# win10ng-fu

## Pronounce: win-TUNG-foo

_GNU coreutils package is dependent. It's portable. It's amazing_

### Purpose: Demonstrating the possibilities with coding natively in Windows and reduce negative impact of collaboration to the work efficiency in office

_Repository purges confidential information._

### Generate a list of installed software

Looks at the Programs and Features (Add or Remove Programs) and generate a list of installed software (e.g., third-party programs).

Inspiration: Director of the Regulatory Affairs department assigned me the task to list all installed programs (i.e., third-party programs, not necessarily Windows-native programs such as Internet Explorer) on all PC and laptops in use at the time for the department.

Weighing Options: Three options to complete this task immediately came to mind. But the quick and the relatively clean method was generating the list via Batch program since there were about 70-80 machines to repeat the process.

Optimization: Reviewing the workflow, I minimized the manual repetitions. The Batch program itself did not take more than 20 seconds at a time. It could take a minute of screen time each, including waiting for USB driver to install and operating mouse/trackpad to "move" the piped file. USB drive, upon being mounted, could execute a program (while the resultant program acts much like a computer virus may infect the machines). While it was only experimental feature due to antivirus features of modern operating systems, most of the time the `autorun.inf` worked like a charm. It shed most of any manual workflow, except inserting USB drive to the USB port and removing it (unless unable).

USAGE: Place `autorun.inf` and `report.bat` scripts in the root of the USB drive. Make sure the Batch program named in the `autorun.inf` match that of `report` file (if you renamed).

Precaution: Tested on Windows 7 and Windows XP. Have not tested in Windows 8, 8.1, or 10. I will. Eventually.

### Tracking Team Activities in the given folders

Tracks the hashes of all files in the specified folders (i.e., organized by projects). Please create "tracking_target" batch file to set folders to routinely check so that you will not ask your teammates for updates as often.

> set here[1]="absolute_path_to_target_folder"
>
> set here[2]="absolute_path_to_another_target_folder"
>
> set this[1]="absolute_path_to_target_folder"
>
> set this[2]="absolute_path_to_another_target_folder"


The program uses `here` and `this` in an array style. It will also overwrite the existing files if the names do not change when you desire them to change. The `%today%` variable is available because my workflow requires updates only daily. It is possible to extend `%today%` to times as well. Lastly, `here` and `this` must have the same array size, meaning `here[1]` and `this[1]` must exist mutually.
