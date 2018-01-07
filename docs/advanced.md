# Advanced settings

## Custom css and js
If you want to add some custom code like `font-face`, `Google Analytics`, etc., please create a `_custom` folder in the `layout` folder in theme folder, then create a `custom_head.ejs` file (the code inside  goes before `</head>` ) or a `custom_js.ejs` file (the code inside  goes before `</body>` ) to put your own code. At the same time, in the **theme config**, set `custom_head` or `custom_js` to `true` which is under `vendors`.

## ICONS
The theme supports `font awesome icons` and `Material icons`.
Add `fa: ` to the option that you want to use `font awesome icons`.
> You can find icons [here](http://fontawesome.io/icons/)

Add `md: ` to the option that you want to use `Material icons`.
> For icons that support modern browsers, you can find from [here](https://material.io/icons). When you find the one you need, click it, and copy the characters **after `https://material.io/icons/#ic_`**
> For icons that support all mainstream browsers, you can find from [here](http://www.mdui.org/docs/material_icon), but the site hasn't an English version. You can just browse the icon list or search an icon, click the one you need, copy the characters like `&#xe84d;`.

Add `null_icon: true` as a placeholer.

## service_worker
The theme has internal Service Worker support, if you need this feature, please open `source/sw.js` in the **THEME FOLDER**, and configure `ignoreFetch` to match your site setting, for more information, please google or yahoo; then, create a `offline.md` under `source` in the **HEXO FLODER**, **the format is the same as the hexo markdown**

available options are `true` and `pwa`

- true: only inject `Service Worker`
- pwa: The site supports Google's `Progressive Web Apps`

If you use `pwa`, please open `source/manifest.json` in the **THEME FOLDER** to configure, for how to configure please google or yahoo.

# Post

## Thumbnail
Post and custom page support thumbnail.
- thumbnail: By using this method, the post thumbnail will be showed between `post title` and `post content`.

## No comment, No category, No tag
add following content to `font-matter` to disable comment.
- comment: set it `false` to disable comment
And no category, no tag just needs to leave `categories: `, `tags: ` blank.

## Pinned Post
Just add `pinned: true` to `font-matter` to pin the post to top

## Custom Comment
please open `layout/_custom/custom_comment.ejs` in the theme folder, and paste the comment service code to this file.
If the comment service needs you to set the `source id (or something like that)` of the page, please fill it with `<%- config.url + config.root + page.path %>`

If you use the router version, please make sure your comment service supports `reset()` method, or your comments will be shown in same page.
For example，Disqus provides `reset()` method:
```` javascript
DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = newIdentifier;
          this.page.url = newUrl;
          this.page.title = newTitle;
        }
      });
````
If your comment service supports `reset()` method, please add following lines when you add your code:
```` javascript
themeRuntime.commentRest.function = function (newIdentifier, newUrl, newTitle) {
     example.reset({...})
   }
````
`example.reset({...})` is the `reset()` method that is provided by your comment service,if it needs identifier(s), please choose following identifiers:
- `newIdentifier` provides current page's URL
- `newUrl` is the same
- `newTitle` provides current page's title

## random_pics
This is the ramdom pictures for the posts which have not thumbnail. HEXO will choose a picture in  the theme folder `source/img/random` as post thumbnail.

If you don't need the feature, just leave here blank or set to `false`.

There are 44 built-in pictures. If you want to add pictures, please make sure the picture format is `png` and named as `number`, and change the numbers here, otherwise the thumbnail will not showed and you get a 404 in console.

!> No matter you add or delete pictures, please make sure the number starts from `1` and ends in number order.
