# Custom pages

## Friends page
Enter the `source` folder in `hexo` folder, create a folder with the name you like, then enter it and create a `index.md` file, fill it with following content

```` markdown
---
title: MY FRIENDS
layout: friends
header: header of friends page, can be left blank
---
````

then go back to the `source` folder, enter the `_data` folder (if there isn't any, please create one), and create a file called `friends.yml` (**the name can't be changed**), using following format to creat links.

```` yaml
Example:
    link: Site address
    avatar: Avatar
    descr: Slogan or descrpition
````

## Gallery
Gallery supports multi album and single album.

### multi album
Create a `galleries.yml` in `source/_data` in the **HEXO FOLDER**, and configure it with following format.
And add a custom page anywhere in `source` in the **HEXO FOLDER**, and fill `layout: galleries`

```` yaml
Albun name:
  link: URL
  descr: album description or something else
  bg: default image
  logo: this can be ignored, a circular image, configure to see what the style like.
````

### single album
Please create a custom page anywhere in `source` in the **HEXO FOLDER**, and fill `layout: gallery`, **then add `photos: ` with following format in the `font-matter`**

```` markdown
photos:
  x:
    img: /img/bg.png
    descr: 'description goes here'
````

Configure to see what the style lik
