# win10ng-fu

## Pronounce: win-TUNG-foo

_GNU coreutils package is dependent. It's portable. It's amazing_

### Purpose: Demonstrating the possibilities with coding natively in Windows and reduce negative impact of collaboration to the work efficiency in office

_Repository purges confidential information._

### Tracking Projects

Tracks the hashes of all files in the specified folders (i.e., organized by projects). Please create "tracking_target" batch file to set folders to routinely check so that you will not ask your teammates for updates as often.

> set here[1]="absolute_path_to_target_folder"
> set here[2]="absolute_path_to_another_target_folder"
> 
> set this[1]="absolute_path_to_target_folder"
>
> set this[2]="absolute_path_to_another_target_folder"


The program uses `here` and `this` in an array style. It will also overwrite the existing files if the names do not change when you desire them to change. The `%today%` variable is available because my workflow requires updates only daily. It is possible to extend `%today%` to times as well. Lastly, `here` and `this` must have the same array size, meaning `here[1]` and `this[1]` must exist mutually.
