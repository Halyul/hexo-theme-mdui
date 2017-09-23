// bug: strip is wrong
const cheerio = require('cheerio')

function linkRender(data) {
  const $ = cheerio.load(data.content);
  $('a.headerlink').each(function() {
    const href = $(this).attr('href'); // get href
    const parent = $(this).parent()
    const heading = parent.text() // get the heading
    const newHref = '#!/' + data.path + '?id=' + href;
    const text = '<a href="' + newHref + '" title="' + heading + '">' + heading + '</a>' // set the link
    parent.html(text)
  })
  data.content = $.html()
  return data
}

hexo.extend.filter.register('after_post_render', linkRender);
