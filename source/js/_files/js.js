var links = document.querySelectorAll('a[href]');
var cbk = function(e) {
 if(e.currentTarget.href === window.location.href) {
   e.preventDefault();
   e.stopPropagation();
 }
};

for(var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', cbk);
}

themeRuntime.el = {
	drawer: new mdui.Drawer('#drawer', {swipe: true}),
	drawerEl: document.getElementById('drawer')
}
document.querySelector('#drawer-back').addEventListener('click', function() {
  themeRuntime.el.drawer.close()
})
themeRuntime.el.drawerEl.addEventListener('open.mdui.drawer', function() {
  document.getElementById('drawer-back').classList.remove('theme-appbar__burger--menu');
  document.getElementById('drawer-back').classList.add('theme-appbar__burger--arrow', 'theme-appbar__burger--arrow-animate');
});
themeRuntime.el.drawerEl.addEventListener('close.mdui.drawer', function() {
  var barbaContainer = document.querySelector('.barba-container')
  var namespace = barbaContainer.getAttribute('data-namespace')
  if (namespace === "posts") {
    document.getElementById('drawer-back').classList.remove('theme-appbar__burger--arrow', 'theme-appbar__burger--arrow-animate');
    document.getElementById('drawer-back').classList.add('theme-appbar__burger--menu');
  }
});

/* smooth scroll */
var smoothScroll = new SmoothScroll('a.theme-post__toc__content__link', {
	offset: 128
});

