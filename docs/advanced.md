# Advanced settings

## Custom css and js
If you want to add some custom code like `font-face`, `Google Analytics`, etc., please create a `_custom` folder in the `layout` folder in theme folder, then create a `head.ejs` file (the code inside  goes before `</head>` ) or a `import_js.ejs` file (the code inside  goes before `</body>` ) to put your own code.

!> You need to enable the `custom_head` and/or `custom_js` under `vendors` in theme `_config.yml`

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

## index page
### notification
Through this feature, you can add announcements or notifications to index page without regenerate your blog files.
You can add multiple lines as you writing `source/notification.json` in `theme folder` in **array** type.
It has been added some examples, you can see what it looks like.

## archive page

### about_me
This is the `about` dialog in the `archive page`. If you need it, please create `about.yml` under `source/_data` in the **HEXO FOLDER**, and choose a following format to fill in. You can directly copy and paste to see the style.

Options:

```` yaml
slogan: show the slogan/description or not, available options is `true`, or just leave it blank.
others: the text under slogan/description. (these two options are independent)
  - '1'
  - '2'
````

Format 1:

```` yaml
hellow:
  main:
    hi:
      content: xxxxxx
      s_img: /img/avatar.png
    hi1:
      content: xx
      link: //google.com
      s_img: /img/favicon.png
    hi2:
      content: aaaa
  more:
    hi3:
      content: '561456415341'
      link: //google.com
      s_img: /img/favicon.png
    hi4:
      content: 'xxxxxxx'
      s_img: /img/favicon.png
````

Format 2:

```` yaml
hellow1:
  main:
    hi:
      content: xxxxxx
      one_line: true
    hi1:
      content: xx
      fa: 'fa-beer'
    工作經歷:
      content: xxxx
      content_1: Designer & Developer，2222
  more:
    hi3:
      content: '1111'
      one_line: true
      s_img: /img/favicon.png
    hi4:
      content: '1111'
      one_line: true
      c_img: /img/favicon.png
````

Format 3:

```` yaml
hellow2:
  main:
    hi:
      content: xxxxxx
      one_line: true
      md: 'home'
    hi1:
      content: xx
      link: 'xxxx/xxx'
      fa: 'fa-beer'
    工作經歷:
      content: xxxx
      content_1: Designer & Developer，2222
  more:
    hi3:
      content: '1111'
      one_line: true
      null_icon: true
    hi4:
      content: '1111'
      one_line: true
      fa: 'fa-qq'
````

Some options meaning:
- one_line: single line content, if this is `true`, the text in `content: ` will not be rendered.
- fa/md/null_icon: How to use icons please click [here](/advanced?id=icons)
- content_1: text that below the text from `content: `
- link: web address
- s_img: square picture that shows before the section content.
- c_img: circular picture that shows before the section content.

# Post

## Thumbnail
Post and custom page support thumbnail.
- thumbnail: By using this method, the post thumbnail will be showed between `post title` and `post content`.

## Custom primary &/ accent color in post and custom page
When you write post, add `primary_color` and/or `accent_color` in the `font-matter` can change this post's theme color. Colors name is the same as [Color](/advanced?id=color)

eg.
```` markdown
title: This is title
primary_color: grey
accent_color: red
-----------
````

## No comment, No category, No tag
add following content to `font-matter` to disable comment.
- comment: set it `false` to disable comment
And no category, no tag just needs to leave `categories: `, `tags: ` blank.

## Pinned Post
Just add `pinned: true` to `font-matter` to pin the post to top

## customComment
please open `layout/_custom/comment.ejs` in the theme folder (if you don't see this file, please creat one), and paste the comment service code to this file.
If the comment service needs you to set the `source id (or something like that)` of the page, please fill it with `<%- config.url + config.root + page.path %>`
