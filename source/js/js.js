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

var drawer = new mdui.Drawer('#drawer', {swipe: true});
var drawerEl = document.getElementById('drawer')
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})
drawerEl.addEventListener('open.mdui.drawer', function() {
  document.getElementById('drawer-back').classList.remove('theme-appbar__burger--menu');
  document.getElementById('drawer-back').classList.add('theme-appbar__burger--arrow', 'theme-appbar__burger--arrow-animate');
});
drawerEl.addEventListener('close.mdui.drawer', function() {
  var namespace = Barba.HistoryManager.currentStatus().namespace
  if (namespace === "posts") {
    document.getElementById('drawer-back').classList.remove('theme-appbar__burger--arrow', 'theme-appbar__burger--arrow-animate');
    document.getElementById('drawer-back').classList.add('theme-appbar__burger--menu');
  }
});

/* smooth scroll */
var smoothScroll = new SmoothScroll('a.theme-post__toc__content__link', {
	offset: 128
});

/* init pages
 * for barbajs
 */
Barba.Utils.errorPageUrl = '/404.html';
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  initPages();
} else {
  document.addEventListener('DOMContentLoaded', initPages);
}

function initPages() {
  themeRuntime.init.posts.init();
  themeRuntime.init.post.init();
  themeRuntime.init.archive.init();
  themeRuntime.init.galleries.init();
  themeRuntime.init.gallery.init();
  Barba.Pjax.cacheEnabled = false
  Barba.Pjax.start();
  themeRuntime.init.status = true;
}

themeRuntime.init = {};
themeRuntime.init.status = false;
themeRuntime.init.posts = Barba.BaseView.extend({
  namespace: 'posts',
  onEnter: function() {
    console.log('enter', 'posts')
    burgerChanging('posts')
    itemHightlight()
  },
  onEnterCompleted: function() {
    runScript()
    scrollPositionScroll()
    loadProgress(true)
  },
  onLeave: function() {
    currentToPrev()
    fireListeners("posts")
    scrollPositionStore()
  },
  onLeaveCompleted: function() {

  }
});
themeRuntime.init.post = Barba.BaseView.extend({
  namespace: 'post',
  onEnter: function() {
    console.log('enter', 'post')
    burgerChanging('post')
    itemHightlight()
    commentSystemReset()
  },
  onEnterCompleted: function() {
    runScript()
    scrollPositionScroll()
    loadProgress(true)
  },
  onLeave: function() {
    currentToPrev()
    fireListeners("post")
    scrollPositionStore()
  },
   onLeaveCompleted: function() {

  }
});
themeRuntime.init.archive = Barba.BaseView.extend({
  namespace: 'archive',
  onEnter: function() {
    console.log('enter', 'archive')
    burgerChanging('archive')
    itemHightlight()
  },
  onEnterCompleted: function() {
    runScript()
    scrollPositionScroll()
    loadProgress(true)
  },
  onLeave: function() {
    currentToPrev()
    fireListeners("archive")
    scrollPositionStore()
  },
  onLeaveCompleted: function() {

  }
});
themeRuntime.init.galleries = Barba.BaseView.extend({
  namespace: 'galleries',
  onEnter: function() {
    console.log('enter', 'galleries')
    burgerChanging('galleries')
    itemHightlight()
  },
  onEnterCompleted: function() {
    runScript()
    scrollPositionScroll()
    loadProgress(true)
  },
  onLeave: function() {
    currentToPrev()
    fireListeners("galleries")
    scrollPositionStore()
  },
  onLeaveCompleted: function() {

  }
});
themeRuntime.init.gallery = Barba.BaseView.extend({
  namespace: 'gallery',
  onEnter: function() {
    console.log('enter', 'gallery')
    burgerChanging('gallery')
    itemHightlight()
  },
  onEnterCompleted: function() {
    runScript()
    scrollPositionScroll()
    loadProgress(true)
  },
  onLeave: function() {
    currentToPrev()
    fireListeners("gallery")
    scrollPositionStore()
  },
  onLeaveCompleted: function() {

  }
});

/* page transition
 * for barbajs
 * for the first time, the functions should be called
 */
themeRuntime.scrollMap = {};
var pageTransition = Barba.BaseTransition.extend({
  start: function() {
    loadProgress(false)
    if (document.querySelector('body').clientWidth < 1024) {
      drawer.close()
    }
    this.newContainerLoading.then(this.finish.bind(this));
  },
  finish: function() {
    this.done();
  }
 });
Barba.Pjax.getTransition = function() {
  return pageTransition;
};

function scrollPositionStore() {
  var prevStatus = Barba.HistoryManager.prevStatus();
  if (prevStatus !== null && prevStatus.url !== undefined) {
    themeRuntime.scrollMap[prevStatus.url] = window.pageYOffset;
  }
}
function scrollPositionScroll() {
  var currentStatus = Barba.HistoryManager.currentStatus();
  var bodyScrolled = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  if (themeRuntime.scrollMap[currentStatus.url] !== undefined) {
    window.scrollTo(0, themeRuntime.scrollMap[currentStatus.url])
  } else if (bodyScrolled > 0) {
    window.scrollTo(0, 0);
  }
}

function loadProgress(state) {
  var progressEl = document.getElementById('progressBar')
  if (state === true) {
    progressEl.classList.add('theme-appbar__progress--hidden')
  } else if (state === false) {
    progressEl.classList.remove('theme-appbar__progress--hidden')
  }
}

function burgerChanging(page) {
  var burger = document.querySelector('.theme-appbar__burger');
  var pageStatus = themeRuntime.init.status
  if (page === "posts") {
    if (pageStatus === true) {
      burger.classList.remove('theme-appbar__burger--arrow', 'theme-appbar__burger--arrow-animate');
      burger.classList.add('theme-appbar__burger--menu');
      burger.setAttribute('href', 'javascript:;')
    }
    burger.addEventListener('click', drawerToggle)
    drawerEl.querySelector('#drawer-back').classList.add('theme-appbar__burger--menu')
    drawerEl.querySelector('#drawer-back').classList.remove('theme-appbar__burger--arrow')
  } else {
    if (pageStatus === true) {
      burger.classList.remove('theme-appbar__burger--menu');
      burger.classList.add('theme-appbar__burger--arrow', 'theme-appbar__burger--arrow-animate');
      burger.setAttribute('href', 'javascript:history.go(-1)')
      burger.removeEventListener('click', drawerToggle)
    }
    drawerEl.querySelector('#drawer-back').classList.remove('theme-appbar__burger--menu')
    drawerEl.querySelector('#drawer-back').classList.add('theme-appbar__burger--arrow')
  }
}
function drawerToggle() {
  drawer.toggle()
}

function runScript() {
  if (themeRuntime.init.status === true) {
    var main = document.querySelector('main')
    var scripts = main.querySelectorAll('script')
    for (var i = 0; i < scripts.length; ++i) {
      eval(scripts[i].innerHTML)
    }
  }
}

function fireListeners(page) {
  var pageScripts = themeRuntime.scriptsMap[page]
  if (pageScripts === undefined) {
    return
  }
  for (var i = 0; i < pageScripts.length; i++) {
    var el = pageScripts[i].el
    el.removeEventListener(pageScripts[i].event, pageScripts[i].function)
    pageScripts[i].removed = true
  }
}

/* highlight drawer item
 * for barbajs
 */
themeRuntime.router = {};
themeRuntime.router.currentStatus = {};
themeRuntime.router.prevStatus = {};

function currentToPrev() {
  themeRuntime.router.prevStatus.pathname = decodeURI(themeRuntime.router.currentStatus.pathname)
}

function itemHightlight() {
  themeRuntime.router.currentStatus.pathname = window.location.pathname
  var drawerContent = document.querySelector('.theme-drawer__warpper__content')
  var currentNamespace = Barba.HistoryManager.currentStatus().namespace
  if (Barba.HistoryManager.prevStatus() === null) {
    var prevNamespace = ''
  } else {
    var prevNamespace = Barba.HistoryManager.prevStatus().namespace
  }

  var cleanHighlight = function () {
    if (themeRuntime.router.prevStatus.pathname !== undefined) {
      var prevHref = 'a[origin-href="' + themeRuntime.router.prevStatus.pathname + '"]'
      var item = drawerContent.querySelector(prevHref)
      if (item !== null) {
        item.classList.remove('mdui-list-item-active')
        item.setAttribute('href', themeRuntime.router.prevStatus.pathname)
      }
    }
  }

  var collapseItem = function (item) {
    var parent = item.parentNode;
    if (parent.classList.contains('mdui-collapse-item-body')) {
      var collapseEl = document.querySelector('.mdui-collapse')
      var collapse = mdui.Collapse(collapseEl);
      var ancestorEl = parent.parentNode;
      collapse.open(ancestorEl)
    }
  }

  if (prevNamespace !== 'post') {
    cleanHighlight()
  }

  if (currentNamespace !== 'post') {
    var currentHref = 'a[href="' + themeRuntime.router.currentStatus.pathname + '"]'
    currentHref = decodeURI(currentHref)
    var item = drawerContent.querySelector(currentHref)
    if (item !== null) {
      var originHref = item.getAttribute('href')
      item.classList.add('mdui-list-item-active')
      item.setAttribute('origin-href', originHref)
      item.setAttribute('href', 'javascript:;')
      collapseItem(item)
    }
  }
}

document.body.addEventListener('touchmove', drawerAppbarMove);
document.body.addEventListener('touchend', drawerAppbarEnd);
function drawerAppbarMove(event) {
  var translate = drawerEl.style.transform
  var transition = drawerEl.style.transition
  translate = translate.replace(/\s+/g,"")
  translate = translate.replace(/translate\(/g,"")
  translate = translate.replace(/px,0px\)/g,"")
  translate = Math.abs(translate)
  drawerEl.querySelector('.theme-drawer__header__layer-1').style.setProperty("transform", "translateX(" + translate + "px)", "important");
  drawerEl.querySelector('.theme-drawer__header__layer-1').style.setProperty("transition", transition, "important");
}
function drawerAppbarEnd(event) {
  drawerEl.querySelector('.theme-drawer__header__layer-1').style.transform = null
  drawerEl.querySelector('.theme-drawer__header__layer-1').style.transition = null
}

function commentSystemReset() {
  if (themeRuntime.commentRest.status) {
    themeRuntime.commentRest.function(Barba.HistoryManager.currentStatus().url, Barba.HistoryManager.currentStatus().url, document.title)
  } else {
    themeRuntime.commentRest.status = true
  }
}
