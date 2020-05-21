## Submit Issues

Then open theme's `_config.yml`, find `debug` and change to `true`; then, run `hexo s` and type following code into the brower console
``` js
themeRuntime.versions
```
and 
``` js
themeRuntime.debug
```
Please include those output info to the detail of the issue

Example：
``` js
themeRuntime.versions
```
Output
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
Output
``` json
hexo: "3.8.0"
node: "11.5.0"
platform: "linux"
```
