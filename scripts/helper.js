hexo.extend.generator.register('themeRouter',function(site){
    return [
        {
            path: '/404.html',
            layout:'404',
            data: {}
        },
        {
          path: '/search.html',
          layout:'search',
          data: {}
        }
    ]
});

var renderer = require('./lib/style_renderer');
// associate the Sass renderer with .scss AND .sass extensions
hexo.extend.renderer.register('scss', 'css', renderer);
hexo.extend.renderer.register('sass', 'css', renderer);

hexo.extend.helper.register('tocContentHelper', function(){
  return require("./lib/toc.js").call(hexo,...arguments);
});

hexo.extend.generator.register('exportMD', require('./lib/export_md.js'));
