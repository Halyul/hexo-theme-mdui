## router
是否使用前端路由器，如果使用前端路由器，可能在部分设备上会有很严重的性能下降问题。

可用选项为`true`和`false`

## style
- primary_color: 主要颜色

![red](https://img.shields.io/badge/primary_color-red-%23F44336.svg?style=flat-square&colorB=F44336) ![pink](https://img.shields.io/badge/primary_color-pink-%23E91E63.svg?style=flat-square&colorB=E91E63) ![purple](https://img.shields.io/badge/primary_color-purple-%239C27B0.svg?style=flat-square&colorB=9C27B0) ![deep-purple](https://img.shields.io/badge/primary_color-deep--purple-%23673AB7.svg?style=flat-square&colorB=673AB7) ![indigo](https://img.shields.io/badge/primary_color-indigo-%233F51B5.svg?style=flat-square&colorB=3F51B5) ![blue](https://img.shields.io/badge/primary_color-blue-%232196F3.svg?style=flat-square&colorB=2196F3) ![light-blue](https://img.shields.io/badge/primary_color-light--blue-%2303A9F4.svg?style=flat-square&colorB=03A9F4) ![cyan](https://img.shields.io/badge/primary_color-cyan-%2300BCD4.svg?style=flat-square&colorB=00BCD4) ![teal](https://img.shields.io/badge/primary_color-teal-%23009688.svg?style=flat-square&colorB=009688) ![green](https://img.shields.io/badge/primary_color-green-%234CAF50.svg?style=flat-square&colorB=4CAF50) ![light-green](https://img.shields.io/badge/primary_color-light--green-%238BC34A.svg?style=flat-square&colorB=8BC34A) ![lime](https://img.shields.io/badge/primary_color-lime-%23CDDC39.svg?style=flat-square&colorB=CDDC39) ![yellow](https://img.shields.io/badge/primary_color-yellow-%23FFEB3B.svg?style=flat-square&colorB=FFEB3B) ![amber](https://img.shields.io/badge/primary_color-amber-%23FFC107.svg?style=flat-square&colorB=FFC107) ![orange](https://img.shields.io/badge/primary_color-orange-%23FF9800.svg?style=flat-square&colorB=FF9800) ![deep-orange](https://img.shields.io/badge/primary_color-deep--orange-%23FF5722.svg?style=flat-square&colorB=FF5722) ![brown](https://img.shields.io/badge/primary_color-brown-%23795548.svg?style=flat-square&colorB=795548) ![grey](https://img.shields.io/badge/primary_color-grey-%239E9E9E.svg?style=flat-square&colorB=9E9E9E)

- accent_color: 强调色

![red](https://img.shields.io/badge/accent_color-red-%23FF5252.svg?style=flat-square&colorB=FF5252) ![pink](https://img.shields.io/badge/accent_color-pink-%23FF4081.svg?style=flat-square&colorB=FF4081) ![purple](https://img.shields.io/badge/accent_color-purple-%23E040FB.svg?style=flat-square&colorB=E040FB) ![deep-purple](https://img.shields.io/badge/accent_color-deep--purple-%237C4DFF.svg?style=flat-square&colorB=7C4DFF) ![indigo](https://img.shields.io/badge/accent_color-indigo-%23536DFE.svg?style=flat-square&colorB=536DFE) ![blue](https://img.shields.io/badge/accent_color-blue-%23448AFF.svg?style=flat-square&colorB=448AFF) ![light-blue](https://img.shields.io/badge/accent_color-light--blue-%2340C4FF.svg?style=flat-square&colorB=40C4FF) ![cyan](https://img.shields.io/badge/accent_color-cyan-%2318FFFF.svg?style=flat-square&colorB=18FFFF) ![teal](https://img.shields.io/badge/accent_color-teal-%2364FFDA.svg?style=flat-square&colorB=64FFDA) ![green](https://img.shields.io/badge/accent_color-green-%2369F0AE.svg?style=flat-square&colorB=69F0AE) ![light-green](https://img.shields.io/badge/accent_color-light--green-%23B2FF59.svg?style=flat-square&colorB=B2FF59) ![lime](https://img.shields.io/badge/accent_color-lime-%23EEFF41.svg?style=flat-square&colorB=EEFF41) ![yellow](https://img.shields.io/badge/accent_color-yellow-%23FFFF00.svg?style=flat-square&colorB=FFFF00) ![amber](https://img.shields.io/badge/accent_color-amber-%23FFD740.svg?style=flat-square&colorB=FFD740) ![orange](https://img.shields.io/badge/accent_color-orange-%23FFAB40.svg?style=flat-square&colorB=FFAB40) ![deep-orange](https://img.shields.io/badge/accent_color-deep--orange-%23FF6E40.svg?style=flat-square&colorB=FF6E40)

- bg_color: 全局背景色（需要设置为HEX格式）
- hoverable: 全局卡片能否悬浮

## info
- bg_img: `抽屉`和`归档页`的个人资料背景图
- avatar: 博主头像
- slogan: 博主描述
- sns:
此为归档页的`联系我`提示框的内容，可按照主题默认配置填入您的联系方式。图标使用请点击[这里](/zh-cn/advanced?id=icons)
> 可将此处留空或如配置文件中注释掉内容以关闭这个功能

```` yaml
Twitter:
    link: https://twitter.com
    fa: 'fa-twitter'
````

## HTML Head
用于配置生成的 HTML 文件的头部信息。
- favicon
- high_res_favicon: 高清 favicon
- high_res_favicon: iOS 主屏按钮图标
- keywords: 网站关键词

## Search
search: 博客搜索，可选`true`或`false`，详细信息请点击[这里](/zh-cn/plugins?id=Search)

## post
- entry_excerpt: 首页文章摘要字数
- random_pics: 文章随机缩略图，详细信息请点击[这里](/zh-cn/advanced?id=random_pics)
- qr_code: 文章是否自带二维码，详细信息请点击[这里](/zh-cn/plugins?id=qr_code)
- prism: 代码染色
  - theme: 主题，自带的有
    - a11y-dark
    - atom-dark
    - base16-light
    - cb
    - coy
    - darcula
    - dark
    - default
    - duotone-dark
    - duotone-earth
    - duotone-forest
    - duotone-light
    - duotone-sea
    - duotone-space
    - funky
    - ghcolors
    - hopscotch
    - okaidia
    - pojoaque
    - solarizedlight
    - tomorrow
    - twilight
    - vs
    - xonokai
  - line_number: 在代码前是否显示行号，可设置为`true`或`false`
- license：这是设置博客全局的版权协议
  - name: 此为版权协议名称，例如`CC协议`、`LePtc协议`、`Copyleft协议`等等
  - link: 协议说明
  如果您需要单独设置某篇文章的协议，请在`font-matter`中加入
  ```` yaml
  license_name: 此为版权协议名称
  license_link: 此为版权协议说明
  ````

  !> 请注意，如果您需要设置协议，以上两项均为必填项！

  在`font-matter`中加入
  ```` yaml
  export_md: false
  ````
  可将文章Markdown文件下载关闭。

- word_count: 文章字数统计，具体请看[这里](/zh-cn/plugins?id=word_count)
- read_time: 阅读时长预计，具体请看[这里](/zh-cn/plugins?id=word_count)
- donate: 文章打赏，请按照配置例子进行配置。图标使用请点击[这里](/zh-cn/advanced?id=icons)。如果不需要此功能，请将此项留空。

## share_menu
此为分享菜单设置。如果您不需要分享菜单，请删除或注释掉内容。
- rss: RSS订阅, 文件路径与`hexo`配置文件下`feed`中的`path`一致，详细信息请点击[这里](/zh-cn/plugins?id=rss).
- weibo: 微博，可选`true`或`false`
- twitter: 推特，可选`true`或`false`
- facebook: 脸书，可选`true`或`false`
- googleplus: Google+，可选`true`或`false`
- linkedin: 连英，可选`true`或`false`
- qq: QQ，可选`true`或`false`
- telegram: Telegram，可选`true`或`false`

## pages
图标使用请点击[这里](/zh-cn/advanced?id=icons)
如果您不需要此功能，请删除或注释掉内容。

### 非分类
此为自定义页面，请按照主题配置文件的方式进行书写。
```` yaml
Test1:
  link: "/test1"
  type: 'internal' //如果为外链，则填入'external'
  md: "`&#xe84d;`"
````

### 页面分类
自定义页面支持`页面分类`，即同类页面放一起，如果需要启用，请如`配置文件`的`Test4: `格式进行配置

!> 关键设置为`cascade: true`

## comment
评论插件，目前可用`Disqus`与`自定义`
- use: `disqus`或`custom`
- shortname: 您的短域名, 例如`example.disqus.com`即填`example`，若为`use: custom`，则此选项无效

若使用自定义评论服务，具体配置步骤请点击[这里](/zh-cn/advanced?id=customcomment)

## footer
- since: 博客起始年份

> 如果此时为`2017年`，您填入`2017`，则在`2017`全年都显示`2017`，`2018`全年显示`2017 - 2018`

- ICP: 可填入中国的ICP备案号
- image: 显示在底部的图片
- last_updated: 是否显示最后更新时间，可用选项为`true`与`false`

## node_sass:

!> 不能修改
