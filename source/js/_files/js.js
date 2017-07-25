/*! Copyright 2017 Halyul */
console.info("%cCopyright © 2017 Halyul\n"+'Theme Version: 1.4.5'+'%c\nhttps://github.com/Halyul/hexo-theme-mdui',"font-size: 14px;color: #3F51B5;","color: #448AFF;text-decoration: none");

var $$ = mdui.JQ;

/* smooth scroll */
(function() {
  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    initSmoothScroll();
  } else {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  }
  function initSmoothScroll() {
    smoothScroll.init({
      selector: 'a',
      offset: 60
    });
  }
})();

/* global dialog */
(function() {
  var dialogs = document.querySelectorAll('.mdui-dialog');
  console.log(dialogs)
  if (dialogs !== null) {
    var html = document.querySelector('html');
    var body = document.querySelector('body');

    for (i = 0; i < dialogs.length; i++) {
      dialogs[i].addEventListener("open.mdui.dialog", openDialog);
      dialogs[i].addEventListener("close.mdui.dialog", closeDialog);
    }
    function openDialog() {
      body.classList.remove('drawer-overlay-none');
    }
    function closeDialog() {
      body.classList.add('drawer-overlay-none');
    }
  }
})();
