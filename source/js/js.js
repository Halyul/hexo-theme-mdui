window.themeRuntime = {};
var drawer = new mdui.Drawer('#drawer', {swipe: true});
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})

/* smooth scroll */
var smoothScroll = new SmoothScroll('a.theme-post__toc__content__link', {
	offset: 128
});
