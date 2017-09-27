## 不蒜子
如果您不需要使用不蒜子，请删掉以下内容并设置为`busuanzi: false`
- all_site_uv: 全站独立访客统计
- post_pv: 文章阅读人数统计
- busuanzi_pure_mini_js: 不蒜子js地址，默认不用修改

## 搜索
请安装`hexo-generator-search`以使用此功能

```` bash
$ npm install hexo-generator-search --save
````

具体配置选项请点击[这里](https://github.com/PaicHyperionDev/hexo-generator-search)

!> 搜索文件需要使用`json`格式

## Mathjax
如果您的文章需要使用`Mathjax`，请在`font-matter`中加入`mathjax: true`。

## Pace加载指示器
Pace是一个网页加载进度指示器，默认不启用，如果您需要此功能，请将

```` yaml
pace: false
````

改为`pace: true`进行启用

同时将您的样式代码放入主题目录中的`source/css/pace-style.css`文件中。

## RSS
如果您需要RSS，请安装`hexo-generator-feed`

````bash
$ npm install hexo-generator-feed --save
````

具体设置参阅[hexo-generator-feed 插件文档](https://github.com/hexojs/hexo-generator-feed)

## QR_CODE
如果您需要生成文章的二维码，您需要执行

```` bash
$ npm install hexo-helper-qrcode --save
````

以安装`hexo-helper-qrcode`生成文章二维码

## word_count
此功能由[Hexo-WordCount](https://github.com/willin/hexo-wordcount)提供，安装方法请参照[Installation](https://github.com/willin/hexo-wordcount#installation)。

如果您需要字数统计或阅读时长预计，直接将对应设置设为`true`
