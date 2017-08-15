window.themeRunning = {};
var drawer = new mdui.Drawer('#drawer');
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})

/* smooth scroll */
var smoothScroll = new SmoothScroll();

/*****
******
****** router functions
******
******
*/

function loadHTML(url, query, page) {
  fetch(url)
  .then(function(response) {
    return response.text()
  }).then(function(HTML) {
    loadProgress(true);
    document.querySelector('main').innerHTML = HTML
    scrollPositionEnter();
    burgerChanging(page);
    runScript();
    if (page === 'post' && query !== '') {
      tocQueryItem(query)
    }
  })
}

/*function loadJSON(url, query, page) {
  fetch(url)
  .then(function(response) {
    return response.text()
  }).then(function(JSON) {
    loadProgress(true);
    console.log(JSON)
    scrollPositionEnter();
    burgerChanging(page);
    runScript();
    if (page === 'post' && query !== '') {
      tocQueryItem(query)
    }
  })
}*/

function tocQueryItem(query) {
  var id = query.replace(/id=/,'')
  var idY = document.getElementById(id).getBoundingClientRect().top  - 144
  var scrollY = idY + window.pageYOffset
  smoothScroll.animateScroll( scrollY );
}

function burgerChanging(page) {
  var burger = document.querySelector('.theme-appbar__burger');
  if (page === 'index') {
    burger.classList.remove('theme-appbar__burger--arrow');
    burger.classList.add('theme-appbar__burger--menu');
    burger.setAttribute('href', 'javascript:;')
    burger.addEventListener('click', drawerToggle)
  } else {
    burger.classList.remove('theme-appbar__burger--menu');
    burger.classList.add('theme-appbar__burger--arrow');
    burger.setAttribute('href', '#!/')
    burger.removeEventListener('click', drawerToggle)
    drawerClose()
  }
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

function loadProgress(state) {
  var progressEl = document.getElementById('progressBar')
  if (state === true) {
    progressEl.classList.add('theme-appbar__progress--hidden')
  } else if (state === false) {
    progressEl.classList.remove('theme-appbar__progress--hidden')
  }
}

// scroll position
themeRunning.scrollMap = {}
function scrollPositionLeave() {
  var scrollY = window.pageYOffset
  return scrollY
}
function scrollPositionInit(scrollY) {
  var lastPage = router.lastRouteResolved();
  themeRunning.scrollMap[lastPage.url] = scrollY
}
function scrollPositionEnter() {
  var url = router.lastRouteResolved().url
  console.log(themeRunning.scrollMap)
  if (themeRunning.scrollMap[url] !== undefined) {
    smoothScroll.animateScroll( themeRunning.scrollMap[url] )
  } else {
    smoothScroll.animateScroll( 0 )
  }
}

// script running
themeRunning.scriptsMap = {};
function runScript() {
  var main = document.querySelector('main')
  var scripts = main.querySelectorAll('script')
  for (var i = 0; i < scripts.length; ++i) {
    eval(scripts[i].innerHTML)
  }
}

function fireListeners(page) {
  var pageScripts = themeRunning.scriptsMap[page]
  if (pageScripts === undefined) {
    return
  }
  for (var i = 0; i < pageScripts.length; i++) {
    var el = pageScripts[i].el
    el.removeEventListener(pageScripts[i].event, pageScripts[i].function)
  }
}
