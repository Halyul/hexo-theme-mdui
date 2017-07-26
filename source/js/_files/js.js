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
