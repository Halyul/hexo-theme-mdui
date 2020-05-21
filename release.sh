#!/bin/bash
CSS_FILES=$PWD/source/css/_files
JS_FILES=$PWD/source/js/_files

cd $CSS_FILES/prism

# external core css
A=a11y-dark
uglifycss $A.css --output ../../prism/$A.min.css
A=atom-dark
uglifycss $A.css --output ../../prism/$A.min.css
A=base16-light
uglifycss $A.css --output ../../prism/$A.min.css
A=cb
uglifycss $A.css --output ../../prism/$A.min.css
A=coy
uglifycss $A.css --output ../../prism/$A.min.css
A=darcula
uglifycss $A.css --output ../../prism/$A.min.css
A=dark
uglifycss $A.css --output ../../prism/$A.min.css
A=default
uglifycss $A.css --output ../../prism/$A.min.css
A=duotone-dark
uglifycss $A.css --output ../../prism/$A.min.css
A=duotone-earth
uglifycss $A.css --output ../../prism/$A.min.css
A=duotone-forest
uglifycss $A.css --output ../../prism/$A.min.css
A=duotone-light
uglifycss $A.css --output ../../prism/$A.min.css
A=duotone-sea
uglifycss $A.css --output ../../prism/$A.min.css
A=duotone-space
uglifycss $A.css --output ../../prism/$A.min.css
A=funky
uglifycss $A.css --output ../../prism/$A.min.css
A=ghcolors
uglifycss $A.css --output ../../prism/$A.min.css
A=hopscotch
uglifycss $A.css --output ../../prism/$A.min.css
A=line-number
uglifycss $A.css --output ../../prism/$A.min.css
A=okaidia
uglifycss $A.css --output ../../prism/$A.min.css
A=pojoaque
uglifycss $A.css --output ../../prism/$A.min.css
A=solarizedlight
uglifycss $A.css --output ../../prism/$A.min.css
A=tomorrow
uglifycss $A.css --output ../../prism/$A.min.css
A=twilight
uglifycss $A.css --output ../../prism/$A.min.css
A=vs
uglifycss $A.css --output ../../prism/$A.min.css
A=xonokai
uglifycss $A.css --output ../../prism/$A.min.css

cd $JS_FILES
uglifyjs barba.js es6-promise.js fetch.js mdui.min.js smooth-scroll.js js.js js.barba.js --output ../js.barba.min.js
uglifyjs es6-promise.js fetch.js mdui.min.js smooth-scroll.js js.js js.pure.js --output ../js.pure.min.js
uglifyjs lightgallery.js lg-zoom.js lg-fullscreen.js lg-autoplay.js --output ../lightgallery.min.js
