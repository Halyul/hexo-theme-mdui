function ExportMD(site) {
  var mdData = [];

  var posts = site.posts.sort('-date').filter(function (post) {
    return post.published;
  });

  posts.forEach(function(post) {
    if (post.export_md !== false)
      mdData.push({
        path: post.path + post.slug + '.md',
        data: post.raw
      })
  });
  return mdData;
};

module.exports = ExportMD;
