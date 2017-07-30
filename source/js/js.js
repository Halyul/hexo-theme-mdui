var drawer = new mdui.Drawer('#drawer', {swipe: true});
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})

function BarbaSettings() {
  // Barbajs settings
  var burger = document.querySelector('.theme-toolbar-burger');
  var BarbaIndex = Barba.BaseView.extend({
    namespace: 'index',
    onEnter: function() {
      burger.classList.remove('back');
      burger.addEventListener('click', drawerToggle)
    },
    onEnterCompleted: function() {

    },
    onLeave: function() {
      burger.removeEventListener('click', drawerToggle)
      drawer.close();
    },
    onLeaveCompleted: function() {

    }
  });

  // Barbajs settings
  var BarbaNIndex = Barba.BaseView.extend({
    namespace: 'NIndex',
    onEnter: function() {
      burger.classList.add('back');
      burger.addEventListener('click', backToPrev)
    },
    onEnterCompleted: function() {

    },
    onLeave: function() {
      burger.removeEventListener('click', backToPrev)
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

function backToPrev() {
  window.history.back()
}

function drawerToggle() {
  drawer.toggle()
}
