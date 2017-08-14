var drawer = new mdui.Drawer('#drawer');
document.querySelector('#drawer-back').addEventListener('click', function() {
  drawer.close()
})

/* smooth scroll */
var smoothScroll = new SmoothScroll();

function drawerToggle() {
  drawer.toggle()
}
function drawerClose() {
  var clientWidth = document.body.clientWidth;
  if (clientWidth < 1024) {
    drawer.close();
  }
}

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
router.on(() => { loadHTML('./templates/index.html') });

router.on(
  {
    'posts/:slug': function(params, query) {
      var url = './posts/' + params.slug
      loadHTML(url, query, 'posts')
    },
    'categories/:category': function(params) {
      var url = './categories/' + params.category
      loadHTML(url)
    },
    'tags/:tag': function(params) {
      var url = './tags/' + params.tag
      loadHTML(url)
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
