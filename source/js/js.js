var drawer = new mdui.Drawer('#drawer', {swipe: true});
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})

function BarbaSettings() {
  // Barbajs settings
  var burger = document.querySelector('.theme-appbar-toolbar-top-burger');
  var BarbaIndex = Barba.BaseView.extend({
    namespace: 'index',
    onEnter: function() {
      burger.classList.remove('theme-appbar-toolbar-top-burger-arrow');
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
      burger.classList.remove('theme-appbar-toolbar-top-burger-menu');
      burger.classList.add('theme-appbar-toolbar-top-burger-arrow');
      burger.setAttribute('href', '/')
    },
    onEnterCompleted: function() {

    },
    onLeave: function() {
      burger.classList.add('theme-appbar-toolbar-top-burger-menu');
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

Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus) {
  console.log("currentStatus: ", currentStatus)
  console.log("prevStatus: ", prevStatus)
});
