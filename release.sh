#!/bin/bash
THEME_PATH=$PWD
CSS=$PWD/source/css
JS=$PWD/source/js
CSS_CURRENT=$(find $CSS/style-v*.css)
JS_CURRENT=$(find $JS/js-v*.js)
CSS_FILES=$PWD/source/css/files
JS_FILES=$PWD/source/js/files
DATE=$(date +%Y%m%d)

cd $CSS
rm $CSS_CURRENT

cd $CSS_FILES
minify outdatedbrowser.css mdui.custom.css lightgallery.css lg-transitions.css prism-themes.css main.css --output ../style-v$DATE.min.css

cd $JS
rm $JS_CURRENT

cd $JS_FILES
minify mdui.custom.js lightgallery.js lg-hash.js lg-zoom.js lg-fullscreen.js lg-video.js lg-autoplay.js smooth-scroll.js es6-promise.js fetch.js main.js --output ../js-v$DATE.min.js
