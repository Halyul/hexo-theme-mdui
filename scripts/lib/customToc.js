var _ = require('lodash'),
  util = require('util');

var rHeadingAll = /<h(\d)(.*?)>(.+?)<\/h\d>/g,
  rHeading = /<h(\d).*id="(.+?)".*>(.+?)<\/h\d>/;

module.exports = function(str, options){
  var options = _.extend({
    class: 'toc',
  }, options);

  var headings = str.match(rHeadingAll),
    data = [],
    result = '<ul class="mdui-list ' + options.class + '" mdui-collapse="{accordion: true}">',
    lastNumber = {},
    firstLevel = 0,
    lastLevel = 0;

  if (!headings.length) return '';

  for (var i = 1; i <= 6; i++){
    lastNumber[i] = 0;
  }

  headings.forEach(function(heading, i){
    if (!rHeading.test(heading)) return;

    var match = heading.match(rHeading);

    data.push({
      level: +match[1],
      id: match[2],
      text: match[3]
    });
  });

  data.forEach(function(item){
    var level = item.level,
      number = '';

    if (!firstLevel){
      firstLevel = level;
      lastLevel = level;
    }

    lastNumber[level]++;

    for (var i = level + 1; i <= 6; i++){
      lastNumber[i] = 0;
    }

    for (var i = level; i < lastLevel; i++){
      result += '</ul>';
    }

    if (level > lastLevel) result += '<ul class="mdui-list mdui-list-dense">'

    result += '<a class="mdui-list-item mdui-ripple ' + options.class + '-link" href="#' + item.id + '">' +
        number + item.text +
      '</a>';

    lastLevel = level;
  });

  result += '</ul>';

  return result;
};
