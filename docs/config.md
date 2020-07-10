## router
Use front-end router or not, if you choose to use the router version, it may cause performance drop on certain platforms.

available options are `true` and `false`

## style
- primary_color: Primary color

![red](https://img.shields.io/badge/primary_color-red-%23F44336.svg?style=flat-square&colorB=F44336) ![pink](https://img.shields.io/badge/primary_color-pink-%23E91E63.svg?style=flat-square&colorB=E91E63) ![purple](https://img.shields.io/badge/primary_color-purple-%239C27B0.svg?style=flat-square&colorB=9C27B0) ![deep-purple](https://img.shields.io/badge/primary_color-deep--purple-%23673AB7.svg?style=flat-square&colorB=673AB7) ![indigo](https://img.shields.io/badge/primary_color-indigo-%233F51B5.svg?style=flat-square&colorB=3F51B5) ![blue](https://img.shields.io/badge/primary_color-blue-%232196F3.svg?style=flat-square&colorB=2196F3) ![light-blue](https://img.shields.io/badge/primary_color-light--blue-%2303A9F4.svg?style=flat-square&colorB=03A9F4) ![cyan](https://img.shields.io/badge/primary_color-cyan-%2300BCD4.svg?style=flat-square&colorB=00BCD4) ![teal](https://img.shields.io/badge/primary_color-teal-%23009688.svg?style=flat-square&colorB=009688) ![green](https://img.shields.io/badge/primary_color-green-%234CAF50.svg?style=flat-square&colorB=4CAF50) ![light-green](https://img.shields.io/badge/primary_color-light--green-%238BC34A.svg?style=flat-square&colorB=8BC34A) ![lime](https://img.shields.io/badge/primary_color-lime-%23CDDC39.svg?style=flat-square&colorB=CDDC39) ![yellow](https://img.shields.io/badge/primary_color-yellow-%23FFEB3B.svg?style=flat-square&colorB=FFEB3B) ![amber](https://img.shields.io/badge/primary_color-amber-%23FFC107.svg?style=flat-square&colorB=FFC107) ![orange](https://img.shields.io/badge/primary_color-orange-%23FF9800.svg?style=flat-square&colorB=FF9800) ![deep-orange](https://img.shields.io/badge/primary_color-deep--orange-%23FF5722.svg?style=flat-square&colorB=FF5722) ![brown](https://img.shields.io/badge/primary_color-brown-%23795548.svg?style=flat-square&colorB=795548) ![grey](https://img.shields.io/badge/primary_color-grey-%239E9E9E.svg?style=flat-square&colorB=9E9E9E)

- accent_color: Accent color

![red](https://img.shields.io/badge/accent_color-red-%23FF5252.svg?style=flat-square&colorB=FF5252) ![pink](https://img.shields.io/badge/accent_color-pink-%23FF4081.svg?style=flat-square&colorB=FF4081) ![purple](https://img.shields.io/badge/accent_color-purple-%23E040FB.svg?style=flat-square&colorB=E040FB) ![deep-purple](https://img.shields.io/badge/accent_color-deep--purple-%237C4DFF.svg?style=flat-square&colorB=7C4DFF) ![indigo](https://img.shields.io/badge/accent_color-indigo-%23536DFE.svg?style=flat-square&colorB=536DFE) ![blue](https://img.shields.io/badge/accent_color-blue-%23448AFF.svg?style=flat-square&colorB=448AFF) ![light-blue](https://img.shields.io/badge/accent_color-light--blue-%2340C4FF.svg?style=flat-square&colorB=40C4FF) ![cyan](https://img.shields.io/badge/accent_color-cyan-%2318FFFF.svg?style=flat-square&colorB=18FFFF) ![teal](https://img.shields.io/badge/accent_color-teal-%2364FFDA.svg?style=flat-square&colorB=64FFDA) ![green](https://img.shields.io/badge/accent_color-green-%2369F0AE.svg?style=flat-square&colorB=69F0AE) ![light-green](https://img.shields.io/badge/accent_color-light--green-%23B2FF59.svg?style=flat-square&colorB=B2FF59) ![lime](https://img.shields.io/badge/accent_color-lime-%23EEFF41.svg?style=flat-square&colorB=EEFF41) ![yellow](https://img.shields.io/badge/accent_color-yellow-%23FFFF00.svg?style=flat-square&colorB=FFFF00) ![amber](https://img.shields.io/badge/accent_color-amber-%23FFD740.svg?style=flat-square&colorB=FFD740) ![orange](https://img.shields.io/badge/accent_color-orange-%23FFAB40.svg?style=flat-square&colorB=FFAB40) ![deep-orange](https://img.shields.io/badge/accent_color-deep--orange-%23FF6E40.svg?style=flat-square&colorB=FF6E40)

- bg_color: Global background color (needs to be set as HEX format)
- hoverable: all the cards can hover or not

## info
- bg_img: background image in `drawer` and `archive page`
- avatar: author's avatar
- slogan: author's slogan/description
- sns:
Here you can set up your contact information, please follow the format that left in the file. How to use icons please click [here](/advanced?id=icons)
> you can delete or comment content to disable.

```` yaml
Twitter:
    link: https://twitter.com
    fa: 'fa-twitter'
````

## HTML Head
Here you can set HTML head information.
- favicon
- high_res_favicon: high resolution favicon
- high_res_favicon: iOS launcher icon
- keywords: website keywords.

## Search
- search: blog search, available options are `true` and `false`, more details click [here](/plugins?id=Search)

## post
- entry_excerpt: how many posts summary words will be displayed in the index page.
- random_pics: Posts' random thumbnail，more information can be found[here](/advanced?id=random_pics)
- qr_code: posts/pages' qr code, for more information, please click [here](/plugins?id=qr_code)
- prism: code highlight
  - theme: theme setting, including:
    - a11y-dark
    - atom-dark
    - base16-light
    - cb
    - coy
    - darcula
    - dark
    - default
    - duotone-dark
    - duotone-earth
    - duotone-forest
    - duotone-light
    - duotone-sea
    - duotone-space
    - funky
    - ghcolors
    - hopscotch
    - okaidia
    - pojoaque
    - solarizedlight
    - tomorrow
    - twilight
    - vs
    - xonokai
  - line_number: whether show line numbers before the code, available options are `true` and `false`
- license: This sets global copyright license.
  - name: The name of copyright license, such as `CC License`, `LePtc License`, `Copyleft License`
  - link: The description of the license
  If the article needs a specified license, just add folloing lines in the `font-matter`
  ```` yaml
  license_name: The name of license
  license_link: The description of license
  ````
  !> ATTENTION! If you needs a license, these two options are required!

  Add
  ```` yaml
  export_md: false
  ````
  in `font-matter` can disable article markdown file download.

- word_count: Article words counter，more details can be found [here](/plugins?id=word_count)
- read_time: Reading time estimation，more details can be found [here](/plugins?id=word_count)
- donate: post donate, please configure it with the examples. How to use icons please click [here](/advanced?id=icons)

## share_menu
Setting uo the share menu. If you don't need any share options, please delete or comment following lines.
- rss: article rss, the link is the same as the `path` in ``hexo`` `_config.yml` under `feed`, available options are `true` and `false`, more details click [here](/plugins?id=rss).
- weibo: Sina Weibo, available options are `true` and `false`
- twitter: Twitter, available options are `true` and `false`
- facebook: Facebook, available options are `true` and `false`
- googleplus: Google+, available options are `true` and `false`
- linkedin: Linkedin, available options are `true` and `false`
- qq: QQ, available options are `true` and `false`
- telegram: Telegram, available options are `true` and `false`

## pages
How to use icons please click [here](/advanced?id=icons)
If you don't need this feature, please delete or comment content.

### uncategorized pages
Custom pages setting, please follow format which is left in the `_config.yml` or the one below.
```` yaml
- Test1:
  - link: "/test1"
  - type: 'internal' //If it is a external site，use 'external'
  - icon: "`&#xe84d;`"
````
These lines will generate an entrance of a link called `Test1`, links to `yoursite.com/test1`, and the icon is `&#xe84d;`.

### categorized pages
Custom pages support the pages which belong to the same category to be shown under a section, if you wants to enable it, please configure it with the format that the left in the file.

!> Key option is `cascade: true`

## sns
Here you can set up your contact information, please follow the format that left in the file. How to use icons please click [here](/advanced?id=icons)
> you can delete or comment content to disable.

```` yaml
Twitter:
    link: https://twitter.com
    fa: 'fa-twitter'
````

## comment
comment service plugin, available options are `disqus` and `custom`
- use: `disqus` or `custom`
- shortname: disqus short name, for example, `example.disqus.com`, so short name is `example`, if `use: custom`, this line is unavailable

If you want to use the comment service that I haven't add support, please click [here](/advanced?id=customComment) for configurations

## footer
- since: specify the date when the blog was setup

!> You can add current year now!
<br>For example, current year is `2017`, you set `2017`, so the whole `2017` year it will show `2017` and in `2018` shows `2017 - 2018`

- ICP: this is for users who are in China Mainland to show his/her ICP number.
- image: an image below at the bottom.
last_updated: show the last updated time in footer, available options are 'true' and 'false'

## node_sass:

!> DO NOT MODIFY!
