/*! Copyright 2017 Halyul */
console.info("%cCopyright © 2017 Halyul\n"+'Theme Version: 1.4.1'+'%c\nhttps://github.com/Halyul/hexo-theme-mdui',"font-size: 14px;color: #3F51B5;","color: #448AFF;text-decoration: none");

var $$ = mdui.JQ;

/* smooth scroll */
(function() {
  $$(document).ready(function () {
    smoothScroll.init({
      selector: 'a',
      offset: 60
    });
  });
  $$('.toTop').on('click', function () {
    $$('button#toTop').trigger('click');
  });
})();

/* global dialog */
(function() {
  $$(document).on('open.mdui.dialog', '.mdui-dialog', function() {
      $$('html').css('overflow-y', 'hidden');
      $$('body').removeClass('drawer-overlay-none');
  });
  $$(document).on('close.mdui.dialog', '.mdui-dialog', function() {
      $$('html').css('overflow-y', 'auto');
      $$('body').addClass('drawer-overlay-none');
  });
})();
