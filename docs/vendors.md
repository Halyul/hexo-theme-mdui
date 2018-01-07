# Vendor
Css and js files haven't cdn service support, so they are accessed from your server directly. If you have your own cdn service, you can do following configurations.
- style_min_css: direct address
- outdatedbrowser_min_js: direct address
- js_min_js: direct address, if you use the router version, please use `js.barba.min.js` as the file that need to be put on cdn, otherwise use `js.pure.min.js`.
- custom_head: enable the custom head, `true` or `false`
- custom_js: enable the custom js, option is `true` or `false`
