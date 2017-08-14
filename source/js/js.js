var drawer = new mdui.Drawer('#drawer');
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})

/* smooth scroll */
var smoothScroll = new SmoothScroll();

window.hashesJump = function(href) {
  var hrefY = document.getElementById(href).getBoundingClientRect().top  - 144
  var scrollY = hrefY + window.pageYOffset
  console.log(href, scrollY)
  smoothScroll.animateScroll( scrollY );
}

/*! router settings */
var root = null;
var useHash = true; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

// set the default route
router.on(
  function(params, query) {
    loadHTML('./templates', query, 'index')
  },
  {
    before: function (done, params) {
      burgerChanging('enter')
      done();
    },
    leave: function (params) {
      burgerChanging('leave')
    }
  }
);

router.on(
  {
    'posts/:slug': function(params, query) {
      var url = './posts/' + params.slug
      loadHTML(url, query, 'posts')
    },
    'posts': function() {
      router.navigate('/');
    },
    // BUG: not supports subcategory
    'categories/:category': function(params) {
      var url = './categories/' + params.category
      loadHTML(url)
    },
    'categories': function() {
      router.navigate('/');
    },
    'tags/:tag': function(params) {
      var url = './tags/' + params.tag
      loadHTML(url)
    },
    'tags': function() {
      router.navigate('/');
    },
    'archives/:year': function(params) {
      var url = './archives/' + params.year
      loadHTML(url)
    },
    'archives': function() {
      loadHTML('./archives')
    },
    ':pages': function(params, query) {
      var url = './' + params.pages
      loadHTML(url, query) // BUG:if the page is a post, toc will not work
    },
  }
);

router.notFound((query) => { document.querySelector('main').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>'; })

router.resolve();

function loadHTML(url, query, page) {
  req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = () => {
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
