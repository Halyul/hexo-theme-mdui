const table = /<table>([\s\S]*?)<\/table>/igm;
const mduiTableStart = '<div class="mdui-table-fluid theme-post__card__table--flat"><table class="mdui-table mdui-table-hoverable ">'
const mduiTableEnd = '</table></div>'

function tableRenderer(data) {
  data.content = data.content.replace(table, (origin, content) => {
    return mduiTableStart + content + mduiTableEnd;
  })
  return data;
}

hexo.extend.filter.register('after_post_render', tableRenderer);
