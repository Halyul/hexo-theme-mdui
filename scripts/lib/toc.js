const cheerio = require('cheerio')

function contentTocHelper(str, options) {
  const $ = cheerio.load(str);
  $('a.toc-link').each(function() {
    const href = $(this).attr('href')
    $(this).attr('data-href', href)
    $(this).addClass('mdui-list-item mdui-ripple theme-post__toc__content__link')

    const number = $(this).children('.toc-number').text()
    const heading = number + ' ' +  $(this).children('.toc-text').text()
    $(this).children('.toc-number').text('')
    $(this).children('.toc-text').text(heading)
  })

  str = $.html()
  return str
}

module.exports = contentTocHelper;
