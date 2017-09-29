/*! router settings */
themeRuntime.router = {};
themeRuntime.router.siteRoot = null;
themeRuntime.router.useHash = true; // Defaults to: false
themeRuntime.router.hash = '#!'; // Defaults to: '#'
themeRuntime.router.currentState = {}
themeRuntime.router.lastState = {}
var router = new Navigo(themeRuntime.router.siteRoot, themeRuntime.router.useHash, themeRuntime.router.hash);

// set the index route
router.on(
  function(params, query) {
    loadHTML('./templates', query, 'index')
  },
  {
    before: function (done, params) {
      done();
    },
    leave: function (params) {
      loadProgress(false)
      scrollPositionLeave()
      scrollPositionInit(scrollY)
      fireListeners('index')
    }
  }
);

// posts route
router.on(
  'posts/:slug',
  function(params, query) {
    var url = './posts/' + params.slug
    loadHTML(url, query, 'post')
  },
  {
    before: function (done, params) {
      // doing some async operation
      done();
    },
    after: function (params) {
      // after resolving
    },
    leave: function (params) {
      loadProgress(false)
      scrollPositionLeave()
      scrollPositionInit(scrollY)
      fireListeners('post')
    }
  }
);

// category route
// BUG: not supports subcategory
router.on(
  'categories/:category',
  function(params) {
    var url = './categories/' + params.category
    loadHTML(url, false, 'category')
  },
  {
    before: function (done, params) {
      // doing some async operation
      done();
    },
    after: function (params) {
      // after resolving
    },
    leave: function (params) {
      loadProgress(false)
      scrollPositionLeave()
      scrollPositionInit(scrollY)
      fireListeners('posts')
    }
  }
);

// tag route
router.on(
  'tags/:tag',
  function(params) {
    var url = './tags/' + params.tag
    loadHTML(url, false, 'tag')
  },
  {
    before: function (done, params) {
      // doing some async operation
      done();
    },
    after: function (params) {
      // after resolving
    },
    leave: function (params) {
      loadProgress(false)
      scrollPositionLeave()
      scrollPositionInit(scrollY)
      fireListeners('posts')
    }
  }
);

// archive route
router.on(
  'archives/:year',
  function(params) {
    var url = './archives/' + params.year
    loadHTML(url, false, 'year')
  },
  {
    before: function (done, params) {
      // doing some async operation
      done();
    },
    after: function (params) {
      // after resolving
    },
    leave: function (params) {
      loadProgress(false)
      scrollPositionLeave()
      scrollPositionInit(scrollY)
      fireListeners('posts')
    }
  }
);

router.on(
  'archives',
  function() {
    loadHTML('./archives', false, 'archive')
  },
  {
    before: function (done, params) {
      // doing some async operation
      done();
    },
    after: function (params) {
      // after resolving
    },
    leave: function (params) {
      loadProgress(false)
      scrollPositionLeave()
      scrollPositionInit(scrollY)
      fireListeners('archives')
    }
  }
);

router
  .on({
    'posts': function () { router.navigate('/') },
    'categories': function () { router.navigate('/') },
    'tags': function () { router.navigate('/') }
  })

router.on(
  ':pages',
  function(params, query) {
    var url = './' + params.pages
    loadHTML(url, query, 'page') // BUG:if the page is a post, toc will not work
  },
  {
    before: function (done, params) {
      // doing some async operation
      done();
    },
    after: function (params) {
      // after resolving
    },
    leave: function (params) {
      loadProgress(false)
      scrollPositionLeave()
      scrollPositionInit(scrollY)
    }
  }
);

router.notFound((query) => { document.querySelector('main').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>'; })

router.resolve();
