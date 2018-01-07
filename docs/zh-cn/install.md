## 安装
您需要下列文件：
- 一个hexo
- 本主题

安装本主题目前仅支持`git clone`方式

```` bash
$ git clone https://github.com/Halyul/hexo-theme-mdui.git
````

clone完成后请将本文件夹复制到站点`themes`文件夹下，并修改文件名为为`mdui`。
> 文件夹名称可自由修改，并不是唯一的，只需与下面配置的`theme`字段与之对应即可。

## 启用本主题
然后打开**站点配置文件**，找到`theme`字段，并将其值更改为`mdui`。

!> **并在`站点目录`执行以下代码安装避免报错**

```` bash
$ npm install prismjs node-sass-magic-importer node-sass node-prismjs --save
````

!> **并将`站点配置`中的`highlight`项修改为以下配置**

```` yaml
highlight:
  enable: false
````

运行`hexo s --debug`，并访问[http://localhost:4000](http://localhost:4000)，确保站点正确运行。
