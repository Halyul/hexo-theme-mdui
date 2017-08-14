hexo.extend.generator.register('themeRouter',function(site){
    return [
        {
            path: '/templates/index.html',
            layout:'_templates/index',
            data: {}
        }
    ]
});

hexo.extend.helper.register('cardToc', function(){
   return require("./lib/toc/card.js").call(hexo,...arguments);
});
hexo.extend.helper.register('fabToc', function(){
  return require("./lib/toc/fab.js").call(hexo,...arguments);
});
