function loadProgress() {
    document.getElementById('progressBar').classList.add('theme-appbar__progress--hidden')
};

function itemHighlight() {
  var drawerContent = document.querySelector('.theme-drawer__warpper__content')
  var currentHref = 'a[href="' + window.location.pathname + '"]'
  currentHref = decodeURI(currentHref)
  var drawerContent = document.querySelector('.theme-drawer__warpper__content')
  var item = drawerContent.querySelector(currentHref)

  var collapseItem = function (item) {
    var parent = item.parentNode;
    if (parent.classList.contains('mdui-collapse-item-body')) {
      var collapseEl = document.querySelector('.mdui-collapse')
      var collapse = mdui.Collapse(collapseEl);
      var ancestorEl = parent.parentNode;
      collapse.open(ancestorEl)
    }
  }

  if (item !== null) {
    var originHref = item.getAttribute('href')
    item.classList.add('mdui-list-item-active')
    item.setAttribute('origin-href', originHref)
    item.setAttribute('href', 'javascript:;')
    collapseItem(item)
  }
}

function drawerToggle() {
  var barbaContainer = document.querySelector('.barba-container')
  var namespace = barbaContainer.getAttribute('data-namespace')
  if (namespace === "posts") {
    themeRuntime.el.drawer.toggle()
  }
}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

function init() {
  loadProgress()
  itemHighlight()

  document.querySelector('.theme-appbar__burger').addEventListener('click', drawerToggle)
}
