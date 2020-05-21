## 提交Issues

请前往**主题配置文件**，找到`debug`字段，并将其值更改为`true`，然后运行`hexo s`，打开浏览器控制台，输入
``` js
themeRuntime.versions
```
以及
``` js
themeRuntime.debug
```
将输出信息附至Issue详情中。

信息例子：
``` js
themeRuntime.versions
```
输出
``` json
barba: "1.0.0"
es6promise: "4.2.5+7f2b526d"
fetch: "3.0.0"
lightgallery: "1.0.1"
mdui: "0.4.0"
smoothscroll: "15.2.0"
theme: "2.1.0"
```

``` js
themeRuntime.debug
```
输出
``` json
hexo: "3.8.0"
node: "11.5.0"
platform: "linux"
```
