#!/bin/bash
THEME_PATH=$PWD
CSS=$PWD/source/css
JS=$PWD/source/js
PARTIALS=$THEME_PATH/layout/partials

CSS_PLUS_CURRENT=$(find $CSS/style-plus-v*.css)
CSS_NOW_CURRENT=$(find $CSS/style-now-v*.css)
FONTS_CURRENT=$(find $CSS/fonts-v*.css)
JS_PLUS_CURRENT=$(find $JS/js-plus-v*.js)
JS_NOW_CURRENT=$(find $JS/js-now-v*.js)

CSS_FILES=$PWD/source/css/files
JS_FILES=$PWD/source/js/files

DATE=$(date +%Y%m%d)

cd $CSS
find style-plus-v*.css > $THEME_PATH/tmp.sh
sed -i "s/style-plus-v//" $THEME_PATH/tmp.sh
sed -i "s/.min.css//" $THEME_PATH/tmp.sh
sed -i "s/^/CURRENT=/" $THEME_PATH/tmp.sh
source $THEME_PATH/tmp.sh

# delete old files
rm $CSS_PLUS_CURRENT $CSS_NOW_CURRENT
rm $JS_PLUS_CURRENT $JS_NOW_CURRENT
rm $FONTS_CURRENT

cd $CSS_FILES
uglifycss outdatedbrowser.css mdui.custom.css font-awesome.css lightgallery.css lg-transitions.css prism-themes.css --output external.min.css

uglifycss plus/fonts.css plus/global.css plus/appbar.css plus/drawer.css plus/posts.css plus/archives.css plus/dialogs.css plus/page-friends.css plus/page-search.css plus/page-galleries.css plus/page-gallery.css plus/lg.css plus/animate.css --output plus.min.css

uglifycss external.min.css plus.min.css --output ../style-plus-v$DATE.min.css

cssnano ../style-plus-v$DATE.min.css ../style-plus-v$DATE.min.css

uglifycss now/fonts.css now/global.css now/appbar.css now/drawer.css now/index.css now/post.css now/posts.css --output now.min.css

uglifycss external.min.css now.min.css --output ../style-now-v$DATE.min.css

cssnano ../style-now-v$DATE.min.css ../style-now-v$DATE.min.css

# fonts
uglifycss fonts.css --output ../fonts-v$DATE.min.css

rm external.min.css plus.min.css now.min.css

cd $JS_FILES
uglifyjs mdui.custom.js lightgallery.js lg-hash.js lg-zoom.js lg-fullscreen.js lg-autoplay.js smooth-scroll.js es6-promise.js fetch.js plus.js --output ../js-plus-v$DATE.min.js

uglifyjs mdui.custom.js lightgallery.js lg-hash.js lg-zoom.js lg-fullscreen.js lg-autoplay.js smooth-scroll.js es6-promise.js fetch.js now.js --output ../js-now-v$DATE.min.js

cd $PARTIALS
sed -i "s/$CURRENT/$DATE/" head.ejs
sed -i "s/$CURRENT/$DATE/" import_js.ejs

cd $THEME_PATH
rm $THEME_PATH/tmp.sh
