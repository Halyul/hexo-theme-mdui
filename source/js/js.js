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
    onEnterCompleted: function() {

    },
    onLeave: function() {
      burger.removeEventListener('click', drawerToggle)
      drawerClose()
    },
    onLeaveCompleted: function() {

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
    onEnterCompleted: function() {

    },
    onLeave: function() {
      burger.classList.add('theme-appbar__burger--menu');
      burger.setAttribute('href', 'javascript:;')
    },
    onLeaveCompleted: function() {

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
    if (prevStatus !== undefined && prevStatus.url !== undefined) {
      scrollMap[prevStatus.url] = window.pageYOffset;
    }
    if (scrollMap[currentStatus.url] !== undefined) {
      smoothScroll.animateScroll( scrollMap[currentStatus.url] );
    } else {
      smoothScroll.animateScroll( 0 );
    }
    this.done();
  }
});
Barba.Pjax.getTransition = function() {
  return pageTransition;
};
Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus) {
  console.log("currentStatus: ", currentStatus)
  console.log("prevStatus: ", prevStatus)
});
