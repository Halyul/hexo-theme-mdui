# 高级设置

## 自定义head/js
如果想要在站点添加自定义`font-face`或者统计代码（例如`Google Analytics`）等，请在主题目录`layout`文件夹中新建一个`_custom`文件夹，并在里面新建一个`head.ejs`（此文件中代码会出现在`</head>`前）文件或`import_js.ejs`（此文件中代码会出现在`</body>`前）文件，在里面放入您的代码。

!> 需要在主题`_config.yml`下的`vendors`启用`custom_head`或者`custom_js`

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

## 首页
### notification
此项可在主页添加一些公告/通知而不需要重新生成文件。
在`主题目录`下的`source/notification.json`，以**数组**的形式写下内容即可添加多行内容。已自带配置，可直接查看效果。

## 归档页

### about_me
此为`归档页`的`关于`对话框，如果需要使用，请在 **站点目录** 的`source/_data`中新建一个`about.yml`文件，并选择以下格式填入。您可以直接复制粘贴查看会生成什么样式。

选项:

```` yaml
slogan: 是否显示博主描述，`true`或`false`，也可不填入这个选项
others: 显示在博主描述下的内容（两个选项相互独立）
  - '1'
  - '2'
````

格式1:

```` yaml
hellow:
  main:
    hi:
      content: xxxxxx
      s_img: /img/avatar.png
    hi1:
      content: xx
      link: //google.com
      s_img: /img/favicon.png
    hi2:
      content: aaaa
  more:
    hi3:
      content: '561456415341'
      link: //google.com
      s_img: /img/favicon.png
    hi4:
      content: 'xxxxxxx'
      s_img: /img/favicon.png
````

格式2:

```` yaml
hellow1:
  main:
    hi:
      content: xxxxxx
      one_line: true
    hi1:
      content: xx
      fa: 'fa-beer'
    工作經歷:
      content: xxxx
      content_1: Designer & Developer，2222
  more:
    hi3:
      content: '1111'
      one_line: true
      s_img: /img/favicon.png
    hi4:
      content: '1111'
      one_line: true
      c_img: /img/favicon.png
````

格式3:

```` yaml
hellow2:
  main:
    hi:
      content: xxxxxx
      one_line: true
      md: 'home'
    hi1:
      content: xx
      link: 'xxxx/xxx'
      fa: 'fa-beer'
    工作經歷:
      content: xxxx
      content_1: Designer & Developer，2222
  more:
    hi3:
      content: '1111'
      one_line: true
      null_icon: true
    hi4:
      content: '1111'
      one_line: true
      fa: 'fa-qq'
````

部分选项解释:
- one_line: 是否为单行内容，如果设置为`true`，则该`content: `中文字不出现在页面中
- fa/md/null_icon: 图标设置，请点击[这里](/zh-cn/advanced?id=icons)
- content_1: 显示在`content:`文字下的文字
- link: 跳转链接
- s_img: 出现在该内容文字前的正方形图片
- c_img: 出现在该内容文字前的圆形图片

## 文章页

### 缩略图
文章页支持使用缩略图。
- thumbnail: 这种缩略图会显示在`文章标题`与`文章内容`之间

### 自定义文章、页面主题颜色
在`font-matter`中加入`primary_color`与/或`accent_color`可改变文章页面的主题颜色，颜色名同[Color](/zh-cn/config?id=color)

eg.
```` markdown
title: 这是标题
primary_color: grey
accent_color: red
-----------
````

### 无评论，无分类，无标签
在`font-matter`加入以下内容可实现无评论
- comment: 直接填入`false`则不会生成评论区
无分类、无标签请直接将`categories: `、`tags: `留空

### 文章置顶
您需要置顶文章的`front-matter`中，添加`pinned: true`即可置顶。

### customComment
请打开主题文件夹中的`layout/_custom/comment.ejs`，将您的评论服务代码粘贴进去即可使用。(如果没有此文件，请新建)
如果评论服务要求设置`source id或其他类似的`，请填入`<%- config.url + config.root + page.path %>`
