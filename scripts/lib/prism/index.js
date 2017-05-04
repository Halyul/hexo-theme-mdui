/*! copyright github@ele828
* License MIT
*/

'use strict';

const fs = require('hexo-fs');
const path = require('path');
const Prism = require('./prism.js');

const map = {
  '&#39;': '\'',
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  '&quot;': '"'
};

const regex = /<pre><code class="(.*)?">([\s\S]*?)<\/code><\/pre>/igm;

const line_number = true;

/**
 * Unescape from Marked escape
 * @param {String} str
 * @return {String}
 */
function unescape(str) {
  if (!str || str == null) return '';
  const re = new RegExp('(' + Object.keys(map).join('|') + ')', 'g');
  return String(str).replace(re, (match) => map[match]);
};

/**
 * Code transform for prism plugin.
 * @param {Object} data
 * @return {Object}
 */
function PrismPlugin(data) {
  data.content = data.content.replace(regex, (origin, lang, code) => {
    const lineNumbers = line_number ? 'line-numbers' : '';
    const startTag = `<pre class="${lineNumbers} language-${lang}"><code class="language-${lang}">`;
    const endTag = `</code></pre>`;
    code = unescape(code);
    let parsedCode = '';
    if (Prism.languages[lang]) {
      parsedCode = Prism.highlight(code, Prism.languages[lang]);
    } else {
      parsedCode = code;
    }
    if (line_number) {
      const match = parsedCode.match(/\n(?!$)/g);
      const linesNum = match ? match.length + 1 : 1;
      let lines = new Array(linesNum + 1);
      lines = lines.join('<span></span>');
      const startLine = '<span aria-hidden="true" class="line-numbers-rows">';
      const endLine = '</span>';
      parsedCode += startLine + lines + endLine;
    }
    return startTag + parsedCode + endTag;
  });

  return data;
}

// Register prism plugin
hexo.extend.filter.register('after_post_render', PrismPlugin);
