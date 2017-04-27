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
   return require("./lib/customToc.js").call(hexo,...arguments);
 });
