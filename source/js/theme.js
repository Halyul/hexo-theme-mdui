/**
 * 设置文档主题
 */

(function () {
  var DEFAULT_PRIMARY = 'indigo';
  var DEFAULT_ACCENT = 'deep-orange';
  var DEFAULT_LAYOUT = '';

  var setTheme = function (theme) {
    if (typeof theme.primary === 'undefined') {
      theme.primary = false;
    }
    if (typeof theme.accent === 'undefined') {
      theme.accent = false;
    }
    if (typeof theme.layout === 'undefined') {
      theme.layout = false;
    }

    var i, len;
    var $body = $('body');

    var classStr = $body.attr('class');
    var classs = classStr.split(' ');

    // 设置主色
    if (theme.primary !== false) {
      for (i = 0, len = classs.length; i < len; i++) {
        if (classs[i].indexOf('mdui-theme-primary-') === 0) {
          $body.removeClass(classs[i])
        }
      }
      $body.addClass('mdui-theme-primary-' + theme.primary);
      document.cookie = 'website-theme-primary=' + theme.primary + ";domain=.halyul.cc";
    }

    // 设置强调色
    if (theme.accent !== false) {
      for (i = 0, len = classs.length; i < len; i++) {
        if (classs[i].indexOf('mdui-theme-accent-') === 0) {
          $body.removeClass(classs[i]);
        }
      }
      $body.addClass('mdui-theme-accent-' + theme.accent);
      document.cookie = 'website-theme-accent=' + theme.accent + ";domain=.halyul.cc";
    }

    // 设置主题色
    if (theme.layout !== false) {
      for (i = 0, len = classs.length; i < len; i++) {
        if (classs[i].indexOf('mdui-theme-layout-') === 0) {
          $body.removeClass(classs[i]);
        }
      }
      if (theme.layout !== '') {
        $body.addClass('mdui-theme-layout-' + theme.layout);
      }
      document.cookie = 'website-theme-layout=' + theme.layout + ";domain=.halyul.cc";
    }
  };

  // 切换主色
  $(document).on('change', 'input[name="website-theme-primary"]', function () {
    setTheme({
      primary: $(this).val()
    });
  });

  // 切换强调色
  $(document).on('change', 'input[name="website-theme-accent"]', function () {
    setTheme({
      accent: $(this).val()
    });
  });

  // 切换主题色
  $(document).on('change', 'input[name="website-theme-layout"]', function () {
   setTheme({
     layout: $(this).val()
   });
 });

  // 恢复默认主题
  $(document).on('cancel.mdui.dialog', '#theme', function () {
    setTheme({
      primary: DEFAULT_PRIMARY,
      accent: DEFAULT_ACCENT,
      layout: DEFAULT_LAYOUT
    });
  });
})();
