var drawer = new mdui.Drawer('#drawer', {swipe: true});
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})

/* smooth scroll */
var smoothScroll = new SmoothScroll('a.theme-post__toc__content__link', {
	offset: 128
});

/* init pages
 * for barbajs
 */
 if (document.readyState === 'complete' || document.readyState !== 'loading') {
   initPages();
 } else {
   document.addEventListener('DOMContentLoaded', initPages);
 }

function initPages() {
  themeRuntime.init.posts.init();
  themeRuntime.init.post.init();
  themeRuntime.init.archive.init();
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
    loadProgress(true)
  },
  onLeave: function() {
    currentToPrev()
    fireListeners("posts")
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
  },
  onEnterCompleted: function() {
    loadProgress(true)
  },
  onLeave: function() {
    currentToPrev()
    fireListeners("post")
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
    loadProgress(true)
  },
  onLeave: function() {
    currentToPrev()
    fireListeners("archive")
  },
  onLeaveCompleted: function() {

  }
});

/* page transition
 * for barbajs
 * for the first time, the functions should be called
 */
var pageTransition = Barba.BaseTransition.extend({
  start: function() {
    loadProgress(false)
    if (document.querySelector('body').clientWidth < 1024) {
      drawer.close()
    }
    this.newContainerLoading.then(this.finish.bind(this));
  },
  finish: function() {
    loadProgress(true)
    this.done();
  }
 });
Barba.Pjax.getTransition = function() {
  return pageTransition;
};

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
  } else {
    if (pageStatus === true) {
      burger.classList.remove('theme-appbar__burger--menu');
      burger.classList.add('theme-appbar__burger--arrow', 'theme-appbar__burger--arrow-animate');
      burger.setAttribute('href', '/')
      burger.removeEventListener('click', drawerToggle)
    }
  }
}
function drawerToggle() {
  drawer.toggle()
}

function fireListeners(page) {
  var pageScripts = themeRuntime.scriptsMap[page]
  if (pageScripts === undefined) {
    return
  }
  for (var i = 0; i < pageScripts.length; i++) {
    var el = pageScripts[i].el
    el.removeEventListener(pageScripts[i].event, pageScripts[i].function)
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
