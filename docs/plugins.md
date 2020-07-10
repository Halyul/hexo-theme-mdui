# Plugins

## Mathjax
If your post or page needs `Mathjax`, please add `mathjax: true` in the `font-matter`.

## Search
If you enabled search, add following code to HEXO's `_config.yml`

```` yaml
search:
  path: search.json
  field: all
````

## RSS
If you need rss, please install `hexo-generator-feed`

````bash
$ npm install hexo-generator-feed --save
````

more details can be found [here](https://github.com/hexojs/hexo-generator-feed).

## QR_CODE
QR Code for posts and custom pages, available options are `true` and `false`, you need to install `hexo-helper-qrcode` plugin to enbale the feature. Please run following command in terminal in hexo folder.

```` bash
$ npm install hexo-helper-qrcode --save
````

## word_count
This feature is provided by [Hexo-WordCount](https://github.com/willin/hexo-wordcount), for installation please see [here](https://github.com/willin/hexo-wordcount#installation)

If you need article words counter and/or reading time estimation, just set the line to `true`
