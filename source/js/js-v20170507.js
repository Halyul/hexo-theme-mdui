/*!
 * mdui v0.2.0 (http://mdui.org) - Custom Build
 * Copyright 2016-2017 zdhxiong
 * Licensed under MIT
 */
/* jshint ignore:start */
;(function (window, document, undefined) {
  'use strict';

  /* jshint ignore:end */
  var mdui = {};

  /**
   * =============================================================================
   * ************   浏览器兼容性问题修复   ************
   * =============================================================================
   */

  /**
   * requestAnimationFrame
   * cancelAnimationFrame
   */
  (function () {
    var lastTime = 0;

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = window.webkitRequestAnimationFrame;
      window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));

        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);

        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })();


  /**
   * =============================================================================
   * ************   JavaScript 工具库，语法和 jQuery 类似   ************
   * =============================================================================
   */
  /* jshint ignore:start */
  var $ = (function (window, document, undefined) {
    'use strict';
  /* jshint ignore:end */


    var emptyArray = [];
    var slice = emptyArray.slice;
    var concat = emptyArray.concat;
    var isArray = Array.isArray;

    var documentElement = document.documentElement;

    /**
     * 是否是类数组的数据
     * @param obj
     * @returns {boolean}
     */
    function isArrayLike(obj) {
      return typeof obj.length === 'number';
    }

    /**
     * 循环数组或对象
     * @param obj
     * @param callback
     * @returns {*}
     */
    function each(obj, callback) {
      var i;
      var prop;

      if (isArrayLike(obj)) {
        for (i = 0; i < obj.length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            return obj;
          }
        }
      } else {
        for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (callback.call(obj[prop], prop, obj[prop]) === false) {
              return obj;
            }
          }
        }
      }

      return obj;
    }

    function map(elems, callback) {
      var value;
      var ret = [];

      each(elems, function (i, elem) {
        value = callback(elem, i);
        if (value !== null && value !== undefined) {
          ret.push(value);
        }
      });

      return concat.apply([], ret);
    }

    /**
     * 把对象合并到第一个参数中，并返回第一个参数
     * @param first
     * @param second
     * @returns {*}
     */
    function merge(first, second) {
      each(second, function (i, val) {
        first.push(val);
      });

      return first;
    }

    /**
     * 返回去重后的数组
     * @param arr
     * @returns {Array}
     */
    function unique(arr) {
      var unique = [];
      for (var i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
          unique.push(arr[i]);
        }
      }

      return unique;
    }

    /**
     * 是否是 null
     * @param obj
     * @returns {boolean}
     */
    function isNull(obj) {
      return obj === null;
    }

    /**
     * 判断一个节点名
     * @param ele
     * @param name
     * @returns {boolean}
     */
    function nodeName(ele, name) {
      return ele.nodeName && ele.nodeName.toLowerCase() === name.toLowerCase();
    }

    function isFunction(fn) {
      return typeof fn === 'function';
    }

    function isString(obj) {
      return typeof obj === 'string';
    }

    function isObject(obj) {
      return typeof obj === 'object';
    }

    /**
     * 除去 null 后的 object 类型
     * @param obj
     * @returns {*|boolean}
     */
    function isObjectLike(obj) {
      return isObject(obj) && !isNull(obj);
    }

    function isWindow(win) {
      return win && win === win.window;
    }

    function isDocument(doc) {
      return doc && doc.nodeType === doc.DOCUMENT_NODE;
    }

    var elementDisplay = {};

    /**
     * 获取元素的默认 display 样式值，用于 .show() 方法
     * @param nodeName
     * @returns {*}
     */
    function defaultDisplay(nodeName) {
      var element;
      var display;

      if (!elementDisplay[nodeName]) {
        element = document.createElement(nodeName);
        document.body.appendChild(element);
        display = getComputedStyle(element, '').getPropertyValue('display');
        element.parentNode.removeChild(element);
        if (display === 'none') {
          display = 'block';
        }

        elementDisplay[nodeName] = display;
      }

      return elementDisplay[nodeName];
    }


    var JQ = function (arr) {
      var _this = this;

      for (var i = 0; i < arr.length; i++) {
        _this[i] = arr[i];
      }

      _this.length = arr.length;

      return this;
    };

    /**
     * @param selector {String|Function|Node|Window|NodeList|Array|JQ=}
     * @returns {JQ}
     */
    var $ = function (selector) {
      var arr = [];
      var i = 0;

      if (!selector) {
        return new JQ(arr);
      }

      if (selector instanceof JQ) {
        return selector;
      }

      if (isString(selector)) {
        var els;
        var tempParent;
        selector = selector.trim();

        // 创建 HTML 字符串
        if (selector[0] === '<' && selector[selector.length - 1] === '>') {
          // HTML
          var toCreate = 'div';
          if (selector.indexOf('<li') === 0) {
            toCreate = 'ul';
          }

          if (selector.indexOf('<tr') === 0) {
            toCreate = 'tbody';
          }

          if (selector.indexOf('<td') === 0 || selector.indexOf('<th') === 0) {
            toCreate = 'tr';
          }

          if (selector.indexOf('<tbody') === 0) {
            toCreate = 'table';
          }

          if (selector.indexOf('<option') === 0) {
            toCreate = 'select';
          }

          tempParent = document.createElement(toCreate);
          tempParent.innerHTML = selector;
          for (i = 0; i < tempParent.childNodes.length; i++) {
            arr.push(tempParent.childNodes[i]);
          }
        }

        // 选择器
        else {

          // id 选择器
          if (selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            els = [document.getElementById(selector.slice(1))];
          }

          // 其他选择器
          else {
            els = document.querySelectorAll(selector);
          }

          for (i = 0; i < els.length; i++) {
            if (els[i]) {
              arr.push(els[i]);
            }
          }
        }
      }

      // function
      else if (isFunction(selector)) {
        return $(document).ready(selector);
      }

      // Node
      else if (selector.nodeType || selector === window || selector === document) {
        arr.push(selector);
      }

      // NodeList
      else if (selector.length > 0 && selector[0].nodeType) {
        for (i = 0; i < selector.length; i++) {
          arr.push(selector[i]);
        }
      }

      return new JQ(arr);
    };

    $.fn = JQ.prototype;

    /**
     * 扩展函数和原型属性
     * @param obj
     */
    $.extend = $.fn.extend = function (obj) {
      if (obj === undefined) {
        return this;
      }

      var length = arguments.length;
      var prop;
      var i;
      var options;

      // $.extend(obj)
      if (length === 1) {
        for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            this[prop] = obj[prop];
          }
        }

        return this;
      }

      // $.extend({}, defaults[, obj])
      for (i = 1; i < length; i++) {
        options = arguments[i];
        for (prop in options) {
          if (options.hasOwnProperty(prop)) {
            obj[prop] = options[prop];
          }
        }
      }

      return obj;
    };

    $.extend({

      /**
       * 遍历对象
       * @param obj {String|Array|Object}
       * @param callback {Function}
       * @returns {Array|Object}
       */
      each: each,

      /**
       * 合并两个数组，返回的结果会修改第一个数组的内容
       * @param first {Array}
       * @param second {Array}
       * @returns {Array}
       */
      merge: merge,

      /**
       * 删除数组中重复元素
       * @param arr {Array}
       * @returns {Array}
       */
      unique: unique,

      /**
       * 通过遍历集合中的节点对象，通过函数返回一个新的数组，null 或 undefined 将被过滤掉。
       * @param elems
       * @param callback
       * @returns {Array}
       */
      map: map,

      /**
       * 一个 DOM 节点是否包含另一个 DOM 节点
       * @param parent {Node} 父节点
       * @param node {Node} 子节点
       * @returns {Boolean}
       */
      contains: function (parent, node) {
        if (parent && !node) {
          return documentElement.contains(parent);
        }

        return parent !== node && parent.contains(node);
      },

      /**
       * 将数组或对象序列化
       * @param obj
       * @returns {String}
       */
      param: function (obj) {
        if (!isObjectLike(obj)) {
          return '';
        }

        var args = [];
        each(obj, function (key, value) {
          destructure(key, value);
        });

        return args.join('&');

        function destructure(key, value) {
          var keyTmp;

          if (isObjectLike(value)) {
            each(value, function (i, v) {
              if (isArray(value) && !isObjectLike(v)) {
                keyTmp = '';
              } else {
                keyTmp = i;
              }

              destructure(key + '[' + keyTmp + ']', v);
            });
          } else {
            if (!isNull(value) && value !== '') {
              keyTmp = '=' + encodeURIComponent(value);
            } else {
              keyTmp = '';
            }

            args.push(encodeURIComponent(key) + keyTmp);
          }
        }
      },
    });

    $.fn.extend({

      /**
       * 遍历对象
       * @param callback {Function}
       * @return {JQ}
       */
      each: function (callback) {
        return each(this, callback);
      },

      /**
       * 通过遍历集合中的节点对象，通过函数返回一个新的对象，null 或 undefined 将被过滤掉。
       * @param callback {Function}
       * @returns {JQ}
       */
      map: function (callback) {
        return new JQ(map(this, function (el, i) {
          return callback.call(el, i, el);
        }));
      },

      /**
       * 获取指定 DOM 元素，没有 index 参数时，获取所有 DOM 的数组
       * @param index {Number=}
       * @returns {Node|Array}
       */
      get: function (index) {
        return index === undefined ?
          slice.call(this) :
          this[index >= 0 ? index : index + this.length];
      },

      /**
       * array中提取的方法。从start开始，如果end 指出。提取不包含end位置的元素。
       * @param argument {start, end}
       * @returns {JQ}
       */
      slice: function (argument) {
        return new JQ(slice.apply(this, arguments));
      },

      /**
       * 筛选元素集合
       * @param selector {String|JQ|Node|Function}
       * @returns {JQ}
       */
      filter: function (selector) {
        if (isFunction(selector)) {
          return this.map(function (index, ele) {
            return selector.call(ele, index, ele) ? ele : undefined;
          });
        } else {
          var $selector = $(selector);
          return this.map(function (index, ele) {
            return $selector.index(ele) > -1 ? ele : undefined;
          });
        }
      },

      /**
       * 从元素集合中删除指定的元素
       * @param selector {String|Node|JQ|Function}
       * @return {JQ}
       */
      not: function (selector) {
        var $excludes = this.filter(selector);
        return this.map(function (index, ele) {
          return $excludes.index(ele) > -1 ? undefined : ele;
        });
      },

      /**
       * 获取元素相对于 document 的偏移
       * @returns {Object}
       */
      offset: function () {
        if (this[0]) {
          var offset = this[0].getBoundingClientRect();
          return {
            left: offset.left + window.pageXOffset,
            top: offset.top + window.pageYOffset,
            width: offset.width,
            height: offset.height,
          };
        }

        return null;
      },

      /**
       * 返回最近的用于定位的父元素
       * @returns {*|JQ}
       */
      offsetParent: function () {
        return this.map(function () {
          var offsetParent = this.offsetParent;

          while (offsetParent && $(offsetParent).css('position') === 'static') {
            offsetParent = offsetParent.offsetParent;
          }

          return offsetParent || documentElement;
        });
      },

      /**
       * 获取元素相对于父元素的偏移
       * @return {Object}
       */
      position: function () {
        var _this = this;

        if (!_this[0]) {
          return null;
        }

        var offsetParent;
        var offset;
        var parentOffset = {
          top: 0,
          left: 0,
        };

        if (_this.css('position') === 'fixed') {
          offset = _this[0].getBoundingClientRect();
        } else {
          offsetParent = _this.offsetParent();
          offset = _this.offset();
          if (!nodeName(offsetParent[0], 'html')) {
            parentOffset = offsetParent.offset();
          }

          parentOffset = {
            top: parentOffset.top + offsetParent.css('borderTopWidth'),
            left: parentOffset.left + offsetParent.css('borderLeftWidth'),
          };
        }

        return {
          top: offset.top - parentOffset.top - _this.css('marginTop'),
          left: offset.left - parentOffset.left - _this.css('marginLeft'),
          width: offset.width,
          height: offset.height,
        };
      },

      /**
       * 显示指定元素
       * @returns {JQ}
       */
      show: function () {
        return this.each(function () {
          if (this.style.display === 'none') {
            this.style.display = '';
          }

          if (window.getComputedStyle(this, '').getPropertyValue('display') === 'none') {
            this.style.display = defaultDisplay(this.nodeName);
          }
        });
      },

      /**
       * 隐藏指定元素
       * @returns {JQ}
       */
      hide: function () {
        return this.each(function () {
          this.style.display = 'none';
        });
      },

      /**
       * 切换元素的显示状态
       * @returns {JQ}
       */
      toggle: function () {
        return this.each(function () {
          this.style.display = this.style.display === 'none' ? '' : 'none';
        });
      },

      /**
       * 是否含有指定的 CSS 类
       * @param className {String}
       * @returns {boolean}
       */
      hasClass: function (className) {
        if (!this[0] || !className) {
          return false;
        }

        return this[0].classList.contains(className);
      },

      /**
       * 移除指定属性
       * @param attr {String}
       * @returns {JQ}
       */
      removeAttr: function (attr) {
        return this.each(function () {
          this.removeAttribute(attr);
        });
      },

      /**
       * 删除属性值
       * @param name {String}
       * @returns {JQ}
       */
      removeProp: function (name) {
        return this.each(function () {
          try {
            delete this[name];
          } catch (e) {}
        });
      },

      /**
       * 获取当前对象中第n个元素
       * @param index {Number}
       * @returns {JQ}
       */
      eq: function (index) {
        var ret = index === -1 ? this.slice(index) : this.slice(index, +index + 1);
        return new JQ(ret);
      },

      /**
       * 获取对象中第一个元素
       * @returns {JQ}
       */
      first: function () {
        return this.eq(0);
      },

      /**
       * 获取对象中最后一个元素
       * @returns {JQ}
       */
      last: function () {
        return this.eq(-1);
      },

      /**
       * 获取一个元素的位置。
       * 当 ele 参数没有给出时，返回当前元素在兄弟节点中的位置。
       * 有给出了 ele 参数时，返回 ele 元素在当前对象中的位置
       * @param ele {Selector|Node=}
       * @returns {Number}
       */
      index: function (ele) {
        if (!ele) {
          // 获取当前 JQ 对象的第一个元素在同辈元素中的位置
          return this.eq(0).parent().children().get().indexOf(this[0]);
        } else if (isString(ele)) {
          // 返回当前 JQ 对象的第一个元素在指定选择器对应的元素中的位置
          return $(ele).eq(0).parent().children().get().indexOf(this[0]);
        } else {
          // 返回指定元素在当前 JQ 对象中的位置
          return this.get().indexOf(ele);
        }
      },

      /**
       * 根据选择器、DOM元素或 JQ 对象来检测匹配元素集合，
       * 如果其中至少有一个元素符合这个给定的表达式就返回true
       * @param selector {String|Node|NodeList|Array|JQ|Window}
       * @returns boolean
       */
      is: function (selector) {
        var _this = this[0];

        if (!_this || selector === undefined || selector === null) {
          return false;
        }

        var $compareWith;
        var i;
        if (isString(selector)) {
          if (_this === document || _this === window) {
            return false;
          }

          var matchesSelector =
            _this.matches ||
            _this.matchesSelector ||
            _this.webkitMatchesSelector ||
            _this.mozMatchesSelector ||
            _this.oMatchesSelector ||
            _this.msMatchesSelector;

          return matchesSelector.call(_this, selector);
        } else if (selector === document || selector === window) {
          return _this === selector;
        } else {
          if (selector.nodeType || isArrayLike(selector)) {
            $compareWith = selector.nodeType ? [selector] : selector;
            for (i = 0; i < $compareWith.length; i++) {
              if ($compareWith[i] === _this) {
                return true;
              }
            }

            return false;
          }

          return false;
        }
      },

      /**
       * 根据 CSS 选择器找到后代节点的集合
       * @param selector {String}
       * @returns {JQ}
       */
      find: function (selector) {
        var foundElements = [];

        this.each(function (i, _this) {
          merge(foundElements, _this.querySelectorAll(selector));
        });

        return new JQ(foundElements);
      },

      /**
       * 找到直接子元素的元素集合
       * @param selector {String=}
       * @returns {JQ}
       */
      children: function (selector) {
        var children = [];
        this.each(function (i, _this) {
          each(_this.childNodes, function (i, childNode) {
            if (childNode.nodeType !== 1) {
              return true;
            }

            if (!selector || (selector && $(childNode).is(selector))) {
              children.push(childNode);
            }
          });
        });

        return new JQ(unique(children));
      },

      /**
       * 保留含有指定子元素的元素，去掉不含有指定子元素的元素
       * @param selector {String|Node|JQ|NodeList|Array}
       * @return {JQ}
       */
      has: function (selector) {
        var $targets = isString(selector) ? this.find(selector) : $(selector);
        var len = $targets.length;
        return this.filter(function () {
          for (var i = 0; i < len; i++) {
            if ($.contains(this, $targets[i])) {
              return true;
            }
          }
        });
      },

      /**
       * 取得同辈元素的集合
       * @param selector {String=}
       * @returns {JQ}
       */
      siblings: function (selector) {
        return this.prevAll(selector).add(this.nextAll(selector));
      },

      /**
       * 返回首先匹配到的父节点，包含父节点
       * @param selector {String}
       * @returns {JQ}
       */
      closest: function (selector) {
        var _this = this;

        if (!_this.is(selector)) {
          _this = _this.parents(selector).eq(0);
        }

        return _this;
      },

      /**
       * 删除所有匹配的元素
       * @returns {JQ}
       */
      remove: function () {
        return this.each(function (i, _this) {
          if (_this.parentNode) {
            _this.parentNode.removeChild(_this);
          }
        });
      },

      /**
       * 添加匹配的元素到当前对象中
       * @param selector {String|JQ}
       * @returns {JQ}
       */
      add: function (selector) {
        return new JQ(unique(merge(this.get(), $(selector))));
      },

      /**
       * 删除子节点
       * @returns {JQ}
       */
      empty: function () {
        return this.each(function () {
          this.innerHTML = '';
        });
      },

      /**
       * 通过深度克隆来复制集合中的所有元素。
       * (通过原生 cloneNode 方法深度克隆来复制集合中的所有元素。此方法不会有数据和事件处理程序复制到新的元素。这点和jquery中利用一个参数来确定是否复制数据和事件处理不相同。)
       * @returns {JQ}
       */
      clone: function () {
        return this.map(function () {
          return this.cloneNode(true);
        });
      },

      /**
       * 用新元素替换当前元素
       * @param newContent {String|Node|NodeList|JQ}
       * @returns {JQ}
       */
      replaceWith: function (newContent) {
        return this.before(newContent).remove();
      },

      /**
       * 将表单元素的值组合成键值对数组
       * @returns {Array}
       */
      serializeArray: function () {
        var result = [];
        var $ele;
        var type;
        var ele = this[0];

        if (!ele || !ele.elements) {
          return result;
        }

        $(slice.call(ele.elements)).each(function () {
          $ele = $(this);
          type = $ele.attr('type');
          if (
            this.nodeName.toLowerCase() !== 'fieldset' &&
            !this.disabled &&
            ['submit', 'reset', 'button'].indexOf(type) === -1 &&
            (['radio', 'checkbox'].indexOf(type) === -1 || this.checked)
          ) {
            result.push({
              name: $ele.attr('name'),
              value: $ele.val(),
            });
          }
        });

        return result;
      },

      /**
       * 将表单元素或对象序列化
       * @returns {String}
       */
      serialize: function () {
        var result = [];
        each(this.serializeArray(), function (i, elm) {
          result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
        });

        return result.join('&');
      },
    });

    /**
     * val - 获取或设置元素的值
     * @param value {String=}
     * @return {*|JQ}
     */
    /**
     * html - 获取或设置元素的 HTML
     * @param value {String=}
     * @return {*|JQ}
     */
    /**
     * text - 获取或设置元素的内容
     * @param value {String=}
     * @return {*|JQ}
     */
    each(['val', 'html', 'text'], function (nameIndex, name) {
      var props = {
        0: 'value',
        1: 'innerHTML',
        2: 'textContent',
      };

      var defaults = {
        0: undefined,
        1: undefined,
        2: null,
      };

      $.fn[name] = function (value) {
        if (value === undefined) {
          // 获取值
          return this[0] ? this[0][props[nameIndex]] : defaults[nameIndex];
        } else {
          // 设置值
          return this.each(function (i, ele) {
            ele[props[nameIndex]] = value;
          });
        }
      };
    });

    /**
     * attr - 获取或设置元素的属性值
     * @param {name|props|key,value=}
     * @return {String|JQ}
     */
    /**
     * prop - 获取或设置元素的属性值
     * @param {name|props|key,value=}
     * @return {String|JQ}
     */
    /**
     * css - 获取或设置元素的样式
     * @param {name|props|key,value=}
     * @return {String|JQ}
     */
    each(['attr', 'prop', 'css'], function (nameIndex, name) {
      var set = function (ele, key, value) {
        if (nameIndex === 0) {
          ele.setAttribute(key, value);
        } else if (nameIndex === 1) {
          ele[key] = value;
        } else {
          ele.style[key] = value;
        }
      };

      var get = function (ele, key) {
        if (!ele) {
          return undefined;
        }

        var value;
        if (nameIndex === 0) {
          value = ele.getAttribute(key);
        } else if (nameIndex === 1) {
          value = ele[key];
        } else {
          value = window.getComputedStyle(ele, null).getPropertyValue(key);
        }

        return value;
      };

      $.fn[name] = function (key, value) {
        var argLength = arguments.length;

        if (argLength === 1 && isString(key)) {
          // 获取值
          return get(this[0], key);
        } else {
          // 设置值
          return this.each(function (i, ele) {
            if (argLength === 2) {
              set(ele, key, value);
            } else {
              each(key, function (k, v) {
                set(ele, k, v);
              });
            }
          });
        }
      };
    });

    /**
     * addClass - 添加 CSS 类，多个类名用空格分割
     * @param className {String}
     * @return {JQ}
     */
    /**
     * removeClass - 移除 CSS 类，多个类名用空格分割
     * @param className {String}
     * @return {JQ}
     */
    /**
     * toggleClass - 切换 CSS 类名，多个类名用空格分割
     * @param className {String}
     * @return {JQ}
     */
    each(['add', 'remove', 'toggle'], function (nameIndex, name) {
      $.fn[name + 'Class'] = function (className) {
        if (!className) {
          return this;
        }

        var classes = className.split(' ');
        return this.each(function (i, ele) {
          each(classes, function (j, cls) {
            ele.classList[name](cls);
          });
        });
      };
    });

    /**
     * width - 获取元素的宽度
     * @return {Number}
     */
    /**
     * height - 获取元素的高度
     * @return {Number}
     */
    each({
      Width: 'width',
      Height: 'height',
    }, function (prop, name) {
      $.fn[name] = function (val) {
        if (val === undefined) {
          // 获取
          var ele = this[0];

          if (isWindow(ele)) {
            return ele['inner' + prop];
          }

          if (isDocument(ele)) {
            return ele.documentElement['scroll' + prop];
          }

          var $ele = $(ele);

          // IE10、IE11 在 box-sizing:border-box 时，不会包含 padding，这里进行修复
          var IEFixValue = 0;
          if ('ActiveXObject' in window) { // 判断是 IE 浏览器
            if ($ele.css('box-sizing') === 'border-box') {
              IEFixValue =
                parseFloat($ele.css('padding-' + (name === 'width' ? 'left' : 'top'))) +
                parseFloat($ele.css('padding-' + (name === 'width' ? 'right' : 'bottom')));
            }
          }

          return parseFloat($(ele).css(name)) + IEFixValue;
        } else {
          // 设置
          if (!isNaN(Number(val)) && val !== '') {
            val += 'px';
          }

          return this.css(name, val);
        }
      };
    });

    /**
     * innerWidth - 获取元素的宽度，包含内边距
     * @return {Number}
     */
    /**
     * innerHeight - 获取元素的高度，包含内边距
     * @return {Number}
     */
    each({
      Width: 'width',
      Height: 'height',
    }, function (prop, name) {
      $.fn['inner' + prop] = function () {
        var value = this[name]();
        var $ele = $(this[0]);

        if ($ele.css('box-sizing') !== 'border-box') {
          value += parseFloat($ele.css('padding-' + (name === 'width' ? 'left' : 'top')));
          value += parseFloat($ele.css('padding-' + (name === 'width' ? 'right' : 'bottom')));
        }

        return value;
      };
    });

    var dir = function (nodes, selector, nameIndex, node) {
      var ret = [];
      var ele;
      nodes.each(function (j, _this) {
        ele = _this[node];
        while (ele) {
          if (nameIndex === 2) {
            // prevUntil
            if (!selector || (selector && $(ele).is(selector))) {
              break;
            }

            ret.push(ele);
          } else if (nameIndex === 0) {
            // prev
            if (!selector || (selector && $(ele).is(selector))) {
              ret.push(ele);
            }

            break;
          } else {
            // prevAll
            if (!selector || (selector && $(ele).is(selector))) {
              ret.push(ele);
            }
          }

          ele = ele[node];
        }
      });

      return new JQ(unique(ret));
    };

    /**
     * prev - 取得前一个匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * prevAll - 取得前面所有匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * prevUntil - 取得前面的所有元素，直到遇到匹配的元素，不包含匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    each(['', 'All', 'Until'], function (nameIndex, name) {
      $.fn['prev' + name] = function (selector) {

        // prevAll、prevUntil 需要把元素的顺序倒序处理，以便和 jQuery 的结果一致
        var $nodes = nameIndex === 0 ? this : $(this.get().reverse());
        return dir($nodes, selector, nameIndex, 'previousElementSibling');
      };
    });

    /**
     * next - 取得后一个匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * nextAll - 取得后面所有匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * nextUntil - 取得后面所有匹配的元素，直到遇到匹配的元素，不包含匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    each(['', 'All', 'Until'], function (nameIndex, name) {
      $.fn['next' + name] = function (selector) {
        return dir(this, selector, nameIndex, 'nextElementSibling');
      };
    });

    /**
     * parent - 取得匹配的直接父元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * parents - 取得所有匹配的父元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * parentUntil - 取得所有的父元素，直到遇到匹配的元素，不包含匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    each(['', 's', 'sUntil'], function (nameIndex, name) {
      $.fn['parent' + name] = function (selector) {

        // parents、parentsUntil 需要把元素的顺序反向处理，以便和 jQuery 的结果一致
        var $nodes = nameIndex === 0 ? this : $(this.get().reverse());
        return dir($nodes, selector, nameIndex, 'parentNode');
      };
    });

    /**
     * append - 在元素内部追加内容
     * @param newChild {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * prepend - 在元素内部前置内容
     * @param newChild {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    each(['append', 'prepend'], function (nameIndex, name) {
      $.fn[name] = function (newChild) {
        var newChilds;
        var copyByClone = this.length > 1;

        if (isString(newChild)) {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          newChilds = slice.call(tempDiv.childNodes);
        } else {
          newChilds = $(newChild).get();
        }

        if (nameIndex === 1) {
          // prepend
          newChilds.reverse();
        }

        return this.each(function (i, _this) {
          each(newChilds, function (j, child) {
            // 一个元素要同时追加到多个元素中，需要先复制一份，然后追加
            if (copyByClone && i > 0) {
              child = child.cloneNode(true);
            }

            if (nameIndex === 0) {
              // append
              _this.appendChild(child);
            } else {
              // prepend
              _this.insertBefore(child, _this.childNodes[0]);
            }
          });
        });
      };
    });

    /**
     * insertBefore - 插入到指定元素的前面
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * insertAfter - 插入到指定元素的后面
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    each(['insertBefore', 'insertAfter'], function (nameIndex, name) {
      $.fn[name] = function (selector) {
        var $ele = $(selector);
        return this.each(function (i, _this) {
          $ele.each(function (j, ele) {
            ele.parentNode.insertBefore(
              $ele.length === 1 ? _this : _this.cloneNode(true),
              nameIndex === 0 ? ele : ele.nextSibling
            );
          });
        });
      };
    });

    /**
     * appendTo - 追加到指定元素内容
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * prependTo - 前置到指定元素内部
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * before - 插入到指定元素前面
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * after - 插入到指定元素后面
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * replaceAll - 替换掉指定元素
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    each({
      appendTo: 'append',
      prependTo: 'prepend',
      before: 'insertBefore',
      after: 'insertAfter',
      replaceAll: 'replaceWith',
    }, function (name, original) {
      $.fn[name] = function (selector) {
        $(selector)[original](this);
        return this;
      };
    });



    (function () {
      var dataNS = 'mduiElementDataStorage';

      $.extend({
        /**
         * 在指定元素上存储数据，或从指定元素上读取数据
         * @param ele 必须， DOM 元素
         * @param key 必须，键名
         * @param value 可选，值
         */
        data: function (ele, key, value) {
          var data = {};

          if (value !== undefined) {
            // 根据 key、value 设置值
            data[key] = value;
          } else if (isObjectLike(key)) {
            // 根据键值对设置值
            data = key;
          } else if (key === undefined) {
            // 获取所有值
            var result = {};
            each(ele.attributes, function (i, attribute) {
              var name = attribute.name;
              if (name.indexOf('data-') === 0) {
                var prop = name.slice(5).replace(/-./g, function (u) {
                  // 横杠转为驼峰法
                  return u.charAt(1).toUpperCase();
                });

                result[prop] = attribute.value;
              }
            });

            if (ele[dataNS]) {
              each(ele[dataNS], function (k, v) {
                result[k] = v;
              });
            }

            return result;
          } else {
            // 获取指定值
            if (ele[dataNS] && (key in ele[dataNS])) {
              return ele[dataNS][key];
            } else {
              var dataKey = ele.getAttribute('data-' + key);
              if (dataKey) {
                return dataKey;
              } else {
                return undefined;
              }
            }
          }

          // 设置值
          if (!ele[dataNS]) {
            ele[dataNS] = {};
          }

          each(data, function (k, v) {
            ele[dataNS][k] = v;
          });
        },

        /**
         * 移除指定元素上存放的数据
         * @param ele 必须，DOM 元素
         * @param key 必须，键名
         */
        removeData: function (ele, key) {
          if (ele[dataNS] && ele[dataNS][key]) {
            ele[dataNS][key] = null;
            delete ele.mduiElementDataStorage[key];
          }
        },

      });

      $.fn.extend({

        /**
         * 在元素上读取或设置数据
         * @param key 必须
         * @param value
         * @returns {*}
         */
        data: function (key, value) {
          if (value === undefined) {
            // 获取值
            if (this[0]) {
              return $.data(this[0], key);
            } else {
              return undefined;
            }
          } else {
            // 设置值
            return this.each(function (i, ele) {
              $.data(ele, key, value);
            });
          }
        },

        /**
         * 移除元素上存储的数据
         * @param key 必须
         * @returns {*}
         */
        removeData: function (key) {
          return this.each(function (i, ele) {
            $.removeData(ele, key);
          });
        },

      });
    })();


    (function () {
      // 存储事件
      var handlers = {
        // i: { // 元素ID
        //   j: { // 事件ID
        //     e: 事件名
        //     fn: 事件处理函数
        //     i: 事件ID
        //     proxy:
        //     sel: 选择器
        //   }
        // }
      };

      // 元素ID
      var _elementId = 1;

      var fnFalse = function () {
        return false;
      };

      $.fn.extend({
        /**
         * DOM 加载完毕后调用的函数
         * @param callback
         * @returns {ready}
         */
        ready: function (callback) {
          if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
            callback($);
          } else {
            document.addEventListener('DOMContentLoaded', function () {
              callback($);
            }, false);
          }

          return this;
        },

        /**
         * 绑定事件
         *
         * $().on({eventName: fn}, selector, data);
         * $().on({eventName: fn}, selector)
         * $().on({eventName: fn})
         * $().on(eventName, selector, data, fn);
         * $().on(eventName, selector, fn);
         * $().on(eventName, data, fn);
         * $().on(eventName, fn);
         * $().on(eventName, false);
         *
         * @param eventName
         * @param selector
         * @param data
         * @param callback
         * @param one 是否是 one 方法，只在 JQ 内部使用
         * @returns
         */
        on: function (eventName, selector, data, callback, one) {
          var _this = this;

          // 默认
          // $().on(event, selector, data, callback)

          // event 使用 事件:函数 键值对
          // event = {
          //   'event1': callback1,
          //   'event2': callback2
          // }
          //
          // $().on(event, selector, data)
          if (eventName && !isString(eventName)) {
            each(eventName, function (type, fn) {
              _this.on(type, selector, data, fn);
            });

            return _this;
          }

          // selector 不存在
          // $().on(event, data, callback)
          if (!isString(selector) && !isFunction(callback) && callback !== false) {
            callback = data;
            data = selector;
            selector = undefined;
          }

          // data 不存在
          // $().on(event, callback)
          if (isFunction(data) || data === false) {
            callback = data;
            data = undefined;
          }

          // callback 为 false
          // $().on(event, false)
          if (callback === false) {
            callback = fnFalse;
          }

          if (one === 1) {
            var origCallback = callback;
            callback = function () {
              _this.off(eventName, selector, callback);
              return origCallback.apply(this, arguments);
            };
          }

          return this.each(function () {
            add(this, eventName, callback, data, selector);
          });
        },

        /**
         * 绑定事件，只触发一次
         * @param eventName
         * @param selector
         * @param data
         * @param callback
         */
        one: function (eventName, selector, data, callback) {
          var _this = this;

          if (!isString(eventName)) {
            each(eventName, function (type, fn) {
              type.split(' ').forEach(function (eName) {
                _this.on(eName, selector, data, fn, 1);
              });
            });
          } else {
            eventName.split(' ').forEach(function (eName) {
              _this.on(eName, selector, data, callback, 1);
            });
          }

          return this;
        },

        /**
         * 取消绑定事件
         *
         * $().off(eventName, selector);
         * $().off(eventName, callback);
         * $().off(eventName, false);
         *
         */
        off: function (eventName, selector, callback) {
          var _this = this;

          // event 使用 事件:函数 键值对
          // event = {
          //   'event1': callback1,
          //   'event2': callback2
          // }
          //
          // $().off(event, selector)
          if (eventName && !isString(eventName)) {
            each(eventName, function (type, fn) {
              _this.off(type, selector, fn);
            });

            return _this;
          }

          // selector 不存在
          // $().off(event, callback)
          if (!isString(selector) && !isFunction(callback) && callback !== false) {
            callback = selector;
            selector = undefined;
          }

          // callback 为 false
          // $().off(event, false)
          if (callback === false) {
            callback = fnFalse;
          }

          return _this.each(function () {
            remove(this, eventName, callback, selector);
          });
        },

        /**
         * 触发一个事件
         * @param eventName
         * @param data
         * @returns {*|JQ}
         */
        trigger: function (eventName, data) {
          if (!isString(eventName)) {
            return;
          }

          var evt;
          try {
            evt = new CustomEvent(eventName, { detail: data, bubbles: true, cancelable: true });
          } catch (e) {
            evt = document.createEvent('Event');
            evt.initEvent(eventName, true, true);
            evt.detail = data;
          }

          evt._data = data;

          return this.each(function () {
            this.dispatchEvent(evt);
          });
        },
      });

      /**
       * 添加事件监听
       * @param element
       * @param eventName
       * @param func
       * @param data
       * @param selector
       */
      function add(element, eventName, func, data, selector) {
        var elementId = getElementId(element);
        if (!handlers[elementId]) {
          handlers[elementId] = [];
        }

        // 传入 data.useCapture 来设置 useCapture: true
        var useCapture = false;
        if (isObjectLike(data) && data.useCapture) {
          useCapture = true;
        }

        eventName.split(' ').forEach(function (event) {

          var handler = {
            e: event,
            fn: func,
            sel: selector,
            i: handlers[elementId].length,
          };

          var callFn = function (e, ele) {
            var result = func.apply(ele, e._data === undefined ? [e] : [e].concat(e._data));
            if (result === false) {
              e.preventDefault();
              e.stopPropagation();
            }
          };

          var proxyfn = handler.proxy = function (e) {
            e.data = data;

            // 事件代理
            if (selector) {
              $(element).find(selector).get().reverse().forEach(function (ele) {
                if (ele === e.target || $.contains(ele, e.target)) {
                  callFn(e, ele);
                }
              });
            }

            // 不使用事件代理
            else {
              callFn(e, element);
            }
          };

          handlers[elementId].push(handler);
          element.addEventListener(handler.e, proxyfn, useCapture);
        });
      }

      /**
       * 移除事件监听
       * @param element
       * @param eventName
       * @param func
       * @param selector
       */
      function remove(element, eventName, func, selector) {
        (eventName || '').split(' ').forEach(function (event) {
          getHandlers(element, event, func, selector).forEach(function (handler) {
            delete handlers[getElementId(element)][handler.i];
            element.removeEventListener(handler.e, handler.proxy, false);
          });
        });
      }

      /**
       * 为元素赋予一个唯一的ID
       * @param element
       * @returns {number|*}
       */
      function getElementId(element) {
        return element._elementId || (element._elementId = _elementId++);
      }

      /**
       * 获取匹配的事件
       * @param element
       * @param eventName
       * @param func
       * @param selector
       * @returns {Array.<T>}
       */
      function getHandlers(element, eventName, func, selector) {
        return (handlers[getElementId(element)] || []).filter(function (handler) {

          return handler &&
            (!eventName  || handler.e === eventName) &&
            (!func || handler.fn.toString() === func.toString()) &&
            (!selector || handler.sel === selector);
        });
      }

    })();


  /* jshint ignore:start */
    return $;
  })(window, document);
  /* jshint ignore:end */


  /**
   * =============================================================================
   * ************   定义全局变量   ************
   * =============================================================================
   */

  var $body = $('body');
  var $document = $(document);
  var $window = $(window);

  /**
   * 队列 -- 当前队列的 api 和 jquery 不一样，所以不打包进 mdui.JQ 里
   */
  var queue = {};
  (function () {
    var queueData = [];

    /**
     * 写入队列
     * @param queueName 对列名
     * @param func 函数名，该参数为空时，返回所有队列
     */
    queue.queue = function (queueName, func) {
      if (queueData[queueName] === undefined) {
        queueData[queueName] = [];
      }

      if (func === undefined) {
        return queueData[queueName];
      }

      queueData[queueName].push(func);
    };

    /**
     * 从队列中移除第一个函数，并执行该函数
     * @param queueName
     */
    queue.dequeue = function (queueName) {
      if (queueData[queueName] !== undefined && queueData[queueName].length) {
        (queueData[queueName].shift())();
      }
    };

  })();

  /**
   * touch 事件后的 500ms 内禁用 mousedown 事件
   *
   * 不支持触控的屏幕上事件顺序为 mousedown -> mouseup -> click
   * 支持触控的屏幕上事件顺序为 touchstart -> touchend -> mousedown -> mouseup -> click
   */
  var TouchHandler = {
    touches: 0,

    /**
     * 该事件是否被允许
     * 在执行事件前调用该方法判断事件是否可以执行
     * @param e
     * @returns {boolean}
     */
    isAllow: function (e) {
      var allow = true;

      if (
        TouchHandler.touches &&
        [
          'mousedown',
          'mouseup',
          'mousemove',
          'click',
          'mouseover',
          'mouseout',
          'mouseenter',
          'mouseleave',
        ].indexOf(e.type) > -1
      ) {
        // 触发了 touch 事件后阻止鼠标事件
        allow = false;
      }

      return allow;
    },

    /**
     * 在 touchstart 和 touchmove、touchend、touchcancel 事件中调用该方法注册事件
     * @param e
     */
    register: function (e) {
      if (e.type === 'touchstart') {
        // 触发了 touch 事件
        TouchHandler.touches += 1;
      } else if (['touchmove', 'touchend', 'touchcancel'].indexOf(e.type) > -1) {
        // touch 事件结束 500ms 后解除对鼠标事件的阻止
        setTimeout(function () {
          if (TouchHandler.touches) {
            TouchHandler.touches -= 1;
          }
        }, 500);
      }
    },

    start: 'touchstart mousedown',
    move: 'touchmove mousemove',
    end: 'touchend mouseup',
    cancel: 'touchcancel mouseleave',
    unlock: 'touchend touchmove touchcancel',
  };

  // 测试事件
  // 在每一个事件中都使用 TouchHandler.isAllow(e) 判断事件是否可执行
  // 在 touchstart 和 touchmove、touchend、touchcancel
  // (function () {
  //
  //   $document
  //     .on(TouchHandler.start, function (e) {
  //       if (!TouchHandler.isAllow(e)) {
  //         return;
  //       }
  //       TouchHandler.register(e);
  //       console.log(e.type);
  //     })
  //     .on(TouchHandler.move, function (e) {
  //       if (!TouchHandler.isAllow(e)) {
  //         return;
  //       }
  //       console.log(e.type);
  //     })
  //     .on(TouchHandler.end, function (e) {
  //       if (!TouchHandler.isAllow(e)) {
  //         return;
  //       }
  //       console.log(e.type);
  //     })
  //     .on(TouchHandler.unlock, TouchHandler.register);
  // })();

  $(function () {
    // 避免页面加载完后直接执行css动画
    // https://css-tricks.com/transitions-only-after-page-load/

    setTimeout(function () {
      $body.addClass('mdui-loaded');
    }, 0);
  });


  /**
   * =============================================================================
   * ************   MDUI 内部使用的函数   ************
   * =============================================================================
   */

  /**
   * 解析 DATA API 的参数
   * @param str
   * @returns {*}
   */
  var parseOptions = function (str) {
    var options = {};

    if (str === null || !str) {
      return options;
    }

    if (typeof str === 'object') {
      return str;
    }

    /* jshint ignore:start */
    var start = str.indexOf('{');
    try {
      options = (new Function('',
        'var json = ' + str.substr(start) +
        '; return JSON.parse(JSON.stringify(json));'))();
    } catch (e) {
    }
    /* jshint ignore:end */

    return options;
  };

  /**
   * 绑定组件的事件
   * @param eventName 事件名
   * @param pluginName 插件名
   * @param inst 插件实例
   * @param trigger 在该元素上触发
   * @param obj 事件参数
   */
  var componentEvent = function (eventName, pluginName, inst, trigger, obj) {
    if (!obj) {
      obj = {};
    }

    obj.inst = inst;

    var fullEventName = eventName + '.mdui.' + pluginName;

    // jQuery 事件
    if (typeof jQuery !== 'undefined') {
      jQuery(trigger).trigger(fullEventName, obj);
    }

    // JQ 事件
    $(trigger).trigger(fullEventName, obj);
  };


  /**
   * =============================================================================
   * ************   开放的常用方法   ************
   * =============================================================================
   */

  $.fn.extend({

    /**
     * 执行强制重绘
     */
    reflow: function () {
      return this.each(function () {
        return this.clientLeft;
      });
    },

    /**
     * 设置 transition 时间
     * @param duration
     */
    transition: function (duration) {
      if (typeof duration !== 'string') {
        duration = duration + 'ms';
      }

      return this.each(function () {
        this.style.webkitTransitionDuration = duration;
        this.style.transitionDuration = duration;
      });
    },

    /**
     * transition 动画结束回调
     * @param callback
     * @returns {transitionEnd}
     */
    transitionEnd: function (callback) {
      var events = [
          'webkitTransitionEnd',
          'transitionend',
        ];
      var i;
      var _this = this;

      function fireCallBack(e) {
        if (e.target !== this) {
          return;
        }

        callback.call(this, e);

        for (i = 0; i < events.length; i++) {
          _this.off(events[i], fireCallBack);
        }
      }

      if (callback) {
        for (i = 0; i < events.length; i++) {
          _this.on(events[i], fireCallBack);
        }
      }

      return this;
    },

    /**
     * 设置 transform-origin 属性
     * @param transformOrigin
     */
    transformOrigin: function (transformOrigin) {
      return this.each(function () {
        this.style.webkitTransformOrigin = transformOrigin;
        this.style.transformOrigin = transformOrigin;
      });
    },

    /**
     * 设置 transform 属性
     * @param transform
     */
    transform: function (transform) {
      return this.each(function () {
        this.style.webkitTransform = transform;
        this.style.transform = transform;
      });
    },

  });

  $.extend({
    /**
     * 创建并显示遮罩
     * @param zIndex 遮罩层的 z-index
     */
    showOverlay: function (zIndex) {
      var $overlay = $('.mdui-overlay');

      if ($overlay.length) {
        $overlay.data('isDeleted', 0);

        if (zIndex !== undefined) {
          $overlay.css('z-index', zIndex);
        }
      } else {
        if (zIndex === undefined) {
          zIndex = 2000;
        }

        $overlay = $('<div class="mdui-overlay">')
          .appendTo($body)
          .reflow()
          .css('z-index', zIndex);
      }

      var level = $overlay.data('overlay-level') || 0;
      return $overlay
        .data('overlay-level', ++level)
        .addClass('mdui-overlay-show');
    },

    /**
     * 隐藏遮罩层
     * @param force 是否强制隐藏遮罩
     */
    hideOverlay: function (force) {
      var $overlay = $('.mdui-overlay');

      if (!$overlay.length) {
        return;
      }

      var level = force ? 1 : $overlay.data('overlay-level');
      if (level > 1) {
        $overlay.data('overlay-level', --level);
        return;
      }

      $overlay
        .data('overlay-level', 0)
        .removeClass('mdui-overlay-show')
        .data('isDeleted', 1)
        .transitionEnd(function () {
          if ($overlay.data('isDeleted')) {
            $overlay.remove();
          }
        });
    },

    /**
     * 锁定屏幕
     */
    lockScreen: function () {
      // 不直接把 body 设为 box-sizing: border-box，避免污染全局样式
      var newBodyWidth = $body.width();

      $body
        .addClass('mdui-locked')
        .width(newBodyWidth);

      var level = $body.data('lockscreen-level') || 0;
      $body.data('lockscreen-level', ++level);
    },

    /**
     * 解除屏幕锁定
     * @param force 是否强制解锁屏幕
     */
    unlockScreen: function (force) {
      var level = force ? 1 : $body.data('lockscreen-level');
      if (level > 1) {
        $body.data('lockscreen-level', --level);
        return;
      }

      $body
        .data('lockscreen-level', 0)
        .removeClass('mdui-locked')
        .width('');
    },

    /**
     * 函数节流
     * @param fn
     * @param delay
     * @returns {Function}
     */
    throttle: function (fn, delay) {
      var timer = null;
      if (!delay || delay < 16) {
        delay = 16;
      }

      return function () {
        var _this = this;
        var args = arguments;

        if (timer === null) {
          timer = setTimeout(function () {
            fn.apply(_this, args);
            timer = null;
          }, delay);
        }
      };
    },

    /**
     * 生成唯一 id
     * @param pluginName 插件名，若传入该参数，guid 将以该参数作为前缀
     * @returns {string}
     */
    guid: function (pluginName) {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      if (pluginName) {
        guid = 'mdui-' + pluginName + '-' + guid;
      }

      return guid;
    },

  });


  /**
   * =============================================================================
   * ************   Headroom.js   ************
   * =============================================================================
   */

  mdui.Headroom = (function () {

    /**
     * 默认参数
     * @type {{}}
     */
    var DEFAULT = {
      tolerance: 5,                                 // 滚动条滚动多少距离开始隐藏或显示元素，{down: num, up: num}，或数字
      offset: 0,                                    // 在页面顶部多少距离内滚动不会隐藏元素
      initialClass: 'mdui-headroom',                // 初始化时添加的类
      pinnedClass: 'mdui-headroom-pinned-top',      // 元素固定时添加的类
      unpinnedClass: 'mdui-headroom-unpinned-top',  // 元素隐藏时添加的类
    };

    /**
     * Headroom
     * @param selector
     * @param opts
     * @constructor
     */
    function Headroom(selector, opts) {
      var _this = this;

      _this.$headroom = $(selector).eq(0);
      if (!_this.$headroom.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = _this.$headroom.data('mdui.headroom');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      // 数值转为 {down: bum, up: num}
      var tolerance = _this.options.tolerance;
      if (tolerance !== Object(tolerance)) {
        _this.options.tolerance = {
          down: tolerance,
          up: tolerance,
        };
      }

      _this._init();
    }

    /**
     * 初始化
     * @private
     */
    Headroom.prototype._init = function () {
      var _this = this;

      _this.state = 'pinned';
      _this.$headroom
        .addClass(_this.options.initialClass)
        .removeClass(_this.options.pinnedClass + ' ' + _this.options.unpinnedClass);

      _this.inited = false;
      _this.lastScrollY = 0;

      _this._attachEvent();
    };

    /**
     * 监听滚动事件
     * @private
     */
    Headroom.prototype._attachEvent = function () {
      var _this = this;

      if (!_this.inited) {
        _this.lastScrollY = window.pageYOffset;
        _this.inited = true;

        $window.on('scroll', function () {
          _this._scroll();
        });
      }
    };

    /**
     * 滚动时的处理
     * @private
     */
    Headroom.prototype._scroll = function () {
      var _this = this;
      _this.rafId = window.requestAnimationFrame(function () {
        var currentScrollY = window.pageYOffset;
        var direction = currentScrollY > _this.lastScrollY ? 'down' : 'up';
        var toleranceExceeded =
          Math.abs(currentScrollY - _this.lastScrollY) >=
          _this.options.tolerance[direction];

        if (
          currentScrollY > _this.lastScrollY &&
          currentScrollY >= _this.options.offset &&
          toleranceExceeded) {
          _this.unpin();
        } else if (
          (currentScrollY < _this.lastScrollY && toleranceExceeded) ||
          currentScrollY <= _this.options.offset
        ) {
          _this.pin();
        }

        _this.lastScrollY = currentScrollY;
      });
    };

    /**
     * 动画结束回调
     * @param inst
     */
    var transitionEnd = function (inst) {
      if (inst.state === 'pinning') {
        inst.state = 'pinned';
        componentEvent('pinned', 'headroom', inst, inst.$headroom);
      }

      if (inst.state === 'unpinning') {
        inst.state = 'unpinned';
        componentEvent('unpinned', 'headroom', inst, inst.$headroom);
      }
    };

    /**
     * 固定住
     */
    Headroom.prototype.pin = function () {
      var _this = this;

      if (
        _this.state === 'pinning' ||
        _this.state === 'pinned' ||
        !_this.$headroom.hasClass(_this.options.initialClass)
      ) {
        return;
      }

      componentEvent('pin', 'headroom', _this, _this.$headroom);

      _this.state = 'pinning';

      _this.$headroom
        .removeClass(_this.options.unpinnedClass)
        .addClass(_this.options.pinnedClass)
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 不固定住
     */
    Headroom.prototype.unpin = function () {
      var _this = this;

      if (
        _this.state === 'unpinning' ||
        _this.state === 'unpinned' ||
        !_this.$headroom.hasClass(_this.options.initialClass)
      ) {
        return;
      }

      componentEvent('unpin', 'headroom', _this, _this.$headroom);

      _this.state = 'unpinning';

      _this.$headroom
        .removeClass(_this.options.pinnedClass)
        .addClass(_this.options.unpinnedClass)
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 启用
     */
    Headroom.prototype.enable = function () {
      var _this = this;

      if (!_this.inited) {
        _this._init();
      }
    };

    /**
     * 禁用
     */
    Headroom.prototype.disable = function () {
      var _this = this;

      if (_this.inited) {
        _this.inited = false;
        _this.$headroom
          .removeClass([
            _this.options.initialClass,
            _this.options.pinnedClass,
            _this.options.unpinnedClass,
          ].join(' '));

        $window.off('scroll', function () {
          _this._scroll();
        });

        window.cancelAnimationFrame(_this.rafId);
      }
    };

    /**
     * 获取当前状态 pinning | pinned | unpinning | unpinned
     */
    Headroom.prototype.getState = function () {
      return this.state;
    };

    return Headroom;

  })();


  /**
   * =============================================================================
   * ************   Headroom 自定义属性 API   ************
   * =============================================================================
   */

  $(function () {
    $('[mdui-headroom]').each(function () {
      var $this = $(this);
      var options = parseOptions($this.attr('mdui-headroom'));

      var inst = $this.data('mdui.headroom');
      if (!inst) {
        inst = new mdui.Headroom($this, options);
        $this.data('mdui.headroom', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   供 Collapse、 Panel 调用的折叠内容块插件   ************
   * =============================================================================
   */
  var CollapsePrivate = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      accordion: false,                             // 是否使用手风琴效果
    };

    // 类名
    var CLASS = {
      item: 'mdui-collapse-item',           // item 类名
      itemOpen: 'mdui-collapse-item-open',  // 打开状态的 item
      header: 'mdui-collapse-item-header',  // item 中的 header 类名
      body: 'mdui-collapse-item-body',      // item 中的 body 类名
    };

    // 命名空间
    var NAMESPACE = 'collapse';

    /**
     * 折叠内容块
     * @param selector
     * @param opts
     * @param classes
     * @param namespace
     * @constructor
     */
    function Collapse(selector, opts, classes, namespace) {
      var _this = this;

      _this.classes = $.extend({}, CLASS, classes || {});
      _this.namespace = namespace ? namespace : NAMESPACE;

      // 折叠面板元素
      _this.$collapse = $(selector).eq(0);
      if (!_this.$collapse.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = _this.$collapse.data('mdui.' + _this.namespace);
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      _this.$collapse.on('click', '.' + _this.classes.header, function () {
        var $item = $(this).parent('.' + _this.classes.item);
        if (_this.$collapse.children($item).length) {
          _this.toggle($item);
        }
      });
    }

    /**
     * 指定 item 是否处于打开状态
     * @param $item
     * @returns {boolean}
     * @private
     */
    Collapse.prototype._isOpen = function ($item) {
      return $item.hasClass(this.classes.itemOpen);
    };

    /**
     * 获取指定 item
     * @param item
     * @returns {*}
     * @private
     */
    Collapse.prototype._getItem = function (item) {
      var _this = this;

      if (parseInt(item) === item) {
        // item 是索引号
        return _this.$collapse.children('.' + _this.classes.item).eq(item);
      }

      return $(item).eq(0);
    };

    /**
     * 动画结束回调
     * @param inst
     * @param $content
     * @param $item
     */
    var transitionEnd = function (inst, $content, $item) {
      if (inst._isOpen($item)) {
        $content
          .transition(0)
          .height('auto')
          .reflow()
          .transition('');

        componentEvent('opened', inst.namespace, inst, $item[0]);
      } else {
        $content.height('');

        componentEvent('closed', inst.namespace, inst, $item[0]);
      }
    };

    /**
     * 打开指定面板项
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器
     */
    Collapse.prototype.open = function (item) {
      var _this = this;
      var $item = _this._getItem(item);

      if (_this._isOpen($item)) {
        return;
      }

      // 关闭其他项
      if (_this.options.accordion) {
        _this.$collapse.children('.' + _this.classes.itemOpen).each(function () {
          var $tmpItem = $(this);

          if ($tmpItem !== $item) {
            _this.close($tmpItem);
          }
        });
      }

      var $content = $item.children('.' + _this.classes.body);

      $content
        .height($content[0].scrollHeight)
        .transitionEnd(function () {
          transitionEnd(_this, $content, $item);
        });

      componentEvent('open', _this.namespace, _this, $item[0]);

      $item.addClass(_this.classes.itemOpen);
    };

    /**
     * 关闭指定项
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器
     */
    Collapse.prototype.close = function (item) {
      var _this = this;
      var $item = _this._getItem(item);

      if (!_this._isOpen($item)) {
        return;
      }

      var $content = $item.children('.' + _this.classes.body);

      componentEvent('close', _this.namespace, _this, $item[0]);

      $item.removeClass(_this.classes.itemOpen);

      $content
        .transition(0)
        .height($content[0].scrollHeight)
        .reflow()
        .transition('')
        .height('')
        .transitionEnd(function () {
          transitionEnd(_this, $content, $item);
        });
    };

    /**
     * 切换指定项的状态
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器或 JQ 对象
     */
    Collapse.prototype.toggle = function (item) {
      var _this = this;
      var $item = _this._getItem(item);

      if (_this._isOpen($item)) {
        _this.close($item);
      } else {
        _this.open($item);
      }
    };

    /**
     * 打开所有项
     */
    Collapse.prototype.openAll = function () {
      var _this = this;

      _this.$collapse.children('.' + _this.classes.item).each(function () {
        var $tmpItem = $(this);

        if (!_this._isOpen($tmpItem)) {
          _this.open($tmpItem);
        }
      });
    };

    /**
     * 关闭所有项
     */
    Collapse.prototype.closeAll = function () {
      var _this = this;

      _this.$collapse.children('.' + _this.classes.item).each(function () {
        var $tmpItem = $(this);

        if (_this._isOpen($tmpItem)) {
          _this.close($tmpItem);
        }
      });
    };

    return Collapse;
  })();

  /**
   * =============================================================================
   * ************   Collapse 折叠内容块插件   ************
   * =============================================================================
   */
  mdui.Collapse = (function () {

    function Collapse(selector, opts) {
      return new CollapsePrivate(selector, opts);
    }

    return Collapse;
  })();


  /**
   * =============================================================================
   * ************   Collapse 自定义属性   ************
   * =============================================================================
   */

  $(function () {
    $('[mdui-collapse]').each(function () {
      var $this = $(this);
      var options = parseOptions($this.attr('mdui-collapse'));

      var inst = $this.data('mdui.collapse');
      if (!inst) {
        inst = new mdui.Collapse($this, options);
        $this.data('mdui.collapse', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   涟漪   ************
   * =============================================================================
   *
   * Inspired by https://github.com/nolimits4web/Framework7/blob/master/src/js/fast-clicks.js
   * https://github.com/nolimits4web/Framework7/blob/master/LICENSE
   *
   * Inspired by https://github.com/fians/Waves
   */

  (function () {

    var Ripple = {

      /**
       * 显示涟漪动画
       * @param e
       * @param $ripple
       */
      show: function (e, $ripple) {

        // 鼠标右键不产生涟漪
        if (e.button === 2) {
          return;
        }

        // 点击位置坐标
        var tmp;
        if ('touches' in e && e.touches.length) {
          tmp = e.touches[0];
        } else {
          tmp = e;
        }

        var touchStartX = tmp.pageX;
        var touchStartY = tmp.pageY;

        // 涟漪位置
        var offset = $ripple.offset();
        var center = {
          x: touchStartX - offset.left,
          y: touchStartY - offset.top,
        };

        var height = $ripple.innerHeight();
        var width = $ripple.innerWidth();
        var diameter = Math.max(
          Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48
        );

        // 涟漪扩散动画
        var translate =
          'translate3d(' + (-center.x + width / 2) + 'px, ' + (-center.y + height / 2) + 'px, 0) ' +
          'scale(1)';

        // 涟漪的 DOM 结构
        $('<div class="mdui-ripple-wave" style="' +
          'width: ' + diameter + 'px; ' +
          'height: ' + diameter + 'px; ' +
          'margin-top:-' + diameter / 2 + 'px; ' +
          'margin-left:-' + diameter / 2 + 'px; ' +
          'left:' + center.x + 'px; ' +
          'top:' + center.y + 'px;">' +
          '</div>')

          // 缓存动画效果
          .data('translate', translate)

          .prependTo($ripple)
          .reflow()
          .transform(translate);
      },

      /**
       * 隐藏涟漪动画
       */
      hide: function () {
        var $ripple = $(this);

        $ripple.children('.mdui-ripple-wave').each(function () {
          removeRipple($(this));
        });

        $ripple.off('touchmove touchend touchcancel mousemove mouseup mouseleave', Ripple.hide);
      },
    };

    /**
     * 隐藏并移除涟漪
     * @param $wave
     */
    function removeRipple($wave) {
      if (!$wave.length || $wave.data('isRemoved')) {
        return;
      }

      $wave.data('isRemoved', true);

      var removeTimeout = setTimeout(function () {
        $wave.remove();
      }, 400);

      var translate = $wave.data('translate');

      $wave
        .addClass('mdui-ripple-wave-fill')
        .transform(translate.replace('scale(1)', 'scale(1.01)'))
        .transitionEnd(function () {
          clearTimeout(removeTimeout);

          $wave
            .addClass('mdui-ripple-wave-out')
            .transform(translate.replace('scale(1)', 'scale(1.01)'));

          removeTimeout = setTimeout(function () {
            $wave.remove();
          }, 700);

          setTimeout(function () {
            $wave.transitionEnd(function () {
              clearTimeout(removeTimeout);
              $wave.remove();
            });
          }, 0);
        });
    }

    /**
     * 显示涟漪，并绑定 touchend 等事件
     * @param e
     */
    function showRipple(e) {
      if (!TouchHandler.isAllow(e)) {
        return;
      }

      TouchHandler.register(e);

      var $ripple;
      var $target = $(e.target);

      // 获取含 .mdui-ripple 类的元素
      if ($target.hasClass('mdui-ripple')) {
        $ripple = $target;
      } else {
        $ripple = $target.parents('.mdui-ripple').eq(0);
      }

      if ($ripple.length) {

        // 禁用状态的元素上不产生涟漪效果
        if ($ripple[0].disabled || $ripple.attr('disabled') !== null) {
          return;
        }

        Ripple.show(e, $ripple);

        $ripple.on('touchmove touchend touchcancel mousemove mouseup mouseleave', Ripple.hide);
      }
    }

    // 初始化绑定的事件
    $document
      .on(TouchHandler.start, showRipple)
      .on(TouchHandler.unlock, TouchHandler.register);
  })();


  /**
   * =============================================================================
   * ************   Fab 浮动操作按钮   ************
   * =============================================================================
   */

  mdui.Fab = (function () {

    /**
     * 默认参数
     * @type {{}}
     */
    var DEFAULT = {
      trigger: 'hover',      // 触发方式 ['hover', 'click']
    };

    /**
     * 浮动操作按钮实例
     * @param selector 选择器或 HTML 字符串或 DOM 元素或 JQ 对象
     * @param opts
     * @constructor
     */
    function Fab(selector, opts) {
      var _this = this;

      _this.$fab = $(selector).eq(0);
      if (!_this.$fab.length) {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = _this.$fab.data('mdui.fab');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.state = 'closed';

      _this.$btn = _this.$fab.find('.mdui-fab');
      _this.$dial = _this.$fab.find('.mdui-fab-dial');
      _this.$dialBtns = _this.$dial.find('.mdui-fab');

      if (_this.options.trigger === 'hover') {
        _this.$btn
          .on('touchstart mouseenter', function () {
            _this.open();
          });

        _this.$fab
          .on('mouseleave', function () {
            _this.close();
          });
      }

      if (_this.options.trigger === 'click') {
        _this.$btn
          .on(TouchHandler.start, function () {
            _this.open();
          });
      }

      // 触摸屏幕其他地方关闭快速拨号
      $document.on(TouchHandler.start, function (e) {
        if (!$(e.target).parents('.mdui-fab-wrapper').length) {
          _this.close();
        }
      });
    }

    /**
     * 打开菜单
     */
    Fab.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      // 为菜单中的按钮添加不同的 transition-delay
      _this.$dialBtns.each(function (index, btn) {
        btn.style['transition-delay'] = btn.style['-webkit-transition-delay'] =
          15 * (_this.$dialBtns.length - index) + 'ms';
      });

      _this.$dial.addClass('mdui-fab-dial-show');

      // 如果按钮中存在 .mdui-fab-opened 的图标，则进行图标切换
      if (_this.$btn.find('.mdui-fab-opened').length) {
        _this.$btn.addClass('mdui-fab-opened');
      }

      _this.state = 'opening';
      componentEvent('open', 'fab', _this, _this.$fab);

      // 打开顺序为从下到上逐个打开，最上面的打开后才表示动画完成
      _this.$dialBtns.eq(0).transitionEnd(function () {
        if (_this.$btn.hasClass('mdui-fab-opened')) {
          _this.state = 'opened';
          componentEvent('opened', 'fab', _this, _this.$fab);
        }
      });
    };

    /**
     * 关闭菜单
     */
    Fab.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      // 为菜单中的按钮添加不同的 transition-delay
      _this.$dialBtns.each(function (index, btn) {
        btn.style['transition-delay'] = btn.style['-webkit-transition-delay'] = 15 * index + 'ms';
      });

      _this.$dial.removeClass('mdui-fab-dial-show');
      _this.$btn.removeClass('mdui-fab-opened');
      _this.state = 'closing';
      componentEvent('close', 'fab', _this, _this.$fab);

      // 从上往下依次关闭，最后一个关闭后才表示动画完成
      _this.$dialBtns.eq(-1).transitionEnd(function () {
        if (!_this.$btn.hasClass('mdui-fab-opened')) {
          _this.state = 'closed';
          componentEvent('closed', 'fab', _this, _this.$fab);
        }
      });
    };

    /**
     * 切换菜单的打开状态
     */
    Fab.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 获取当前菜单状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Fab.prototype.getState = function () {
      return this.state;
    };

    /**
     * 以动画的形式显示浮动操作按钮
     */
    Fab.prototype.show = function () {
      this.$fab.removeClass('mdui-fab-hide');
    };

    /**
     * 以动画的形式隐藏浮动操作按钮
     */
    Fab.prototype.hide = function () {
      this.$fab.addClass('mdui-fab-hide');
    };

    return Fab;
  })();


  /**
   * =============================================================================
   * ************   Fab DATA API   ************
   * =============================================================================
   */

  $(function () {
    // mouseenter 不冒泡，无法进行事件委托，这里用 mouseover 代替。
    // 不管是 click 、 mouseover 还是 touchstart ，都先初始化。

    $document.on('touchstart mousedown mouseover', '[mdui-fab]', function (e) {
      var $this = $(this);

      var inst = $this.data('mdui.fab');
      if (!inst) {
        var options = parseOptions($this.attr('mdui-fab'));
        inst = new mdui.Fab($this, options);
        $this.data('mdui.fab', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   Appbar   ************
   * =============================================================================
   * 滚动时自动隐藏应用栏
   * mdui-appbar-scroll-hide
   * mdui-appbar-scroll-toolbar-hide
   */

  $(function () {
    // 滚动时隐藏应用栏
    $('.mdui-appbar-scroll-hide').each(function () {
      var $this = $(this);
      $this.data('mdui.headroom', new mdui.Headroom($this));
    });

    // 滚动时只隐藏应用栏中的工具栏
    $('.mdui-appbar-scroll-toolbar-hide').each(function () {
      var $this = $(this);
      var inst = new mdui.Headroom($this, {
        pinnedClass: 'mdui-headroom-pinned-toolbar',
        unpinnedClass: 'mdui-headroom-unpinned-toolbar',
      });
      $this.data('mdui.headroom', inst);
    });
  });


  /**
   * =============================================================================
   * ************   Drawer 抽屉栏   ************
   * =============================================================================
   *
   * 在桌面设备上默认显示抽屉栏，不显示遮罩层
   * 在手机和平板设备上默认不显示抽屉栏，始终显示遮罩层，且覆盖导航栏
   */

  mdui.Drawer = (function () {

    /**
     * 默认参数
     * @type {{}}
     */
    var DEFAULT = {
      // 在桌面设备上是否显示遮罩层。手机和平板不受这个参数影响，始终会显示遮罩层
      overlay: false,
    };

    var isDesktop = function () {
      return $window.width() >= 1024;
    };

    /**
     * 抽屉栏实例
     * @param selector 选择器或 HTML 字符串或 DOM 元素
     * @param opts
     * @constructor
     */
    function Drawer(selector, opts) {
      var _this = this;

      _this.$drawer = $(selector).eq(0);
      if (!_this.$drawer.length) {
        return;
      }

      var oldInst = _this.$drawer.data('mdui.drawer');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      _this.overlay = false; // 是否显示着遮罩层
      _this.position = _this.$drawer.hasClass('mdui-drawer-right') ? 'right' : 'left';

      if (_this.$drawer.hasClass('mdui-drawer-close')) {
        _this.state = 'closed';
      } else if (_this.$drawer.hasClass('mdui-drawer-open')) {
        _this.state = 'opened';
      } else if (isDesktop()) {
        _this.state = 'opened';
      } else {
        _this.state = 'closed';
      }

      // 浏览器窗口大小调整时
      $window.on('resize', $.throttle(function () {
        // 由手机平板切换到桌面时
        if (isDesktop()) {
          // 如果显示着遮罩，则隐藏遮罩
          if (_this.overlay && !_this.options.overlay) {
            $.hideOverlay();
            _this.overlay = false;
            $.unlockScreen();
          }

          // 没有强制关闭，则状态为打开状态
          if (!_this.$drawer.hasClass('mdui-drawer-close')) {
            _this.state = 'opened';
          }
        }

        // 由桌面切换到手机平板时。如果抽屉栏是打开着的且没有遮罩层，则关闭抽屉栏
        else {
          if (!_this.overlay && _this.state === 'opened') {
            // 抽屉栏处于强制打开状态，添加遮罩
            if (_this.$drawer.hasClass('mdui-drawer-open')) {
              $.showOverlay();
              _this.overlay = true;
              $.lockScreen();

              $('.mdui-overlay').one('click', function () {
                _this.close();
              });
            } else {
              _this.state = 'closed';
            }
          }
        }
      }, 100));

      // 绑定关闭按钮事件
      _this.$drawer.find('[mdui-drawer-close]').each(function () {
        $(this).on('click', function () {
          _this.close();
        });
      });
    }

    /**
     * 动画结束回调
     * @param inst
     */
    var transitionEnd = function (inst) {
      if (inst.$drawer.hasClass('mdui-drawer-open')) {
        inst.state = 'opened';
        componentEvent('opened', 'drawer', inst, inst.$drawer);
      } else {
        inst.state = 'closed';
        componentEvent('closed', 'drawer', inst, inst.$drawer);
      }
    };

    /**
     * 打开抽屉栏
     */
    Drawer.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      _this.state = 'opening';
      componentEvent('open', 'drawer', _this, _this.$drawer);

      if (!_this.options.overlay) {
        $body.addClass('mdui-drawer-body-' + _this.position);
      }

      _this.$drawer
        .removeClass('mdui-drawer-close')
        .addClass('mdui-drawer-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });

      if (!isDesktop() || _this.options.overlay) {
        _this.overlay = true;
        $.showOverlay().one('click', function () {
          _this.close();
        });

        $.lockScreen();
      }
    };

    /**
     * 关闭抽屉栏
     */
    Drawer.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      _this.state = 'closing';
      componentEvent('close', 'drawer', _this, _this.$drawer);

      if (!_this.options.overlay) {
        $body.removeClass('mdui-drawer-body-' + _this.position);
      }

      _this.$drawer
        .addClass('mdui-drawer-close')
        .removeClass('mdui-drawer-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });

      if (_this.overlay) {
        $.hideOverlay();
        _this.overlay = false;
        $.unlockScreen();
      }
    };

    /**
     * 切换抽屉栏打开/关闭状态
     */
    Drawer.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 获取抽屉栏状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Drawer.prototype.getState = function () {
      return this.state;
    };

    return Drawer;

  })();


  /**
   * =============================================================================
   * ************   Drawer 自定义属性 API   ************
   * =============================================================================
   */

  $(function () {
    $('[mdui-drawer]').each(function () {
      var $this = $(this);
      var options = parseOptions($this.attr('mdui-drawer'));
      var selector = options.target;
      delete options.target;

      var $drawer = $(selector).eq(0);

      var inst = $drawer.data('mdui.drawer');
      if (!inst) {
        inst = new mdui.Drawer($drawer, options);
        $drawer.data('mdui.drawer', inst);
      }

      $this.on('click', function () {
        inst.toggle();
      });
    });
  });


  /**
   * =============================================================================
   * ************   Dialog 对话框   ************
   * =============================================================================
   */

  mdui.Dialog = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      history: true,                // 监听 hashchange 事件
      overlay: true,                // 打开对话框时是否显示遮罩
      modal: false,                 // 是否模态化对话框，为 false 时点击对话框外面区域关闭对话框，为 true 时不关闭
      closeOnEsc: true,             // 按下 esc 关闭对话框
      closeOnCancel: true,          // 按下取消按钮时关闭对话框
      closeOnConfirm: true,         // 按下确认按钮时关闭对话框
      destroyOnClosed: false,        // 关闭后销毁
    };

    /**
     * 遮罩层元素
     */
    var $overlay;

    /**
     * 窗口是否已锁定
     */
    var isLockScreen;

    /**
     * 当前对话框实例
     */
    var currentInst;

    /**
     * 队列名
     * @type {string}
     */
    var queueName = '__md_dialog';

    /**
     * 窗口宽度变化，或对话框内容变化时，调整对话框位置和对话框内的滚动条
     */
    var readjust = function () {
      if (!currentInst) {
        return;
      }

      var $dialog = currentInst.$dialog;

      var $dialogTitle = $dialog.children('.mdui-dialog-title');
      var $dialogContent = $dialog.children('.mdui-dialog-content');
      var $dialogActions = $dialog.children('.mdui-dialog-actions');

      // 调整 dialog 的 top 和 height 值
      $dialog.height('');
      $dialogContent.height('');

      var dialogHeight = $dialog.height();
      $dialog.css({
        top: (($window.height() - dialogHeight) / 2) + 'px',
        height: dialogHeight + 'px',
      });

      // 调整 mdui-dialog-content 的高度
      $dialogContent.height(
        dialogHeight -
        ($dialogTitle.height() || 0) -
        ($dialogActions.height() || 0)
      );
    };

    /**
     * hashchange 事件触发时关闭对话框
     */
    var hashchangeEvent = function () {
      if (location.hash.substring(1).indexOf('&mdui-dialog') < 0) {
        currentInst.close(true);
      }
    };

    /**
     * 点击遮罩层关闭对话框
     * @param e
     */
    var overlayClick = function (e) {
      if ($(e.target).hasClass('mdui-overlay')) {
        currentInst.close();
      }
    };

    /**
     * 对话框实例
     * @param selector 选择器或 HTML 字符串或 DOM 元素
     * @param opts
     * @constructor
     */
    function Dialog(selector, opts) {
      var _this = this;

      // 对话框元素
      _this.$dialog = $(selector).eq(0);
      if (!_this.$dialog.length) {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = _this.$dialog.data('mdui.dialog');
      if (oldInst) {
        return oldInst;
      }

      // 如果对话框元素没有在当前文档中，则需要添加
      if (!$.contains($body[0], _this.$dialog[0])) {
        _this.append = true;
        $body.append(_this.$dialog);
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 绑定取消按钮事件
      _this.$dialog.find('[mdui-dialog-cancel]').each(function () {
        $(this).on('click', function () {
          componentEvent('cancel', 'dialog', _this, _this.$dialog);
          if (_this.options.closeOnCancel) {
            _this.close();
          }
        });
      });

      // 绑定确认按钮事件
      _this.$dialog.find('[mdui-dialog-confirm]').each(function () {
        $(this).on('click', function () {
          componentEvent('confirm', 'dialog', _this, _this.$dialog);
          if (_this.options.closeOnConfirm) {
            _this.close();
          }
        });
      });

      // 绑定关闭按钮事件
      _this.$dialog.find('[mdui-dialog-close]').each(function () {
        $(this).on('click', function () {
          _this.close();
        });
      });
    }

    /**
     * 打开指定对话框
     * @private
     */
    Dialog.prototype._doOpen = function () {
      var _this = this;

      currentInst = _this;

      if (!isLockScreen) {
        $.lockScreen();
        isLockScreen = true;
      }

      _this.$dialog.show();

      readjust();
      $window.on('resize', $.throttle(function () {
        readjust();
      }, 100));

      // 打开消息框
      _this.state = 'opening';
      componentEvent('open', 'dialog', _this, _this.$dialog);

      _this.$dialog
        .addClass('mdui-dialog-open')
        .transitionEnd(function () {
          if (_this.$dialog.hasClass('mdui-dialog-open')) {
            _this.state = 'opened';
            componentEvent('opened', 'dialog', _this, _this.$dialog);
          } else {
            _this.state = 'closed';
            componentEvent('closed', 'dialog', _this, _this.$dialog);
          }
        });

      // 不存在遮罩层元素时，添加遮罩层
      if (!$overlay) {
        $overlay = $.showOverlay(5100);
      }

      $overlay

        // 点击遮罩层时是否关闭对话框
        [_this.options.modal ? 'off' : 'on']('click', overlayClick)

        // 是否显示遮罩层，不显示时，把遮罩层背景透明
        .css('opacity', _this.options.overlay ? '' : 0);

      if (_this.options.history) {
        // 如果 hash 中原来就有 &mdui-dialog，先删除，避免后退历史纪录后仍然有 &mdui-dialog 导致无法关闭
        var hash = location.hash.substring(1);
        if (hash.indexOf('&mdui-dialog') > -1) {
          hash = hash.replace(/&mdui-dialog/g, '');
        }

        // 后退按钮关闭对话框
        location.hash = hash + '&mdui-dialog';
        $window.on('hashchange', hashchangeEvent);
      }
    };

    /**
     * 打开对话框
     */
    Dialog.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      // 如果当前有正在打开或已经打开的对话框,或队列不为空，则先加入队列，等旧对话框开始关闭时再打开
      if (
        (currentInst && (currentInst.state === 'opening' || currentInst.state === 'opened')) ||
        queue.queue(queueName).length
      ) {
        queue.queue(queueName, function () {
          _this._doOpen();
        });

        return;
      }

      _this._doOpen();
    };

    /**
     * 关闭对话框
     */
    Dialog.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      currentInst = null;

      _this.state = 'closing';
      componentEvent('close', 'dialog', _this, _this.$dialog);

      // 所有对话框都关闭，且当前没有打开的对话框时，隐藏遮罩
      if (queue.queue(queueName).length === 0 && $overlay) {
        $.hideOverlay();
        $overlay = null;
      }

      _this.$dialog
        .removeClass('mdui-dialog-open')
        .transitionEnd(function () {
          if (!_this.$dialog.hasClass('mdui-dialog-open')) {
            _this.state = 'closed';
            componentEvent('closed', 'dialog', _this, _this.$dialog);

            _this.$dialog.hide();

            // 所有对话框都关闭，且当前没有打开的对话框时，解锁屏幕
            if (queue.queue(queueName).length === 0 && !currentInst && isLockScreen) {
              $.unlockScreen();
              isLockScreen = false;
            }

            $window.off('resize', $.throttle(function () {
              readjust();
            }, 100));

            if (_this.options.destroyOnClosed) {
              _this.destroy();
            }
          } else {
            _this.state = 'opened';
            componentEvent('opened', 'dialog', _this, _this.$dialog);
          }
        });

      if (_this.options.history && queue.queue(queueName).length === 0) {
        // 是否需要后退历史纪录，默认为 false。
        // 为 false 时是通过 js 关闭，需要后退一个历史记录
        // 为 true 时是通过后退按钮关闭，不需要后退历史记录
        if (!arguments[0]) {
          window.history.back();
        }

        $window.off('hashchange', hashchangeEvent);
      }

      // 关闭旧对话框，打开新对话框。
      // 加一点延迟，仅仅为了视觉效果更好。不加延时也不影响功能
      setTimeout(function () {
        queue.dequeue(queueName);
      }, 100);
    };

    /**
     * 切换对话框打开/关闭状态
     */
    Dialog.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 获取对话框状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Dialog.prototype.getState = function () {
      return this.state;
    };

    /**
     * 销毁对话框
     */
    Dialog.prototype.destroy = function () {
      var _this = this;

      if (_this.append) {
        _this.$dialog.remove();
      }

      _this.$dialog.removeData('mdui.dialog');

      if (queue.queue(queueName).length === 0 && !currentInst) {
        if ($overlay) {
          $.hideOverlay();
          $overlay = null;
        }

        if (isLockScreen) {
          $.unlockScreen();
          isLockScreen = false;
        }
      }
    };

    /**
     * 对话框内容变化时，需要调用该方法来调整对话框位置和滚动条高度
     */
    Dialog.prototype.handleUpdate = function () {
      readjust();
    };

    // esc 按下时关闭对话框
    $document.on('keydown', function (e) {
      if (
        currentInst &&
        currentInst.options.closeOnEsc &&
        currentInst.state === 'opened' &&
        e.keyCode === 27
      ) {
        currentInst.close();
      }
    });

    return Dialog;

  })();


  /**
   * =============================================================================
   * ************   Dialog DATA API   ************
   * =============================================================================
   */

  $(function () {
    $document.on('click', '[mdui-dialog]', function () {
      var $this = $(this);
      var options = parseOptions($this.attr('mdui-dialog'));
      var selector = options.target;
      delete options.target;

      var $dialog = $(selector).eq(0);

      var inst = $dialog.data('mdui.dialog');
      if (!inst) {
        inst = new mdui.Dialog($dialog, options);
        $dialog.data('mdui.dialog', inst);
      }

      inst.open();
    });
  });


  /**
   * =============================================================================
   * ************   mdui.dialog(options)   ************
   * =============================================================================
   */

  mdui.dialog = function (options) {

    /**
     * 默认参数
     */
    var DEFAULT = {
      title: '',                // 标题
      content: '',              // 文本
      buttons: [],              // 按钮
      stackedButtons: false,    // 垂直排列按钮
      cssClass: '',             // 在 Dialog 上添加的 CSS 类
      history: true,            // 监听 hashchange 事件
      overlay: true,            // 是否显示遮罩
      modal: false,             // 是否模态化对话框
      closeOnEsc: true,         // 按下 esc 时关闭对话框
      destroyOnClosed: true,    // 关闭后销毁
      onOpen: function () {     // 打开动画开始时的回调
      },

      onOpened: function () {   // 打开动画结束后的回调
      },

      onClose: function () {    // 关闭动画开始时的回调
      },

      onClosed: function () {   // 关闭动画结束时的回调
      },
    };

    /**
     * 按钮的默认参数
     */
    var DEFAULT_BUTTON = {
      text: '',                   // 按钮文本
      bold: false,                // 按钮文本是否加粗
      close: true,                // 点击按钮后关闭对话框
      onClick: function (inst) {  // 点击按钮的回调
      },
    };

    // 合并参数
    options = $.extend({}, DEFAULT, (options || {}));
    $.each(options.buttons, function (i, button) {
      options.buttons[i] = $.extend({}, DEFAULT_BUTTON, button);
    });

    // 按钮的 HTML
    var buttonsHTML = '';
    if (options.buttons.length) {
      buttonsHTML =
        '<div class="mdui-dialog-actions ' +
          (options.stackedButtons ? 'mdui-dialog-actions-stacked' : '') +
        '">';
      $.each(options.buttons, function (i, button) {
        buttonsHTML +=
          '<a href="javascript:void(0)" ' +
            'class="mdui-btn mdui-ripple mdui-text-color-primary ' +
            (button.bold ? 'mdui-btn-bold' : '') + '">' +
            button.text +
          '</a>';
      });

      buttonsHTML += '</div>';
    }

    // Dialog 的 HTML
    var HTML =
      '<div class="mdui-dialog ' + options.cssClass + '">' +
        (options.title ? '<div class="mdui-dialog-title">' + options.title + '</div>' : '') +
        (options.content ? '<div class="mdui-dialog-content">' + options.content + '</div>' : '') +
        buttonsHTML +
      '</div>';

    // 实例化 Dialog
    var inst = new mdui.Dialog(HTML, {
      history: options.history,
      overlay: options.overlay,
      modal: options.modal,
      closeOnEsc: options.closeOnEsc,
      destroyOnClosed: options.destroyOnClosed,
    });

    // 绑定按钮事件
    if (options.buttons.length) {
      inst.$dialog.find('.mdui-dialog-actions .mdui-btn').each(function (i, button) {
        $(button).on('click', function () {
          if (typeof options.buttons[i].onClick === 'function') {
            options.buttons[i].onClick(inst);
          }

          if (options.buttons[i].close) {
            inst.close();
          }
        });
      });
    }

    // 绑定打开关闭事件
    if (typeof options.onOpen === 'function') {
      inst.$dialog
        .on('open.mdui.dialog', function () {
          options.onOpen(inst);
        })
        .on('opened.mdui.dialog', function () {
          options.onOpened(inst);
        })
        .on('close.mdui.dialog', function () {
          options.onClose(inst);
        })
        .on('closed.mdui.dialog', function () {
          options.onClosed(inst);
        });
    }

    inst.open();

    return inst;
  };


  /**
   * =============================================================================
   * ************   mdui.alert(text, title, onConfirm, options)   ************
   * ************   mdui.alert(text, onConfirm, options)   ************
   * =============================================================================
   */

  mdui.alert = function (text, title, onConfirm, options) {

    // title 参数可选
    if (typeof title === 'function') {
      title = '';
      onConfirm = arguments[1];
      options = arguments[2];
    }

    if (onConfirm === undefined) {
      onConfirm = function () {};
    }

    if (options === undefined) {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',             // 按钮上的文本
      history: true,                 // 监听 hashchange 事件
      modal: false,                  // 是否模态化对话框，为 false 时点击对话框外面区域关闭对话框，为 true 时不关闭
      closeOnEsc: true,              // 按下 esc 关闭对话框
    };

    options = $.extend({}, DEFAULT, options);

    return mdui.dialog({
      title: title,
      content: text,
      buttons: [
        {
          text: options.confirmText,
          bold: false,
          close: true,
          onClick: onConfirm,
        },
      ],
      cssClass: 'mdui-dialog-alert',
      history: options.history,
      modal: options.modal,
      closeOnEsc: options.closeOnEsc,
    });
  };


  /**
   * =============================================================================
   * ************   mdui.confirm(text, title, onConfirm, onCancel, options)   ************
   * ************   mdui.confirm(text, onConfirm, onCancel, options)          ************
   * =============================================================================
   */

  mdui.confirm = function (text, title, onConfirm, onCancel, options) {

    // title 参数可选
    if (typeof title === 'function') {
      title = '';
      onConfirm = arguments[1];
      onCancel = arguments[2];
      options = arguments[3];
    }

    if (onConfirm === undefined) {
      onConfirm = function () {};
    }

    if (onCancel === undefined) {
      onCancel = function () {};
    }

    if (options === undefined) {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',            // 确认按钮的文本
      cancelText: 'cancel',         // 取消按钮的文本
      history: true,                // 监听 hashchange 事件
      modal: false,                 // 是否模态化对话框，为 false 时点击对话框外面区域关闭对话框，为 true 时不关闭
      closeOnEsc: true,             // 按下 esc 关闭对话框
    };

    options = $.extend({}, DEFAULT, options);

    return mdui.dialog({
      title: title,
      content: text,
      buttons: [
        {
          text: options.cancelText,
          bold: false,
          close: true,
          onClick: onCancel,
        },
        {
          text: options.confirmText,
          bold: false,
          close: true,
          onClick: onConfirm,
        },
      ],
      cssClass: 'mdui-dialog-confirm',
      history: options.history,
      modal: options.modal,
      closeOnEsc: options.closeOnEsc,
    });
  };


  /**
   * =============================================================================
   * ************   mdui.prompt(label, title, onConfirm, onCancel, options)   ************
   * ************   mdui.prompt(label, onConfirm, onCancel, options)          ************
   * =============================================================================
   */

  mdui.prompt = function (label, title, onConfirm, onCancel, options) {

    // title 参数可选
    if (typeof title === 'function') {
      title = '';
      onConfirm = arguments[1];
      onCancel = arguments[2];
      options = arguments[3];
    }

    if (onConfirm === undefined) {
      onConfirm = function () {};
    }

    if (onCancel === undefined) {
      onCancel = function () {};
    }

    if (options === undefined) {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',        // 确认按钮的文本
      cancelText: 'cancel',     // 取消按钮的文本
      history: true,            // 监听 hashchange 事件
      modal: false,             // 是否模态化对话框，为 false 时点击对话框外面区域关闭对话框，为 true 时不关闭
      closeOnEsc: true,         // 按下 esc 关闭对话框
      type: 'text',             // 输入框类型，text: 单行文本框 textarea: 多行文本框
      maxlength: '',            // 最大输入字符数
      defaultValue: '',         // 输入框中的默认文本
    };

    options = $.extend({}, DEFAULT, options);

    var content =
      '<div class="mdui-textfield">' +
        (label ? '<label class="mdui-textfield-label">' + label + '</label>' : '') +
        (options.type === 'text' ?
          '<input class="mdui-textfield-input" type="text" ' +
            'value="' + options.defaultValue + '" ' +
            (options.maxlength ? ('maxlength="' + options.maxlength + '"') : '') + '/>' :
          '') +
        (options.type === 'textarea' ?
          '<textarea class="mdui-textfield-input" ' +
            (options.maxlength ? ('maxlength="' + options.maxlength + '"') : '') + '>' +
              options.defaultValue +
          '</textarea>' :
          '') +
      '</div>';

    return mdui.dialog({
      title: title,
      content: content,
      buttons: [
        {
          text: options.cancelText,
          bold: false,
          close: true,
          onClick: function (inst) {
            var value = inst.$dialog.find('.mdui-textfield-input').val();
            onCancel(value, inst);
          },
        },
        {
          text: options.confirmText,
          bold: false,
          close: true,
          onClick: function (inst) {
            var value = inst.$dialog.find('.mdui-textfield-input').val();
            onConfirm(value, inst);
          },
        },
      ],
      cssClass: 'mdui-dialog-prompt',
      history: options.history,
      modal: options.modal,
      closeOnEsc: options.closeOnEsc,
      onOpen: function (inst) {

        // 初始化输入框
        var $input = inst.$dialog.find('.mdui-textfield-input');
        mdui.updateTextFields($input);

        // 聚焦到输入框
        $input[0].focus();

        // 如果是多行输入框，监听输入框的 input 事件，更新对话框高度
        if (options.type === 'textarea') {
          $input.on('input', function () {
            inst.handleUpdate();
          });
        }

        // 有字符数限制时，加载完文本框后 DOM 会变化，需要更新对话框高度
        if (options.maxlength) {
          inst.handleUpdate();
        }
      },
    });

  };


  /**
   * =============================================================================
   * ************   ToolTip 工具提示   ************
   * =============================================================================
   */

  mdui.Tooltip = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      position: 'auto',     // 提示所在位置
      delay: 0,             // 延迟，单位毫秒
      content: '',          // 提示文本，允许包含 HTML
    };

    /**
     * 是否是桌面设备
     * @returns {boolean}
     */
    var isDesktop = function () {
      return $window.width() > 1024;
    };

    /**
     * 设置 Tooltip 的位置
     * @param inst
     */
    function setPosition(inst) {
      var marginLeft;
      var marginTop;
      var position;

      // 触发的元素
      var targetProps = inst.$target[0].getBoundingClientRect();

      // 触发的元素和 Tooltip 之间的距离
      var targetMargin = (isDesktop() ? 14 : 24);

      // Tooltip 的宽度和高度
      var tooltipWidth = inst.$tooltip[0].offsetWidth;
      var tooltipHeight = inst.$tooltip[0].offsetHeight;

      // Tooltip 的方向
      position = inst.options.position;

      // 自动判断位置，加 2px，使 Tooltip 距离窗口边框至少有 2px 的间距
      if (['bottom', 'top', 'left', 'right'].indexOf(position) === -1) {
        if (
          targetProps.top + targetProps.height + targetMargin + tooltipHeight + 2 <
          $window.height()
        ) {
          position = 'bottom';
        } else if (targetMargin + tooltipHeight + 2 < targetProps.top) {
          position = 'top';
        } else if (targetMargin + tooltipWidth + 2 < targetProps.left) {
          position = 'left';
        } else if (
          targetProps.width + targetMargin + tooltipWidth + 2 <
          $window.width() - targetProps.left
        ) {
          position = 'right';
        } else {
          position = 'bottom';
        }
      }

      // 设置位置
      switch (position) {
        case 'bottom':
          marginLeft = -1 * (tooltipWidth / 2);
          marginTop = (targetProps.height / 2) + targetMargin;
          inst.$tooltip.transformOrigin('top center');
          break;
        case 'top':
          marginLeft = -1 * (tooltipWidth / 2);
          marginTop = -1 * (tooltipHeight + (targetProps.height / 2) + targetMargin);
          inst.$tooltip.transformOrigin('bottom center');
          break;
        case 'left':
          marginLeft = -1 * (tooltipWidth + (targetProps.width / 2) + targetMargin);
          marginTop = -1 * (tooltipHeight / 2);
          inst.$tooltip.transformOrigin('center right');
          break;
        case 'right':
          marginLeft = (targetProps.width / 2) + targetMargin;
          marginTop = -1 * (tooltipHeight / 2);
          inst.$tooltip.transformOrigin('center left');
          break;
      }

      var targetOffset = inst.$target.offset();
      inst.$tooltip.css({
        top: targetOffset.top + (targetProps.height / 2) + 'px',
        left: targetOffset.left + (targetProps.width / 2) + 'px',
        'margin-left': marginLeft + 'px',
        'margin-top': marginTop + 'px',
      });
    }

    /**
     * Tooltip 实例
     * @param selector
     * @param opts
     * @constructor
     */
    function Tooltip(selector, opts) {
      var _this = this;

      _this.$target = $(selector).eq(0);
      if (!_this.$target.length) {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = _this.$target.data('mdui.tooltip');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 创建 Tooltip HTML
      var guid = $.guid('tooltip');
      _this.$tooltip = $(
        '<div class="mdui-tooltip" id="mdui-tooltip-' + guid + '">' +
          _this.options.content +
        '</div>'
      ).appendTo($body);

      // 绑定事件
      _this.$target
        .on('touchstart mouseenter', function (e) {
          if (!TouchHandler.isAllow(e)) {
            return;
          }

          TouchHandler.register(e);

          _this.open();
        })
        .on('touchend mouseleave', function (e) {
          if (!TouchHandler.isAllow(e)) {
            return;
          }

          _this.close();
        })
        .on(TouchHandler.unlock, TouchHandler.register);
    }

    /**
     * 动画结束回调
     * @private
     */
    var transitionEnd = function (inst) {
      if (inst.$tooltip.hasClass('mdui-tooltip-open')) {
        inst.state = 'opened';
        componentEvent('opened', 'tooltip', inst, inst.$target);
      } else {
        inst.state = 'closed';
        componentEvent('closed', 'tooltip', inst, inst.$target);
      }
    };

    /**
     * 执行打开 Tooltip
     * @private
     */
    Tooltip.prototype._doOpen = function () {
      var _this = this;

      _this.state = 'opening';
      componentEvent('open', 'tooltip', _this, _this.$target);

      _this.$tooltip
        .addClass('mdui-tooltip-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 打开 Tooltip
     * @param opts 允许每次打开时设置不同的参数
     */
    Tooltip.prototype.open = function (opts) {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      var oldOpts = _this.options;

      // 合并 data 属性参数
      $.extend(_this.options, parseOptions(_this.$target.attr('mdui-tooltip')));
      if (opts) {
        $.extend(_this.options, opts);
      }

      // tooltip 的内容有更新
      if (oldOpts.content !== _this.options.content) {
        _this.$tooltip.html(_this.options.content);
      }

      setPosition(_this);

      if (_this.options.delay) {
        _this.timeoutId = setTimeout(function () {
          _this._doOpen();
        }, _this.options.delay);
      } else {
        _this.timeoutId = false;
        _this._doOpen();
      }
    };

    /**
     * 关闭 Tooltip
     */
    Tooltip.prototype.close = function () {
      var _this = this;

      if (_this.timeoutId) {
        clearTimeout(_this.timeoutId);
        _this.timeoutId = false;
      }

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      _this.state = 'closing';
      componentEvent('close', 'tooltip', _this, _this.$target);

      _this.$tooltip
        .removeClass('mdui-tooltip-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 切换 Tooltip 状态
     */
    Tooltip.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 获取 Tooltip 状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Tooltip.prototype.getState = function () {
      return this.state;
    };

    /**
     * 销毁 Tooltip
     */
    /*Tooltip.prototype.destroy = function () {
      var _this = this;
      clearTimeout(_this.timeoutId);
      $.data(_this.target, 'mdui.tooltip', null);
      $.remove(_this.tooltip);
    };*/

    return Tooltip;

  })();


  /**
   * =============================================================================
   * ************   Tooltip DATA API   ************
   * =============================================================================
   */

  $(function () {
    // mouseenter 不能冒泡，所以这里用 mouseover 代替
    $document.on('touchstart mouseover', '[mdui-tooltip]', function () {
      var $this = $(this);

      var inst = $this.data('mdui.tooltip');
      if (!inst) {
        var options = parseOptions($this.attr('mdui-tooltip'));
        inst = new mdui.Tooltip($this, options);
        $this.data('mdui.tooltip', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   Snackbar   ************
   * =============================================================================
   */

  (function () {

    /**
     * 当前打开着的 Snackbar
     */
    var currentInst;

    /**
     * 对列名
     * @type {string}
     */
    var queueName = '__md_snackbar';

    var DEFAULT = {
      message: '',                    // 文本内容
      timeout: 4000,                  // 在用户没有操作时多长时间自动隐藏
      buttonText: '',                 // 按钮的文本
      buttonColor: '',                // 按钮的颜色，支持 blue #90caf9 rgba(...)
      closeOnButtonClick: true,       // 点击按钮时关闭
      closeOnOutsideClick: true,      // 触摸或点击屏幕其他地方时关闭
      onClick: function () {          // 在 Snackbar 上点击的回调
      },

      onButtonClick: function () {    // 点击按钮的回调
      },

      onClose: function () {          // 关闭动画开始时的回调
      },
    };

    /**
     * 点击 Snackbar 外面的区域关闭
     * @param e
     */
    var closeOnOutsideClick = function (e) {
      var $target = $(e.target);
      if (!$target.hasClass('mdui-snackbar') && !$target.parents('.mdui-snackbar').length) {
        currentInst.close();
      }
    };

    /**
     * Snackbar 实例
     * @param opts
     * @constructor
     */
    function Snackbar(opts) {
      var _this = this;

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      // message 参数必须
      if (!_this.options.message) {
        return;
      }

      _this.state = 'closed';

      _this.timeoutId = false;

      // 按钮颜色
      var buttonColorStyle = '';
      var buttonColorClass = '';

      if (
        _this.options.buttonColor.indexOf('#') === 0 ||
        _this.options.buttonColor.indexOf('rgb') === 0
      ) {
        buttonColorStyle = 'style="color:' + _this.options.buttonColor + '"';
      } else if (_this.options.buttonColor !== '') {
        buttonColorClass = 'mdui-text-color-' + _this.options.buttonColor;
      }

      // 添加 HTML
      _this.$snackbar = $(
        '<div class="mdui-snackbar">' +
          '<div class="mdui-snackbar-text">' +
            _this.options.message +
          '</div>' +
          (_this.options.buttonText ?
            ('<a href="javascript:void(0)" ' +
            'class="mdui-snackbar-action mdui-btn mdui-ripple mdui-ripple-white ' +
              buttonColorClass + '" ' +
              buttonColorStyle + '>' +
              _this.options.buttonText +
            '</a>') :
            ''
          ) +
        '</div>')
        .appendTo($body);

      // 设置位置
      _this.$snackbar
        .transform('translateY(' + _this.$snackbar[0].clientHeight + 'px)')
        .css('left', (document.body.clientWidth - _this.$snackbar[0].clientWidth) / 2 + 'px')
        .addClass('mdui-snackbar-transition');
    }

    /**
     * 打开 Snackbar
     */
    Snackbar.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      // 如果当前有正在显示的 Snackbar，则先加入队列，等旧 Snackbar 关闭后再打开
      if (currentInst) {
        queue.queue(queueName, function () {
          _this.open();
        });

        return;
      }

      currentInst = _this;

      // 开始打开
      _this.state = 'opening';
      _this.$snackbar
        .transform('translateY(0)')
        .transitionEnd(function () {
          if (_this.state !== 'opening') {
            return;
          }

          _this.state = 'opened';

          // 有按钮时绑定事件
          if (_this.options.buttonText) {
            _this.$snackbar
              .find('.mdui-snackbar-action')
              .on('click', function () {
                _this.options.onButtonClick();
                if (_this.options.closeOnButtonClick) {
                  _this.close();
                }
              });
          }

          // 点击 snackbar 的事件
          _this.$snackbar.on('click', function (e) {
            if (!$(e.target).hasClass('mdui-snackbar-action')) {
              _this.options.onClick();
            }
          });

          // 点击 Snackbar 外面的区域关闭
          if (_this.options.closeOnOutsideClick) {
            $document.on(TouchHandler.start, closeOnOutsideClick);
          }

          // 超时后自动关闭
          _this.timeoutId = setTimeout(function () {
            _this.close();
          }, _this.options.timeout);
        });
    };

    /**
     * 关闭 Snackbar
     */
    Snackbar.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      if (_this.timeoutId) {
        clearTimeout(_this.timeoutId);
      }

      if (_this.options.closeOnOutsideClick) {
        $document.off(TouchHandler.start, closeOnOutsideClick);
      }

      _this.state = 'closing';
      _this.options.onClose();

      _this.$snackbar
        .transform('translateY(' + _this.$snackbar[0].clientHeight + 'px)')
        .transitionEnd(function () {
          if (_this.state !== 'closing') {
            return;
          }

          currentInst = null;
          _this.state = 'closed';
          _this.$snackbar.remove();
          queue.dequeue(queueName);
        });
    };

    /**
     * 打开 Snackbar
     * @param params
     */
    mdui.snackbar = function (params) {
      var inst = new Snackbar(params);

      inst.open();
      return inst;
    };

  })();


  /**
   * =============================================================================
   * ************   Menu 菜单   ************
   * =============================================================================
   */

  mdui.Menu = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      position: 'auto',         // 菜单位置 top、bottom、center、auto
      align: 'auto',            // 菜单和触发它的元素的对齐方式 left、right、center、auto
      gutter: 16,               // 菜单距离窗口边缘的最小距离，单位 px
      fixed: false,             // 是否使菜单固定在窗口，不随滚动条滚动
      covered: 'auto',          // 菜单是否覆盖在触发它的元素上，true、false。auto 时简单菜单覆盖，级联菜单不覆盖
      subMenuTrigger: 'hover',  // 子菜单的触发方式 hover、click
      subMenuDelay: 200,        // 子菜单的触发延时，仅在 submenuTrigger 为 hover 有效
    };

    /**
     * 调整主菜单位置
     * @param _this 实例
     */
    var readjust = function (_this) {
      var menuLeft;
      var menuTop;

      // 菜单位置和方向
      var position;
      var align;

      // window 窗口的宽度和高度
      var windowHeight = $window.height();
      var windowWidth = $window.width();

      // 配置参数
      var gutter = _this.options.gutter;
      var isCovered = _this.isCovered;
      var isFixed = _this.options.fixed;

      // 动画方向参数
      var transformOriginX;
      var transformOriginY;

      // 菜单的原始宽度和高度
      var menuWidth = _this.$menu.width();
      var menuHeight = _this.$menu.height();

      var $anchor = _this.$anchor;

      // 触发菜单的元素在窗口中的位置
      var anchorTmp = $anchor[0].getBoundingClientRect();
      var anchorTop = anchorTmp.top;
      var anchorLeft = anchorTmp.left;
      var anchorHeight = anchorTmp.height;
      var anchorWidth = anchorTmp.width;
      var anchorBottom = windowHeight - anchorTop - anchorHeight;
      var anchorRight = windowWidth - anchorLeft - anchorWidth;

      // 触发元素相对其拥有定位属性的父元素的位置
      var anchorOffsetTop = $anchor[0].offsetTop;
      var anchorOffsetLeft = $anchor[0].offsetLeft;

      // ===============================
      // ================= 自动判断菜单位置
      // ===============================
      if (_this.options.position === 'auto') {

        // 判断下方是否放得下菜单
        if (anchorBottom + (isCovered ? anchorHeight : 0) > menuHeight + gutter) {
          position = 'bottom';
        }

        // 判断上方是否放得下菜单
        else if (anchorTop + (isCovered ? anchorHeight : 0) > menuHeight + gutter) {
          position = 'top';
        }

        // 上下都放不下，居中显示
        else {
          position = 'center';
        }
      } else {
        position = _this.options.position;
      }

      // ===============================
      // ============== 自动判断菜单对齐方式
      // ===============================
      if (_this.options.align === 'auto') {

        // 判断右侧是否放得下菜单
        if (anchorRight + anchorWidth > menuWidth + gutter) {
          align = 'left';
        }

        // 判断左侧是否放得下菜单
        else if (anchorLeft + anchorWidth > menuWidth + gutter) {
          align = 'right';
        }

        // 左右都放不下，居中显示
        else {
          align = 'center';
        }
      } else {
        align = _this.options.align;
      }

      // ===============================
      // ==================== 设置菜单位置
      // ===============================
      if (position === 'bottom') {
        transformOriginY = '0';

        menuTop =
          (isCovered ? 0 : anchorHeight) +
          (isFixed ? anchorTop : anchorOffsetTop);

      } else if (position === 'top') {
        transformOriginY = '100%';

        menuTop =
          (isCovered ? anchorHeight : 0) +
          (isFixed ? (anchorTop - menuHeight) : (anchorOffsetTop - menuHeight));

      } else {
        transformOriginY = '50%';

        // =====================在窗口中居中
        // 显示的菜单的高度，简单菜单高度不超过窗口高度，若超过了则在菜单内部显示滚动条
        // 级联菜单内部不允许出现滚动条
        var menuHeightTemp = menuHeight;

        // 简单菜单比窗口高时，限制菜单高度
        if (!_this.$menu.hasClass('mdui-menu-cascade')) {
          if (menuHeight + gutter * 2 > windowHeight) {
            menuHeightTemp = windowHeight - gutter * 2;
            _this.$menu.height(menuHeightTemp);
          }
        }

        menuTop =
          (windowHeight - menuHeightTemp) / 2 +
          (isFixed ? 0 : (anchorOffsetTop - anchorTop));
      }

      _this.$menu.css('top', menuTop + 'px');

      // ===============================
      // ================= 设置菜单对齐方式
      // ===============================
      if (align === 'left') {
        transformOriginX = '0';

        menuLeft = isFixed ? anchorLeft : anchorOffsetLeft;

      } else if (align === 'right') {
        transformOriginX = '100%';

        menuLeft = isFixed ?
          (anchorLeft + anchorWidth - menuWidth) :
          (anchorOffsetLeft + anchorWidth - menuWidth);
      } else {
        transformOriginX = '50%';

        //=======================在窗口中居中
        // 显示的菜单的宽度，菜单宽度不能超过窗口宽度
        var menuWidthTemp = menuWidth;

        // 菜单比窗口宽，限制菜单宽度
        if (menuWidth + gutter * 2 > windowWidth) {
          menuWidthTemp = windowWidth - gutter * 2;
          _this.$menu.width(menuWidthTemp);
        }

        menuLeft =
          (windowWidth - menuWidthTemp) / 2 +
          (isFixed ? 0 : anchorOffsetLeft - anchorLeft);
      }

      _this.$menu.css('left', menuLeft + 'px');

      // 设置菜单动画方向
      _this.$menu.transformOrigin(transformOriginX + ' ' + transformOriginY);
    };

    /**
     * 调整子菜单的位置
     * @param $submenu
     */
    var readjustSubmenu = function ($submenu) {
      var $item = $submenu.parent('.mdui-menu-item');

      var submenuTop;
      var submenuLeft;

      // 子菜单位置和方向
      var position; // top、bottom
      var align; // left、right

      // window 窗口的宽度和高度
      var windowHeight = $window.height();
      var windowWidth = $window.width();

      // 动画方向参数
      var transformOriginX;
      var transformOriginY;

      // 子菜单的原始宽度和高度
      var submenuWidth = $submenu.width();
      var submenuHeight = $submenu.height();

      // 触发子菜单的菜单项的宽度高度
      var itemTmp = $item[0].getBoundingClientRect();
      var itemWidth = itemTmp.width;
      var itemHeight = itemTmp.height;
      var itemLeft = itemTmp.left;
      var itemTop = itemTmp.top;

      // ===================================
      // ===================== 判断菜单上下位置
      // ===================================

      // 判断下方是否放得下菜单
      if (windowHeight - itemTop > submenuHeight) {
        position = 'bottom';
      }

      // 判断上方是否放得下菜单
      else if (itemTop + itemHeight > submenuHeight) {
        position = 'top';
      }

      // 默认放在下方
      else {
        position = 'bottom';
      }

      // ====================================
      // ====================== 判断菜单左右位置
      // ====================================

      // 判断右侧是否放得下菜单
      if (windowWidth - itemLeft - itemWidth > submenuWidth) {
        align = 'left';
      }

      // 判断左侧是否放得下菜单
      else if (itemLeft > submenuWidth) {
        align = 'right';
      }

      // 默认放在右侧
      else {
        align = 'left';
      }

      // ===================================
      // ======================== 设置菜单位置
      // ===================================
      if (position === 'bottom') {
        transformOriginY = '0';
        submenuTop = '0';
      } else if (position === 'top') {
        transformOriginY = '100%';
        submenuTop = -submenuHeight + itemHeight;
      }

      $submenu.css('top', submenuTop + 'px');

      // ===================================
      // ===================== 设置菜单对齐方式
      // ===================================
      if (align === 'left') {
        transformOriginX = '0';
        submenuLeft = itemWidth;
      } else if (align === 'right') {
        transformOriginX = '100%';
        submenuLeft = -submenuWidth;
      }

      $submenu.css('left', submenuLeft + 'px');

      // 设置菜单动画方向
      $submenu.transformOrigin(transformOriginX + ' ' + transformOriginY);
    };

    /**
     * 打开子菜单
     * @param $submenu
     */
    var openSubMenu = function ($submenu) {
      readjustSubmenu($submenu);

      $submenu
        .addClass('mdui-menu-open')
        .parent('.mdui-menu-item')
        .addClass('mdui-menu-item-active');
    };

    /**
     * 关闭子菜单，及其嵌套的子菜单
     * @param $submenu
     */
    var closeSubMenu = function ($submenu) {
      // 关闭子菜单
      $submenu
        .removeClass('mdui-menu-open')

        // 移除激活状态的样式
        .parent('.mdui-menu-item')
        .removeClass('mdui-menu-item-active');

      // 循环关闭嵌套的子菜单
      $submenu.find('.mdui-menu').each(function () {
        $(this)
          .removeClass('mdui-menu-open')
          .parent('.mdui-menu-item')
          .removeClass('mdui-menu-item-active');
      });
    };

    /**
     * 切换子菜单状态
     * @param $submenu
     */
    var toggleSubMenu = function ($submenu) {
      if ($submenu.hasClass('mdui-menu-open')) {
        closeSubMenu($submenu);
      } else {
        openSubMenu($submenu);
      }
    };

    /**
     * 绑定子菜单事件
     * @param inst 实例
     */
    var bindSubMenuEvent = function (inst) {
      // 点击打开子菜单
      inst.$menu.on('click', '.mdui-menu-item', function (e) {
        var $this = $(this);
        var $target = $(e.target);

        // 禁用状态菜单不操作
        if ($this.attr('disabled') !== null) {
          return;
        }

        // 没有点击在子菜单的菜单项上时，不操作（点在了子菜单的空白区域、或分隔线上）
        if ($target.is('.mdui-menu') || $target.is('.mdui-divider')) {
          return;
        }

        // 阻止冒泡，点击菜单项时只在最后一级的 mdui-menu-item 上生效，不向上冒泡
        if (!$target.parents('.mdui-menu-item').eq(0).is($this)) {
          return;
        }

        // 当前菜单的子菜单
        var $submenu = $this.children('.mdui-menu');

        // 先关闭除当前子菜单外的所有同级子菜单
        $this.parent('.mdui-menu').children('.mdui-menu-item').each(function () {
          var $tmpSubmenu = $(this).children('.mdui-menu');
          if (
            $tmpSubmenu.length &&
            (!$submenu.length || !$tmpSubmenu.is($submenu))
          ) {
            closeSubMenu($tmpSubmenu);
          }
        });

        // 切换当前子菜单
        if ($submenu.length) {
          toggleSubMenu($submenu);
        }
      });

      if (inst.options.subMenuTrigger === 'hover') {
        // 临时存储 setTimeout 对象
        var timeout;

        var timeoutOpen;
        var timeoutClose;

        inst.$menu.on('mouseover mouseout', '.mdui-menu-item', function (e) {
          var $this = $(this);
          var eventType = e.type;
          var $relatedTarget = $(e.relatedTarget);

          // 禁用状态的菜单不操作
          if ($this.attr('disabled') !== null) {
            return;
          }

          // 用 mouseover 模拟 mouseenter
          if (eventType === 'mouseover') {
            if (!$this.is($relatedTarget) && $.contains($this[0], $relatedTarget[0])) {
              return;
            }
          }

          // 用 mouseout 模拟 mouseleave
          else if (eventType === 'mouseout') {
            if ($this.is($relatedTarget) || $.contains($this[0], $relatedTarget[0])) {
              return;
            }
          }

          // 当前菜单项下的子菜单，未必存在
          var $submenu = $this.children('.mdui-menu');

          // 鼠标移入菜单项时，显示菜单项下的子菜单
          if (eventType === 'mouseover') {
            if ($submenu.length) {

              // 当前子菜单准备打开时，如果当前子菜单正准备着关闭，不用再关闭了
              var tmpClose = $submenu.data('timeoutClose.mdui.menu');
              if (tmpClose) {
                clearTimeout(tmpClose);
              }

              // 如果当前子菜单已经打开，不操作
              if ($submenu.hasClass('mdui-menu-open')) {
                return;
              }

              // 当前子菜单准备打开时，其他准备打开的子菜单不用再打开了
              clearTimeout(timeoutOpen);

              // 准备打开当前子菜单
              timeout = timeoutOpen = setTimeout(function () {
                openSubMenu($submenu);
              }, inst.options.subMenuDelay);

              $submenu.data('timeoutOpen.mdui.menu', timeout);
            }
          }

          // 鼠标移出菜单项时，关闭菜单项下的子菜单
          else if (eventType === 'mouseout') {
            if ($submenu.length) {

              // 鼠标移出菜单项时，如果当前菜单项下的子菜单正准备打开，不用再打开了
              var tmpOpen = $submenu.data('timeoutOpen.mdui.menu');
              if (tmpOpen) {
                clearTimeout(tmpOpen);
              }

              // 准备关闭当前子菜单
              timeout = timeoutClose = setTimeout(function () {
                closeSubMenu($submenu);
              }, inst.options.subMenuDelay);

              $submenu.data('timeoutClose.mdui.menu', timeout);
            }
          }
        });
      }
    };

    /**
     * 菜单
     * @param anchorSelector 点击该元素触发菜单
     * @param menuSelector 菜单
     * @param opts 配置项
     * @constructor
     */
    function Menu(anchorSelector, menuSelector, opts) {
      var _this = this;

      // 触发菜单的元素
      _this.$anchor = $(anchorSelector).eq(0);
      if (!_this.$anchor.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = _this.$anchor.data('mdui.menu');
      if (oldInst) {
        return oldInst;
      }

      _this.$menu = $(menuSelector).eq(0);

      // 触发菜单的元素 和 菜单必须是同级的元素，否则菜单可能不能定位
      if (!_this.$anchor.siblings(_this.$menu).length) {
        return;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 是否是级联菜单
      _this.isCascade = _this.$menu.hasClass('mdui-menu-cascade');

      // covered 参数处理
      if (_this.options.covered === 'auto') {
        _this.isCovered = !_this.isCascade;
      } else {
        _this.isCovered = _this.options.covered;
      }

      // 点击触发菜单切换
      _this.$anchor.on('click', function () {
        _this.toggle();
      });

      // 点击菜单外面区域关闭菜单
      $document.on('click touchstart', function (e) {
        var $target = $(e.target);
        if (
          (_this.state === 'opening' || _this.state === 'opened') &&
            !$target.is(_this.$menu) &&
            !$.contains(_this.$menu[0], $target[0]) &&
            !$target.is(_this.$anchor) &&
            !$.contains(_this.$anchor[0], $target[0])
        ) {
          _this.close();
        }
      });

      // 点击不含子菜单的菜单条目关闭菜单
      $document.on('click', '.mdui-menu-item', function (e) {
        var $this = $(this);
        if (!$this.find('.mdui-menu').length && $this.attr('disabled') === null) {
          _this.close();
        }
      });

      // 绑定点击或鼠标移入含子菜单的条目的事件
      bindSubMenuEvent(_this);

      // 窗口大小变化时，重新调整菜单位置
      $window.on('resize', $.throttle(function () {
        readjust(_this);
      }, 100));
    }

    /**
     * 切换菜单状态
     */
    Menu.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 动画结束回调
     * @param inst
     */
    var transitionEnd = function (inst) {
      if (inst.state === 'opening') {
        inst.state = 'opened';
        componentEvent('opened', 'menu', inst, inst.$menu);
      }

      if (inst.state === 'closing') {
        inst.state = 'closed';
        componentEvent('closed', 'menu', inst, inst.$menu);

        // 关闭后，恢复菜单样式到默认状态，并恢复 fixed 定位
        inst.$menu.css({
          top: '',
          left: '',
          width: '',
          position: 'fixed',
        });
      }
    };

    /**
     * 打开菜单
     */
    Menu.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      _this.state = 'opening';
      componentEvent('open', 'menu', _this, _this.$menu);

      // 调整菜单位置
      readjust(_this);

      _this.$menu

        // 菜单隐藏状态使用使用 fixed 定位。
        .css('position', _this.options.fixed ? 'fixed' : 'absolute')

        // 打开菜单
        .addClass('mdui-menu-open')

        // 打开动画完成后
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 关闭菜单
     */
    Menu.prototype.close = function () {
      var _this = this;
      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      _this.state = 'closing';
      componentEvent('close', 'menu', _this, _this.$menu);

      // 菜单开始关闭时，关闭所有子菜单
      _this.$menu.find('.mdui-menu').each(function () {
        closeSubMenu($(this));
      });

      _this.$menu
        .removeClass('mdui-menu-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    return Menu;
  })();


  /**
   * =============================================================================
   * ************   Menu 自定义属性 API   ************
   * =============================================================================
   */

  $(function () {
    $document.on('click', '[mdui-menu]', function () {
      var $this = $(this);

      var inst = $this.data('mdui.menu');
      if (!inst) {
        var options = parseOptions($this.attr('mdui-menu'));
        var menuSelector = options.target;
        delete options.target;

        inst = new mdui.Menu($this, menuSelector, options);
        $this.data('mdui.menu', inst);

        inst.toggle();
      }
    });
  });


  /* jshint ignore:start */
  mdui.JQ = $;
  window.mdui = mdui;
})(window, document);
/* jshint ignore:end */

/**!
 * lightgallery.js | 1.0.1 | December 22nd 2016
 * http://sachinchoolur.github.io/lightgallery.js/
 * Copyright (c) 2016 Sachin N;
 * @license GPLv3
 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Lightgallery = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.lgUtils = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*
     *@todo remove function from window and document. Update on and off functions
     */
    window.getAttribute = function (label) {
        return window[label];
    };

    window.setAttribute = function (label, value) {
        window[label] = value;
    };

    document.getAttribute = function (label) {
        return document[label];
    };

    document.setAttribute = function (label, value) {
        document[label] = value;
    };

    var utils = {
        wrap: function wrap(el, className) {
            if (!el) {
                return;
            }

            var wrapper = document.createElement('div');
            wrapper.className = className;
            el.parentNode.insertBefore(wrapper, el);
            el.parentNode.removeChild(el);
            wrapper.appendChild(el);
        },

        addClass: function addClass(el, className) {
            if (!el) {
                return;
            }

            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        },

        removeClass: function removeClass(el, className) {
            if (!el) {
                return;
            }

            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },

        hasClass: function hasClass(el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            } else {
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
            }

            return false;
        },

        // ex Transform
        // ex TransitionTimingFunction
        setVendor: function setVendor(el, property, value) {
            if (!el) {
                return;
            }

            el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
            el.style['webkit' + property] = value;
            el.style['moz' + property] = value;
            el.style['ms' + property] = value;
            el.style['o' + property] = value;
        },

        trigger: function trigger(el, event) {
            var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (!el) {
                return;
            }

            var customEvent = new CustomEvent(event, {
                detail: detail
            });
            el.dispatchEvent(customEvent);
        },

        Listener: {
            uid: 0
        },
        on: function on(el, events, fn) {
            if (!el) {
                return;
            }

            events.split(' ').forEach(function (event) {
                var _id = el.getAttribute('lg-event-uid') || '';
                utils.Listener.uid++;
                _id += '&' + utils.Listener.uid;
                el.setAttribute('lg-event-uid', _id);
                utils.Listener[event + utils.Listener.uid] = fn;
                el.addEventListener(event.split('.')[0], fn, false);
            });
        },

        off: function off(el, event) {
            if (!el) {
                return;
            }

            var _id = el.getAttribute('lg-event-uid');
            if (_id) {
                _id = _id.split('&');
                for (var i = 0; i < _id.length; i++) {
                    if (_id[i]) {
                        var _event = event + _id[i];
                        if (_event.substring(0, 1) === '.') {
                            for (var key in utils.Listener) {
                                if (utils.Listener.hasOwnProperty(key)) {
                                    if (key.split('.').indexOf(_event.split('.')[1]) > -1) {
                                        el.removeEventListener(key.split('.')[0], utils.Listener[key]);
                                        el.setAttribute('lg-event-uid', el.getAttribute('lg-event-uid').replace('&' + _id[i], ''));
                                        delete utils.Listener[key];
                                    }
                                }
                            }
                        } else {
                            el.removeEventListener(_event.split('.')[0], utils.Listener[_event]);
                            el.setAttribute('lg-event-uid', el.getAttribute('lg-event-uid').replace('&' + _id[i], ''));
                            delete utils.Listener[_event];
                        }
                    }
                }
            }
        },

        param: function param(obj) {
            return Object.keys(obj).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
            }).join('&');
        }
    };

    exports.default = utils;
});

},{}],2:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['./lg-utils'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('./lg-utils'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.lgUtils);
        global.lightgallery = mod.exports;
    }
})(this, function (_lgUtils) {
    'use strict';

    var _lgUtils2 = _interopRequireDefault(_lgUtils);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    /** Polyfill the CustomEvent() constructor functionality in Internet Explorer 9 and higher */
    (function () {

        if (typeof window.CustomEvent === 'function') {
            return false;
        }

        function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();

    window.utils = _lgUtils2.default;
    window.lgData = {
        uid: 0
    };

    window.lgModules = {};
    var defaults = {

        mode: 'lg-slide',

        // Ex : 'ease'
        cssEasing: 'ease',

        //'for jquery animation'
        easing: 'linear',
        speed: 600,
        height: '100%',
        width: '100%',
        addClass: '',
        startClass: 'lg-start-zoom',
        backdropDuration: 150,
        hideBarsDelay: 6000,

        useLeft: false,

        closable: true,
        loop: true,
        escKey: true,
        keyPress: true,
        controls: true,
        slideEndAnimatoin: true,
        hideControlOnEnd: false,
        mousewheel: false,

        getCaptionFromTitleOrAlt: true,

        // .lg-item || '.lg-sub-html'
        appendSubHtmlTo: '.lg-sub-html',

        subHtmlSelectorRelative: false,

        /**
         * @desc number of preload slides
         * will exicute only after the current slide is fully loaded.
         *
         * @ex you clicked on 4th image and if preload = 1 then 3rd slide and 5th
         * slide will be loaded in the background after the 4th slide is fully loaded..
         * if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.. ... ...
         *
         */
        preload: 1,
        showAfterLoad: true,
        selector: '',
        selectWithin: '',
        nextHtml: '',
        prevHtml: '',

        // 0, 1
        index: false,

        iframeMaxWidth: '100%',

        download: true,
        counter: true,
        appendCounterTo: '.lg-toolbar',

        swipeThreshold: 50,
        enableSwipe: true,
        enableDrag: true,

        dynamic: false,
        dynamicEl: [],
        galleryId: 1
    };

    function Plugin(element, options) {

        // Current lightGallery element
        this.el = element;

        // lightGallery settings
        this.s = _extends({}, defaults, options);

        // When using dynamic mode, ensure dynamicEl is an array
        if (this.s.dynamic && this.s.dynamicEl !== 'undefined' && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) {
            throw 'When using dynamic mode, you must also define dynamicEl as an Array.';
        }

        // lightGallery modules
        this.modules = {};

        // false when lightgallery complete first slide;
        this.lGalleryOn = false;

        this.lgBusy = false;

        // Timeout function for hiding controls;
        this.hideBartimeout = false;

        // To determine browser supports for touch events;
        this.isTouch = 'ontouchstart' in document.documentElement;

        // Disable hideControlOnEnd if sildeEndAnimation is true
        if (this.s.slideEndAnimatoin) {
            this.s.hideControlOnEnd = false;
        }

        this.items = [];

        // Gallery items
        if (this.s.dynamic) {
            this.items = this.s.dynamicEl;
        } else {
            if (this.s.selector === 'this') {
                this.items.push(this.el);
            } else if (this.s.selector !== '') {
                if (this.s.selectWithin) {
                    this.items = document.querySelector(this.s.selectWithin).querySelectorAll(this.s.selector);
                } else {
                    this.items = this.el.querySelectorAll(this.s.selector);
                }
            } else {
                this.items = this.el.children;
            }
        }

        // .lg-item

        this.___slide = '';

        // .lg-outer
        this.outer = '';

        this.init();

        return this;
    }

    Plugin.prototype.init = function () {

        var _this = this;

        // s.preload should not be more than $item.length
        if (_this.s.preload > _this.items.length) {
            _this.s.preload = _this.items.length;
        }

        // if dynamic option is enabled execute immediately
        var _hash = window.location.hash;
        if (_hash.indexOf('lg=' + this.s.galleryId) > 0) {

            _this.index = parseInt(_hash.split('&slide=')[1], 10);

            _lgUtils2.default.addClass(document.body, 'lg-from-hash');
            if (!_lgUtils2.default.hasClass(document.body, 'lg-on')) {
                _lgUtils2.default.addClass(document.body, 'lg-on');
                setTimeout(function () {
                    _this.build(_this.index);
                });
            }
        }

        if (_this.s.dynamic) {

            _lgUtils2.default.trigger(this.el, 'onBeforeOpen');

            _this.index = _this.s.index || 0;

            // prevent accidental double execution
            if (!_lgUtils2.default.hasClass(document.body, 'lg-on')) {
                _lgUtils2.default.addClass(document.body, 'lg-on');
                setTimeout(function () {
                    _this.build(_this.index);
                });
            }
        } else {

            for (var i = 0; i < _this.items.length; i++) {

                /*jshint loopfunc: true */
                (function (index) {

                    // Using different namespace for click because click event should not unbind if selector is same object('this')
                    _lgUtils2.default.on(_this.items[index], 'click.lgcustom', function (e) {

                        e.preventDefault();

                        _lgUtils2.default.trigger(_this.el, 'onBeforeOpen');

                        _this.index = _this.s.index || index;

                        if (!_lgUtils2.default.hasClass(document.body, 'lg-on')) {
                            _this.build(_this.index);
                            _lgUtils2.default.addClass(document.body, 'lg-on');
                        }
                    });
                })(i);
            }
        }
    };

    Plugin.prototype.build = function (index) {

        var _this = this;

        _this.structure();

        for (var key in window.lgModules) {
            _this.modules[key] = new window.lgModules[key](_this.el);
        }

        // initiate slide function
        _this.slide(index, false, false);

        if (_this.s.keyPress) {
            _this.keyPress();
        }

        if (_this.items.length > 1) {

            _this.arrow();

            setTimeout(function () {
                _this.enableDrag();
                _this.enableSwipe();
            }, 50);

            if (_this.s.mousewheel) {
                _this.mousewheel();
            }
        }

        _this.counter();

        _this.closeGallery();

        _lgUtils2.default.trigger(_this.el, 'onAfterOpen');

        // Hide controllers if mouse doesn't move for some period
        _lgUtils2.default.on(_this.outer, 'mousemove.lg click.lg touchstart.lg', function () {

            _lgUtils2.default.removeClass(_this.outer, 'lg-hide-items');

            clearTimeout(_this.hideBartimeout);

            // Timeout will be cleared on each slide movement also
            _this.hideBartimeout = setTimeout(function () {
                _lgUtils2.default.addClass(_this.outer, 'lg-hide-items');
            }, _this.s.hideBarsDelay);
        });
    };

    Plugin.prototype.structure = function () {
        var list = '';
        var controls = '';
        var i = 0;
        var subHtmlCont = '';
        var template;
        var _this = this;

        document.body.insertAdjacentHTML('beforeend', '<div class="lg-backdrop"></div>');
        _lgUtils2.default.setVendor(document.querySelector('.lg-backdrop'), 'TransitionDuration', this.s.backdropDuration + 'ms');

        // Create gallery items
        for (i = 0; i < this.items.length; i++) {
            list += '<div class="lg-item"></div>';
        }

        // Create controlls
        if (this.s.controls && this.items.length > 1) {
            controls = '<div class="lg-actions">' + '<button class="mdui-btn mdui-btn-icon mdui-btn-dense lg-prev mdui-ripple mdui-text-color-theme-icon"><i class="mdui-icon material-icons">&#xe314;</i></button>' + '<button class="mdui-btn mdui-btn-icon mdui-btn-dense lg-next mdui-ripple mdui-text-color-theme-icon"><i class="mdui-icon material-icons">&#xe315;</i></button>' + '</div>';
        }

        if (this.s.appendSubHtmlTo === '.lg-sub-html') {
            subHtmlCont = '<div class="lg-sub-html"></div>';
        }

        template = '<div class="lg-outer ' + this.s.addClass + ' ' + this.s.startClass + '">' + '<div class="lg" style="width:' + this.s.width + '; height:' + this.s.height + '">' + '<div class="lg-inner">' + list + '</div>' + '<div class="lg-toolbar group">' + '<button class="mdui-btn mdui-btn-icon lg-close"><i class="mdui-icon material-icons">&#xe5c4;</i></button>' + '</div>' + controls + subHtmlCont + '</div>' + '</div>';

        document.body.insertAdjacentHTML('beforeend', template);
        this.outer = document.querySelector('.lg-outer');
        this.___slide = this.outer.querySelectorAll('.lg-item');

        if (this.s.useLeft) {
            _lgUtils2.default.addClass(this.outer, 'lg-use-left');

            // Set mode lg-slide if use left is true;
            this.s.mode = 'lg-slide';
        } else {
            _lgUtils2.default.addClass(this.outer, 'lg-use-css3');
        }

        // For fixed height gallery
        _this.setTop();
        _lgUtils2.default.on(window, 'resize.lg orientationchange.lg', function () {
            setTimeout(function () {
                _this.setTop();
            }, 100);
        });

        // add class lg-current to remove initial transition
        _lgUtils2.default.addClass(this.___slide[this.index], 'lg-current');

        // add Class for css support and transition mode
        if (this.doCss()) {
            _lgUtils2.default.addClass(this.outer, 'lg-css3');
        } else {
            _lgUtils2.default.addClass(this.outer, 'lg-css');

            // Set speed 0 because no animation will happen if browser doesn't support css3
            this.s.speed = 0;
        }

        _lgUtils2.default.addClass(this.outer, this.s.mode);

        if (this.s.enableDrag && this.items.length > 1) {
            _lgUtils2.default.addClass(this.outer, 'lg-grab');
        }

        if (this.s.showAfterLoad) {
            _lgUtils2.default.addClass(this.outer, 'lg-show-after-load');
        }

        if (this.doCss()) {
            var inner = this.outer.querySelector('.lg-inner');
            _lgUtils2.default.setVendor(inner, 'TransitionTimingFunction', this.s.cssEasing);
            _lgUtils2.default.setVendor(inner, 'TransitionDuration', this.s.speed + 'ms');
        }

        setTimeout(function () {
            _lgUtils2.default.addClass(document.querySelector('.lg-backdrop'), 'in');
        });

        setTimeout(function () {
            _lgUtils2.default.addClass(_this.outer, 'lg-visible');
        }, this.s.backdropDuration);

        if (this.s.download) {
            this.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', '<a id="lg-download" target="_blank" download class="mdui-btn mdui-btn-icon mdui-ripple lg-download mdui-float-right"><i class="mdui-icon material-icons">&#xe2c4;</i></a>');
        }

        // Store the current scroll top value to scroll back after closing the gallery..
        this.prevScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    };

    // For fixed height gallery
    Plugin.prototype.setTop = function () {
        if (this.s.height !== '100%') {
            var wH = window.innerHeight;
            var top = (wH - parseInt(this.s.height, 10)) / 2;
            var lGallery = this.outer.querySelector('.lg');
            if (wH >= parseInt(this.s.height, 10)) {
                lGallery.style.top = top + 'px';
            } else {
                lGallery.style.top = '0px';
            }
        }
    };

    // Find css3 support
    Plugin.prototype.doCss = function () {
        // check for css animation support
        var support = function support() {
            var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
            var root = document.documentElement;
            var i = 0;
            for (i = 0; i < transition.length; i++) {
                if (transition[i] in root.style) {
                    return true;
                }
            }
        };

        if (support()) {
            return true;
        }

        return false;
    };

    /**
     *  @desc Check the given src is video
     *  @param {String} src
     *  @return {Object} video type
     *  Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
     */
    Plugin.prototype.isVideo = function (src, index) {

        if (!src) {
            throw new Error("Make sure that slide " + index + " has an image/video src");
        }

        var html;
        if (this.s.dynamic) {
            html = this.s.dynamicEl[index].html;
        } else {
            html = this.items[index].getAttribute('data-html');
        }

        if (!src && html) {
            return {
                html5: true
            };
        }

        var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i);
        var vimeo = src.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
        var dailymotion = src.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);
        var vk = src.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);

        if (youtube) {
            return {
                youtube: youtube
            };
        } else if (vimeo) {
            return {
                vimeo: vimeo
            };
        } else if (dailymotion) {
            return {
                dailymotion: dailymotion
            };
        } else if (vk) {
            return {
                vk: vk
            };
        }
    };

    /**
     *  @desc Create image counter
     *  Ex: 1/10
     */
    Plugin.prototype.counter = function () {
        if (this.s.counter) {
            this.outer.querySelector(this.s.appendCounterTo).insertAdjacentHTML('beforeend', '<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.items.length + '</span></div>');
        }
    };

    /**
     *  @desc add sub-html into the slide
     *  @param {Number} index - index of the slide
     */
    Plugin.prototype.addHtml = function (index) {
        var subHtml = null;
        var currentEle;
        if (this.s.dynamic) {
            subHtml = this.s.dynamicEl[index].subHtml;
        } else {
            currentEle = this.items[index];
            subHtml = currentEle.getAttribute('data-sub-html');
            if (this.s.getCaptionFromTitleOrAlt && !subHtml) {
                subHtml = currentEle.getAttribute('title');
                if (subHtml && currentEle.querySelector('img')) {
                    subHtml = currentEle.querySelector('img').getAttribute('alt');
                }
            }
        }

        if (typeof subHtml !== 'undefined' && subHtml !== null) {

            // get first letter of subhtml
            // if first letter starts with . or # get the html form the jQuery object
            var fL = subHtml.substring(0, 1);
            if (fL === '.' || fL === '#') {
                if (this.s.subHtmlSelectorRelative && !this.s.dynamic) {
                    subHtml = currentEle.querySelector(subHtml).innerHTML;
                } else {
                    subHtml = document.querySelector(subHtml).innerHTML;
                }
            }
        } else {
            subHtml = '';
        }

        if (this.s.appendSubHtmlTo === '.lg-sub-html') {
            this.outer.querySelector(this.s.appendSubHtmlTo).innerHTML = subHtml;
        } else {
            this.___slide[index].insertAdjacentHTML('beforeend', subHtml);
        }

        // Add lg-empty-html class if title doesn't exist
        if (typeof subHtml !== 'undefined' && subHtml !== null) {
            if (subHtml === '') {
                _lgUtils2.default.addClass(this.outer.querySelector(this.s.appendSubHtmlTo), 'lg-empty-html');
            } else {
                _lgUtils2.default.removeClass(this.outer.querySelector(this.s.appendSubHtmlTo), 'lg-empty-html');
            }
        }

        _lgUtils2.default.trigger(this.el, 'onAfterAppendSubHtml', {
            index: index
        });
    };

    /**
     *  @desc Preload slides
     *  @param {Number} index - index of the slide
     */
    Plugin.prototype.preload = function (index) {
        var i = 1;
        var j = 1;
        for (i = 1; i <= this.s.preload; i++) {
            if (i >= this.items.length - index) {
                break;
            }

            this.loadContent(index + i, false, 0);
        }

        for (j = 1; j <= this.s.preload; j++) {
            if (index - j < 0) {
                break;
            }

            this.loadContent(index - j, false, 0);
        }
    };

    /**
     *  @desc Load slide content into slide.
     *  @param {Number} index - index of the slide.
     *  @param {Boolean} rec - if true call loadcontent() function again.
     *  @param {Boolean} delay - delay for adding complete class. it is 0 except first time.
     */
    Plugin.prototype.loadContent = function (index, rec, delay) {

        var _this = this;
        var _hasPoster = false;
        var _img;
        var _src;
        var _poster;
        var _srcset;
        var _sizes;
        var _html;
        var getResponsiveSrc = function getResponsiveSrc(srcItms) {
            var rsWidth = [];
            var rsSrc = [];
            for (var i = 0; i < srcItms.length; i++) {
                var __src = srcItms[i].split(' ');

                // Manage empty space
                if (__src[0] === '') {
                    __src.splice(0, 1);
                }

                rsSrc.push(__src[0]);
                rsWidth.push(__src[1]);
            }

            var wWidth = window.innerWidth;
            for (var j = 0; j < rsWidth.length; j++) {
                if (parseInt(rsWidth[j], 10) > wWidth) {
                    _src = rsSrc[j];
                    break;
                }
            }
        };

        if (_this.s.dynamic) {

            if (_this.s.dynamicEl[index].poster) {
                _hasPoster = true;
                _poster = _this.s.dynamicEl[index].poster;
            }

            _html = _this.s.dynamicEl[index].html;
            _src = _this.s.dynamicEl[index].src;

            if (_this.s.dynamicEl[index].responsive) {
                var srcDyItms = _this.s.dynamicEl[index].responsive.split(',');
                getResponsiveSrc(srcDyItms);
            }

            _srcset = _this.s.dynamicEl[index].srcset;
            _sizes = _this.s.dynamicEl[index].sizes;
        } else {

            if (_this.items[index].getAttribute('data-poster')) {
                _hasPoster = true;
                _poster = _this.items[index].getAttribute('data-poster');
            }

            _html = _this.items[index].getAttribute('data-html');
            _src = _this.items[index].getAttribute('href') || _this.items[index].getAttribute('data-src');

            if (_this.items[index].getAttribute('data-responsive')) {
                var srcItms = _this.items[index].getAttribute('data-responsive').split(',');
                getResponsiveSrc(srcItms);
            }

            _srcset = _this.items[index].getAttribute('data-srcset');
            _sizes = _this.items[index].getAttribute('data-sizes');
        }

        //if (_src || _srcset || _sizes || _poster) {

        var iframe = false;
        if (_this.s.dynamic) {
            if (_this.s.dynamicEl[index].iframe) {
                iframe = true;
            }
        } else {
            if (_this.items[index].getAttribute('data-iframe') === 'true') {
                iframe = true;
            }
        }

        var _isVideo = _this.isVideo(_src, index);
        if (!_lgUtils2.default.hasClass(_this.___slide[index], 'lg-loaded')) {
            if (iframe) {
                _this.___slide[index].insertAdjacentHTML('afterbegin', '<div class="lg-video-cont" style="max-width:' + _this.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + _src + '"  allowfullscreen="true"></iframe></div></div>');
            } else if (_hasPoster) {
                var videoClass = '';
                if (_isVideo && _isVideo.youtube) {
                    videoClass = 'lg-has-youtube';
                } else if (_isVideo && _isVideo.vimeo) {
                    videoClass = 'lg-has-vimeo';
                } else {
                    videoClass = 'lg-has-html5';
                }

                _this.___slide[index].insertAdjacentHTML('beforeend', '<div class="lg-video-cont ' + videoClass + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + _poster + '" /></div></div>');
            } else if (_isVideo) {
                _this.___slide[index].insertAdjacentHTML('beforeend', '<div class="lg-video-cont "><div class="lg-video"></div></div>');
                _lgUtils2.default.trigger(_this.el, 'hasVideo', {
                    index: index,
                    src: _src,
                    html: _html
                });
            } else {
                _this.___slide[index].insertAdjacentHTML('beforeend', '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + _src + '" /></div>');
            }

            _lgUtils2.default.trigger(_this.el, 'onAferAppendSlide', {
                index: index
            });

            _img = _this.___slide[index].querySelector('.lg-object');
            if (_sizes) {
                _img.setAttribute('sizes', _sizes);
            }

            if (_srcset) {
                _img.setAttribute('srcset', _srcset);
                try {
                    picturefill({
                        elements: [_img[0]]
                    });
                } catch (e) {
                    console.error('Make sure you have included Picturefill version 2');
                }
            }

            if (this.s.appendSubHtmlTo !== '.lg-sub-html') {
                _this.addHtml(index);
            }

            _lgUtils2.default.addClass(_this.___slide[index], 'lg-loaded');
        }

        _lgUtils2.default.on(_this.___slide[index].querySelector('.lg-object'), 'load.lg error.lg', function () {

            // For first time add some delay for displaying the start animation.
            var _speed = 0;

            // Do not change the delay value because it is required for zoom plugin.
            // If gallery opened from direct url (hash) speed value should be 0
            if (delay && !_lgUtils2.default.hasClass(document.body, 'lg-from-hash')) {
                _speed = delay;
            }

            setTimeout(function () {
                _lgUtils2.default.addClass(_this.___slide[index], 'lg-complete');

                _lgUtils2.default.trigger(_this.el, 'onSlideItemLoad', {
                    index: index,
                    delay: delay || 0
                });
            }, _speed);
        });

        // @todo check load state for html5 videos
        if (_isVideo && _isVideo.html5 && !_hasPoster) {
            _lgUtils2.default.addClass(_this.___slide[index], 'lg-complete');
        }

        if (rec === true) {
            if (!_lgUtils2.default.hasClass(_this.___slide[index], 'lg-complete')) {
                _lgUtils2.default.on(_this.___slide[index].querySelector('.lg-object'), 'load.lg error.lg', function () {
                    _this.preload(index);
                });
            } else {
                _this.preload(index);
            }
        }

        //}
    };

    /**
    *   @desc slide function for lightgallery
        ** Slide() gets call on start
        ** ** Set lg.on true once slide() function gets called.
        ** Call loadContent() on slide() function inside setTimeout
        ** ** On first slide we do not want any animation like slide of fade
        ** ** So on first slide( if lg.on if false that is first slide) loadContent() should start loading immediately
        ** ** Else loadContent() should wait for the transition to complete.
        ** ** So set timeout s.speed + 50
    <=> ** loadContent() will load slide content in to the particular slide
        ** ** It has recursion (rec) parameter. if rec === true loadContent() will call preload() function.
        ** ** preload will execute only when the previous slide is fully loaded (images iframe)
        ** ** avoid simultaneous image load
    <=> ** Preload() will check for s.preload value and call loadContent() again accoring to preload value
        ** loadContent()  <====> Preload();

    *   @param {Number} index - index of the slide
    *   @param {Boolean} fromTouch - true if slide function called via touch event or mouse drag
    *   @param {Boolean} fromThumb - true if slide function called via thumbnail click
    */
    Plugin.prototype.slide = function (index, fromTouch, fromThumb) {

        var _prevIndex = 0;
        for (var i = 0; i < this.___slide.length; i++) {
            if (_lgUtils2.default.hasClass(this.___slide[i], 'lg-current')) {
                _prevIndex = i;
                break;
            }
        }

        var _this = this;

        // Prevent if multiple call
        // Required for hsh plugin
        if (_this.lGalleryOn && _prevIndex === index) {
            return;
        }

        var _length = this.___slide.length;
        var _time = _this.lGalleryOn ? this.s.speed : 0;
        var _next = false;
        var _prev = false;

        if (!_this.lgBusy) {

            if (this.s.download) {
                var _src;
                if (_this.s.dynamic) {
                    _src = _this.s.dynamicEl[index].downloadUrl !== false && (_this.s.dynamicEl[index].downloadUrl || _this.s.dynamicEl[index].src);
                } else {
                    _src = _this.items[index].getAttribute('data-download-url') !== 'false' && (_this.items[index].getAttribute('data-download-url') || _this.items[index].getAttribute('href') || _this.items[index].getAttribute('data-src'));
                }

                if (_src) {
                    document.getElementById('lg-download').setAttribute('href', _src);
                    _lgUtils2.default.removeClass(_this.outer, 'lg-hide-download');
                } else {
                    _lgUtils2.default.addClass(_this.outer, 'lg-hide-download');
                }
            }

            _lgUtils2.default.trigger(_this.el, 'onBeforeSlide', {
                prevIndex: _prevIndex,
                index: index,
                fromTouch: fromTouch,
                fromThumb: fromThumb
            });

            _this.lgBusy = true;

            clearTimeout(_this.hideBartimeout);

            // Add title if this.s.appendSubHtmlTo === lg-sub-html
            if (this.s.appendSubHtmlTo === '.lg-sub-html') {

                // wait for slide animation to complete
                setTimeout(function () {
                    _this.addHtml(index);
                }, _time);
            }

            this.arrowDisable(index);

            if (!fromTouch) {

                // remove all transitions
                _lgUtils2.default.addClass(_this.outer, 'lg-no-trans');

                for (var j = 0; j < this.___slide.length; j++) {
                    _lgUtils2.default.removeClass(this.___slide[j], 'lg-prev-slide');
                    _lgUtils2.default.removeClass(this.___slide[j], 'lg-next-slide');
                }

                if (index < _prevIndex) {
                    _prev = true;
                    if (index === 0 && _prevIndex === _length - 1 && !fromThumb) {
                        _prev = false;
                        _next = true;
                    }
                } else if (index > _prevIndex) {
                    _next = true;
                    if (index === _length - 1 && _prevIndex === 0 && !fromThumb) {
                        _prev = true;
                        _next = false;
                    }
                }

                if (_prev) {

                    //prevslide
                    _lgUtils2.default.addClass(this.___slide[index], 'lg-prev-slide');
                    _lgUtils2.default.addClass(this.___slide[_prevIndex], 'lg-next-slide');
                } else if (_next) {

                    // next slide
                    _lgUtils2.default.addClass(this.___slide[index], 'lg-next-slide');
                    _lgUtils2.default.addClass(this.___slide[_prevIndex], 'lg-prev-slide');
                }

                // give 50 ms for browser to add/remove class
                setTimeout(function () {
                    _lgUtils2.default.removeClass(_this.outer.querySelector('.lg-current'), 'lg-current');

                    //_this.$slide.eq(_prevIndex).removeClass('lg-current');
                    _lgUtils2.default.addClass(_this.___slide[index], 'lg-current');

                    // reset all transitions
                    _lgUtils2.default.removeClass(_this.outer, 'lg-no-trans');
                }, 50);
            } else {

                var touchPrev = index - 1;
                var touchNext = index + 1;

                if (index === 0 && _prevIndex === _length - 1) {

                    // next slide
                    touchNext = 0;
                    touchPrev = _length - 1;
                } else if (index === _length - 1 && _prevIndex === 0) {

                    // prev slide
                    touchNext = 0;
                    touchPrev = _length - 1;
                }

                _lgUtils2.default.removeClass(_this.outer.querySelector('.lg-prev-slide'), 'lg-prev-slide');
                _lgUtils2.default.removeClass(_this.outer.querySelector('.lg-current'), 'lg-current');
                _lgUtils2.default.removeClass(_this.outer.querySelector('.lg-next-slide'), 'lg-next-slide');
                _lgUtils2.default.addClass(_this.___slide[touchPrev], 'lg-prev-slide');
                _lgUtils2.default.addClass(_this.___slide[touchNext], 'lg-next-slide');
                _lgUtils2.default.addClass(_this.___slide[index], 'lg-current');
            }

            if (_this.lGalleryOn) {
                setTimeout(function () {
                    _this.loadContent(index, true, 0);
                }, this.s.speed + 50);

                setTimeout(function () {
                    _this.lgBusy = false;
                    _lgUtils2.default.trigger(_this.el, 'onAfterSlide', {
                        prevIndex: _prevIndex,
                        index: index,
                        fromTouch: fromTouch,
                        fromThumb: fromThumb
                    });
                }, this.s.speed);
            } else {
                _this.loadContent(index, true, _this.s.backdropDuration);

                _this.lgBusy = false;
                _lgUtils2.default.trigger(_this.el, 'onAfterSlide', {
                    prevIndex: _prevIndex,
                    index: index,
                    fromTouch: fromTouch,
                    fromThumb: fromThumb
                });
            }

            _this.lGalleryOn = true;

            if (this.s.counter) {
                if (document.getElementById('lg-counter-current')) {
                    document.getElementById('lg-counter-current').innerHTML = index + 1;
                }
            }
        }
    };

    /**
     *  @desc Go to next slide
     *  @param {Boolean} fromTouch - true if slide function called via touch event
     */
    Plugin.prototype.goToNextSlide = function (fromTouch) {
        var _this = this;
        if (!_this.lgBusy) {
            if (_this.index + 1 < _this.___slide.length) {
                _this.index++;
                _lgUtils2.default.trigger(_this.el, 'onBeforeNextSlide', {
                    index: _this.index
                });
                _this.slide(_this.index, fromTouch, false);
            } else {
                if (_this.s.loop) {
                    _this.index = 0;
                    _lgUtils2.default.trigger(_this.el, 'onBeforeNextSlide', {
                        index: _this.index
                    });
                    _this.slide(_this.index, fromTouch, false);
                } else if (_this.s.slideEndAnimatoin) {
                    _lgUtils2.default.addClass(_this.outer, 'lg-right-end');
                    setTimeout(function () {
                        _lgUtils2.default.removeClass(_this.outer, 'lg-right-end');
                    }, 400);
                }
            }
        }
    };

    /**
     *  @desc Go to previous slide
     *  @param {Boolean} fromTouch - true if slide function called via touch event
     */
    Plugin.prototype.goToPrevSlide = function (fromTouch) {
        var _this = this;
        if (!_this.lgBusy) {
            if (_this.index > 0) {
                _this.index--;
                _lgUtils2.default.trigger(_this.el, 'onBeforePrevSlide', {
                    index: _this.index,
                    fromTouch: fromTouch
                });
                _this.slide(_this.index, fromTouch, false);
            } else {
                if (_this.s.loop) {
                    _this.index = _this.items.length - 1;
                    _lgUtils2.default.trigger(_this.el, 'onBeforePrevSlide', {
                        index: _this.index,
                        fromTouch: fromTouch
                    });
                    _this.slide(_this.index, fromTouch, false);
                } else if (_this.s.slideEndAnimatoin) {
                    _lgUtils2.default.addClass(_this.outer, 'lg-left-end');
                    setTimeout(function () {
                        _lgUtils2.default.removeClass(_this.outer, 'lg-left-end');
                    }, 400);
                }
            }
        }
    };

    Plugin.prototype.keyPress = function () {
        var _this = this;
        if (this.items.length > 1) {
            _lgUtils2.default.on(window, 'keyup.lg', function (e) {
                if (_this.items.length > 1) {
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        _this.goToPrevSlide();
                    }

                    if (e.keyCode === 39) {
                        e.preventDefault();
                        _this.goToNextSlide();
                    }
                }
            });
        }

        _lgUtils2.default.on(window, 'keydown.lg', function (e) {
            if (_this.s.escKey === true && e.keyCode === 27) {
                e.preventDefault();
                if (!_lgUtils2.default.hasClass(_this.outer, 'lg-thumb-open')) {
                    _this.destroy();
                } else {
                    _lgUtils2.default.removeClass(_this.outer, 'lg-thumb-open');
                }
            }
        });
    };

    Plugin.prototype.arrow = function () {
        var _this = this;
        _lgUtils2.default.on(this.outer.querySelector('.lg-prev'), 'click.lg', function () {
            _this.goToPrevSlide();
        });

        _lgUtils2.default.on(this.outer.querySelector('.lg-next'), 'click.lg', function () {
            _this.goToNextSlide();
        });
    };

    Plugin.prototype.arrowDisable = function (index) {

        // Disable arrows if s.hideControlOnEnd is true
        if (!this.s.loop && this.s.hideControlOnEnd) {
            var next = this.outer.querySelector('.lg-next');
            var prev = this.outer.querySelector('.lg-prev');
            if (index + 1 < this.___slide.length) {
                next.removeAttribute('disabled');
                _lgUtils2.default.removeClass(next, 'disabled');
            } else {
                next.setAttribute('disabled', 'disabled');
                _lgUtils2.default.addClass(next, 'disabled');
            }

            if (index > 0) {
                prev.removeAttribute('disabled');
                _lgUtils2.default.removeClass(prev, 'disabled');
            } else {
                next.setAttribute('disabled', 'disabled');
                _lgUtils2.default.addClass(next, 'disabled');
            }
        }
    };

    Plugin.prototype.setTranslate = function (el, xValue, yValue) {
        // jQuery supports Automatic CSS prefixing since jQuery 1.8.0
        if (this.s.useLeft) {
            el.style.left = xValue;
        } else {
            _lgUtils2.default.setVendor(el, 'Transform', 'translate3d(' + xValue + 'px, ' + yValue + 'px, 0px)');
        }
    };

    Plugin.prototype.touchMove = function (startCoords, endCoords) {

        var distance = endCoords - startCoords;

        if (Math.abs(distance) > 15) {
            // reset opacity and transition duration
            _lgUtils2.default.addClass(this.outer, 'lg-dragging');

            // move current slide
            this.setTranslate(this.___slide[this.index], distance, 0);

            // move next and prev slide with current slide
            this.setTranslate(document.querySelector('.lg-prev-slide'), -this.___slide[this.index].clientWidth + distance, 0);
            this.setTranslate(document.querySelector('.lg-next-slide'), this.___slide[this.index].clientWidth + distance, 0);
        }
    };

    Plugin.prototype.touchEnd = function (distance) {
        var _this = this;

        // keep slide animation for any mode while dragg/swipe
        if (_this.s.mode !== 'lg-slide') {
            _lgUtils2.default.addClass(_this.outer, 'lg-slide');
        }

        for (var i = 0; i < this.___slide.length; i++) {
            if (!_lgUtils2.default.hasClass(this.___slide[i], 'lg-current') && !_lgUtils2.default.hasClass(this.___slide[i], 'lg-prev-slide') && !_lgUtils2.default.hasClass(this.___slide[i], 'lg-next-slide')) {
                this.___slide[i].style.opacity = '0';
            }
        }

        // set transition duration
        setTimeout(function () {
            _lgUtils2.default.removeClass(_this.outer, 'lg-dragging');
            if (distance < 0 && Math.abs(distance) > _this.s.swipeThreshold) {
                _this.goToNextSlide(true);
            } else if (distance > 0 && Math.abs(distance) > _this.s.swipeThreshold) {
                _this.goToPrevSlide(true);
            } else if (Math.abs(distance) < 5) {

                // Trigger click if distance is less than 5 pix
                _lgUtils2.default.trigger(_this.el, 'onSlideClick');
            }

            for (var i = 0; i < _this.___slide.length; i++) {
                _this.___slide[i].removeAttribute('style');
            }
        });

        // remove slide class once drag/swipe is completed if mode is not slide
        setTimeout(function () {
            if (!_lgUtils2.default.hasClass(_this.outer, 'lg-dragging') && _this.s.mode !== 'lg-slide') {
                _lgUtils2.default.removeClass(_this.outer, 'lg-slide');
            }
        }, _this.s.speed + 100);
    };

    Plugin.prototype.enableSwipe = function () {
        var _this = this;
        var startCoords = 0;
        var endCoords = 0;
        var isMoved = false;

        if (_this.s.enableSwipe && _this.isTouch && _this.doCss()) {

            for (var i = 0; i < _this.___slide.length; i++) {
                /*jshint loopfunc: true */
                _lgUtils2.default.on(_this.___slide[i], 'touchstart.lg', function (e) {
                    if (!_lgUtils2.default.hasClass(_this.outer, 'lg-zoomed') && !_this.lgBusy) {
                        e.preventDefault();
                        _this.manageSwipeClass();
                        startCoords = e.targetTouches[0].pageX;
                    }
                });
            }

            for (var j = 0; j < _this.___slide.length; j++) {
                /*jshint loopfunc: true */
                _lgUtils2.default.on(_this.___slide[j], 'touchmove.lg', function (e) {
                    if (!_lgUtils2.default.hasClass(_this.outer, 'lg-zoomed')) {
                        e.preventDefault();
                        endCoords = e.targetTouches[0].pageX;
                        _this.touchMove(startCoords, endCoords);
                        isMoved = true;
                    }
                });
            }

            for (var k = 0; k < _this.___slide.length; k++) {
                /*jshint loopfunc: true */
                _lgUtils2.default.on(_this.___slide[k], 'touchend.lg', function () {
                    if (!_lgUtils2.default.hasClass(_this.outer, 'lg-zoomed')) {
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords - startCoords);
                        } else {
                            _lgUtils2.default.trigger(_this.el, 'onSlideClick');
                        }
                    }
                });
            }
        }
    };

    Plugin.prototype.enableDrag = function () {
        var _this = this;
        var startCoords = 0;
        var endCoords = 0;
        var isDraging = false;
        var isMoved = false;
        if (_this.s.enableDrag && !_this.isTouch && _this.doCss()) {
            for (var i = 0; i < _this.___slide.length; i++) {
                /*jshint loopfunc: true */
                _lgUtils2.default.on(_this.___slide[i], 'mousedown.lg', function (e) {
                    // execute only on .lg-object
                    if (!_lgUtils2.default.hasClass(_this.outer, 'lg-zoomed')) {
                        if (_lgUtils2.default.hasClass(e.target, 'lg-object') || _lgUtils2.default.hasClass(e.target, 'lg-video-play')) {
                            e.preventDefault();

                            if (!_this.lgBusy) {
                                _this.manageSwipeClass();
                                startCoords = e.pageX;
                                isDraging = true;

                                // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                                _this.outer.scrollLeft += 1;
                                _this.outer.scrollLeft -= 1;

                                // *

                                _lgUtils2.default.removeClass(_this.outer, 'lg-grab');
                                _lgUtils2.default.addClass(_this.outer, 'lg-grabbing');

                                _lgUtils2.default.trigger(_this.el, 'onDragstart');
                            }
                        }
                    }
                });
            }

            _lgUtils2.default.on(window, 'mousemove.lg', function (e) {
                if (isDraging) {
                    isMoved = true;
                    endCoords = e.pageX;
                    _this.touchMove(startCoords, endCoords);
                    _lgUtils2.default.trigger(_this.el, 'onDragmove');
                }
            });

            _lgUtils2.default.on(window, 'mouseup.lg', function (e) {
                if (isMoved) {
                    isMoved = false;
                    _this.touchEnd(endCoords - startCoords);
                    _lgUtils2.default.trigger(_this.el, 'onDragend');
                } else if (_lgUtils2.default.hasClass(e.target, 'lg-object') || _lgUtils2.default.hasClass(e.target, 'lg-video-play')) {
                    _lgUtils2.default.trigger(_this.el, 'onSlideClick');
                }

                // Prevent execution on click
                if (isDraging) {
                    isDraging = false;
                    _lgUtils2.default.removeClass(_this.outer, 'lg-grabbing');
                    _lgUtils2.default.addClass(_this.outer, 'lg-grab');
                }
            });
        }
    };

    Plugin.prototype.manageSwipeClass = function () {
        var touchNext = this.index + 1;
        var touchPrev = this.index - 1;
        var length = this.___slide.length;
        if (this.s.loop) {
            if (this.index === 0) {
                touchPrev = length - 1;
            } else if (this.index === length - 1) {
                touchNext = 0;
            }
        }

        for (var i = 0; i < this.___slide.length; i++) {
            _lgUtils2.default.removeClass(this.___slide[i], 'lg-next-slide');
            _lgUtils2.default.removeClass(this.___slide[i], 'lg-prev-slide');
        }

        if (touchPrev > -1) {
            _lgUtils2.default.addClass(this.___slide[touchPrev], 'lg-prev-slide');
        }

        _lgUtils2.default.addClass(this.___slide[touchNext], 'lg-next-slide');
    };

    Plugin.prototype.mousewheel = function () {
        var _this = this;
        _lgUtils2.default.on(_this.outer, 'mousewheel.lg', function (e) {

            if (!e.deltaY) {
                return;
            }

            if (e.deltaY > 0) {
                _this.goToPrevSlide();
            } else {
                _this.goToNextSlide();
            }

            e.preventDefault();
        });
    };

    Plugin.prototype.closeGallery = function () {

        var _this = this;
        var mousedown = false;
        _lgUtils2.default.on(this.outer.querySelector('.lg-close'), 'click.lg', function () {
            _this.destroy();
        });

        if (_this.s.closable) {

            // If you drag the slide and release outside gallery gets close on chrome
            // for preventing this check mousedown and mouseup happened on .lg-item or lg-outer
            _lgUtils2.default.on(_this.outer, 'mousedown.lg', function (e) {

                if (_lgUtils2.default.hasClass(e.target, 'lg-outer') || _lgUtils2.default.hasClass(e.target, 'lg-item') || _lgUtils2.default.hasClass(e.target, 'lg-img-wrap')) {
                    mousedown = true;
                } else {
                    mousedown = false;
                }
            });

            _lgUtils2.default.on(_this.outer, 'mouseup.lg', function (e) {

                if (_lgUtils2.default.hasClass(e.target, 'lg-outer') || _lgUtils2.default.hasClass(e.target, 'lg-item') || _lgUtils2.default.hasClass(e.target, 'lg-img-wrap') && mousedown) {
                    if (!_lgUtils2.default.hasClass(_this.outer, 'lg-dragging')) {
                        _this.destroy();
                    }
                }
            });
        }
    };

    Plugin.prototype.destroy = function (d) {

        var _this = this;

        if (!d) {
            _lgUtils2.default.trigger(_this.el, 'onBeforeClose');
        }

        document.body.scrollTop = _this.prevScrollTop;
        document.documentElement.scrollTop = _this.prevScrollTop;

        /**
         * if d is false or undefined destroy will only close the gallery
         * plugins instance remains with the element
         *
         * if d is true destroy will completely remove the plugin
         */

        if (d) {
            if (!_this.s.dynamic) {
                // only when not using dynamic mode is $items a jquery collection

                for (var i = 0; i < this.items.length; i++) {
                    _lgUtils2.default.off(this.items[i], '.lg');
                    _lgUtils2.default.off(this.items[i], '.lgcustom');
                }
            }

            var lguid = _this.el.getAttribute('lg-uid');
            delete window.lgData[lguid];
            _this.el.removeAttribute('lg-uid');
        }

        // Unbind all events added by lightGallery
        _lgUtils2.default.off(this.el, '.lgtm');

        // Distroy all lightGallery modules
        for (var key in window.lgModules) {
            if (_this.modules[key]) {
                _this.modules[key].destroy();
            }
        }

        this.lGalleryOn = false;

        clearTimeout(_this.hideBartimeout);
        this.hideBartimeout = false;
        _lgUtils2.default.off(window, '.lg');
        _lgUtils2.default.removeClass(document.body, 'lg-on');
        _lgUtils2.default.removeClass(document.body, 'lg-from-hash');

        if (_this.outer) {
            _lgUtils2.default.removeClass(_this.outer, 'lg-visible');
        }

        _lgUtils2.default.removeClass(document.querySelector('.lg-backdrop'), 'in');
        setTimeout(function () {
            try {
                if (_this.outer) {
                    _this.outer.parentNode.removeChild(_this.outer);
                }

                if (document.querySelector('.lg-backdrop')) {
                    document.querySelector('.lg-backdrop').parentNode.removeChild(document.querySelector('.lg-backdrop'));
                }

                if (!d) {
                    _lgUtils2.default.trigger(_this.el, 'onCloseAfter');
                }
            } catch (err) {}
        }, _this.s.backdropDuration + 50);
    };

    window.lightGallery = function (el, options) {
        if (!el) {
            return;
        }

        try {
            if (!el.getAttribute('lg-uid')) {
                var uid = 'lg' + window.lgData.uid++;
                window.lgData[uid] = new Plugin(el, options);
                el.setAttribute('lg-uid', uid);
            } else {
                try {
                    window.lgData[el.getAttribute('lg-uid')].init();
                } catch (err) {
                    console.error('lightGallery has not initiated properly');
                }
            }
        } catch (err) {
            console.error('lightGallery has not initiated properly');
        }
    };
});

},{"./lg-utils":1}]},{},[2])(2)
});

/**!
 * lg-hash.js | 1.0.0 | October 5th 2016
 * http://sachinchoolur.github.io/lg-hash.js
 * Copyright (c) 2016 Sachin N;
 * @license GPLv3
 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LgHash = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.lgHash = mod.exports;
    }
})(this, function () {
    'use strict';

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var hashDefaults = {
        hash: true
    };
    var Hash = function Hash(element) {
        this.el = element;
        this.core = window.lgData[this.el.getAttribute('lg-uid')];
        this.core.s = _extends({}, hashDefaults, this.core.s);
        if (this.core.s.hash) {
            this.oldHash = window.location.hash;
            this.init();
        }

        return this;
    };

    Hash.prototype.init = function () {
        var _this = this;
        var _hash;

        // Change hash value on after each slide transition
        utils.on(_this.core.el, 'onAfterSlide.lgtm', function (event) {
            window.location.hash = 'lg=' + _this.core.s.galleryId + '&slide=' + event.detail.index;
        });

        // Listen hash change and change the slide according to slide value
        utils.on(window, 'hashchange.lghash', function () {
            _hash = window.location.hash;
            var _idx = parseInt(_hash.split('&slide=')[1], 10);

            // it galleryId doesn't exist in the url close the gallery
            if (_hash.indexOf('lg=' + _this.core.s.galleryId) > -1) {
                _this.core.slide(_idx, false, false);
            } else if (_this.core.lGalleryOn) {
                _this.core.destroy();
            }
        });
    };

    Hash.prototype.destroy = function () {
        if (!this.core.s.hash) {
            return;
        }

        // Reset to old hash value
        if (this.oldHash && this.oldHash.indexOf('lg=' + this.core.s.galleryId) < 0) {
            window.location.hash = this.oldHash;
        } else {
            if (history.pushState) {
                history.pushState('', document.title, window.location.pathname + window.location.search);
            } else {
                window.location.hash = '';
            }
        }

        utils.off(this.core.el, '.lghash');
    };

    window.lgModules.hash = Hash;
});

},{}]},{},[1])(1)
});

/**!
 * lg-zoom.js | 1.0.1 | December 22nd 2016
 * http://sachinchoolur.github.io/lg-zoom.js
 * Copyright (c) 2016 Sachin N;
 * @license GPLv3
 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LgZoom = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.lgZoom = mod.exports;
    }
})(this, function () {
    'use strict';

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var getUseLeft = function getUseLeft() {
        var useLeft = false;
        var isChrome = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        if (isChrome && parseInt(isChrome[2], 10) < 54) {
            useLeft = true;
        }

        return useLeft;
    };

    var zoomDefaults = {
        scale: 1,
        zoom: true,
        actualSize: true,
        enableZoomAfter: 300,
        useLeftForZoom: getUseLeft()
    };

    var Zoom = function Zoom(element) {

        this.el = element;

        this.core = window.lgData[this.el.getAttribute('lg-uid')];
        this.core.s = _extends({}, zoomDefaults, this.core.s);

        if (this.core.s.zoom && this.core.doCss()) {
            this.init();

            // Store the zoomable timeout value just to clear it while closing
            this.zoomabletimeout = false;

            // Set the initial value center
            this.pageX = window.innerWidth / 2;
            this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
        }

        return this;
    };

    Zoom.prototype.init = function () {

        var _this = this;
        var zoomIcons = '<button id="lg-zoom-in" class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right"><i class="mdui-icon material-icons">&#xe8ff;</i></button><button id="lg-zoom-out" class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right"><i class="mdui-icon material-icons">&#xe900;</i></button>';

        if (_this.core.s.actualSize) {
            zoomIcons += '<button id="lg-actual-size" class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right"><i class="mdui-icon material-icons">&#xe432;</i></button>';
        }

        if (_this.core.s.useLeftForZoom) {
            utils.addClass(_this.core.outer, 'lg-use-left-for-zoom');
        } else {
            utils.addClass(_this.core.outer, 'lg-use-transition-for-zoom');
        }

        this.core.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', zoomIcons);

        // Add zoomable class
        utils.on(_this.core.el, 'onSlideItemLoad.lgtmzoom', function (event) {

            // delay will be 0 except first time
            var _speed = _this.core.s.enableZoomAfter + event.detail.delay;

            // set _speed value 0 if gallery opened from direct url and if it is first slide
            if (utils.hasClass(document.body, 'lg-from-hash') && event.detail.delay) {

                // will execute only once
                _speed = 0;
            } else {

                // Remove lg-from-hash to enable starting animation.
                utils.removeClass(document.body, 'lg-from-hash');
            }

            _this.zoomabletimeout = setTimeout(function () {
                utils.addClass(_this.core.___slide[event.detail.index], 'lg-zoomable');
            }, _speed + 30);
        });

        var scale = 1;
        /**
         * @desc Image zoom
         * Translate the wrap and scale the image to get better user experience
         *
         * @param {String} scaleVal - Zoom decrement/increment value
         */
        var zoom = function zoom(scaleVal) {

            var image = _this.core.outer.querySelector('.lg-current .lg-image');
            var _x;
            var _y;

            // Find offset manually to avoid issue after zoom
            var offsetX = (window.innerWidth - image.clientWidth) / 2;
            var offsetY = (window.innerHeight - image.clientHeight) / 2 + (document.documentElement.scrollTop || document.body.scrollTop);

            _x = _this.pageX - offsetX;
            _y = _this.pageY - offsetY;

            var x = (scaleVal - 1) * _x;
            var y = (scaleVal - 1) * _y;

            utils.setVendor(image, 'Transform', 'scale3d(' + scaleVal + ', ' + scaleVal + ', 1)');
            image.setAttribute('data-scale', scaleVal);

            if (_this.core.s.useLeftForZoom) {
                image.parentElement.style.left = -x + 'px';
                image.parentElement.style.top = -y + 'px';
            } else {
                utils.setVendor(image.parentElement, 'Transform', 'translate3d(-' + x + 'px, -' + y + 'px, 0)');
            }

            image.parentElement.setAttribute('data-x', x);
            image.parentElement.setAttribute('data-y', y);
        };

        var callScale = function callScale() {
            if (scale > 1) {
                utils.addClass(_this.core.outer, 'lg-zoomed');
            } else {
                _this.resetZoom();
            }

            if (scale < 1) {
                scale = 1;
            }

            zoom(scale);
        };

        var actualSize = function actualSize(event, image, index, fromIcon) {
            var w = image.clientWidth;
            var nw;
            if (_this.core.s.dynamic) {
                nw = _this.core.s.dynamicEl[index].width || image.naturalWidth || w;
            } else {
                nw = _this.core.items[index].getAttribute('data-width') || image.naturalWidth || w;
            }

            var _scale;

            if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
                scale = 1;
            } else {
                if (nw > w) {
                    _scale = nw / w;
                    scale = _scale || 2;
                }
            }

            if (fromIcon) {
                _this.pageX = window.innerWidth / 2;
                _this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
            } else {
                _this.pageX = event.pageX || event.targetTouches[0].pageX;
                _this.pageY = event.pageY || event.targetTouches[0].pageY;
            }

            callScale();
            setTimeout(function () {
                utils.removeClass(_this.core.outer, 'lg-grabbing');
                utils.addClass(_this.core.outer, 'lg-grab');
            }, 10);
        };

        var tapped = false;

        // event triggered after appending slide content
        utils.on(_this.core.el, 'onAferAppendSlide.lgtmzoom', function (event) {

            var index = event.detail.index;

            // Get the current element
            var image = _this.core.___slide[index].querySelector('.lg-image');

            if (!_this.core.isTouch) {
                utils.on(image, 'dblclick', function (event) {
                    actualSize(event, image, index);
                });
            }

            if (_this.core.isTouch) {
                utils.on(image, 'touchstart', function (event) {
                    if (!tapped) {
                        tapped = setTimeout(function () {
                            tapped = null;
                        }, 300);
                    } else {
                        clearTimeout(tapped);
                        tapped = null;
                        actualSize(event, image, index);
                    }

                    event.preventDefault();
                });
            }
        });

        // Update zoom on resize and orientationchange
        utils.on(window, 'resize.lgzoom scroll.lgzoom orientationchange.lgzoom', function () {
            _this.pageX = window.innerWidth / 2;
            _this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
            zoom(scale);
        });

        utils.on(document.getElementById('lg-zoom-out'), 'click.lg', function () {
            if (_this.core.outer.querySelector('.lg-current .lg-image')) {
                scale -= _this.core.s.scale;
                callScale();
            }
        });

        utils.on(document.getElementById('lg-zoom-in'), 'click.lg', function () {
            if (_this.core.outer.querySelector('.lg-current .lg-image')) {
                scale += _this.core.s.scale;
                callScale();
            }
        });

        utils.on(document.getElementById('lg-actual-size'), 'click.lg', function (event) {
            actualSize(event, _this.core.___slide[_this.core.index].querySelector('.lg-image'), _this.core.index, true);
        });

        // Reset zoom on slide change
        utils.on(_this.core.el, 'onBeforeSlide.lgtm', function () {
            scale = 1;
            _this.resetZoom();
        });

        // Drag option after zoom
        if (!_this.core.isTouch) {
            _this.zoomDrag();
        }

        if (_this.core.isTouch) {
            _this.zoomSwipe();
        }
    };

    // Reset zoom effect
    Zoom.prototype.resetZoom = function () {
        utils.removeClass(this.core.outer, 'lg-zoomed');
        for (var i = 0; i < this.core.___slide.length; i++) {
            if (this.core.___slide[i].querySelector('.lg-img-wrap')) {
                this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('style');
                this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('data-x');
                this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('data-y');
            }
        }

        for (var j = 0; j < this.core.___slide.length; j++) {
            if (this.core.___slide[j].querySelector('.lg-image')) {
                this.core.___slide[j].querySelector('.lg-image').removeAttribute('style');
                this.core.___slide[j].querySelector('.lg-image').removeAttribute('data-scale');
            }
        }

        // Reset pagx pagy values to center
        this.pageX = window.innerWidth / 2;
        this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
    };

    Zoom.prototype.zoomSwipe = function () {
        var _this = this;
        var startCoords = {};
        var endCoords = {};
        var isMoved = false;

        // Allow x direction drag
        var allowX = false;

        // Allow Y direction drag
        var allowY = false;

        for (var i = 0; i < _this.core.___slide.length; i++) {

            /*jshint loopfunc: true */
            utils.on(_this.core.___slide[i], 'touchstart.lg', function (e) {

                if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
                    var image = _this.core.___slide[_this.core.index].querySelector('.lg-object');

                    allowY = image.offsetHeight * image.getAttribute('data-scale') > _this.core.outer.querySelector('.lg').clientHeight;
                    allowX = image.offsetWidth * image.getAttribute('data-scale') > _this.core.outer.querySelector('.lg').clientWidth;
                    if (allowX || allowY) {
                        e.preventDefault();
                        startCoords = {
                            x: e.targetTouches[0].pageX,
                            y: e.targetTouches[0].pageY
                        };
                    }
                }
            });
        }

        for (var j = 0; j < _this.core.___slide.length; j++) {

            /*jshint loopfunc: true */
            utils.on(_this.core.___slide[j], 'touchmove.lg', function (e) {

                if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {

                    var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
                    var distanceX;
                    var distanceY;

                    e.preventDefault();
                    isMoved = true;

                    endCoords = {
                        x: e.targetTouches[0].pageX,
                        y: e.targetTouches[0].pageY
                    };

                    // reset opacity and transition duration
                    utils.addClass(_this.core.outer, 'lg-zoom-dragging');

                    if (allowY) {
                        distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y);
                    } else {
                        distanceY = -Math.abs(_el.getAttribute('data-y'));
                    }

                    if (allowX) {
                        distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x);
                    } else {
                        distanceX = -Math.abs(_el.getAttribute('data-x'));
                    }

                    if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {

                        if (_this.core.s.useLeftForZoom) {
                            _el.style.left = distanceX + 'px';
                            _el.style.top = distanceY + 'px';
                        } else {
                            utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                        }
                    }
                }
            });
        }

        for (var k = 0; k < _this.core.___slide.length; k++) {

            /*jshint loopfunc: true */
            utils.on(_this.core.___slide[k], 'touchend.lg', function () {
                if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
                    if (isMoved) {
                        isMoved = false;
                        utils.removeClass(_this.core.outer, 'lg-zoom-dragging');
                        _this.touchendZoom(startCoords, endCoords, allowX, allowY);
                    }
                }
            });
        }
    };

    Zoom.prototype.zoomDrag = function () {

        var _this = this;
        var startCoords = {};
        var endCoords = {};
        var isDraging = false;
        var isMoved = false;

        // Allow x direction drag
        var allowX = false;

        // Allow Y direction drag
        var allowY = false;

        for (var i = 0; i < _this.core.___slide.length; i++) {

            /*jshint loopfunc: true */
            utils.on(_this.core.___slide[i], 'mousedown.lgzoom', function (e) {

                // execute only on .lg-object
                var image = _this.core.___slide[_this.core.index].querySelector('.lg-object');

                allowY = image.offsetHeight * image.getAttribute('data-scale') > _this.core.outer.querySelector('.lg').clientHeight;
                allowX = image.offsetWidth * image.getAttribute('data-scale') > _this.core.outer.querySelector('.lg').clientWidth;

                if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
                    if (utils.hasClass(e.target, 'lg-object') && (allowX || allowY)) {
                        e.preventDefault();
                        startCoords = {
                            x: e.pageX,
                            y: e.pageY
                        };

                        isDraging = true;

                        // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                        _this.core.outer.scrollLeft += 1;
                        _this.core.outer.scrollLeft -= 1;

                        utils.removeClass(_this.core.outer, 'lg-grab');
                        utils.addClass(_this.core.outer, 'lg-grabbing');
                    }
                }
            });
        }

        utils.on(window, 'mousemove.lgzoom', function (e) {
            if (isDraging) {
                var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
                var distanceX;
                var distanceY;

                isMoved = true;
                endCoords = {
                    x: e.pageX,
                    y: e.pageY
                };

                // reset opacity and transition duration
                utils.addClass(_this.core.outer, 'lg-zoom-dragging');

                if (allowY) {
                    distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y);
                } else {
                    distanceY = -Math.abs(_el.getAttribute('data-y'));
                }

                if (allowX) {
                    distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x);
                } else {
                    distanceX = -Math.abs(_el.getAttribute('data-x'));
                }

                if (_this.core.s.useLeftForZoom) {
                    _el.style.left = distanceX + 'px';
                    _el.style.top = distanceY + 'px';
                } else {
                    utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                }
            }
        });

        utils.on(window, 'mouseup.lgzoom', function (e) {

            if (isDraging) {
                isDraging = false;
                utils.removeClass(_this.core.outer, 'lg-zoom-dragging');

                // Fix for chrome mouse move on click
                if (isMoved && (startCoords.x !== endCoords.x || startCoords.y !== endCoords.y)) {
                    endCoords = {
                        x: e.pageX,
                        y: e.pageY
                    };
                    _this.touchendZoom(startCoords, endCoords, allowX, allowY);
                }

                isMoved = false;
            }

            utils.removeClass(_this.core.outer, 'lg-grabbing');
            utils.addClass(_this.core.outer, 'lg-grab');
        });
    };

    Zoom.prototype.touchendZoom = function (startCoords, endCoords, allowX, allowY) {

        var _this = this;
        var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
        var image = _this.core.___slide[_this.core.index].querySelector('.lg-object');
        var distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x);
        var distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y);
        var minY = (_this.core.outer.querySelector('.lg').clientHeight - image.offsetHeight) / 2;
        var maxY = Math.abs(image.offsetHeight * Math.abs(image.getAttribute('data-scale')) - _this.core.outer.querySelector('.lg').clientHeight + minY);
        var minX = (_this.core.outer.querySelector('.lg').clientWidth - image.offsetWidth) / 2;
        var maxX = Math.abs(image.offsetWidth * Math.abs(image.getAttribute('data-scale')) - _this.core.outer.querySelector('.lg').clientWidth + minX);

        if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
            if (allowY) {
                if (distanceY <= -maxY) {
                    distanceY = -maxY;
                } else if (distanceY >= -minY) {
                    distanceY = -minY;
                }
            }

            if (allowX) {
                if (distanceX <= -maxX) {
                    distanceX = -maxX;
                } else if (distanceX >= -minX) {
                    distanceX = -minX;
                }
            }

            if (allowY) {
                _el.setAttribute('data-y', Math.abs(distanceY));
            } else {
                distanceY = -Math.abs(_el.getAttribute('data-y'));
            }

            if (allowX) {
                _el.setAttribute('data-x', Math.abs(distanceX));
            } else {
                distanceX = -Math.abs(_el.getAttribute('data-x'));
            }

            if (_this.core.s.useLeftForZoom) {
                _el.style.left = distanceX + 'px';
                _el.style.top = distanceY + 'px';
            } else {
                utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
            }
        }
    };

    Zoom.prototype.destroy = function () {

        var _this = this;

        // Unbind all events added by lightGallery zoom plugin
        utils.off(_this.core.el, '.lgzoom');
        utils.off(window, '.lgzoom');
        for (var i = 0; i < _this.core.___slide.length; i++) {
            utils.off(_this.core.___slide[i], '.lgzoom');
        }

        utils.off(_this.core.el, '.lgtmzoom');
        _this.resetZoom();
        clearTimeout(_this.zoomabletimeout);
        _this.zoomabletimeout = false;
    };

    window.lgModules.zoom = Zoom;
});

},{}]},{},[1])(1)
});

/**!
 * lg-fullscreen.js | 1.0.0 | October 5th 2016
 * http://sachinchoolur.github.io/lg-fullscreen.js
 * Copyright (c) 2016 Sachin N;
 * @license GPLv3
 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LgFullscreen = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.lgFullscreen = mod.exports;
    }
})(this, function () {
    'use strict';

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var fullscreenDefaults = {
        fullScreen: true
    };

    var Fullscreen = function Fullscreen(element) {

        this.el = element;

        this.core = window.lgData[this.el.getAttribute('lg-uid')];
        this.core.s = _extends({}, fullscreenDefaults, this.core.s);

        this.init();

        return this;
    };

    Fullscreen.prototype.init = function () {
        var fullScreen = '';
        if (this.core.s.fullScreen) {

            // check for fullscreen browser support
            if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled && !document.mozFullScreenEnabled && !document.msFullscreenEnabled) {
                return;
            } else {
                fullScreen = '<button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right lg-fullscreen"><i class="mdui-icon material-icons fullscreen">&#xe5d0;</i><i class="mdui-icon material-icons fullscreen_exit">&#xe5d1;</i></button>';
                this.core.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', fullScreen);
                this.fullScreen();
            }
        }
    };

    Fullscreen.prototype.requestFullscreen = function () {
        var el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        }
    };

    Fullscreen.prototype.exitFullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    };

    // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
    Fullscreen.prototype.fullScreen = function () {
        var _this = this;

        utils.on(document, 'fullscreenchange.lgfullscreen webkitfullscreenchange.lgfullscreen mozfullscreenchange.lgfullscreen MSFullscreenChange.lgfullscreen', function () {
            if (utils.hasClass(_this.core.outer, 'lg-fullscreen-on')) {
                utils.removeClass(_this.core.outer, 'lg-fullscreen-on');
            } else {
                utils.addClass(_this.core.outer, 'lg-fullscreen-on');
            }
        });

        utils.on(this.core.outer.querySelector('.lg-fullscreen'), 'click.lg', function () {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                _this.requestFullscreen();
            } else {
                _this.exitFullscreen();
            }
        });
    };

    Fullscreen.prototype.destroy = function () {

        // exit from fullscreen if activated
        this.exitFullscreen();

        utils.off(document, '.lgfullscreen');
    };

    window.lgModules.fullscreen = Fullscreen;
});

},{}]},{},[1])(1)
});

/**!
 * lg-video.js | 1.0.0 | October 5th 2016
 * http://sachinchoolur.github.io/lg-video.js
 * Copyright (c) 2016 Sachin N;
 * @license GPLv3
 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LgVideo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.lgVideo = mod.exports;
    }
})(this, function () {
    'use strict';

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var videoDefaults = {
        videoMaxWidth: '855px',
        youtubePlayerParams: false,
        vimeoPlayerParams: false,
        dailymotionPlayerParams: false,
        vkPlayerParams: false,
        videojs: false,
        videojsOptions: {}
    };

    var Video = function Video(element) {

        this.el = element;

        this.core = window.lgData[this.el.getAttribute('lg-uid')];
        this.core.s = _extends({}, videoDefaults, this.core.s);

        this.videoLoaded = false;

        this.init();

        return this;
    };

    Video.prototype.init = function () {
        var _this = this;

        // Event triggered when video url found without poster
        utils.on(_this.core.el, 'hasVideo.lgtm', function (event) {
            _this.core.___slide[event.detail.index].querySelector('.lg-video').insertAdjacentHTML('beforeend', _this.loadVideo(event.detail.src, 'lg-object', true, event.detail.index, event.detail.html));
            if (event.detail.html) {
                if (_this.core.s.videojs) {
                    try {
                        videojs(_this.core.___slide[event.detail.index].querySelector('.lg-html5'), _this.core.s.videojsOptions, function () {
                            if (!_this.videoLoaded) {
                                this.play();
                            }
                        });
                    } catch (e) {
                        console.error('Make sure you have included videojs');
                    }
                } else {
                    _this.core.___slide[event.detail.index].querySelector('.lg-html5').play();
                }
            }
        });

        // Set max width for video
        utils.on(_this.core.el, 'onAferAppendSlide.lgtm', function (event) {
            if (_this.core.___slide[event.detail.index].querySelector('.lg-video-cont')) {
                _this.core.___slide[event.detail.index].querySelector('.lg-video-cont').style.maxWidth = _this.core.s.videoMaxWidth;
                _this.videoLoaded = true;
            }
        });

        var loadOnClick = function loadOnClick($el) {
            // check slide has poster
            if (utils.hasClass($el.querySelector('.lg-object'), 'lg-has-poster') && $el.querySelector('.lg-object').style.display !== 'none') {

                // check already video element present
                if (!utils.hasClass($el, 'lg-has-video')) {

                    utils.addClass($el, 'lg-video-playing');
                    utils.addClass($el, 'lg-has-video');

                    var _src;
                    var _html;
                    var _loadVideo = function _loadVideo(_src, _html) {

                        $el.querySelector('.lg-video').insertAdjacentHTML('beforeend', _this.loadVideo(_src, '', false, _this.core.index, _html));

                        if (_html) {
                            if (_this.core.s.videojs) {
                                try {
                                    videojs(_this.core.___slide[_this.core.index].querySelector('.lg-html5'), _this.core.s.videojsOptions, function () {
                                        this.play();
                                    });
                                } catch (e) {
                                    console.error('Make sure you have included videojs');
                                }
                            } else {
                                _this.core.___slide[_this.core.index].querySelector('.lg-html5').play();
                            }
                        }
                    };

                    if (_this.core.s.dynamic) {

                        _src = _this.core.s.dynamicEl[_this.core.index].src;
                        _html = _this.core.s.dynamicEl[_this.core.index].html;

                        _loadVideo(_src, _html);
                    } else {

                        _src = _this.core.items[_this.core.index].getAttribute('href') || _this.core.items[_this.core.index].getAttribute('data-src');
                        _html = _this.core.items[_this.core.index].getAttribute('data-html');

                        _loadVideo(_src, _html);
                    }

                    var $tempImg = $el.querySelector('.lg-object');
                    $el.querySelector('.lg-video').appendChild($tempImg);

                    // @todo loading icon for html5 videos also
                    // for showing the loading indicator while loading video
                    if (!utils.hasClass($el.querySelector('.lg-video-object'), 'lg-html5')) {
                        utils.removeClass($el, 'lg-complete');
                        utils.on($el.querySelector('.lg-video-object'), 'load.lg error.lg', function () {
                            utils.addClass($el, 'lg-complete');
                        });
                    }
                } else {

                    var youtubePlayer = $el.querySelector('.lg-youtube');
                    var vimeoPlayer = $el.querySelector('.lg-vimeo');
                    var dailymotionPlayer = $el.querySelector('.lg-dailymotion');
                    var html5Player = $el.querySelector('.lg-html5');
                    if (youtubePlayer) {
                        youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    } else if (vimeoPlayer) {
                        try {
                            $f(vimeoPlayer).api('play');
                        } catch (e) {
                            console.error('Make sure you have included froogaloop2 js');
                        }
                    } else if (dailymotionPlayer) {
                        dailymotionPlayer.contentWindow.postMessage('play', '*');
                    } else if (html5Player) {
                        if (_this.core.s.videojs) {
                            try {
                                videojs(html5Player).play();
                            } catch (e) {
                                console.error('Make sure you have included videojs');
                            }
                        } else {
                            html5Player.play();
                        }
                    }

                    utils.addClass($el, 'lg-video-playing');
                }
            }
        };

        if (_this.core.doCss() && _this.core.items.length > 1 && (_this.core.s.enableSwipe && _this.core.isTouch || _this.core.s.enableDrag && !_this.core.isTouch)) {
            utils.on(_this.core.el, 'onSlideClick.lgtm', function () {
                var $el = _this.core.___slide[_this.core.index];
                loadOnClick($el);
            });
        } else {

            // For IE 9 and bellow
            for (var i = 0; i < _this.core.___slide.length; i++) {

                /*jshint loopfunc: true */
                (function (index) {
                    utils.on(_this.core.___slide[index], 'click.lg', function () {
                        loadOnClick(_this.core.___slide[index]);
                    });
                })(i);
            }
        }

        utils.on(_this.core.el, 'onBeforeSlide.lgtm', function (event) {

            var $videoSlide = _this.core.___slide[event.detail.prevIndex];
            var youtubePlayer = $videoSlide.querySelector('.lg-youtube');
            var vimeoPlayer = $videoSlide.querySelector('.lg-vimeo');
            var dailymotionPlayer = $videoSlide.querySelector('.lg-dailymotion');
            var vkPlayer = $videoSlide.querySelector('.lg-vk');
            var html5Player = $videoSlide.querySelector('.lg-html5');
            if (youtubePlayer) {
                youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } else if (vimeoPlayer) {
                try {
                    $f(vimeoPlayer).api('pause');
                } catch (e) {
                    console.error('Make sure you have included froogaloop2 js');
                }
            } else if (dailymotionPlayer) {
                dailymotionPlayer.contentWindow.postMessage('pause', '*');
            } else if (html5Player) {
                if (_this.core.s.videojs) {
                    try {
                        videojs(html5Player).pause();
                    } catch (e) {
                        console.error('Make sure you have included videojs');
                    }
                } else {
                    html5Player.pause();
                }
            }if (vkPlayer) {

                vkPlayer.setAttribute('src', vkPlayer.getAttribute('src').replace('&autoplay', '&noplay'));
            }

            var _src;
            if (_this.core.s.dynamic) {
                _src = _this.core.s.dynamicEl[event.detail.index].src;
            } else {
                _src = _this.core.items[event.detail.index].getAttribute('href') || _this.core.items[event.detail.index].getAttribute('data-src');
            }

            var _isVideo = _this.core.isVideo(_src, event.detail.index) || {};
            if (_isVideo.youtube || _isVideo.vimeo || _isVideo.dailymotion || _isVideo.vk) {
                utils.addClass(_this.core.outer, 'lg-hide-download');
            }

            //$videoSlide.addClass('lg-complete');
        });

        utils.on(_this.core.el, 'onAfterSlide.lgtm', function (event) {
            utils.removeClass(_this.core.___slide[event.detail.prevIndex], 'lg-video-playing');
        });
    };

    Video.prototype.loadVideo = function (src, addClass, noposter, index, html) {
        var video = '';
        var autoplay = 1;
        var a = '';
        var isVideo = this.core.isVideo(src, index) || {};

        // Enable autoplay for first video if poster doesn't exist
        if (noposter) {
            if (this.videoLoaded) {
                autoplay = 0;
            } else {
                autoplay = 1;
            }
        }

        if (isVideo.youtube) {

            a = '?wmode=opaque&autoplay=' + autoplay + '&enablejsapi=1';
            if (this.core.s.youtubePlayerParams) {
                a = a + '&' + utils.param(this.core.s.youtubePlayerParams);
            }

            video = '<iframe class="lg-video-object lg-youtube ' + addClass + '" width="560" height="315" src="//www.youtube.com/embed/' + isVideo.youtube[1] + a + '" frameborder="0" allowfullscreen></iframe>';
        } else if (isVideo.vimeo) {

            a = '?autoplay=' + autoplay + '&api=1';
            if (this.core.s.vimeoPlayerParams) {
                a = a + '&' + utils.param(this.core.s.vimeoPlayerParams);
            }

            video = '<iframe class="lg-video-object lg-vimeo ' + addClass + '" width="560" height="315"  src="//player.vimeo.com/video/' + isVideo.vimeo[1] + a + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
        } else if (isVideo.dailymotion) {

            a = '?wmode=opaque&autoplay=' + autoplay + '&api=postMessage';
            if (this.core.s.dailymotionPlayerParams) {
                a = a + '&' + utils.param(this.core.s.dailymotionPlayerParams);
            }

            video = '<iframe class="lg-video-object lg-dailymotion ' + addClass + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + isVideo.dailymotion[1] + a + '" frameborder="0" allowfullscreen></iframe>';
        } else if (isVideo.html5) {
            var fL = html.substring(0, 1);
            if (fL === '.' || fL === '#') {
                html = document.querySelector(html).innerHTML;
            }

            video = html;
        } else if (isVideo.vk) {

            a = '&autoplay=' + autoplay;
            if (this.core.s.vkPlayerParams) {
                a = a + '&' + utils.param(this.core.s.vkPlayerParams);
            }

            video = '<iframe class="lg-video-object lg-vk ' + addClass + '" width="560" height="315" src="http://vk.com/video_ext.php?' + isVideo.vk[1] + a + '" frameborder="0" allowfullscreen></iframe>';
        }

        return video;
    };

    Video.prototype.destroy = function () {
        this.videoLoaded = false;
    };

    window.lgModules.video = Video;
});

},{}]},{},[1])(1)
});

/**!
 * lg-autoplay.js | 1.0.0 | October 5th 2016
 * http://sachinchoolur.github.io/lg-autoplay.js
 * Copyright (c) 2016 Sachin N;
 * @license GPLv3
 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LgAutoplay = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.lgAutoplay = mod.exports;
    }
})(this, function () {
    'use strict';

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var autoplayDefaults = {
        autoplay: false,
        pause: 5000,
        progressBar: true,
        fourceAutoplay: false,
        autoplayControls: true,
        appendAutoplayControlsTo: '.lg-toolbar'
    };

    /**
     * Creates the autoplay plugin.
     * @param {object} element - lightGallery element
     */
    var Autoplay = function Autoplay(element) {

        this.el = element;

        this.core = window.lgData[this.el.getAttribute('lg-uid')];

        // Execute only if items are above 1
        if (this.core.items.length < 2) {
            return false;
        }

        this.core.s = _extends({}, autoplayDefaults, this.core.s);
        this.interval = false;

        // Identify if slide happened from autoplay
        this.fromAuto = true;

        // Identify if autoplay canceled from touch/drag
        this.canceledOnTouch = false;

        // save fourceautoplay value
        this.fourceAutoplayTemp = this.core.s.fourceAutoplay;

        // do not allow progress bar if browser does not support css3 transitions
        if (!this.core.doCss()) {
            this.core.s.progressBar = false;
        }

        this.init();

        return this;
    };

    Autoplay.prototype.init = function () {
        var _this = this;

        // append autoplay controls
        if (_this.core.s.autoplayControls) {
            _this.controls();
        }

        // Create progress bar
        if (_this.core.s.progressBar) {
            _this.core.outer.querySelector('.lg').insertAdjacentHTML('beforeend', '<div class="lg-progress-bar"><div class="lg-progress"></div></div>');
        }

        // set progress
        _this.progress();

        // Start autoplay
        if (_this.core.s.autoplay) {
            _this.startlAuto();
        }

        // cancel interval on touchstart and dragstart
        utils.on(_this.el, 'onDragstart.lgtm touchstart.lgtm', function () {
            if (_this.interval) {
                _this.cancelAuto();
                _this.canceledOnTouch = true;
            }
        });

        // restore autoplay if autoplay canceled from touchstart / dragstart
        utils.on(_this.el, 'onDragend.lgtm touchend.lgtm onSlideClick.lgtm', function () {
            if (!_this.interval && _this.canceledOnTouch) {
                _this.startlAuto();
                _this.canceledOnTouch = false;
            }
        });
    };

    Autoplay.prototype.progress = function () {

        var _this = this;
        var _progressBar;
        var _progress;

        utils.on(_this.el, 'onBeforeSlide.lgtm', function () {

            // start progress bar animation
            if (_this.core.s.progressBar && _this.fromAuto) {
                _progressBar = _this.core.outer.querySelector('.lg-progress-bar');
                _progress = _this.core.outer.querySelector('.lg-progress');
                if (_this.interval) {
                    _progress.removeAttribute('style');
                    utils.removeClass(_progressBar, 'lg-start');
                    setTimeout(function () {
                        utils.setVendor(_progress, 'Transition', 'width ' + (_this.core.s.speed + _this.core.s.pause) + 'ms ease 0s');
                        utils.addClass(_progressBar, 'lg-start');
                    }, 20);
                }
            }

            // Remove setinterval if slide is triggered manually and fourceautoplay is false
            if (!_this.fromAuto && !_this.core.s.fourceAutoplay) {
                _this.cancelAuto();
            }

            _this.fromAuto = false;
        });
    };

    // Manage autoplay via play/stop buttons
    Autoplay.prototype.controls = function () {
        var _this = this;
        var _html = '<button class="mdui-btn mdui-btn-icon mdui-ripple lg-autoplay-button mdui-float-right"><i class="mdui-icon material-icons play">&#xe039;</i><i class="mdui-icon material-icons pause">&#xe036;</i></button>';

        // Append autoplay controls
        _this.core.outer.querySelector(this.core.s.appendAutoplayControlsTo).insertAdjacentHTML('beforeend', _html);

        utils.on(_this.core.outer.querySelector('.lg-autoplay-button'), 'click.lg', function () {
            if (utils.hasClass(_this.core.outer, 'lg-show-autoplay')) {
                _this.cancelAuto();
                _this.core.s.fourceAutoplay = false;
            } else {
                if (!_this.interval) {
                    _this.startlAuto();
                    _this.core.s.fourceAutoplay = _this.fourceAutoplayTemp;
                }
            }
        });
    };

    // Autostart gallery
    Autoplay.prototype.startlAuto = function () {
        var _this = this;

        utils.setVendor(_this.core.outer.querySelector('.lg-progress'), 'Transition', 'width ' + (_this.core.s.speed + _this.core.s.pause) + 'ms ease 0s');
        utils.addClass(_this.core.outer, 'lg-show-autoplay');
        utils.addClass(_this.core.outer.querySelector('.lg-progress-bar'), 'lg-start');

        _this.interval = setInterval(function () {
            if (_this.core.index + 1 < _this.core.items.length) {
                _this.core.index++;
            } else {
                _this.core.index = 0;
            }

            _this.fromAuto = true;
            _this.core.slide(_this.core.index, false, false);
        }, _this.core.s.speed + _this.core.s.pause);
    };

    // cancel Autostart
    Autoplay.prototype.cancelAuto = function () {
        clearInterval(this.interval);
        this.interval = false;
        if (this.core.outer.querySelector('.lg-progress')) {
            this.core.outer.querySelector('.lg-progress').removeAttribute('style');
        }

        utils.removeClass(this.core.outer, 'lg-show-autoplay');
        utils.removeClass(this.core.outer.querySelector('.lg-progress-bar'), 'lg-start');
    };

    Autoplay.prototype.destroy = function () {

        this.cancelAuto();
        if (this.core.outer.querySelector('.lg-progress-bar')) {
            this.core.outer.querySelector('.lg-progress-bar').parentNode.removeChild(this.core.outer.querySelector('.lg-progress-bar'));
        }
    };

    window.lgModules.autoplay = Autoplay;
});

},{}]},{},[1])(1)
});

/*!
 * smooth-scroll v11.0.2: Animate scrolling to anchor links
 * (c) 2017 Chris Ferdinandi
 * GPL-3.0 License
 * http://github.com/cferdinandi/smooth-scroll
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.smoothScroll = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, (function (root) {

	'use strict';

	//
	// Variables
	//

	var smoothScroll = {}; // Object for public APIs
	var supports = 'querySelector' in document && 'addEventListener' in root; // Feature test
	var settings, anchor, toggle, fixedHeader, headerHeight, eventTimeout, animationInterval;

	// Default settings
	var defaults = {
		// Selectors
		selector: '[data-scroll]',
		selectorHeader: null,

		// Speed & Easing
		speed: 500,
		offset: 0,
		easing: 'easeInOutCubic',
		easingPatterns: {},

		// Callback API
		before: function () {},
		after: function () {}
	};


	//
	// Methods
	//

	/**
	 * Merge two or more objects. Returns a new object.
	 * @private
	 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	 * @param {Object}   objects  The objects to merge together
	 * @returns {Object}          Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					// If deep merge and property is an object, merge properties
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Get the height of an element.
	 * @private
	 * @param  {Node} elem The element to get the height of
	 * @return {Number}    The element's height in pixels
	 */
	var getHeight = function ( elem ) {
		return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
	};

	/**
	 * Get the closest matching element up the DOM tree.
	 * @private
	 * @param  {Element} elem     Starting element
	 * @param  {String}  selector Selector to match against
	 * @return {Boolean|Element}  Returns null if not match found
	 */
	var getClosest = function ( elem, selector ) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function(s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}

		return null;

	};

	/**
	 * Escape special characters for use with querySelector
	 * @private
	 * @param {String} id The anchor ID to escape
	 * @author Mathias Bynens
	 * @link https://github.com/mathiasbynens/CSS.escape
	 */
	var escapeCharacters = function ( id ) {

		// Remove leading hash
		if ( id.charAt(0) === '#' ) {
			id = id.substr(1);
		}

		var string = String(id);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: there’s no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then throw an
			// `InvalidCharacterError` exception and terminate these steps.
			if (codeUnit === 0x0000) {
				throw new InvalidCharacterError(
					'Invalid character: the input contains U+0000.'
				);
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(
					index === 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit === 0x002D
				)
			) {
				// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit === 0x002D ||
				codeUnit === 0x005F ||
				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
				codeUnit >= 0x0061 && codeUnit <= 0x007A
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// http://dev.w3.org/csswg/cssom/#escape-a-character
			result += '\\' + string.charAt(index);

		}

		return '#' + result;

	};

	/**
	 * Calculate the easing pattern
	 * @private
	 * @link https://gist.github.com/gre/1650294
	 * @param {String} type Easing pattern
	 * @param {Number} time Time animation should take to complete
	 * @returns {Number}
	 */
	var easingPattern = function ( settings, time ) {
		var pattern;

		// Default Easing Patterns
		if ( settings.easing === 'easeInQuad' ) pattern = time * time; // accelerating from zero velocity
		if ( settings.easing === 'easeOutQuad' ) pattern = time * (2 - time); // decelerating to zero velocity
		if ( settings.easing === 'easeInOutQuad' ) pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
		if ( settings.easing === 'easeInCubic' ) pattern = time * time * time; // accelerating from zero velocity
		if ( settings.easing === 'easeOutCubic' ) pattern = (--time) * time * time + 1; // decelerating to zero velocity
		if ( settings.easing === 'easeInOutCubic' ) pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
		if ( settings.easing === 'easeInQuart' ) pattern = time * time * time * time; // accelerating from zero velocity
		if ( settings.easing === 'easeOutQuart' ) pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
		if ( settings.easing === 'easeInOutQuart' ) pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
		if ( settings.easing === 'easeInQuint' ) pattern = time * time * time * time * time; // accelerating from zero velocity
		if ( settings.easing === 'easeOutQuint' ) pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
		if ( settings.easing === 'easeInOutQuint' ) pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration

		// Custom Easing Patterns
		if ( settings.easingPatterns[settings.easing] ) {
			pattern = settings.easingPatterns[settings.easing]( time );
		}

		return pattern || time; // no easing, no acceleration
	};

	/**
	 * Calculate how far to scroll
	 * @private
	 * @param {Element} anchor The anchor element to scroll to
	 * @param {Number} headerHeight Height of a fixed header, if any
	 * @param {Number} offset Number of pixels by which to offset scroll
	 * @returns {Number}
	 */
	var getEndLocation = function ( anchor, headerHeight, offset ) {
		var location = 0;
		if (anchor.offsetParent) {
			do {
				location += anchor.offsetTop;
				anchor = anchor.offsetParent;
			} while (anchor);
		}
		location = Math.max(location - headerHeight - offset, 0);
		return Math.min(location, getDocumentHeight() - getViewportHeight());
	};

	/**
	 * Determine the viewport's height
	 * @private
	 * @returns {Number}
	 */
	var getViewportHeight = function() {
		return Math.max( document.documentElement.clientHeight, root.innerHeight || 0 );
	};

	/**
	 * Determine the document's height
	 * @private
	 * @returns {Number}
	 */
	var getDocumentHeight = function () {
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
	};

	/**
	 * Convert data-options attribute into an object of key/value pairs
	 * @private
	 * @param {String} options Link-specific options as a data attribute string
	 * @returns {Object}
	 */
	var getDataOptions = function ( options ) {
		return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
	};

	/**
	 * Get the height of the fixed header
	 * @private
	 * @param  {Node}   header The header
	 * @return {Number}        The height of the header
	 */
	var getHeaderHeight = function ( header ) {
		return !header ? 0 : ( getHeight( header ) + header.offsetTop );
	};

	/**
	 * Bring the anchored element into focus
	 * @private
	 */
	var adjustFocus = function ( anchor, endLocation, isNum ) {

		// Don't run if scrolling to a number on the page
		if ( isNum ) return;

		// Otherwise, bring anchor element into focus
		anchor.focus();
		if ( document.activeElement.id !== anchor.id ) {
			anchor.setAttribute( 'tabindex', '-1' );
			anchor.focus();
			anchor.style.outline = 'none';
		}
		root.scrollTo( 0 , endLocation );

	};

	/**
	 * Start/stop the scrolling animation
	 * @public
	 * @param {Node|Number} anchor  The element or position to scroll to
	 * @param {Element}     toggle  The element that toggled the scroll event
	 * @param {Object}      options
	 */
	smoothScroll.animateScroll = function ( anchor, toggle, options ) {

		// Options and overrides
		var overrides = getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
		var animateSettings = extend( settings || defaults, options || {}, overrides ); // Merge user options with defaults

		// Selectors and variables
		var isNum = Object.prototype.toString.call( anchor ) === '[object Number]' ? true : false;
		var anchorElem = isNum || !anchor.tagName ? null : anchor;
		if ( !isNum && !anchorElem ) return;
		var startLocation = root.pageYOffset; // Current location on the page
		if ( animateSettings.selectorHeader && !fixedHeader ) {
			// Get the fixed header if not already set
			fixedHeader = document.querySelector( animateSettings.selectorHeader );
		}
		if ( !headerHeight ) {
			// Get the height of a fixed header if one exists and not already set
			headerHeight = getHeaderHeight( fixedHeader );
		}
		var endLocation = isNum ? anchor : getEndLocation( anchorElem, headerHeight, parseInt((typeof animateSettings.offset === 'function' ? animateSettings.offset() : animateSettings.offset), 10) ); // Location to scroll to
		var distance = endLocation - startLocation; // distance to travel
		var documentHeight = getDocumentHeight();
		var timeLapsed = 0;
		var percentage, position;

		/**
		 * Stop the scroll animation when it reaches its target (or the bottom/top of page)
		 * @private
		 * @param {Number} position Current position on the page
		 * @param {Number} endLocation Scroll to location
		 * @param {Number} animationInterval How much to scroll on this loop
		 */
		var stopAnimateScroll = function ( position, endLocation, animationInterval ) {
			var currentLocation = root.pageYOffset;
			if ( position == endLocation || currentLocation == endLocation || ( (root.innerHeight + currentLocation) >= documentHeight ) ) {

				// Clear the animation timer
				clearInterval(animationInterval);

				// Bring the anchored element into focus
				adjustFocus( anchor, endLocation, isNum );

				// Run callback after animation complete
				animateSettings.after( anchor, toggle );

			}
		};

		/**
		 * Loop scrolling animation
		 * @private
		 */
		var loopAnimateScroll = function () {
			timeLapsed += 16;
			percentage = ( timeLapsed / parseInt(animateSettings.speed, 10) );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			position = startLocation + ( distance * easingPattern(animateSettings, percentage) );
			root.scrollTo( 0, Math.floor(position) );
			stopAnimateScroll(position, endLocation, animationInterval);
		};

		/**
		 * Set interval timer
		 * @private
		 */
		var startAnimateScroll = function () {
			clearInterval(animationInterval);
			animationInterval = setInterval(loopAnimateScroll, 16);
		};

		/**
		 * Reset position to fix weird iOS bug
		 * @link https://github.com/cferdinandi/smooth-scroll/issues/45
		 */
		if ( root.pageYOffset === 0 ) {
			root.scrollTo( 0, 0 );
		}

		// Run callback before animation starts
		animateSettings.before( anchor, toggle );

		// Start scrolling animation
		startAnimateScroll();

	};

	/**
	 * Handle has change event
	 * @private
	 */
	var hashChangeHandler = function (event) {

		// Get hash from URL
		// var hash = decodeURIComponent( escapeCharacters( root.location.hash ) );
		var hash;
		try {
			hash = escapeCharacters( decodeURIComponent( root.location.hash ) );
		} catch(e) {
			hash = escapeCharacters( root.location.hash );
		}

		// Only run if there's an anchor element to scroll to
		if ( !anchor ) return;

		// Reset the anchor element's ID
		anchor.id = anchor.getAttribute( 'data-scroll-id' );

		// Scroll to the anchored content
		smoothScroll.animateScroll( anchor, toggle );

		// Reset anchor and toggle
		anchor = null;
		toggle = null;

	};

	/**
	 * If smooth scroll element clicked, animate scroll
	 * @private
	 */
	var clickHandler = function (event) {

		// Don't run if right-click or command/control + click
		if ( event.button !== 0 || event.metaKey || event.ctrlKey ) return;

		// Check if a smooth scroll link was clicked
		toggle = getClosest( event.target, settings.selector );
		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;

		// Only run if link is an anchor and points to the current page
		if ( toggle.hostname !== root.location.hostname || toggle.pathname !== root.location.pathname || !/#/.test(toggle.href) ) return;

		// Get the sanitized hash
		// var hash = decodeURIComponent( escapeCharacters( toggle.hash ) );
		// console.log(hash);
		var hash;
		try {
			hash = escapeCharacters( decodeURIComponent( toggle.hash ) );
		} catch(e) {
			hash = escapeCharacters( toggle.hash );
		}

		// If the hash is empty, scroll to the top of the page
		if ( hash === '#' ) {

			// Prevent default link behavior
			event.preventDefault();

			// Set the anchored element
			anchor = document.body;

			// Save or create the ID as a data attribute and remove it (prevents scroll jump)
			var id = anchor.id ? anchor.id : 'smooth-scroll-top';
			anchor.setAttribute( 'data-scroll-id', id );
			anchor.id = '';

			// If no hash change event will happen, fire manually
			// Otherwise, update the hash
			if ( root.location.hash.substring(1) === id ) {
				hashChangeHandler();
			} else {
				root.location.hash = id;
			}

			return;

		}

		// Get the anchored element
		anchor = document.querySelector( hash );

		// If anchored element exists, save the ID as a data attribute and remove it (prevents scroll jump)
		if ( !anchor ) return;
		anchor.setAttribute( 'data-scroll-id', anchor.id );
		anchor.id = '';

		// If no hash change event will happen, fire manually
		if ( toggle.hash === root.location.hash ) {
			event.preventDefault();
			hashChangeHandler();
		}

	};

	/**
	 * On window scroll and resize, only run events at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {Object} settings
	 */
	var resizeThrottler = function (event) {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout((function() {
				eventTimeout = null; // Reset timeout
				headerHeight = getHeaderHeight( fixedHeader ); // Get the height of a fixed header if one exists
			}), 66);
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	smoothScroll.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove event listeners
		document.removeEventListener( 'click', clickHandler, false );
		root.removeEventListener( 'resize', resizeThrottler, false );

		// Reset varaibles
		settings = null;
		anchor = null;
		toggle = null;
		fixedHeader = null;
		headerHeight = null;
		eventTimeout = null;
		animationInterval = null;
	};

	/**
	 * Initialize Smooth Scroll
	 * @public
	 * @param {Object} options User settings
	 */
	smoothScroll.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		smoothScroll.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		fixedHeader = settings.selectorHeader ? document.querySelector( settings.selectorHeader ) : null; // Get the fixed header
		headerHeight = getHeaderHeight( fixedHeader );

		// When a toggle is clicked, run the click handler
		document.addEventListener( 'click', clickHandler, false );

		// Listen for hash changes
		root.addEventListener('hashchange', hashChangeHandler, false);

		// If window is resized and there's a fixed header, recalculate its size
		if ( fixedHeader ) {
			root.addEventListener( 'resize', resizeThrottler, false );
		}

	};


	//
	// Public APIs
	//

	return smoothScroll;

}));

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0+f9a5575b
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = r('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.

    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```

    Chaining
    --------

    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.

    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });

    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```

    Assimilation
    ------------

    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.

    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```

    If the assimliated promise rejects, then the downstream promise will also reject.

    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```

    Simple Example
    --------------

    Synchronous Example

    ```javascript
    let result;

    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```

    Errback Example

    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```

    Promise Example;

    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```

    Advanced Example
    --------------

    Synchronous Example

    ```javascript
    let author, books;

    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```

    Errback Example

    ```js

    function foundBooks(books) {

    }

    function failure(reason) {

    }

    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```

    Promise Example;

    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```

    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.

    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }

    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }

    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```

    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map

/*! fetch.js */
(function() {
  'use strict';

  if (self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit)
    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      xhr.onload = function() {
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})();

/*! Copyright 2017 Halyul */
console.info("\u7248\u6743\u6240\u6709\uff0c\u7ffb\u7248\u5fc5\u7a76\uff01\u000d\u000a\u0043\u006f\u0070\u0079\u0072\u0069\u0067\u0068\u0074\u0020©\u0020\u0032\u0030\u0031\u0037\u0020\u0048\u0061\u006c\u0079\u0075\u006c");

var $$ = mdui.JQ;

/* post back button */
(function() {
  $$(document).on('click', 'button[back]', function() {
      window.history.back();
  });
})();

/* post toc */
(function() {
  $$(document).ready(function(){
    if($$("ul#menu-toc").children().length == 0 && $$("div#card-toc").children().length == 0)
    {
      $$("button#button-toc").addClass("mdui-hidden");
      $$("div#card-toc").addClass("mdui-hidden");
      $$("div#blog-post").addClass("no-toc")
    };
  });
})();

/* global dialog */
(function() {
  $$(document).on('open.mdui.dialog', '.mdui-dialog', function() {
      $$('html').css('overflow-y', 'hidden');
      $$('body').removeClass('drawer-overlay-none');
  });
  $$(document).on('close.mdui.dialog', '.mdui-dialog', function() {
      $$('html').css('overflow-y', 'auto');
      $$('body').addClass('drawer-overlay-none');
  });
})();

/* smooth scroll */
(function() {
  $$(document).ready(function () {
    smoothScroll.init({
      selector: 'a',
      offset: 60
    });
  });
  $$('.toTop').on('click', function () {
    $$('button#toTop').trigger('click');
  });
})();

/* aboutme dialog */
(function() {
  $$(document).on('open.mdui.collapse', 'div.mdui-collapse-item', function() {
      $$(this).addClass('hide-more');
      $$(this).removeClass('hide-less');
  });
  $$(document).on('close.mdui.collapse', 'div.mdui-collapse-item', function() {
    $$(this).removeClass('hide-more');
    $$(this).addClass('hide-less');
  });
  var cardFlag = false;
  $$('div#aboutmeDialog').on('scroll', function() {
    if (!cardFlag && $$('div#cardLocation').position().top < 0) {
      $$('div#aboutmeAppbar').addClass('style-fix');
      cardFlag = true;
    } else if (cardFlag && $$('div#cardLocation').position().top >= 0) {
      $$('div#aboutmeAppbar').removeClass('style-fix');
      cardFlag = false;
    };
  });
  $$(document).on('open.mdui.dialog', 'div#aboutmeDialog', function() {
    if (!cardFlag && $$('div#cardLocation').position().top < 0) {
      $$('div#aboutmeAppbar').addClass('style-fix');
      cardFlag = true;
    };
  });
  $$(document).on('close.mdui.dialog', 'div#aboutmeDialog', function() {
    if (cardFlag && $$('div#cardLocation').position().top < 0) {
      $$('div#aboutmeAppbar').removeClass('style-fix');
      cardFlag = false;
    };
  });
})();

/* drawer */
(function() {
  $$(document).on('open.mdui.drawer', '#drawer', function() {
      $$('html').css('overflow-y', 'hidden');
  });
  $$(document).on('close.mdui.drawer', '#drawer', function() {
      $$('html').css('overflow-y', 'auto');
  });
})();

/* fab */
(function() {
  var pageFlag = false;
  var fab = new mdui.Fab('#toTop');
  fab.hide();
  $$(window).on('scroll', function() {
    var bodyTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var pageLocation = $$('div#top').offset().top - bodyTop;
    if (!pageFlag && pageLocation < 0) {
      fab.show();
      pageFlag = true;
    } else if (pageFlag && pageLocation >= 0) {
      fab.hide();
      pageFlag = false;
    }
  });
})();

/* mdui v0.2.0 from Line 1 to Line 5340
 * Light Gallery from Line 5342 to Line 6945
 * lg hash from Line 6947 to Line 7042
 * lg zoom from Line 7045 to Line 7612
 * lg fullscreen from Line 7614 to Line 7738
 * lg video from Line 7740 to Line 8058
 * lg autoplay from Line 8060to Line 8275
 * smooth scroll v11.02 from Line 8277 to Line 8877
 * es6 promise from Line 8879 to Line 10036
 * fetch.js from Line 10038 to Line 10419
 * Theme script from Line 10421 to the end
*/
