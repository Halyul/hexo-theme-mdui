## Mathjax
如果您的文章需要使用`Mathjax`，请在`font-matter`中加入`mathjax: true`。

## RSS
如果您需要RSS，请安装`hexo-generator-feed`

````bash
$ npm install hexo-generator-feed --save
````

具体设置参阅[hexo-generator-feed 插件文档](https://github.com/hexojs/hexo-generator-feed)

## Search
如果您启用了搜索，请在HEXO的`_config.yml`添加以下代码

```` yaml
search:
  path: search.json
  field: all
````

## QR_CODE
如果您需要生成文章的二维码，您需要执行

```` bash
$ npm install hexo-helper-qrcode --save
````

以安装`hexo-helper-qrcode`生成文章二维码

## word_count
此功能由[Hexo-WordCount](https://github.com/willin/hexo-wordcount)提供，安装方法请参照[Installation](https://github.com/willin/hexo-wordcount#installation)。

如果您需要字数统计或阅读时长预计，直接将对应设置设为`true`
