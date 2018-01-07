# 高级设置

## 自定义head/js
如果想要在站点添加自定义`font-face`或者统计代码（例如`Google Analytics`）等，请在主题目录`layout`文件夹中新建一个`_custom`文件夹，并在里面新建一个`custom_head.ejs`（此文件中代码会出现在`</head>`前）文件或`custom_js.ejs`（此文件中代码会出现在`</body>`前）文件，在里面放入您的代码。同时将**主题配置**中`vendors`下的`custom_head`或`custom_js`设置为`true`

## ICONS
主题支持`font awesome icons`和`Material icons`。
如果在需要配置图标的地方需要使用`font awesome icons`，请填入`fa: `；
> 具体图标名称点[这里](http://fontawesome.io/icons/)

如果需要使用`Material icons`，请填入`md: `；
> 具体图标名称点[这里](http://www.mdui.org/docs/material_icon)

如果仅仅希望用空图标进行占位，请填入`null_icon: true`

## service_worker
主题自带Service Worker支持，如果需要使用，请打开 **主题目录** 中的`source/sw.js`，配置`ignoreFetch`，具体如何配置请自行Google或~~百度~~；同时在 **站点目录** 的`source`文件夹中新建`offline.md`， **格式同hexo的markdown**

支持设置为`true`或`pwa`
- true: 仅有Service Worker的注入
- pwa: 站点支持Google的`Progressive Web Apps`

如果设置为`pwa`，请打开 **主题目录** 中的`source/manifest.json`进行配置，具体如何配置请自行Google或~~百度~~。

## 文章页

### 缩略图
文章页支持使用缩略图。
- thumbnail: 这种缩略图会显示在`文章标题`与`文章内容`之间

### 无评论，无分类，无标签
在`font-matter`加入以下内容可实现无评论
- comment: 直接填入`false`则不会生成评论区
无分类、无标签请直接将`categories: `、`tags: `留空

### 文章置顶
您需要置顶文章的`front-matter`中，添加`pinned: true`即可置顶。

### 自定义评论
请打开主题文件夹中的`layout/_custom/custom_comment.ejs`，将您的评论服务代码粘贴进去即可使用。
如果评论服务要求设置`source id或其他类似的`，请填入`<%- config.url + config.root + page.path %>`

如果您使用的是前端路由版本，请查询您使用的评论服务是否提供`reset()`方法，否则会导致所有评论出现在同一个页面下面。
例如，Disqus有提供`reset()`方法:
```` javascript
DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = newIdentifier;
          this.page.url = newUrl;
          this.page.title = newTitle;
        }
      });
````
如果您的第三方评论服务有提供`reset()`方法，请在添加评论服务代码时添加:
```` javascript
themeRuntime.commentRest.function = function (newIdentifier, newUrl, newTitle) {
     example.reset({...})
   }
````
其中`example.reset({...})`为您的评论服务的`reset()`方法，如果该方法要求更新标识器，请自行填入以下:
- `newIdentifier`为当前页面的URL
- `newUrl`同上
- `newTitle`为页面标题

## random_pics
此为文章随机图片的设置，当文章不带有缩略图时，HEXO会随机将主题目录中的`source/img/random`内的一张图片作为文章缩略图。

如果您不需要此功能，请将此处留空或设为`false`

目前内置了44张图片，如果您需要添加缩略图，请确认文件格式为`png`，且命名为`数字`的格式，同时修改此处的数量，否则缩略图无法显示同时控制台会输出404错误。

!> 无论是添加还是去除缩略图，请确认数字编号时从`1`开始，按照顺序直到结束
