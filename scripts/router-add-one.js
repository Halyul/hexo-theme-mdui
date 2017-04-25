hexo.extend.generator.register('router-add-one',function(site){
    return [
        {
            path: '/search/index.html',
            layout:'search',
            data: {}
        }
    ]
})