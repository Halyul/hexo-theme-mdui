hexo.extend.generator.register('themeRouter',function(site){
    return [
        {
            path: '/templates/index.html',
            layout:'_templates/index',
            data: {}
        }
    ]
});

var renderer = require('./lib/style_renderer');
// associate the Sass renderer with .scss AND .sass extensions
hexo.extend.renderer.register('scss', 'css', renderer);
hexo.extend.renderer.register('sass', 'css', renderer);

hexo.extend.helper.register('cardToc', function(){
   return require("./lib/toc/card.js").call(hexo,...arguments);
});
hexo.extend.helper.register('fabToc', function(){
  return require("./lib/toc/fab.js").call(hexo,...arguments);
});
