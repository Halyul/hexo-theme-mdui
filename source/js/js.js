var drawer = new mdui.Drawer('#drawer', {swipe: true});
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})

function BarbaSettings() {
  // Barbajs settings
  var burger = document.querySelector('.theme-appbar__burger');
  var BarbaIndex = Barba.BaseView.extend({
    namespace: 'index',
    onEnter: function() {
      burger.classList.remove('theme-appbar__burger--arrow');
      burger.addEventListener('click', drawerToggle)
    },
    onLeave: function() {
      burger.removeEventListener('click', drawerToggle)
      drawerClose()
    }
  });

  // Barbajs settings
  var BarbaNIndex = Barba.BaseView.extend({
    namespace: 'NIndex',
    onEnter: function() {
      burger.classList.remove('theme-appbar__burger--menu');
      burger.classList.add('theme-appbar__burger--arrow');
      burger.setAttribute('href', '/')
    },
    onLeave: function() {
      burger.classList.add('theme-appbar__burger--menu');
      burger.setAttribute('href', 'javascript:;')
    }
  });

  // Don't forget to init the view!
  BarbaIndex.init();
  BarbaNIndex.init();
}

// init Barbajs
function initBarba() {
  BarbaSettings()
  Barba.Pjax.start();
  Barba.Prefetch.init();
}
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  initBarba();
} else {
  document.addEventListener('DOMContentLoaded', initBarba);
}

function drawerToggle() {
  drawer.toggle()
}
function drawerClose() {
  var clientWidth = document.body.clientWidth;
  if (clientWidth < 1024) {
    drawer.close();
  }
}

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

var scrollMap = {};
var pageTransition = Barba.BaseTransition.extend({
  start: function() {
    this.newContainerLoading.then(this.finish.bind(this));
  },

  finish: function() {
    var prevStatus = Barba.HistoryManager.prevStatus();
    var currentStatus = Barba.HistoryManager.currentStatus();
    var bodyScrolled = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    if (prevStatus !== undefined && prevStatus.url !== undefined) {
      scrollMap[prevStatus.url] = window.pageYOffset;
    }
    if (scrollMap[currentStatus.url] !== undefined) {
      smoothScroll.animateScroll( scrollMap[currentStatus.url] );
    } else if (bodyScrolled > 0) {
      smoothScroll.animateScroll( 0 );
    }
    this.done();
  }
});
Barba.Pjax.getTransition = function() {
  return pageTransition;
};

window.hashesJump = function(href) {
  var hrefY = document.getElementById(href).getBoundingClientRect().top  - 128
  var scrollY = hrefY + window.pageYOffset
  console.log(href, scrollY)
  smoothScroll.animateScroll( scrollY );
}
