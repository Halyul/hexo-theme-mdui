#!/bin/bash
THEME_PATH=$PWD
CSS=$PWD/source/css
JS=$PWD/source/js
CSS_CURRENT=$(find $CSS/style-v*.css)
FONTS_CURRENT=$(find $CSS/fonts-v*.css)
JS_CURRENT=$(find $JS/js-v*.js)
CSS_FILES=$PWD/source/css/files
JS_FILES=$PWD/source/js/files
DATE=$(date +%Y%m%d)
PARTIALS=$THEME_PATH/layout/partials

cd $CSS
find style-v*.css > $THEME_PATH/tmp.sh
sed -i "s/style-v//" $THEME_PATH/tmp.sh
sed -i "s/.min.css//" $THEME_PATH/tmp.sh
sed -i "s/^/CURRENT=/" $THEME_PATH/tmp.sh
source $THEME_PATH/tmp.sh

# delete old files
rm $CSS_CURRENT
rm $JS_CURRENT
rm $FONTS_CURRENT

cd $CSS_FILES
uglifycss outdatedbrowser.css mdui.custom.css font-awesome.css lightgallery.css lg-transitions.css prism-themes.css main.css --output ../style-v$DATE.min.css
cssnano ../style-v$DATE.min.css ../style-v$DATE.min.css
# fonts
uglifycss fonts.css --output ../fonts-v$DATE.min.css

cd $JS_FILES
uglifyjs mdui.custom.js lightgallery.js lg-hash.js lg-zoom.js lg-fullscreen.js lg-autoplay.js smooth-scroll.js es6-promise.js fetch.js main.js --output ../js-v$DATE.min.js

cd $PARTIALS
sed -i "s/$CURRENT/$DATE/" head.ejs
sed -i "s/$CURRENT/$DATE/" import_js.ejs

cd $THEME_PATH
rm $THEME_PATH/tmp.sh
