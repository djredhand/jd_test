/**
 * WARNING
 */
 
This is my first Drupal module (and even my first real PHP work).
I am not a developper, and this module should be considered instable and
insecure until it has been completely reviewed by an experienced Drupalist.

/**
 * Presentation
 */
 
This set of modules integrates the Rangy library into Drupal 7. 

Three modules are included :

1) Rangy : the core Rangy module defines Rangy types and allows you to enable 
them on field instances. This module won't do much by itself and needs a 
'reaction' module.

2) Rangy enities : defines fieldable entities. This module is supposed to be 
used by 'reaction' modules. Enable it only if another module instruct you to 
do so, or if you wish to create a module which is built upon entities.

3) Rangy annotations : a reaction module which depends on Rangy entities to
create an annotation system.

/**
 * Installation instructions :
 */
 
1) Download the Rangy library: http://code.google.com/p/rangy/ 
and decompress it in sites/all/libraries/

2) Download and enable as usual the Library module and the Entity API module.
- http://drupal.org/project/libraries
- http://drupal.org/project/entity

3) Download and enable the Rangy modules.

4) Navigate to admin/structure/rangy_types and create a new rangy type. If you have a 
reaction module enabled, set it here as well.

5) Navigate to the configuration form of the field instance you wish to become 
rangy enabled (ie admin/structure/types/manage/article/fields/body/edit) and select your Rangy type.

6) Set the permissions as needed.
