# Vendor
主题中`css`与`js`是直接从服务器上获取，如您有自己的CDN服务器，可进行如下配置
- fonts_min_css: 直接填入可用地址
- style_min_css: 直接填入可用地址
- js_min_js: 直接填入可用地址
- outdatedbrowser_min_js: 直接填入可用地址
- pace_min_js: 直接填入可用地址
- pace_style_css: 直接填入可用地址
- custom_head: 是否启用自定义头部, `true`为启用
- custom_js: 是否启用自定义js, `true`为启用

!> 仅能将主题核心css放于CDN服务器，其他css例如`post.min.css`这些仅能从服务器直接获取。
