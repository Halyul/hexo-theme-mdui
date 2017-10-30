# 已知问题

## 使用hexo-neat
由于`hexo-neat`插件在精简文件会自动加入注释，会导致本主题在安卓设备上的`状态栏变色`功能出现问题，如果您需要使用这个插件，请进行以下步骤的修改。

进入`hexo`文件夹中的`node_modules`文件夹，找到并进入`hexo-neat`文件夹，再进入`lib`文件夹，用编辑器打开`filter.js`，找到以下代码。

!> 行数有可能会有变化，请以代码为准

第31, 32行

!> 删除

```` javascript
var prefix = '<!-- build time:' + Date() + " -->";
var end = '<!-- rebuild by neat -->';
result = prefix + result + end;
````

!> 以下代码请注意单双引号的改变

第58, 59行

!> 修改

```` javascript
var prefix = '/* build time:' + Date().toLocaleString() + "*/\n";
var end = '\n/* rebuild by neat */';
````

改为

```` javascript
var prefix = '';
var end = '';
````

第87, 88行

!> 修改

```` javascript
var prefix = '// build time:' + Date().toLocaleString() + "\n";
var end = '\n//rebuild by neat ';
````

改为

```` javascript
var prefix = '';
var end = '';
````
