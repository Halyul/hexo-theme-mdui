# 自定义页面

## 友链页面
进入`hexo`目录中`source`文件夹，新建一任意名字的文件夹，再进入刚刚新建的文件夹中新建一个`index.md`文件，并填入以下内容

```` markdown
---
title: 友情链接
layout: friends
header: 友链页面标语，可留空
---
````

然后在返回`source`文件夹，进入`_data`文件夹（若无请新建）新建一个`friends.yml`文件(**禁止改名**)，用以下格式创建友情链接

```` yaml
Example:
    link: 对方网站地址
    avatar: 对方头像
    descr: 对方的标语或描述
````

## 图库
图库支持多相册和单相册

### 多相册
请在 **站点目录** 的`source/_data`中新建一个`galleries.yml`文件，并按照以下格式进行配置；并在 **站点目录** 的`source`中任意位置建立一个自定义页面，填入`layout: galleries`

```` yaml
相册名称:
  link: 地址
  descr: 相册描述或其他文字
  bg: 显示的默认图片
  logo: 可忽略配置的选项，支持圆形图片，具体效果请执行配置
````

### 单相册
请在 **站点目录** 的`source`中任意位置建立一个自定义页面，填入`layout: gallery`， **并在`font-matter`中加入`photos: `并按照以下格式进行配置**

```` markdown
photos:
  x:
    img: /img/bg.png
    descr: '这里是描述'
````

具体效果请执行配置查看。
