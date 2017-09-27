# Plugins

## busuanzi
busuanzi is a plugin to count how many page views and unique visitors.
If you don't need it, please delete following lines and set `busuanzi: false`
- all_site_uv: All site unique visitors
- post_pv: how many times the page has been viewed
- busuanzi_pure_mini_js: busuanzi js address, it is hosted in China Mainland.

## search
Please install `hexo-generator-search` to use this function.

```` bash
$ npm install hexo-generator-search --save
````

more details can be found [here](https://github.com/PaicHyperionDev/hexo-generator-search)

!> THE SEARCH FILE NEEDS `JSON` FORMAT

## Mathjax
If your post or page needs `Mathjax`, please add `mathjax: true` in the `font-matter`.

## Pace loading indicator
Pace is a webpage loading indicator, default is `false`, if you want to use it, please set

```` yaml
pace: false
````

to `pace: true` to enable

At the same time, you need to put the style code to `source/css/pace-style.css` in the theme folder.

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
