const href = /<a href="#([\s\S]*?)" class="headerlink"/igm;
const newHrefStart = '<a href="#!/';
const newHrefEnd = '" class="theme-post__card__heading-link material-icons"';

function linkRender(data) {
  data.content = data.content.replace(href, (origin, content) => {
    var a = newHrefStart + data.path + '?id=' + content + newHrefEnd
    console.log(a)
    return newHrefStart + data.path + '?id=' + content + newHrefEnd;
  })
  return data;
}

hexo.extend.filter.register('after_post_render', linkRender);
