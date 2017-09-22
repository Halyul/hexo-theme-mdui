const cheerio = require('cheerio')

function linkRender(data) {
  const $ = cheerio.load(data.content);
  $('a.headerlink').each(function() {
    $(this).addClass('material-icons theme-post__card__heading-link');
    const href = $(this).attr('href');
    const newHref = '#!/' + data.path + '?id=' + href;
    $(this).attr('href', newHref);
  })
  data.content = $.html()
  return data
}

hexo.extend.filter.register('after_post_render', linkRender);
