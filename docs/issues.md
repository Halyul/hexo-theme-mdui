# Known issues

## Gets WARN in console
When you run `hexo d` or `hexo g`, you will find following lines in console
```` bash
...
WARN  Partial ../_custom/custom_head does not exist. (in _partials/head.ejs)
WARN  Partial ../_custom/custom_js does not exist. (in _partials/import_js.ejs)
...
````
But don't worry, it won't bring any strange problem.

## Using hexo-neat plugin
Because `hexo-neat` plugin will add note when it neats the files, this will break the Android Chrome status bar color changing, if you want to/ are using this plugin, please do following modifications.

Enter the `node_modules` folder in the `hexo` folder, find and enter `hexo-neat` folder, then enter `lib` folder, use your editor open `filter.js`, find following code.

!> The number of rows is for reference only, please seach the code

Line 31, 32

!> DELETE

```` javascript
var prefix = '<!-- build time:' + Date() + " -->";
var end = '<!-- rebuild by neat -->';
result = prefix + result + end;
````

!> Please notice the changes of single quote and double quotes

Line 58, 59

!> MODIFY

```` javascript
var prefix = '/* build time:' + Date().toLocaleString() + "*/\n";
var end = '\n/* rebuild by neat */';
````

to

```` javascript
var prefix = '';
var end = '';
````

Line 87, 88

!> MODIFY

```` javascript
var prefix = '// build time:' + Date().toLocaleString() + "\n";
var end = '\n//rebuild by neat ';
````

to

```` javascript
var prefix = '';
var end = '';
````
