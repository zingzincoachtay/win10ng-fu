# win10ng-fu

## Pronounce: win-TUNG-foo

_GNU coreutils package is dependent. It's portable. It's amazing_

### Purpose: Demonstrating the possibilities with coding natively in Windows and reduce negative impact of collaboration to the work efficiency in office

_Repository purges confidential information._

Working smart. Adapting to the restrictions. Mind the diminishing return. Learning to use computer for the sake of efficiency. Using is not in itself the purpose of computer.

### Generate a list of installed software

Looks at the Programs and Features (Add or Remove Programs) and generate a list of installed software (e.g., third-party programs).

Inspiration: Director of the Regulatory Affairs department assigned me the task to list all installed programs (i.e., third-party programs, not necessarily Windows-native programs such as Internet Explorer) on all PC and laptops in use at the time for the department.

Weighing Options: Three options to complete this task immediately came to mind. But the quick and the relatively clean method was generating the list via Batch program since there were about 70-80 machines to repeat the process.

Optimization: Reviewing the workflow, I minimized the manual repetitions. The Batch program itself did not take more than 20 seconds at a time. It could take a minute of screen time each, including waiting for USB driver to install and operating mouse/trackpad to "move" the piped file. USB drive, upon being mounted, could execute a program (while the resultant program acts much like a computer virus may infect the machines). While it was only experimental feature due to antivirus features of modern operating systems, most of the time the `autorun.inf` worked like a charm. It shed most of any manual workflow, except inserting USB drive to the USB port and removing it (unless unable).

USAGE: Place `autorun.inf` and `report.bat` scripts in the root of the USB drive. Make sure the Batch program named in the `autorun.inf` match that of `report` file (if you renamed).

Precaution: Tested on Windows 7 and Windows XP. Have not tested in Windows 8, 8.1, or 10. I will. Eventually.

### Tracking Team Activities in the given folders

Inspiration: Purchasing department at the helm of new leadership initiated projects to formally document and archive agreements from the suppliers, while in response to the pandemic, the executive leadership initiated and tasked each department the cost relief project. The handling of all the concurrent projects has been a team effort but the variability in data entry and tracking progress was also inevitable and foreseen. I decided to drive the progress tracking for the team, assuring consistency of data, reviewing documents objectively, establishing scalable schema, then also allow for periodical report generating.

Observation: Each project was being completed in its folders. Each project had its own destination folder. The folders were shared and files were added as the tasks were being completed, but the data was entered for tracking by one person.

Weighing Options: Options were either tried-and-true (asking for updates, e.g.) or trying anew. SVN was a overkill and unnecessary for project-based needs. Little cryptography could easily flag for files that changed (without context of changes).

Optimization: Generally, my experience in coordinating work requires consistent (if not so frequent) communication among team members. That is fine and it is indeed the standard of quality. I only wished that the workflow served better instead of adding the permutation of work to it. Challenge of project management is getting up to date information and generating data pertinent to the business decisions. Sun Tzu said: the battles won without fighting is superior to any victories. Only sourcing the updates from direct communication with the teammates not only choke the ability to see the big picture but also put unnecessary burden the team. Why eat a banana with a plate, a knife, and a fork? Run the script once a day to know if the changes exist instead of taking away minutes off of teammates.

USAGE: Tracks the hashes of all files in the specified folders (e.g., organized by projects). Please create "tracking_target" batch file. It should set folders that would routinely be checked.

> set here[1]="absolute_path_to_target_folder"
>
> set here[2]="absolute_path_to_another_target_folder"
>
> set this[1]="absolute_path_to_target_folder"
>
> set this[2]="absolute_path_to_another_target_folder"


The program uses `here` and `this` in an array style. It will also overwrite the existing files if the names do not change when you desire them to change. The `%today%` variable is available because I check for updates daily. It is possible to extend `%today%` to times as well, if you require checking multiple times a day. Lastly, `here` and `this` must have the same array size, meaning `here[1]` and `this[1]` must exist mutually (i.e., command `here` > `this`).
