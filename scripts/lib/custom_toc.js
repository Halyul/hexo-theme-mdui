/* hexo toc.js
* author: hexojs
* license: MIT
*/

'use strict';

var cheerio;

function tocHelper(str, options) {
  options = options || {};

  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(str);
  var headingsMaxDepth = options.hasOwnProperty('max_depth') ? options.max_depth : 6;
  var headingsSelector = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, headingsMaxDepth).join(',');
  var headings = $(headingsSelector);

  if (!headings.length) return '';

  var className = options.class || 'toc';
  var listNumber = options.hasOwnProperty('list_number') ? options.list_number : true;
  var result = '<ul class="mdui-list ' + className + '">';
  var lastNumber = [0, 0, 0, 0, 0, 0];
  var firstLevel = 0;
  var lastLevel = 0;
  var i = 0;

  headings.each(function() {
    var level = +this.name[1];
    var id = $(this).attr('id');
    var text = $(this).text();

    lastNumber[level - 1]++;

    for (i = level; i <= 5; i++) {
      lastNumber[i] = 0;
    }

    if (firstLevel) {
      for (i = level; i < lastLevel; i++) {
        result += '</a></ul>';
      }

      if (level > lastLevel) {
        result += '<ul class="mdui-list-dense ' + className + '-child">';
      } else {
        result += '</a>';
      }
    } else {
      firstLevel = level;
    }

    result += '<a class="mdui-list-item mdui-ripple ' + className + '-link" href="#' + id + '">';


    result += '<span class="' + className + '-number">';

    if (listNumber) {
      for (i = firstLevel - 1; i < level; i++) {
        result += lastNumber[i] + '.';
      }
    }
    result += '<span class="' + className + '-text">' + text + '</span>';

    result += '</span></a>';


    lastLevel = level;
  });

  for (i = firstLevel - 1; i < lastLevel; i++) {
    result += '</a></ul>';
  }

  return result;
}

module.exports = tocHelper;
