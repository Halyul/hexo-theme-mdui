/*! router settings */
var root = null;
var useHash = true; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

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
    }
  }
);

// posts route
router.on(
  'posts/:slug',
  function(params, query) {
    var url = './posts/' + params.slug
    loadHTML(url, query, 'posts')
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
    }
  }
);

router.on(
  'posts',
  function() {
    router.navigate('/');
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
    }
  }
);

// category route
// BUG: not supports subcategory
router.on(
  'categories/:category',
  function(params) {
    var url = './categories/' + params.category
    loadHTML(url)
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
    }
  }
);

router.on(
  'categories',
  function() {
    router.navigate('/');
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
    }
  }
);

// tag route
router.on(
  'tags/:tag',
  function(params) {
    var url = './tags/' + params.tag
    loadHTML(url)
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
    }
  }
);

router.on(
  'tags',
  function() {
    router.navigate('/');
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
    }
  }
);

// archive route
router.on(
  'archives/:year',
  function(params) {
    var url = './archives/' + params.year
    loadHTML(url)
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
    }
  }
);

router.on(
  'archives',
  function() {
    loadHTML('./archives')
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
    }
  }
);

router.on(
  ':pages',
  function(params, query) {
    var url = './' + params.pages
    loadHTML(url, query) // BUG:if the page is a post, toc will not work
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
    }
  }
);

router.notFound((query) => { document.querySelector('main').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>'; })

router.resolve();
