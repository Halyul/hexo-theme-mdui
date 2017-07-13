#!/bin/bash
CSS=$PWD/source/css
JS=$PWD/source/js

CSS_PLUS=$(find $CSS/style-plus.min.css)
CSS_NOW=$(find $CSS/style-now.min.css)
FONTS=$(find $CSS/fonts.min.css)
JS=$(find $JS/js.min.js)

CSS_FILES=$PWD/source/css/_files
JS_FILES=$PWD/source/js/_files

# delete old files
rm $CSS_PLUS $CSS_NOW
rm $JS
rm $FONTS

cd $CSS_FILES

# external core css
uglifycss core/outdatedbrowser.css core/mdui.custom.css core/font-awesome.css core/animate.css --output external-core.min.css

# plus
## plus core
uglifycss plus/global.css plus/appbar.css plus/drawer.css plus/posts.css --output plus.min.css

## combine core css
uglifycss external-core.min.css plus.min.css --output ../style-plus.min.css

cssnano ../style-plus.min.css ../style-plus.min.css

## plus other
### plus post
cssnano plus/post.css ../src/plus/post.min.css

### plus archives
uglifycss plus/archives.css plus/dialogs.css --output ../src/plus/archives.min.css

cssnano ../src/plus/archives.min.css ../src/plus/archives.min.css

### plus search
cssnano plus/search.css ../src/plus/search.min.css

# now
## now core
uglifycss now/global.css now/appbar.css now/drawer.css now/index.css now/posts.css  --output now.min.css

## combine core css
uglifycss external-core.min.css now.min.css --output ../style-now.min.css

cssnano ../style-now.min.css ../style-now.min.css

## now other
### now post
cssnano now/post.css ../src/now/post.min.css

### now archives
uglifycss now/archives.css now/dialogs.css --output ../src/now/archives.min.css

cssnano ../src/now/archives.min.css ../src/now/archives.min.css

# fonts
uglifycss fonts.css --output ../fonts.min.css

rm external-core.min.css plus.min.css now.min.css

cd $JS_FILES
uglifyjs mdui.custom.js lightgallery.js lg-hash.js lg-zoom.js lg-fullscreen.js lg-autoplay.js smooth-scroll.js es6-promise.js fetch.js js.js --output ../js.min.js
