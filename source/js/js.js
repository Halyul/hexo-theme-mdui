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
  req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = () => {
    loadProgress(true)
    document.querySelector('main').innerHTML = req.responseText;
    burgerChanging(page);
    if (page === 'posts' && query !== '') {
      tocQueryItem(query)
    }
  }
}

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
    burger.setAttribute('href', '#/')
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
/*
var scrollMap = {};
var lastPage;
function scrollPosition() {
  var thisPage = router.lastRouteResolved();
  if (lastPage === undefined) {

  }
  console.log("scrollMap: ", scrollMap)
  console.log("lastPage: ", lastPage)
  console.log("thisPage: ", thisPage)
  lastPage = thisPage
}
*/
