# Install
## Install the theme
You need following things：
- a hexo
- my theme

The theme just supports `git clone`, `npm install` will be supported later (or not supported).
```` bash
$ git clone https://github.com/Halyul/hexo-theme-mdui.git
````

Once you have finished clone, copy the folder to hexo `theme` foler , and rename to `mdui`
> The folder name can be changed to whatever you want, but needs to match the name below.

## Enable the theme
Then open hexo's `_config.yml`, find `theme` and change to folloing name to `mdui`(or the one you have set just now.)

!> Then run the following code to install in the `hexo` folder to prevent from getting errors when you run hexo

```` bash
$ npm install prismjs node-sass-magic-importer node-sass node-prismjs --save
````

!> Check HEXO's `_config.yml` `highlight` option. Make sure that

```` yaml
highlight:
  enable: false
````

Run `hexo s --debug` in terminal, open [http://localhost:4000](http://localhost:4000) to make sure the site is running without any problems.
