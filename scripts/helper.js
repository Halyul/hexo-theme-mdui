hexo.extend.generator.register('search',function(site){
    return [
        {
            path: '/search/index.html',
            layout:'search',
            data: {}
        }
    ]
});

hexo.extend.helper.register('customToc', function(){
   return require("./lib/custom_toc.js").call(hexo,...arguments);
 });

hexo.extend.helper.register('jsLsload', function(){
  return require("./lib/ls/js_lsload.js").call(hexo,...arguments);
});

hexo.extend.helper.register('cssLsload', function(){
  return require("./lib/ls/css_lsload.js").call(hexo,...arguments);
});

hexo.extend.generator.register('exportMD', require('./lib/export_md.js'));
