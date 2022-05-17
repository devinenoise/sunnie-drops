window.theme = window.theme || {};
window.slate = window.slate || {};

/* ================ VENDORS ================ */
/* Simple jQuery Equal Heights @version 1.5.1. Copyright (c) 2013 Matt Banks. Dual licensed under the MIT and GPL licenses. */
!(function (a) {
  (a.fn.equalHeights = function () {
    var b = 0,
      c = a(this);
    return (
      c.each(function () {
        var c = a(this).innerHeight();
        c > b && (b = c);
      }),
      c.css('height', b)
    );
  }),
    a('[data-equal]').each(function () {
      var b = a(this),
        c = b.data('equal');
      b.find(c).equalHeights();
    });
})(jQuery);

/*!
 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!(function (a, b, c) {
  var d = window.matchMedia;
  'undefined' != typeof module && module.exports
    ? (module.exports = c(d))
    : 'function' == typeof define && define.amd
    ? define(function () {
        return (b[a] = c(d));
      })
    : (b[a] = c(d));
})('enquire', this, function (a) {
  'use strict';
  function b(a, b) {
    var c,
      d = 0,
      e = a.length;
    for (d; e > d && ((c = b(a[d], d)), c !== !1); d++);
  }
  function c(a) {
    return '[object Array]' === Object.prototype.toString.apply(a);
  }
  function d(a) {
    return 'function' == typeof a;
  }
  function e(a) {
    (this.options = a), !a.deferSetup && this.setup();
  }
  function f(b, c) {
    (this.query = b),
      (this.isUnconditional = c),
      (this.handlers = []),
      (this.mql = a(b));
    var d = this;
    (this.listener = function (a) {
      (d.mql = a), d.assess();
    }),
      this.mql.addListener(this.listener);
  }
  function g() {
    if (!a)
      throw new Error(
        'matchMedia not present, legacy browsers require a polyfill'
      );
    (this.queries = {}), (this.browserIsIncapable = !a('only all').matches);
  }
  return (
    (e.prototype = {
      setup: function () {
        this.options.setup && this.options.setup(), (this.initialised = !0);
      },
      on: function () {
        !this.initialised && this.setup(),
          this.options.match && this.options.match();
      },
      off: function () {
        this.options.unmatch && this.options.unmatch();
      },
      destroy: function () {
        this.options.destroy ? this.options.destroy() : this.off();
      },
      equals: function (a) {
        return this.options === a || this.options.match === a;
      }
    }),
    (f.prototype = {
      addHandler: function (a) {
        var b = new e(a);
        this.handlers.push(b), this.matches() && b.on();
      },
      removeHandler: function (a) {
        var c = this.handlers;
        b(c, function (b, d) {
          return b.equals(a) ? (b.destroy(), !c.splice(d, 1)) : void 0;
        });
      },
      matches: function () {
        return this.mql.matches || this.isUnconditional;
      },
      clear: function () {
        b(this.handlers, function (a) {
          a.destroy();
        }),
          this.mql.removeListener(this.listener),
          (this.handlers.length = 0);
      },
      assess: function () {
        var a = this.matches() ? 'on' : 'off';
        b(this.handlers, function (b) {
          b[a]();
        });
      }
    }),
    (g.prototype = {
      register: function (a, e, g) {
        var h = this.queries,
          i = g && this.browserIsIncapable;
        return (
          h[a] || (h[a] = new f(a, i)),
          d(e) && (e = { match: e }),
          c(e) || (e = [e]),
          b(e, function (b) {
            d(b) && (b = { match: b }), h[a].addHandler(b);
          }),
          this
        );
      },
      unregister: function (a, b) {
        var c = this.queries[a];
        return (
          c && (b ? c.removeHandler(b) : (c.clear(), delete this.queries[a])),
          this
        );
      }
    }),
    new g()
  );
});

/*! Magnific Popup - v1.0.0 - 2015-03-30
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2015 Dmitry Semenov; */
!(function (a) {
  'function' == typeof define && define.amd
    ? define(['jquery'], a)
    : a(
        'object' == typeof exports
          ? require('jquery')
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = 'Close',
    i = 'BeforeClose',
    j = 'AfterClose',
    k = 'BeforeAppend',
    l = 'MarkupParse',
    m = 'Open',
    n = 'Change',
    o = 'mfp',
    p = '.' + o,
    q = 'mfp-ready',
    r = 'mfp-removing',
    s = 'mfp-prevent-close',
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement('div');
      return (
        (f.className = 'mfp-' + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace('%title%', b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement('p').style,
        b = ['ms', 'O', 'Moz', 'Webkit'];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + 'Transition' in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isIE7 = -1 !== c.indexOf('MSIE 7.')),
        (b.isIE8 = -1 !== c.indexOf('MSIE 8.')),
        (b.isLowIE = b.isIE7 || b.isIE8),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ''),
        (b.ev = c.mainEl && c.mainEl.length ? c.mainEl.eq(0) : d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          'auto' === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x('bg').on('click' + p, function () {
            b.close();
          })),
          (b.wrap = x('wrap')
            .attr('tabindex', -1)
            .on('click' + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x('container', b.wrap))),
        (b.contentContainer = x('content')),
        b.st.preloader &&
          (b.preloader = x('preloader', b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b['init' + j].call(b);
      }
      y('BeforeOpen'),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += ' mfp-close-btn-in'))
            : b.wrap.append(z())),
        b.st.alignTop && (f += ' mfp-align-top'),
        b.wrap.css(
          b.fixedContentPos
            ? {
                overflow: b.st.overflowY,
                overflowX: 'hidden',
                overflowY: b.st.overflowY
              }
            : { top: v.scrollTop(), position: 'absolute' }
        ),
        (b.st.fixedBgPos === !1 ||
          ('auto' === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: 'absolute' }),
        b.st.enableEscapeKey &&
          d.on('keyup' + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on('resize' + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += ' mfp-auto-cursor'),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a('body, html').css('overflow', 'hidden')
          : (n.overflow = 'hidden'));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += ' mfp-ie7'),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y('BuildControls'),
        a('html').css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on('focusin' + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + ' ' + q + ' ';
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + ' '),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: '' };
        b.isIE7 ? a('body, html').css('overflow', '') : (e.overflow = ''),
          a('html').css(e);
      }
      d.off('keyup' + p + ' focusin' + p),
        b.ev.off(p),
        b.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
        b.bgOverlay.attr('class', 'mfp-bg'),
        b.container.attr('class', 'mfp-container'),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css('height', d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css('height', b.wH), y('Resize');
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y('BeforeChange', [b.currItem ? b.currItem.type : '', d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y('FirstMarkupParse', f), (b.currTemplate[d] = f ? a(f) : !0);
      }
      e && e !== c.type && b.container.removeClass('mfp-' + e + '-holder');
      var g = b['get' + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y('AfterChange');
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find('.mfp-close').length || b.content.append(z())
            : (b.content = a)
          : (b.content = ''),
        y(k),
        b.container.addClass('mfp-' + c + '-holder'),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass('mfp-' + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr('data-mfp-src')),
          e.src || (e.src = e.el.attr('href'));
      }
      return (
        (e.type = d || b.st.type || 'inline'),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y('ElementParse', e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = 'click.magnificPopup';
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (f || (2 !== c.which && !c.ctrlKey && !c.metaKey)) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass('mfp-s-' + c),
          d || 'loading' !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y('UpdateStatus', e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find('a').on('click', function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass('mfp-s-' + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass('mfp-close') ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (a, c) {
          if (void 0 === c || c === !1) return !0;
          if (((e = a.split('_')), e.length > 1)) {
            var d = b.find(p + '-' + e[0]);
            if (d.length > 0) {
              var f = e[1];
              'replaceWith' === f
                ? d[0] !== c[0] && d.replaceWith(c)
                : 'img' === f
                ? d.is('img')
                  ? d.attr('src', c)
                  : d.replaceWith(
                      '<img src="' + c + '" class="' + d.attr('class') + '" />'
                    )
                : d.attr(e[1], c);
            }
          } else b.find(p + '-' + a).html(c);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement('div');
        (a.style.cssText =
          'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    }
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: '',
        preloader: !0,
        focus: '',
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: 'auto',
        fixedBgPos: 'auto',
        overflowY: 'auto',
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&times;</button>',
        tClose: 'Close (Esc)',
        tLoading: 'Loading...'
      }
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ('string' == typeof c)
        if ('open' === c) {
          var e,
            f = u ? d.data('magnificPopup') : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data('magnificPopup', c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = 'inline',
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: 'hide',
      markup: '',
      tNotFound: 'Content not found'
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + '.' + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = 'mfp-' + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus('ready');
          } else b.updateStatus('error', e.tNotFound), (f = a('<div>'));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus('ready'), b._parseMarkup(d, {}, c), d;
      }
    }
  });
  var H,
    I = 'ajax',
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: 'mfp-ajax-cur',
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + '.' + I, K),
          w('BeforeChange.' + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus('loading');
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y('ParseAjax', g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus('ready'),
                y('AjaxContentAdded');
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  'error',
                  b.st.ajax.tError.replace('%url%', c.src)
                );
            }
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), '';
      }
    }
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || '';
      }
      return '';
    };
  a.magnificPopup.registerModule('image', {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'title',
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = '.image';
        b.types.push('image'),
          w(m + d, function () {
            'image' === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off('resize' + p);
          }),
          w('Resize' + d, b.resizeImage),
          b.isLowIE && w('AfterChange', b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css('padding-top'), 10) +
              parseInt(a.img.css('padding-bottom'), 10)),
            a.img.css('max-height', b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y('ImageHasSize', a),
          a.imgHidden &&
            (b.content && b.content.removeClass('mfp-loading'),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off('.mfploader'),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus('ready')),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y('ImageLoadComplete'))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off('.mfploader'),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus('error', h.tError.replace('%url%', c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find('.mfp-img');
        if (i.length) {
          var j = document.createElement('img');
          (j.className = 'mfp-img'),
            c.el &&
              c.el.find('img').length &&
              (j.alt = c.el.find('img').attr('alt')),
            (c.img = a(j).on('load.mfploader', f).on('error.mfploader', g)),
            (j.src = c.src),
            i.is('img') && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass('mfp-loading'),
                  b.updateStatus('error', h.tError.replace('%url%', c.src)))
                : (d.removeClass('mfp-loading'), b.updateStatus('ready')),
              d)
            : (b.updateStatus('loading'),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass('mfp-loading'),
                b.findImageSize(c)),
              d)
        );
      }
    }
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement('p').style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule('zoom', {
    options: {
      enabled: !1,
      easing: 'ease-in-out',
      duration: 300,
      opener: function (a) {
        return a.is('img') ? a : a.find('img');
      }
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = '.zoom';
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr('style')
                  .removeAttr('class')
                  .addClass('mfp-animated-image'),
                d = 'all ' + c.duration / 1e3 + 's ' + c.easing,
                e = {
                  position: 'fixed',
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  '-webkit-backface-visibility': 'hidden'
                },
                f = 'transition';
              return (
                (e['-webkit-' + f] = e['-moz-' + f] = e['-o-' + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css('visibility', 'visible');
            };
          w('BuildControls' + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css('visibility', 'hidden'),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y('ZoomAnimationEnded');
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css('visibility', 'hidden'),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return 'image' === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css('padding-top'), 10),
          g = parseInt(d.css('padding-bottom'), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
        };
        return (
          O()
            ? (h['-moz-transform'] = h.transform =
                'translate(' + e.left + 'px,' + e.top + 'px)')
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      }
    }
  });
  var P = 'iframe',
    Q = '//about:blank',
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find('iframe');
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css('display', a ? 'block' : 'none'));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: 'iframe_src',
      patterns: {
        youtube: {
          index: 'youtube.com',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?autoplay=1'
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1'
        },
        gmaps: { index: '//maps.google.', src: '%id%&output=embed' }
      }
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w('BeforeChange', function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + '.' + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  'string' == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace('%id%', e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus('ready'),
          d
        );
      }
    }
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule('gallery', {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)',
      tCounter: '%curr% of %total%'
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = '.mfp-gallery',
          g = Boolean(a.fn.mfpFastClick);
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += ' mfp-gallery'),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on('click' + e, '.mfp-img', function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on('keydown' + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w('UpdateStatus' + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : '';
              }),
              w('BuildControls' + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, 'left')
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, 'right')
                    ).addClass(s)),
                    h = g ? 'mfpFastClick' : 'click';
                  e[h](function () {
                    b.prev();
                  }),
                    f[h](function () {
                      b.next();
                    }),
                    b.isIE7 &&
                      (x('b', e[0], !1, !0),
                      x('a', e[0], !1, !0),
                      x('b', f[0], !1, !0),
                      x('a', f[0], !1, !0)),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off('click' + e),
                  b.arrowLeft &&
                    g &&
                    b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y('LazyLoad', d),
            'image' === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on('load.mfploader', function () {
                  d.hasSize = !0;
                })
                .on('error.mfploader', function () {
                  (d.hasSize = !0), (d.loadError = !0), y('LazyLoadError', d);
                })
                .attr('src', d.src)),
            (d.preloaded = !0);
        }
      }
    }
  });
  var U = 'retina';
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return '@2x' + a;
        });
      },
      ratio: 1
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w('ImageHasSize.' + U, function (a, b) {
                b.img.css({
                  'max-width': b.img[0].naturalWidth / c,
                  width: '100%'
                });
              }),
              w('ElementParse.' + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      }
    }
  }),
    (function () {
      var b = 1e3,
        c = 'ontouchstart' in window,
        d = function () {
          v.off('touchmove' + f + ' touchend' + f);
        },
        e = 'mfpFastClick',
        f = '.' + e;
      (a.fn.mfpFastClick = function (e) {
        return a(this).each(function () {
          var g,
            h = a(this);
          if (c) {
            var i, j, k, l, m, n;
            h.on('touchstart' + f, function (a) {
              (l = !1),
                (n = 1),
                (m = a.originalEvent
                  ? a.originalEvent.touches[0]
                  : a.touches[0]),
                (j = m.clientX),
                (k = m.clientY),
                v
                  .on('touchmove' + f, function (a) {
                    (m = a.originalEvent ? a.originalEvent.touches : a.touches),
                      (n = m.length),
                      (m = m[0]),
                      (Math.abs(m.clientX - j) > 10 ||
                        Math.abs(m.clientY - k) > 10) &&
                        ((l = !0), d());
                  })
                  .on('touchend' + f, function (a) {
                    d(),
                      l ||
                        n > 1 ||
                        ((g = !0),
                        a.preventDefault(),
                        clearTimeout(i),
                        (i = setTimeout(function () {
                          g = !1;
                        }, b)),
                        e());
                  });
            });
          }
          h.on('click' + f, function () {
            g || e();
          });
        });
      }),
        (a.fn.destroyMfpFastClick = function () {
          a(this).off('touchstart' + f + ' click' + f),
            c && v.off('touchmove' + f + ' touchend' + f);
        });
    })(),
    A();
});
/*
 * ScrollToFixed
 * https://github.com/bigspotteddog/ScrollToFixed
 *
 * Copyright (c) 2011 Joseph Cava-Lynch
 * MIT license
 */
(function (a) {
  a.isScrollToFixed = function (b) {
    return !!a(b).data('ScrollToFixed');
  };
  a.ScrollToFixed = function (d, i) {
    var l = this;
    l.$el = a(d);
    l.el = d;
    l.$el.data('ScrollToFixed', l);
    var c = false;
    var G = l.$el;
    var H;
    var E;
    var e;
    var y;
    var D = 0;
    var q = 0;
    var j = -1;
    var f = -1;
    var t = null;
    var z;
    var g;
    function u() {
      G.trigger('preUnfixed.ScrollToFixed');
      k();
      G.trigger('unfixed.ScrollToFixed');
      f = -1;
      D = G.offset().top;
      q = G.offset().left;
      if (l.options.offsets) {
        q += G.offset().left - G.position().left;
      }
      if (j == -1) {
        j = q;
      }
      H = G.css('position');
      c = true;
      if (l.options.bottom != -1) {
        G.trigger('preFixed.ScrollToFixed');
        w();
        G.trigger('fixed.ScrollToFixed');
      }
    }
    function n() {
      var I = l.options.limit;
      if (!I) {
        return 0;
      }
      if (typeof I === 'function') {
        return I.apply(G);
      }
      return I;
    }
    function p() {
      return H === 'fixed';
    }
    function x() {
      return H === 'absolute';
    }
    function h() {
      return !(p() || x());
    }
    function w() {
      if (!p()) {
        t.css({
          display: G.css('display'),
          width: G.outerWidth(true),
          height: G.outerHeight(true),
          float: G.css('float')
        });
        cssOptions = {
          'z-index': l.options.zIndex,
          position: 'fixed',
          top: l.options.bottom == -1 ? s() : '',
          bottom: l.options.bottom == -1 ? '' : l.options.bottom,
          'margin-left': '0px'
        };
        if (!l.options.dontSetWidth) {
          cssOptions.width = G.width();
        }
        G.css(cssOptions);
        G.addClass(l.options.baseClassName);
        if (l.options.className) {
          G.addClass(l.options.className);
        }
        H = 'fixed';
      }
    }
    function b() {
      var J = n();
      var I = q;
      if (l.options.removeOffsets) {
        I = '';
        J = J - D;
      }
      cssOptions = {
        position: 'absolute',
        top: J,
        left: I,
        'margin-left': '0px',
        bottom: ''
      };
      if (!l.options.dontSetWidth) {
        cssOptions.width = G.width();
      }
      G.css(cssOptions);
      H = 'absolute';
    }
    function k() {
      if (!h()) {
        f = -1;
        t.css('display', 'none');
        G.css({
          'z-index': y,
          width: '',
          position: E,
          left: '',
          top: e,
          'margin-left': ''
        });
        G.removeClass('scroll-to-fixed-fixed');
        if (l.options.className) {
          G.removeClass(l.options.className);
        }
        H = null;
      }
    }
    function v(I) {
      if (I != f) {
        G.css('left', q - I);
        f = I;
      }
    }
    function s() {
      var I = l.options.marginTop;
      if (!I) {
        return 0;
      }
      if (typeof I === 'function') {
        return I.apply(G);
      }
      return I;
    }
    function A() {
      if (!a.isScrollToFixed(G)) {
        return;
      }
      var K = c;
      if (!c) {
        u();
      } else {
        if (h()) {
          D = G.offset().top;
          q = G.offset().left;
        }
      }
      var I = a(window).scrollLeft();
      var L = a(window).scrollTop();
      var J = n();
      if (l.options.minWidth && a(window).width() < l.options.minWidth) {
        if (!h() || !K) {
          o();
          G.trigger('preUnfixed.ScrollToFixed');
          k();
          G.trigger('unfixed.ScrollToFixed');
        }
      } else {
        if (l.options.maxWidth && a(window).width() > l.options.maxWidth) {
          if (!h() || !K) {
            o();
            G.trigger('preUnfixed.ScrollToFixed');
            k();
            G.trigger('unfixed.ScrollToFixed');
          }
        } else {
          if (l.options.bottom == -1) {
            if (J > 0 && L >= J - s()) {
              if (!x() || !K) {
                o();
                G.trigger('preAbsolute.ScrollToFixed');
                b();
                G.trigger('unfixed.ScrollToFixed');
              }
            } else {
              if (L >= D - s()) {
                if (!p() || !K) {
                  o();
                  G.trigger('preFixed.ScrollToFixed');
                  w();
                  f = -1;
                  G.trigger('fixed.ScrollToFixed');
                }
                v(I);
              } else {
                if (!h() || !K) {
                  o();
                  G.trigger('preUnfixed.ScrollToFixed');
                  k();
                  G.trigger('unfixed.ScrollToFixed');
                }
              }
            }
          } else {
            if (J > 0) {
              if (
                L + a(window).height() - G.outerHeight(true) >=
                J - (s() || -m())
              ) {
                if (p()) {
                  o();
                  G.trigger('preUnfixed.ScrollToFixed');
                  if (E === 'absolute') {
                    b();
                  } else {
                    k();
                  }
                  G.trigger('unfixed.ScrollToFixed');
                }
              } else {
                if (!p()) {
                  o();
                  G.trigger('preFixed.ScrollToFixed');
                  w();
                }
                v(I);
                G.trigger('fixed.ScrollToFixed');
              }
            } else {
              v(I);
            }
          }
        }
      }
    }
    function m() {
      if (!l.options.bottom) {
        return 0;
      }
      return l.options.bottom;
    }
    function o() {
      var I = G.css('position');
      if (I == 'absolute') {
        G.trigger('postAbsolute.ScrollToFixed');
      } else {
        if (I == 'fixed') {
          G.trigger('postFixed.ScrollToFixed');
        } else {
          G.trigger('postUnfixed.ScrollToFixed');
        }
      }
    }
    var C = function (I) {
      if (G.is(':visible')) {
        c = false;
        A();
      }
    };
    var F = function (I) {
      !!window.requestAnimationFrame ? requestAnimationFrame(A) : A();
    };
    var B = function () {
      var J = document.body;
      if (document.createElement && J && J.appendChild && J.removeChild) {
        var L = document.createElement('div');
        if (!L.getBoundingClientRect) {
          return null;
        }
        L.innerHTML = 'x';
        L.style.cssText = 'position:fixed;top:100px;';
        J.appendChild(L);
        var M = J.style.height,
          N = J.scrollTop;
        J.style.height = '3000px';
        J.scrollTop = 500;
        var I = L.getBoundingClientRect().top;
        J.style.height = M;
        var K = I === 100;
        J.removeChild(L);
        J.scrollTop = N;
        return K;
      }
      return null;
    };
    var r = function (I) {
      I = I || window.event;
      if (I.preventDefault) {
        I.preventDefault();
      }
      I.returnValue = false;
    };
    l.init = function () {
      l.options = a.extend({}, a.ScrollToFixed.defaultOptions, i);
      y = G.css('z-index');
      l.$el.css('z-index', l.options.zIndex);
      t = a('<div />');
      H = G.css('position');
      E = G.css('position');
      e = G.css('top');
      if (h()) {
        l.$el.after(t);
      }
      a(window).bind('resize.ScrollToFixed', C);
      a(window).bind('scroll.ScrollToFixed', F);
      if ('ontouchmove' in window) {
        a(window).bind('touchmove.ScrollToFixed', A);
      }
      if (l.options.preFixed) {
        G.bind('preFixed.ScrollToFixed', l.options.preFixed);
      }
      if (l.options.postFixed) {
        G.bind('postFixed.ScrollToFixed', l.options.postFixed);
      }
      if (l.options.preUnfixed) {
        G.bind('preUnfixed.ScrollToFixed', l.options.preUnfixed);
      }
      if (l.options.postUnfixed) {
        G.bind('postUnfixed.ScrollToFixed', l.options.postUnfixed);
      }
      if (l.options.preAbsolute) {
        G.bind('preAbsolute.ScrollToFixed', l.options.preAbsolute);
      }
      if (l.options.postAbsolute) {
        G.bind('postAbsolute.ScrollToFixed', l.options.postAbsolute);
      }
      if (l.options.fixed) {
        G.bind('fixed.ScrollToFixed', l.options.fixed);
      }
      if (l.options.unfixed) {
        G.bind('unfixed.ScrollToFixed', l.options.unfixed);
      }
      if (l.options.spacerClass) {
        t.addClass(l.options.spacerClass);
      }
      G.bind('resize.ScrollToFixed', function () {
        t.height(G.height());
      });
      G.bind('scroll.ScrollToFixed', function () {
        G.trigger('preUnfixed.ScrollToFixed');
        k();
        G.trigger('unfixed.ScrollToFixed');
        A();
      });
      G.bind('detach.ScrollToFixed', function (I) {
        r(I);
        G.trigger('preUnfixed.ScrollToFixed');
        k();
        G.trigger('unfixed.ScrollToFixed');
        a(window).unbind('resize.ScrollToFixed', C);
        a(window).unbind('scroll.ScrollToFixed', F);
        G.unbind('.ScrollToFixed');
        t.remove();
        l.$el.removeData('ScrollToFixed');
      });
      C();
    };
    l.init();
  };
  a.ScrollToFixed.defaultOptions = {
    marginTop: 0,
    limit: 0,
    bottom: -1,
    zIndex: 1000,
    baseClassName: 'scroll-to-fixed-fixed'
  };
  a.fn.scrollToFixed = function (b) {
    return this.each(function () {
      new a.ScrollToFixed(this, b);
    });
  };
})(jQuery);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

!(function (i) {
  'use strict';
  'function' == typeof define && define.amd
    ? define(['jquery'], i)
    : 'undefined' != typeof exports
    ? (module.exports = i(require('jquery')))
    : i(jQuery);
})(function (i) {
  'use strict';
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: 'slick-dots',
        draggable: !0,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = 'hidden'),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = 'visibilitychange'),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data('slick') || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = 'mozHidden'),
            (n.visibilityChange = 'mozvisibilitychange'))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = 'webkitHidden'),
            (n.visibilityChange = 'webkitvisibilitychange')),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find('.slick-active')
      .attr({ 'aria-hidden': 'false' })
      .find('a, input, button, select')
      .attr({ tabindex: '0' });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ('boolean' == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          'number' == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr('data-slick-index', e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = 'translate(' + i + 'px, 0px)'),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = 'translate(0px,' + i + 'px)'),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                }
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = 'translate3d(' + e + 'px, 0px, 0px)')
              : (o[s.animType] = 'translate3d(0px,' + e + 'px, 0px)'),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        'object' == typeof t &&
        t.each(function () {
          var t = i(this).slick('getSlick');
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + ' ' + e.options.speed + 'ms ' + e.options.cssEase)
        : (t[e.transitionType] =
            'opacity ' + e.options.speed + 'ms ' + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass('slick-arrow')),
        (e.$nextArrow = i(e.options.nextArrow).addClass('slick-arrow')),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass('slick-hidden')
              .removeAttr('aria-hidden tabindex'),
            e.$nextArrow
              .removeClass('slick-hidden')
              .removeAttr('aria-hidden tabindex'),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass('slick-disabled')
                .attr('aria-disabled', 'true'))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass('slick-hidden')
              .attr({ 'aria-disabled': 'true', tabindex: '-1' }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass('slick-dotted'),
            t = i('<ul />').addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i('<li />').append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find('li').first().addClass('slick-active');
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ':not(.slick-cloned)')
        .addClass('slick-slide')),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr('data-slick-index', e)
            .data('originalStyling', i(t).attr('style') || '');
        }),
        e.$slider.addClass('slick-slider'),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css('opacity', 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i('img[data-lazy]', e.$slider).not('[src]').addClass('slick-loading'),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          'number' == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass('draggable');
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement('div');
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement('div');
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + '%',
              display: 'inline-block'
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ('window' === r.respondTo
          ? (n = a)
          : 'slider' === r.respondTo
          ? (n = d)
          : 'min' === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              'unslick' === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              'unslick' === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger('breakpoint', [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is('a') && e.preventDefault(),
        l.is('li') || (l = l.closest('li')),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case 'previous':
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case 'next':
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case 'index':
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger('focus');
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i('li', e.$dots)
          .off('click.slick', e.changeSlide)
          .off('mouseenter.slick', i.proxy(e.interrupt, e, !0))
          .off('mouseleave.slick', i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off('keydown.slick', e.keyHandler)),
        e.$slider.off('focus.slick blur.slick'),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off('click.slick', e.changeSlide),
          e.$nextArrow && e.$nextArrow.off('click.slick', e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off('keydown.slick', e.keyHandler),
            e.$nextArrow && e.$nextArrow.off('keydown.slick', e.keyHandler))),
        e.$list.off('touchstart.slick mousedown.slick', e.swipeHandler),
        e.$list.off('touchmove.slick mousemove.slick', e.swipeHandler),
        e.$list.off('touchend.slick mouseup.slick', e.swipeHandler),
        e.$list.off('touchcancel.slick mouseleave.slick', e.swipeHandler),
        e.$list.off('click.slick', e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off('keydown.slick', e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off('click.slick', e.selectHandler),
        i(window).off(
          'orientationchange.slick.slick-' + e.instanceUid,
          e.orientationChange
        ),
        i(window).off('resize.slick.slick-' + e.instanceUid, e.resize),
        i('[draggable!=true]', e.$slideTrack).off(
          'dragstart',
          e.preventDefault
        ),
        i(window).off('load.slick.slick-' + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off('mouseenter.slick', i.proxy(e.interrupt, e, !0)),
        e.$list.off('mouseleave.slick', i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr('style'),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i('.slick-cloned', t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass('slick-disabled slick-arrow slick-hidden')
            .removeAttr('aria-hidden aria-disabled tabindex')
            .css('display', ''),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass('slick-disabled slick-arrow slick-hidden')
            .removeAttr('aria-hidden aria-disabled tabindex')
            .css('display', ''),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              'slick-slide slick-active slick-center slick-visible slick-current'
            )
            .removeAttr('aria-hidden')
            .removeAttr('data-slick-index')
            .each(function () {
              i(this).attr('style', i(this).data('originalStyling'));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass('slick-slider'),
        t.$slider.removeClass('slick-initialized'),
        t.$slider.removeClass('slick-dotted'),
        (t.unslicked = !0),
        e || t.$slider.trigger('destroy', [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ''),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off('focus.slick blur.slick')
        .on('focus.slick blur.slick', '*', function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(':focus')), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children('.slick-slide').eq(i)
              : n.$slideTrack
                  .children('.slick-slide')
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children('.slick-slide').eq(i)
                : n.$slideTrack
                    .children('.slick-slide')
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find('.slick-slide').each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1;
            }),
            Math.abs(i(e).attr('data-slick-index') - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: 'index', index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass('slick-initialized') ||
        (i(t.$slider).addClass('slick-initialized'),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger('init', [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find('.slick-cloned'))
        .attr({ 'aria-hidden': 'true', tabindex: '-1' })
        .find('a, input, button, select')
        .attr({ tabindex: '-1' }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find('.slick-cloned'))
            .each(function (t) {
              var s = o.indexOf(t);
              i(this).attr({
                role: 'tabpanel',
                id: 'slick-slide' + e.instanceUid + t,
                tabindex: -1
              }),
                -1 !== s &&
                  i(this).attr({
                    'aria-describedby':
                      'slick-slide-control' + e.instanceUid + s
                  });
            }),
          e.$dots
            .attr('role', 'tablist')
            .find('li')
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: 'presentation' }),
                i(this)
                  .find('button')
                  .first()
                  .attr({
                    role: 'tab',
                    id: 'slick-slide-control' + e.instanceUid + s,
                    'aria-controls': 'slick-slide' + e.instanceUid + n,
                    'aria-label': s + 1 + ' of ' + t,
                    'aria-selected': null,
                    tabindex: '-1'
                  });
            })
            .eq(e.currentSlide)
            .find('button')
            .attr({ 'aria-selected': 'true', tabindex: '0' })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr('tabindex', 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off('click.slick')
          .on('click.slick', { message: 'previous' }, i.changeSlide),
        i.$nextArrow
          .off('click.slick')
          .on('click.slick', { message: 'next' }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on('keydown.slick', i.keyHandler),
          i.$nextArrow.on('keydown.slick', i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (i('li', e.$dots).on(
          'click.slick',
          { message: 'index' },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on('keydown.slick', e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i('li', e.$dots)
            .on('mouseenter.slick', i.proxy(e.interrupt, e, !0))
            .on('mouseleave.slick', i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on('mouseenter.slick', i.proxy(e.interrupt, e, !0)),
        e.$list.on('mouseleave.slick', i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          'touchstart.slick mousedown.slick',
          { action: 'start' },
          e.swipeHandler
        ),
        e.$list.on(
          'touchmove.slick mousemove.slick',
          { action: 'move' },
          e.swipeHandler
        ),
        e.$list.on(
          'touchend.slick mouseup.slick',
          { action: 'end' },
          e.swipeHandler
        ),
        e.$list.on(
          'touchcancel.slick mouseleave.slick',
          { action: 'end' },
          e.swipeHandler
        ),
        e.$list.on('click.slick', e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on('keydown.slick', e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on('click.slick', e.selectHandler),
        i(window).on(
          'orientationchange.slick.slick-' + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          'resize.slick.slick-' + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i('[draggable!=true]', e.$slideTrack).on('dragstart', e.preventDefault),
        i(window).on('load.slick.slick-' + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match('TEXTAREA|INPUT|SELECT') ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? 'next' : 'previous' }
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? 'previous' : 'next' }
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i('img[data-lazy]', e).each(function () {
          var e = i(this),
            t = i(this).attr('data-lazy'),
            o = i(this).attr('data-srcset'),
            s = i(this).attr('data-sizes') || n.$slider.attr('data-sizes'),
            r = document.createElement('img');
          (r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr('srcset', o), s && e.attr('sizes', s)),
                e.attr('src', t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr('data-lazy data-srcset data-sizes').removeClass(
                    'slick-loading'
                  );
                }),
                n.$slider.trigger('lazyLoaded', [n, e, t]);
            });
          }),
            (r.onerror = function () {
              e
                .removeAttr('data-lazy')
                .removeClass('slick-loading')
                .addClass('slick-lazyload-error'),
                n.$slider.trigger('lazyLoadError', [n, e, t]);
            }),
            (r.src = t);
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find('.slick-slide').slice(o, s)),
        'anticipated' === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find('.slick-slide'), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++;
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find('.slick-slide'))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find('.slick-cloned').slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider.find('.slick-cloned').slice(-1 * n.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass('slick-loading'),
        i.initUI(),
        'progressive' === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: 'next' } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger('afterChange', [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr('tabindex', 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: 'previous' } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i('img[data-lazy]', l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr('data-lazy')),
          (s = t.attr('data-srcset')),
          (n = t.attr('data-sizes') || l.$slider.attr('data-sizes')),
          ((r = document.createElement('img')).onload = function () {
            s && (t.attr('srcset', s), n && t.attr('sizes', n)),
              t
                .attr('src', o)
                .removeAttr('data-lazy data-srcset data-sizes')
                .removeClass('slick-loading'),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger('lazyLoaded', [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr('data-lazy')
                  .removeClass('slick-loading')
                  .addClass('slick-lazyload-error'),
                l.$slider.trigger('lazyLoadError', [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger('allImagesLoaded', [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: 'index', index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ('array' === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || 'window';
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass('slick-slide')),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on('click.slick', e.selectHandler),
        e.setSlideClasses(
          'number' == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger('reInit', [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            'boolean' == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = 'left' == o.positionProp ? Math.ceil(i) + 'px' : '0px'),
        (t = 'top' == o.positionProp ? Math.ceil(i) + 'px' : '0px'),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = 'translate(' + e + ', ' + t + ')'),
                o.$slideTrack.css(s))
              : ((s[o.animType] = 'translate3d(' + e + ', ' + t + ', 0px)'),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: '0px ' + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + ' 0px' })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children('.slick-slide').length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children('.slick-slide').length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children('.slick-slide').width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: 'relative',
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
              })
            : i(s).css({
                position: 'relative',
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css('height', e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ('object' === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = 'multiple'))
            : 'string' === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              'responsive' === arguments[0] && 'array' === i.type(arguments[1])
                ? (n = 'responsive')
                : void 0 !== arguments[1] && (n = 'single')),
          'single' === n)
        )
          r.options[o] = s;
        else if ('multiple' === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ('responsive' === n)
          for (t in s)
            if ('array' !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger('setPosition', [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? 'top' : 'left'),
        'top' === i.positionProp
          ? i.$slider.addClass('slick-vertical')
          : i.$slider.removeClass('slick-vertical'),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ('number' == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = 'OTransform'),
          (i.transformType = '-o-transform'),
          (i.transitionType = 'OTransition'),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = 'MozTransform'),
          (i.transformType = '-moz-transform'),
          (i.transitionType = 'MozTransition'),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = 'webkitTransform'),
          (i.transformType = '-webkit-transform'),
          (i.transitionType = 'webkitTransition'),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = 'msTransform'),
          (i.transformType = '-ms-transform'),
          (i.transitionType = 'msTransition'),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = 'transform'),
          (i.transformType = 'transform'),
          (i.transitionType = 'transition')),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find('.slick-slide')
          .removeClass('slick-active slick-center slick-current')
          .attr('aria-hidden', 'true')),
        n.$slides.eq(i).addClass('slick-current'),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false')
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false')),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass('slick-center')
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass('slick-center')),
          n.$slides.eq(i).addClass('slick-center');
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass('slick-active')
              .attr('aria-hidden', 'false')
          : t.length <= n.options.slidesToShow
          ? t.addClass('slick-active').attr('aria-hidden', 'false')
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false')
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false'));
      ('ondemand' !== n.options.lazyLoad &&
        'anticipated' !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr('id', '')
              .attr('data-slick-index', t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass('slick-cloned');
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr('id', '')
              .attr('data-slick-index', t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass('slick-cloned');
        s.$slideTrack
          .find('.slick-cloned')
          .find('[id]')
          .each(function () {
            i(this).attr('id', '');
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is('.slick-slide')
          ? i(e.target)
          : i(e.target).parents('.slick-slide'),
        s = parseInt(o.attr('data-slick-index'));
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s);
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger('beforeChange', [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick('getSlick')).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass('slick-loading');
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? 'left'
            : 'right'
          : o <= 360 && o >= 315
          ? !1 === s.options.rtl
            ? 'left'
            : 'right'
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? 'right'
            : 'left'
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? 'down'
            : 'up'
          : 'vertical'
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger('edge', [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case 'left':
          case 'down':
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case 'right':
          case 'up':
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        'vertical' != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger('swipe', [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ('ontouchend' in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf('mouse'))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case 'start':
            e.swipeStart(i);
            break;
          case 'move':
            e.swipeMove(i);
            break;
          case 'end':
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && 'right' === t) ||
                  (l.currentSlide >= l.getDotCount() && 'left' === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1;
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i('.slick-cloned', e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass('slick-slide slick-active slick-visible slick-current')
          .attr('aria-hidden', 'true')
          .css('width', '');
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger('unslick', [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass('slick-disabled')
            .attr('aria-disabled', 'false'),
          i.$nextArrow
            .removeClass('slick-disabled')
            .attr('aria-disabled', 'false'),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass('slick-disabled')
                .attr('aria-disabled', 'true'),
              i.$nextArrow
                .removeClass('slick-disabled')
                .attr('aria-disabled', 'false'))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode
            ? (i.$nextArrow
                .addClass('slick-disabled')
                .attr('aria-disabled', 'true'),
              i.$prevArrow
                .removeClass('slick-disabled')
                .attr('aria-disabled', 'false'))
            : i.currentSlide >= i.slideCount - 1 &&
              !0 === i.options.centerMode &&
              (i.$nextArrow
                .addClass('slick-disabled')
                .attr('aria-disabled', 'true'),
              i.$prevArrow
                .removeClass('slick-disabled')
                .attr('aria-disabled', 'false')));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find('li').removeClass('slick-active').end(),
        i.$dots
          .find('li')
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass('slick-active'));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ('object' == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});

/* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
!(function (a) {
  a.fn.prepareTransition = function () {
    return this.each(function () {
      var b = a(this);
      b.one(
        'TransitionEnd webkitTransitionEnd transitionend oTransitionEnd',
        function () {
          b.removeClass('is-transitioning');
        }
      );
      var c = [
        'transition-duration',
        '-moz-transition-duration',
        '-webkit-transition-duration',
        '-o-transition-duration'
      ];
      var d = 0;
      a.each(c, function (a, c) {
        d = parseFloat(b.css(c)) || d;
      });
      if (d != 0) {
        b.addClass('is-transitioning');
        b[0].offsetWidth;
      }
    });
  };
})(jQuery);

/* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
function replaceUrlParam(e, r, a) {
  var n = new RegExp('(' + r + '=).*?(&|$)'),
    c = e;
  return (c =
    e.search(n) >= 0
      ? e.replace(n, '$1' + a + '$2')
      : c + (c.indexOf('?') > 0 ? '&' : '?') + r + '=' + a);
}

/**
 * @license
 * lodash 4.5.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash core -o ./dist/lodash.core.js`
 */
(function () {
  function n(n, t) {
    for (var r = -1, e = t.length, u = n.length; ++r < e; ) n[u + r] = t[r];
    return n;
  }
  function t(n, t, r) {
    for (var e = -1, u = n.length; ++e < u; ) {
      var o = n[e],
        i = t(o);
      if (null != i && (c === an ? i === i : r(i, c)))
        var c = i,
          f = o;
    }
    return f;
  }
  function r(n, t, r) {
    var e;
    return (
      r(n, function (n, r, u) {
        return t(n, r, u) ? ((e = n), false) : void 0;
      }),
      e
    );
  }
  function e(n, t, r, e, u) {
    return (
      u(n, function (n, u, o) {
        r = e ? ((e = false), n) : t(r, n, u, o);
      }),
      r
    );
  }
  function u(n, t) {
    return O(t, function (t) {
      return n[t];
    });
  }
  function o(n) {
    return n && n.Object === Object ? n : null;
  }
  function i(n) {
    return vn[n];
  }
  function c(n) {
    var t = false;
    if (null != n && typeof n.toString != 'function')
      try {
        t = !!(n + '');
      } catch (r) {}
    return t;
  }
  function f(n, t) {
    return (
      (n = typeof n == 'number' || hn.test(n) ? +n : -1),
      n > -1 && 0 == n % 1 && (null == t ? 9007199254740991 : t) > n
    );
  }
  function a(n) {
    if (Y(n) && !Pn(n)) {
      if (n instanceof l) return n;
      if (En.call(n, '__wrapped__')) {
        var t = new l(n.__wrapped__, n.__chain__);
        return (t.__actions__ = N(n.__actions__)), t;
      }
    }
    return new l(n);
  }
  function l(n, t) {
    (this.__wrapped__ = n), (this.__actions__ = []), (this.__chain__ = !!t);
  }
  function p(n, t, r, e) {
    var u;
    return (
      (u = n === an) ||
        ((u = xn[r]),
        (u = (n === u || (n !== n && u !== u)) && !En.call(e, r))),
      u ? t : n
    );
  }
  function s(n) {
    return X(n) ? Fn(n) : {};
  }
  function h(n, t, r) {
    if (typeof n != 'function') throw new TypeError('Expected a function');
    return setTimeout(function () {
      n.apply(an, r);
    }, t);
  }
  function v(n, t) {
    var r = true;
    return (
      $n(n, function (n, e, u) {
        return (r = !!t(n, e, u));
      }),
      r
    );
  }
  function y(n, t) {
    var r = [];
    return (
      $n(n, function (n, e, u) {
        t(n, e, u) && r.push(n);
      }),
      r
    );
  }
  function _(t, r, e, u) {
    u || (u = []);
    for (var o = -1, i = t.length; ++o < i; ) {
      var c = t[o];
      r > 0 && Y(c) && L(c) && (e || Pn(c) || K(c))
        ? r > 1
          ? _(c, r - 1, e, u)
          : n(u, c)
        : e || (u[u.length] = c);
    }
    return u;
  }
  function g(n, t) {
    return n && qn(n, t, en);
  }
  function b(n, t) {
    return y(t, function (t) {
      return Q(n[t]);
    });
  }
  function j(n, t, r, e, u) {
    return n === t
      ? true
      : null == n || null == t || (!X(n) && !Y(t))
      ? n !== n && t !== t
      : m(n, t, j, r, e, u);
  }
  function m(n, t, r, e, u, o) {
    var i = Pn(n),
      f = Pn(t),
      a = '[object Array]',
      l = '[object Array]';
    i ||
      ((a = kn.call(n)), '[object Arguments]' == a && (a = '[object Object]')),
      f ||
        ((l = kn.call(t)),
        '[object Arguments]' == l && (l = '[object Object]'));
    var p = '[object Object]' == a && !c(n),
      f = '[object Object]' == l && !c(t);
    return !(l = a == l) || i || p
      ? 2 & u ||
        ((a = p && En.call(n, '__wrapped__')),
        (f = f && En.call(t, '__wrapped__')),
        !a && !f)
        ? l
          ? (o || (o = []),
            (a = J(o, function (t) {
              return t[0] === n;
            })) && a[1]
              ? a[1] == t
              : (o.push([n, t]),
                (t = (i ? I : q)(n, t, r, e, u, o)),
                o.pop(),
                t))
          : false
        : r(a ? n.value() : n, f ? t.value() : t, e, u, o)
      : $(n, t, a);
  }
  function d(n) {
    var t = typeof n;
    return 'function' == t ? n : null == n ? cn : ('object' == t ? x : A)(n);
  }
  function w(n) {
    n = null == n ? n : Object(n);
    var t,
      r = [];
    for (t in n) r.push(t);
    return r;
  }
  function O(n, t) {
    var r = -1,
      e = L(n) ? Array(n.length) : [];
    return (
      $n(n, function (n, u, o) {
        e[++r] = t(n, u, o);
      }),
      e
    );
  }
  function x(n) {
    var t = en(n);
    return function (r) {
      var e = t.length;
      if (null == r) return !e;
      for (r = Object(r); e--; ) {
        var u = t[e];
        if (!(u in r && j(n[u], r[u], an, 3))) return false;
      }
      return true;
    };
  }
  function E(n, t) {
    return (
      (n = Object(n)),
      P(
        t,
        function (t, r) {
          return r in n && (t[r] = n[r]), t;
        },
        {}
      )
    );
  }
  function A(n) {
    return function (t) {
      return null == t ? an : t[n];
    };
  }
  function k(n, t, r) {
    var e = -1,
      u = n.length;
    for (
      0 > t && (t = -t > u ? 0 : u + t),
        r = r > u ? u : r,
        0 > r && (r += u),
        u = t > r ? 0 : (r - t) >>> 0,
        t >>>= 0,
        r = Array(u);
      ++e < u;

    )
      r[e] = n[e + t];
    return r;
  }
  function N(n) {
    return k(n, 0, n.length);
  }
  function S(n, t) {
    var r;
    return (
      $n(n, function (n, e, u) {
        return (r = t(n, e, u)), !r;
      }),
      !!r
    );
  }
  function T(t, r) {
    return P(
      r,
      function (t, r) {
        return r.func.apply(r.thisArg, n([t], r.args));
      },
      t
    );
  }
  function F(n, t, r, e) {
    r || (r = {});
    for (var u = -1, o = t.length; ++u < o; ) {
      var i = t[u],
        c = e ? e(r[i], n[i], i, r, n) : n[i],
        f = r,
        a = f[i];
      (En.call(f, i) &&
        (a === c || (a !== a && c !== c)) &&
        (c !== an || i in f)) ||
        (f[i] = c);
    }
    return r;
  }
  function R(n) {
    return V(function (t, r) {
      var e = -1,
        u = r.length,
        o = u > 1 ? r[u - 1] : an,
        o = typeof o == 'function' ? (u--, o) : an;
      for (t = Object(t); ++e < u; ) {
        var i = r[e];
        i && n(t, i, e, o);
      }
      return t;
    });
  }
  function B(n) {
    return function () {
      var t = arguments,
        r = s(n.prototype),
        t = n.apply(r, t);
      return X(t) ? t : r;
    };
  }
  function D(n, t, r) {
    function e() {
      for (
        var o = -1,
          i = arguments.length,
          c = -1,
          f = r.length,
          a = Array(f + i),
          l = this && this !== wn && this instanceof e ? u : n;
        ++c < f;

      )
        a[c] = r[c];
      for (; i--; ) a[c++] = arguments[++o];
      return l.apply(t, a);
    }
    if (typeof n != 'function') throw new TypeError('Expected a function');
    var u = B(n);
    return e;
  }
  function I(n, t, r, e, u, o) {
    var i = -1,
      c = 1 & u,
      f = n.length,
      a = t.length;
    if (f != a && !(2 & u && a > f)) return false;
    for (a = true; ++i < f; ) {
      var l = n[i],
        p = t[i];
      if (void 0 !== an) {
        a = false;
        break;
      }
      if (c) {
        if (
          !S(t, function (n) {
            return l === n || r(l, n, e, u, o);
          })
        ) {
          a = false;
          break;
        }
      } else if (l !== p && !r(l, p, e, u, o)) {
        a = false;
        break;
      }
    }
    return a;
  }
  function $(n, t, r) {
    switch (r) {
      case '[object Boolean]':
      case '[object Date]':
        return +n == +t;
      case '[object Error]':
        return n.name == t.name && n.message == t.message;
      case '[object Number]':
        return n != +n ? t != +t : n == +t;
      case '[object RegExp]':
      case '[object String]':
        return n == t + '';
    }
    return false;
  }
  function q(n, t, r, e, u, o) {
    var i = 2 & u,
      c = en(n),
      f = c.length,
      a = en(t).length;
    if (f != a && !i) return false;
    for (var l = f; l--; ) {
      var p = c[l];
      if (!(i ? p in t : En.call(t, p))) return false;
    }
    for (a = true; ++l < f; ) {
      var p = c[l],
        s = n[p],
        h = t[p];
      if (void 0 !== an || (s !== h && !r(s, h, e, u, o))) {
        a = false;
        break;
      }
      i || (i = 'constructor' == p);
    }
    return (
      a &&
        !i &&
        ((r = n.constructor),
        (e = t.constructor),
        r != e &&
          'constructor' in n &&
          'constructor' in t &&
          !(
            typeof r == 'function' &&
            r instanceof r &&
            typeof e == 'function' &&
            e instanceof e
          ) &&
          (a = false)),
      a
    );
  }
  function z(n) {
    var t = n ? n.length : an;
    if (W(t) && (Pn(n) || nn(n) || K(n))) {
      n = String;
      for (var r = -1, e = Array(t); ++r < t; ) e[r] = n(r);
      t = e;
    } else t = null;
    return t;
  }
  function C(n) {
    var t = n && n.constructor,
      t = (Q(t) && t.prototype) || xn;
    return n === t;
  }
  function G(n) {
    return n ? n[0] : an;
  }
  function J(n, t) {
    return r(n, d(t), $n);
  }
  function M(n, t) {
    return $n(n, typeof t == 'function' ? t : cn);
  }
  function P(n, t, r) {
    return e(n, d(t), r, 3 > arguments.length, $n);
  }
  function U(n, t) {
    var r;
    if (typeof t != 'function') throw new TypeError('Expected a function');
    return (
      (n = Un(n)),
      function () {
        return 0 < --n && (r = t.apply(this, arguments)), 1 >= n && (t = an), r;
      }
    );
  }
  function V(n) {
    var t;
    if (typeof n != 'function') throw new TypeError('Expected a function');
    return (
      (t = In(t === an ? n.length - 1 : Un(t), 0)),
      function () {
        for (
          var r = arguments, e = -1, u = In(r.length - t, 0), o = Array(u);
          ++e < u;

        )
          o[e] = r[t + e];
        for (u = Array(t + 1), e = -1; ++e < t; ) u[e] = r[e];
        return (u[t] = o), n.apply(this, u);
      }
    );
  }
  function H(n, t) {
    return n > t;
  }
  function K(n) {
    return (
      Y(n) &&
      L(n) &&
      En.call(n, 'callee') &&
      (!Rn.call(n, 'callee') || '[object Arguments]' == kn.call(n))
    );
  }
  function L(n) {
    return null != n && !(typeof n == 'function' && Q(n)) && W(zn(n));
  }
  function Q(n) {
    return (
      (n = X(n) ? kn.call(n) : ''),
      '[object Function]' == n || '[object GeneratorFunction]' == n
    );
  }
  function W(n) {
    return (
      typeof n == 'number' && n > -1 && 0 == n % 1 && 9007199254740991 >= n
    );
  }
  function X(n) {
    var t = typeof n;
    return !!n && ('object' == t || 'function' == t);
  }
  function Y(n) {
    return !!n && typeof n == 'object';
  }
  function Z(n) {
    return typeof n == 'number' || (Y(n) && '[object Number]' == kn.call(n));
  }
  function nn(n) {
    return (
      typeof n == 'string' ||
      (!Pn(n) && Y(n) && '[object String]' == kn.call(n))
    );
  }
  function tn(n, t) {
    return t > n;
  }
  function rn(n) {
    return typeof n == 'string' ? n : null == n ? '' : n + '';
  }
  function en(n) {
    var t = C(n);
    if (!t && !L(n)) return Dn(Object(n));
    var r,
      e = z(n),
      u = !!e,
      e = e || [],
      o = e.length;
    for (r in n)
      !En.call(n, r) ||
        (u && ('length' == r || f(r, o))) ||
        (t && 'constructor' == r) ||
        e.push(r);
    return e;
  }
  function un(n) {
    for (
      var t = -1,
        r = C(n),
        e = w(n),
        u = e.length,
        o = z(n),
        i = !!o,
        o = o || [],
        c = o.length;
      ++t < u;

    ) {
      var a = e[t];
      (i && ('length' == a || f(a, c))) ||
        ('constructor' == a && (r || !En.call(n, a))) ||
        o.push(a);
    }
    return o;
  }
  function on(n) {
    return n ? u(n, en(n)) : [];
  }
  function cn(n) {
    return n;
  }
  function fn(t, r, e) {
    var u = en(r),
      o = b(r, u);
    null != e ||
      (X(r) && (o.length || !u.length)) ||
      ((e = r), (r = t), (t = this), (o = b(r, en(r))));
    var i = X(e) && 'chain' in e ? e.chain : true,
      c = Q(t);
    return (
      $n(o, function (e) {
        var u = r[e];
        (t[e] = u),
          c &&
            (t.prototype[e] = function () {
              var r = this.__chain__;
              if (i || r) {
                var e = t(this.__wrapped__);
                return (
                  (e.__actions__ = N(this.__actions__)).push({
                    func: u,
                    args: arguments,
                    thisArg: t
                  }),
                  (e.__chain__ = r),
                  e
                );
              }
              return u.apply(t, n([this.value()], arguments));
            });
      }),
      t
    );
  }
  var an,
    ln = 1 / 0,
    pn = /[&<>"'`]/g,
    sn = RegExp(pn.source),
    hn = /^(?:0|[1-9]\d*)$/,
    vn = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;'
    },
    yn = { function: true, object: true },
    _n = yn[typeof exports] && exports && !exports.nodeType ? exports : an,
    gn = yn[typeof module] && module && !module.nodeType ? module : an,
    bn = gn && gn.exports === _n ? _n : an,
    jn = o(yn[typeof self] && self),
    mn = o(yn[typeof window] && window),
    dn = o(yn[typeof this] && this),
    wn =
      o(_n && gn && typeof global == 'object' && global) ||
      (mn !== (dn && dn.window) && mn) ||
      jn ||
      dn ||
      Function('return this')(),
    On = Array.prototype,
    xn = Object.prototype,
    En = xn.hasOwnProperty,
    An = 0,
    kn = xn.toString,
    Nn = wn._,
    Sn = wn.Reflect,
    Tn = Sn ? Sn.f : an,
    Fn = Object.create,
    Rn = xn.propertyIsEnumerable,
    Bn = wn.isFinite,
    Dn = Object.keys,
    In = Math.max,
    $n = (function (n, t) {
      return function (r, e) {
        if (null == r) return r;
        if (!L(r)) return n(r, e);
        for (
          var u = r.length, o = t ? u : -1, i = Object(r);
          (t ? o-- : ++o < u) && false !== e(i[o], o, i);

        );
        return r;
      };
    })(g),
    qn = (function (n) {
      return function (t, r, e) {
        var u = -1,
          o = Object(t);
        e = e(t);
        for (var i = e.length; i--; ) {
          var c = e[n ? i : ++u];
          if (false === r(o[c], c, o)) break;
        }
        return t;
      };
    })();
  Tn &&
    !Rn.call({ valueOf: 1 }, 'valueOf') &&
    (w = function (n) {
      n = Tn(n);
      for (var t, r = []; !(t = n.next()).done; ) r.push(t.value);
      return r;
    });
  var zn = A('length'),
    Cn = V(function (t, r) {
      return Pn(t) || (t = null == t ? [] : [Object(t)]), _(r, 1), n(N(t), on);
    }),
    Gn = V(function (n, t, r) {
      return D(n, t, r);
    }),
    Jn = V(function (n, t) {
      return h(n, 1, t);
    }),
    Mn = V(function (n, t, r) {
      return h(n, Vn(t) || 0, r);
    }),
    Pn = Array.isArray,
    Un = Number,
    Vn = Number,
    Hn = R(function (n, t) {
      F(t, en(t), n);
    }),
    Kn = R(function (n, t) {
      F(t, un(t), n);
    }),
    Ln = R(function (n, t, r, e) {
      F(t, un(t), n, e);
    }),
    Qn = V(function (n) {
      return n.push(an, p), Ln.apply(an, n);
    }),
    Wn = V(function (n, t) {
      return null == n ? {} : E(n, _(t, 1));
    }),
    Xn = d;
  (l.prototype = s(a.prototype)),
    (l.prototype.constructor = l),
    (a.assignIn = Kn),
    (a.before = U),
    (a.bind = Gn),
    (a.chain = function (n) {
      return (n = a(n)), (n.__chain__ = true), n;
    }),
    (a.compact = function (n) {
      return y(n, Boolean);
    }),
    (a.concat = Cn),
    (a.create = function (n, t) {
      var r = s(n);
      return t ? Hn(r, t) : r;
    }),
    (a.defaults = Qn),
    (a.defer = Jn),
    (a.delay = Mn),
    (a.filter = function (n, t) {
      return y(n, d(t));
    }),
    (a.flatten = function (n) {
      return n && n.length ? _(n, 1) : [];
    }),
    (a.flattenDeep = function (n) {
      return n && n.length ? _(n, ln) : [];
    }),
    (a.iteratee = Xn),
    (a.keys = en),
    (a.map = function (n, t) {
      return O(n, d(t));
    }),
    (a.matches = function (n) {
      return x(Hn({}, n));
    }),
    (a.mixin = fn),
    (a.negate = function (n) {
      if (typeof n != 'function') throw new TypeError('Expected a function');
      return function () {
        return !n.apply(this, arguments);
      };
    }),
    (a.once = function (n) {
      return U(2, n);
    }),
    (a.pick = Wn),
    (a.slice = function (n, t, r) {
      var e = n ? n.length : 0;
      return (r = r === an ? e : +r), e ? k(n, null == t ? 0 : +t, r) : [];
    }),
    (a.sortBy = function (n, t) {
      var r = 0;
      return (
        (t = d(t)),
        O(
          O(n, function (n, e, u) {
            return { c: n, b: r++, a: t(n, e, u) };
          }).sort(function (n, t) {
            var r;
            n: {
              r = n.a;
              var e = t.a;
              if (r !== e) {
                var u = null === r,
                  o = r === an,
                  i = r === r,
                  c = null === e,
                  f = e === an,
                  a = e === e;
                if ((r > e && !c) || !i || (u && !f && a) || (o && a)) {
                  r = 1;
                  break n;
                }
                if ((e > r && !u) || !a || (c && !o && i) || (f && i)) {
                  r = -1;
                  break n;
                }
              }
              r = 0;
            }
            return r || n.b - t.b;
          }),
          A('c')
        )
      );
    }),
    (a.tap = function (n, t) {
      return t(n), n;
    }),
    (a.thru = function (n, t) {
      return t(n);
    }),
    (a.toArray = function (n) {
      return L(n) ? (n.length ? N(n) : []) : on(n);
    }),
    (a.values = on),
    (a.extend = Kn),
    fn(a, a),
    (a.clone = function (n) {
      return X(n) ? (Pn(n) ? N(n) : F(n, en(n))) : n;
    }),
    (a.escape = function (n) {
      return (n = rn(n)) && sn.test(n) ? n.replace(pn, i) : n;
    }),
    (a.every = function (n, t, r) {
      return (t = r ? an : t), v(n, d(t));
    }),
    (a.find = J),
    (a.forEach = M),
    (a.has = function (n, t) {
      return null != n && En.call(n, t);
    }),
    (a.head = G),
    (a.identity = cn),
    (a.indexOf = function (n, t, r) {
      var e = n ? n.length : 0;
      (r = typeof r == 'number' ? (0 > r ? In(e + r, 0) : r) : 0),
        (r = (r || 0) - 1);
      for (var u = t === t; ++r < e; ) {
        var o = n[r];
        if (u ? o === t : o !== o) return r;
      }
      return -1;
    }),
    (a.isArguments = K),
    (a.isArray = Pn),
    (a.isBoolean = function (n) {
      return (
        true === n || false === n || (Y(n) && '[object Boolean]' == kn.call(n))
      );
    }),
    (a.isDate = function (n) {
      return Y(n) && '[object Date]' == kn.call(n);
    }),
    (a.isEmpty = function (n) {
      if (L(n) && (Pn(n) || nn(n) || Q(n.splice) || K(n))) return !n.length;
      for (var t in n) if (En.call(n, t)) return false;
      return true;
    }),
    (a.isEqual = function (n, t) {
      return j(n, t);
    }),
    (a.isFinite = function (n) {
      return typeof n == 'number' && Bn(n);
    }),
    (a.isFunction = Q),
    (a.isNaN = function (n) {
      return Z(n) && n != +n;
    }),
    (a.isNull = function (n) {
      return null === n;
    }),
    (a.isNumber = Z),
    (a.isObject = X),
    (a.isRegExp = function (n) {
      return X(n) && '[object RegExp]' == kn.call(n);
    }),
    (a.isString = nn),
    (a.isUndefined = function (n) {
      return n === an;
    }),
    (a.last = function (n) {
      var t = n ? n.length : 0;
      return t ? n[t - 1] : an;
    }),
    (a.max = function (n) {
      return n && n.length ? t(n, cn, H) : an;
    }),
    (a.min = function (n) {
      return n && n.length ? t(n, cn, tn) : an;
    }),
    (a.noConflict = function () {
      return wn._ === this && (wn._ = Nn), this;
    }),
    (a.noop = function () {}),
    (a.reduce = P),
    (a.result = function (n, t, r) {
      return (
        (t = null == n ? an : n[t]), t === an && (t = r), Q(t) ? t.call(n) : t
      );
    }),
    (a.size = function (n) {
      return null == n ? 0 : ((n = L(n) ? n : en(n)), n.length);
    }),
    (a.some = function (n, t, r) {
      return (t = r ? an : t), S(n, d(t));
    }),
    (a.uniqueId = function (n) {
      var t = ++An;
      return rn(n) + t;
    }),
    (a.each = M),
    (a.first = G),
    fn(
      a,
      (function () {
        var n = {};
        return (
          g(a, function (t, r) {
            En.call(a.prototype, r) || (n[r] = t);
          }),
          n
        );
      })(),
      { chain: false }
    ),
    (a.VERSION = '4.5.1'),
    $n(
      'pop join replace reverse split push shift sort splice unshift'.split(
        ' '
      ),
      function (n) {
        var t = (/^(?:replace|split)$/.test(n) ? String.prototype : On)[n],
          r = /^(?:push|sort|unshift)$/.test(n) ? 'tap' : 'thru',
          e = /^(?:pop|join|replace|shift)$/.test(n);
        a.prototype[n] = function () {
          var n = arguments;
          return e && !this.__chain__
            ? t.apply(this.value(), n)
            : this[r](function (r) {
                return t.apply(r, n);
              });
        };
      }
    ),
    (a.prototype.toJSON =
      a.prototype.valueOf =
      a.prototype.value =
        function () {
          return T(this.__wrapped__, this.__actions__);
        }),
    ((mn || jn || {})._ = a),
    typeof define == 'function' && typeof define.amd == 'object' && define.amd
      ? define(function () {
          return a;
        })
      : _n && gn
      ? (bn && ((gn.exports = a)._ = a), (_n._ = a))
      : (wn._ = a);
}.call(this));
/*
 * Debounce function
 * based on unminified version from http://davidwalsh.name/javascript-debounce-function
 */
theme.debounce = function (n, t, u) {
  var e;
  return function () {
    var a = this,
      r = arguments,
      i = function () {
        (e = null), u || n.apply(a, r);
      },
      o = u && !e;
    clearTimeout(e), (e = setTimeout(i, t)), o && n.apply(a, r);
  };
};

/* ================ SLATE ================ */
window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function (container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function (evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function (evt) {
    this.instances = _.filter(this.instances, function (instance) {
      var isEventInstance = instance.id === evt.originalEvent.detail.sectionId;

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function (evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function (instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function (evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function (instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function (evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function (instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function (evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function (instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function (type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(
      function (index, container) {
        this._createInstance(container, constructor);
      }.bind(this)
    );
  }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

theme.Currency = (function () {
  var moneyFormat = '$';

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || moneyFormat;

    function formatWithDelimiters(number, precision, thousands, decimal) {
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1' + thousands
      );
      var centsAmount = parts[1] ? decimal + parts[1] : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
      case 'amount_with_apostrophe_separator':
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

theme.Images = (function () {
  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Swaps the src of an image for another OR returns the imageURL to the callback function
   * @param image
   * @param element
   * @param callback
   */
  function switchImage(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); // eslint-disable-line callback-return
    } else {
      element.src = imageUrl;
    }
  }

  /**
   * +++ Useful
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(
      /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[.@]/
    );

    if (match !== null) {
      return match[1];
    } else {
      return null;
    }
  }

  /**
   * +++ Useful
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(
      /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
    );

    if (match !== null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }

    return null;
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    switchImage: switchImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist.  Also updates the master select and triggers updates when the variants
 * price or media changes.
 *
 * @namespace variants
 */

slate.Variants = (function () {
  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on(
      'change',
      this._onSelectChange.bind(this)
    );
  }

  Variants.prototype = _.assignIn({}, Variants.prototype, {
    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function () {
      var currentOptions = _.map(
        $(this.singleOptionSelector, this.$container),

        function (element) {
          var $element = $(element);
          var type = $element.attr('type');
          var currentOption = {};

          if (type === 'radio' || type === 'checkbox') {
            if ($element[0].checked) {
              currentOption.value = $element.val();
              currentOption.index = $element.data('index');

              return currentOption;
            } else {
              return false;
            }
          } else {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          }
        }
      );

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = _.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function () {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = _.find(variants, function (variant) {
        return selectedValues.every(function (values) {
          return _.isEqual(variant[values.index], values.value);
        });
      });

      return found;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function () {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateMedia(variant);
      this._updatePrice(variant);
      this._updateSKU(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant media changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantMediaChange
     */
    _updateMedia: function (variant) {
      var variantMedia = variant.featured_media || {};
      var currentVariantMedia = this.currentVariant.featured_media || {};

      var isMatchingPreviewImage = false;

      if (variantMedia.preview_image && currentVariantMedia.preview_image) {
        isMatchingPreviewImage =
          variantMedia.preview_image.src ===
          currentVariantMedia.preview_image.src;
      }

      if (!variant.featured_media || isMatchingPreviewImage) return;

      this.$container.trigger({
        type: 'variantMediaChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function (variant) {
      if (
        variant.price === this.currentVariant.price &&
        variant.compare_at_price === this.currentVariant.compare_at_price
      ) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant SKU changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantSKUChange
     */
    _updateSKU: function (variant) {
      if (variant.sku === this.currentVariant.sku) {
        return;
      }

      this.$container.trigger({
        type: 'variantSKUChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param  {variant} variant - Currently selected variant
     * @return {k}         [description]
     */
    _updateHistoryState: function (variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?variant=' +
        variant.id;
      window.history.replaceState(
        {
          path: newurl
        },
        '',
        newurl
      );
    },

    /**
     * Update hidden master select of variant change
     *
     * @param  {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function (variant) {
      $(this.originalSelectorId, this.$container).val(variant.id);
    }
  });

  return Variants;
})();

window.slate = window.slate || {};

/**
 * Slate utilities
 * -----------------------------------------------------------------------------
 * A collection of useful utilities to help build your theme
 *
 *
 * @namespace utils
 */

slate.utils = {
  keyboardKeys: {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    LEFTARROW: 37,
    RIGHTARROW: 39
  }
};

/* ================ GLOBAL ================ */
theme.LibraryLoader = (function () {
  var types = {
    link: 'link',
    script: 'script'
  };

  var status = {
    requested: 'requested',
    loaded: 'loaded'
  };

  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

  var libraries = {
    youtubeSdk: {
      tagId: 'youtube-sdk',
      src: 'https://www.youtube.com/iframe_api',
      type: types.script
    },
    plyrShopifyStyles: {
      tagId: 'plyr-shopify-styles',
      src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
      type: types.link
    },
    modelViewerUiStyles: {
      tagId: 'shopify-model-viewer-ui-styles',
      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
      type: types.link
    }
  };

  function load(libraryName, callback) {
    var library = libraries[libraryName];

    if (!library) return;
    if (library.status === status.requested) return;

    callback = callback || function () {};
    if (library.status === status.loaded) {
      callback();
      return;
    }

    library.status = status.requested;

    var tag;

    switch (library.type) {
      case types.script:
        tag = createScriptTag(library, callback);
        break;
      case types.link:
        tag = createLinkTag(library, callback);
        break;
    }

    tag.id = library.tagId;
    library.element = tag;

    var firstScriptTag = document.getElementsByTagName(library.type)[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function createScriptTag(library, callback) {
    var tag = document.createElement('script');
    tag.src = library.src;
    tag.addEventListener('load', function () {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  function createLinkTag(library, callback) {
    var tag = document.createElement('link');
    tag.href = library.src;
    tag.rel = 'stylesheet';
    tag.type = 'text/css';
    tag.addEventListener('load', function () {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  return {
    load: load
  };
})();

/* ================ MODULES ================ */

/*============================================================================
  Money Format
  - Shopify.format money is defined in option_selection.js.
    If that file is not included, it is redefined here.
==============================================================================*/
window.timber = window.timber || {};
window.theme = window.theme || {};

timber.initCache = function () {
  timber.cache = {
    // General
    $html: $('html'),
    $body: $('body'),
    $window: $(window),

    // Navigation
    $navigation: $('#AccessibleNav'),

    // Product Page
    $optionSelector: $('.single-option-selector'),

    // Customer Pages
    $recoverPasswordLink: $('#RecoverPassword'),
    $hideRecoverPasswordLink: $('#HideRecoverPasswordLink'),
    $recoverPasswordForm: $('#RecoverPasswordForm'),
    $customerLoginForm: $('#CustomerLoginForm'),
    $passwordResetSuccess: $('#ResetSuccess')
  };
};

timber.init = function () {
  timber.initCache();
  timber.accessibleNav();
  timber.drawersInit();
  timber.loginForms();
};

timber.accessibleNav = function () {
  var classes = {
    active: 'nav-hover',
    focus: 'nav-focus',
    outside: 'nav-outside',
    hasDropdown: 'site-nav--has-dropdown',
    link: 'site-nav__link'
  };
  var selectors = {
    active: '.' + classes.active,
    hasDropdown: '.' + classes.hasDropdown,
    dropdown: '[data-meganav-dropdown]',
    link: 'a',
    nextLink: '> a',
    parentLink: '[data-meganav-type="parent"]',
    childLink: '[data-meganav-type="child"]'
  };

  var $nav = timber.cache.$navigation,
    $allLinks = $nav.find(selectors.link),
    $parents = $nav.find(selectors.hasDropdown),
    $childLinks = $nav.find(selectors.childLink),
    $topLevel = $parents.find(selectors.nextLink),
    $dropdowns = $nav.find(selectors.dropdown),
    $subMenuLinks = $dropdowns.find(selectors.link);

  // Mouseenter
  $parents.on('mouseenter touchstart', function (evt) {
    var $el = $(this);
    var evtType = evt.type;
    var $dropdowns = $nav.find(selectors.active);

    if (!$el.hasClass(classes.active)) {
      // force stop the click from happening
      evt.preventDefault();
      evt.stopImmediatePropagation();
    }

    // Make sure we close any opened same level dropdown before opening a new one
    if (evtType === 'touchstart' && $dropdowns.length > 0) {
      hideDropdown($el);
    }

    showDropdown($el);
  });

  $childLinks.on('touchstart', function (evt) {
    evt.stopImmediatePropagation();
  });

  $parents.on('mouseleave', function () {
    hideDropdown($(this));
  });

  $allLinks.on('focus', function () {
    handleFocus($(this));
  });

  $allLinks.on('blur', function () {
    removeFocus($topLevel);
  });

  // accessibleNav private methods
  function handleFocus($el) {
    var $newFocus = null,
      $previousItem = $el.parent().prev();

    // Always put tabindex -1 on previous element just in case the user is going backward.
    // In that case, we want to focus on the previous parent and not the previous parent childs

    $allLinks.attr('tabindex', '');

    if ($previousItem.hasClass(classes.hasDropdown)) {
      $previousItem.find(selectors.dropdown + ' a').attr('tabindex', -1);
    }

    $newFocus = $el.parents(selectors.hasDropdown).find('> a');
    addFocus($newFocus);
  }

  function showDropdown($el) {
    var $toplevel = $el.find(selectors.nextLink);

    $toplevel.attr('aria-expanded', true);

    $el.addClass(classes.active);

    setTimeout(function () {
      timber.cache.$body.on('touchstart.MegaNav', function () {
        hideDropdowns();
      });
    }, 250);
  }

  function hideDropdown($el) {
    var $dropdowns = $el.parent().find(selectors.active);
    var $parentLink = $dropdowns.find(selectors.nextLink);

    $parentLink.attr('aria-expanded', false);

    $dropdowns.removeClass(classes.active);

    timber.cache.$body.off('touchstart.MegaNav');
  }

  function hideDropdowns() {
    var $dropdowns = $nav.find(selectors.active);
    $.each($dropdowns, function () {
      hideDropdown($(this));
    });
  }

  function addFocus($el) {
    $el.addClass(classes.focus);

    if ($el.attr('aria-expanded') !== undefined) {
      $el.attr('aria-expanded', true);
    }
  }

  function removeFocus($el) {
    $el.removeClass(classes.focus);

    $subMenuLinks.attr('tabindex', -1);

    if ($el.attr('aria-expanded') !== undefined) {
      $el.attr('aria-expanded', false);
    }
  }

  // Check if dropdown is outside of viewport
  function handleDropdownOffset($dropdowns) {
    var viewportSize = $(window).width();
    $dropdowns.removeClass(classes.outside);

    $.each($dropdowns, function () {
      var $dropdown = $(this);
      var dropdownOffset = $dropdown.offset().left + $dropdown.width();
      if (dropdownOffset > viewportSize) {
        $dropdown.addClass(classes.outside);
      }
    });
  }

  timber.cache.$window.load(function () {
    handleDropdownOffset($dropdowns);
  });

  timber.cache.$window.resize(function () {
    afterResize(function () {
      handleDropdownOffset($dropdowns);
    }, 250);
  });
};

timber.drawersInit = function () {
  timber.LeftDrawer = new timber.Drawers('NavDrawer', 'left');
  if (theme.settings.cartType === 'drawer') {
    timber.RightDrawer = new timber.Drawers('CartDrawer', 'right', {
      onDrawerOpen: ajaxCart.load
    });
  }
};

timber.getHash = function () {
  return window.location.hash;
};

timber.loginForms = function () {
  function showRecoverPasswordForm() {
    timber.cache.$recoverPasswordForm.show();
    timber.cache.$customerLoginForm.hide();
  }

  function hideRecoverPasswordForm() {
    timber.cache.$recoverPasswordForm.hide();
    timber.cache.$customerLoginForm.show();
  }

  timber.cache.$recoverPasswordLink.on('click', function (evt) {
    evt.preventDefault();
    showRecoverPasswordForm();
  });

  timber.cache.$hideRecoverPasswordLink.on('click', function (evt) {
    evt.preventDefault();
    hideRecoverPasswordForm();
  });

  // Allow deep linking to recover password form
  if (timber.getHash() === '#recover') {
    showRecoverPasswordForm();
  }
};

timber.resetPasswordSuccess = function () {
  timber.cache.$passwordResetSuccess.show();
};

/*============================================================================
  Drawer modules
  - Docs http://shopify.github.io/Timber/#drawers
==============================================================================*/
timber.Drawers = (function () {
  var Drawer = function (id, position, options) {
    var defaults = {
      close: '.js-drawer-close',
      open: '.js-drawer-open-button-' + position,
      openButtonLeftClass: 'js-drawer-open-button-left',
      drawerLeftClass: 'drawer--left',
      drawerRightClass: 'drawer--right',
      openClass: 'js-drawer-open',
      dirOpenClass: 'js-drawer-open-' + position
    };

    this.nodes = {
      $parent: $('body, html'),
      $page: $('#PageContainer'),
      $moved: $('.page-container')
    };

    this.config = $.extend(defaults, options);
    this.position = position;

    this.$drawer = $('#' + id);

    if (!this.$drawer.length) {
      return false;
    }

    this.drawerIsOpen = false;
    this.init();
  };

  Drawer.prototype.init = function () {
    var $openBtn = $(this.config.open);

    // Add aria controls
    $openBtn.attr('aria-expanded', 'false');

    $openBtn.on('click', $.proxy(this.open, this));
    this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));
  };

  Drawer.prototype.open = function (evt) {
    // Keep track if drawer was opened from a click, or called by another function
    var externalCall = false;

    // Other drawers that might be open (will be closed later)
    var $otherDrawers = $('.drawer').not(this.$drawer);

    // don't open an opened drawer
    if (this.drawerIsOpen) {
      if (evt) {
        evt.preventDefault();
      }
      return;
    }

    // Close other drawers if they are open
    var self = this;
    $otherDrawers.each(function () {
      if (!$(this).hasClass(self.config.openClass)) {
        return;
      }

      if ($(this).hasClass(self.config.drawerLeftClass)) {
        timber.LeftDrawer.close();
      }

      if ($(this).hasClass(self.config.drawerRightClass)) {
        timber.RightDrawer.close();
      }
    });

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the drawer opens, the click event bubbles up to $nodes.page
    // which closes the drawer.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      // save the source of the click, we'll focus to this on close
      this.$activeSource = $(evt.currentTarget);
    }

    if (this.drawerIsOpen && !externalCall) {
      return this.close();
    }

    // Add is-transitioning class to moved elements on open so drawer can have
    // transition for close animation
    this.nodes.$moved.addClass('is-transitioning');
    this.$drawer.prepareTransition();

    this.nodes.$parent.addClass(
      this.config.openClass + ' ' + this.config.dirOpenClass
    );
    this.$drawer.addClass(this.config.openClass);

    this.drawerIsOpen = true;

    // Set focus on drawer
    Drawer.prototype.trapFocus({
      $container: this.$drawer,
      namespace: 'drawer_focus'
    });

    // Run function when drawer opens if set
    if (
      this.config.onDrawerOpen &&
      typeof this.config.onDrawerOpen === 'function'
    ) {
      if (!externalCall) {
        this.config.onDrawerOpen();
      }
    }

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'true');
    }

    this.bindEvents();
  };

  Drawer.prototype.close = function (evt) {
    // don't close a closed drawer
    if (!this.drawerIsOpen) {
      return;
    }

    if (evt.keyCode !== 27) {
      evt.preventDefault();
    }
    // deselect any focused form elements
    $(document.activeElement).trigger('blur');

    // Ensure closing transition is applied to moved elements, like the nav
    this.nodes.$moved.prepareTransition({ disableExisting: true });
    this.$drawer.prepareTransition({ disableExisting: true });

    this.nodes.$parent.removeClass(
      this.config.dirOpenClass + ' ' + this.config.openClass
    );
    this.$drawer.removeClass(this.config.openClass);

    this.drawerIsOpen = false;

    // Remove focus on drawer
    Drawer.prototype.removeTrapFocus({
      $container: this.$drawer,
      namespace: 'drawer_focus'
    });

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'false');
    }

    this.unbindEvents();
  };

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  Drawer.prototype.trapFocus = function (options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
      options.$container.attr('tabindex', '-1');
    }

    options.$elementToFocus.focus();

    $(document).on(eventName, function (evt) {
      if (
        options.$container[0] !== evt.target &&
        !options.$container.has(evt.target).length
      ) {
        options.$container.focus();
      }
    });
  };

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  Drawer.prototype.removeTrapFocus = function (options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  };

  Drawer.prototype.bindEvents = function () {
    // Lock scrolling on mobile
    this.nodes.$page.on('touchmove.drawer', function () {
      return false;
    });

    this.$drawer.on('click.drawer', function (event) {
      if ($(this).hasClass('drawer--left')) {
        event.stopPropagation();
      }
    });

    $('.page-container, .drawer__header-container').on(
      'click.drawer',
      this.close.bind(this)
    );

    // Pressing escape closes drawer
    this.nodes.$parent.on(
      'keyup.drawer',
      $.proxy(function (evt) {
        // The hamburger 'open' button changes to a 'close' button when the drawer
        // is open. Clicking on it will close the drawer.
        if (this.$activeSource !== undefined) {
          this.$activeSource.on(
            'click.drawer',
            $.proxy(function () {
              if (
                !this.$activeSource.hasClass(this.config.openButtonLeftClass)
              ) {
                return;
              }
              this.close();
            }, this)
          );
        }
        if (evt.keyCode === 27) {
          this.close(evt);
        }
      }, this)
    );
  };

  Drawer.prototype.unbindEvents = function () {
    if (this.$activeSource !== undefined) {
      this.$activeSource.off('.drawer');
    }
    this.nodes.$page.off('.drawer');
    this.nodes.$parent.off('.drawer');
  };

  return Drawer;
})();

// Initialize Timber's JS on docready
$(timber.init);

/*
 * Shopify JS for customizing Slick.js
 *   http://kenwheeler.github.io/slick/
 *   Untouched JS in assets/slick.min.js
 */

theme.Slideshow = (function () {
  'use strict';

  var selectors = {
    activeSlide: '.slick-active',
    heroAdaptTextWrap: '[data-hero-adapt-text-wrap]',
    heroDotsWrapper: '[data-hero-dots-wrapper]',
    heroImage: '[data-hero-image]',
    heroTextContent: '[data-hero-text-content]',
    pagination: '[data-slide-pagination]',
    pause: '[data-pause]',
    slickList: '.slick-list',
    slidePrevious: '[data-slide-previous]',
    slideNext: '[data-slide-next]',
    slides: '.slick-slide'
  };

  var classes = {
    heroSlideHidden: 'hero__slide--hidden',
    isPaused: 'is-paused'
  };

  function Slideshow($slider) {
    var $sliderWrapper = $slider.closest('[data-section-id]');
    var loadSlideA11yString = (this.loadSlideA11yString =
      $slider.data('slide-nav-a11y'));
    var activeSlideA11yString = (this.activeSlideA11yString = $slider.data(
      'slide-nav-active-a11y'
    ));

    this.$slider = $slider;

    // Default settings
    this.settings = {
      $element: $slider,
      accessibility: true,
      adaptHeight: $slider.data('adapt'),
      arrows: true,
      dots: true,
      slide: '[data-hero-slide]',
      /* eslint-disable shopify/jquery-dollar-sign-reference */
      prevArrow: $slider.find(selectors.slidePrevious),
      nextArrow: $slider.find(selectors.slideNext),
      appendDots: $slider.find(selectors.heroDotsWrapper),
      /* eslint-enable shopify/jquery-dollar-sign-reference */
      adaptiveHeight: true,
      draggable: false,
      fade: true,
      focusOnChange: false,
      isTouch: Modernizr.touch ? true : false,
      autoplay: $slider.data('autoplay'),
      autoplaySpeed: $slider.data('autoplayspeed'),
      customPaging: function (slick, index) {
        var labelString =
          index === 0 ? activeSlideA11yString : loadSlideA11yString;
        return (
          '<a href="' +
          $slider.attr('id') +
          '" aria-label="' +
          labelString.replace('[slide_number]', index + 1) +
          '" data-slide-number="' +
          index +
          '" data-slide-pagination aria-controls="SlickSlide' +
          (index + 1) +
          '"></a>'
        );
      }
    };

    this.cache = {
      $window: $(window),
      $heroImage: $slider.find(selectors.heroImage),
      $heroText: $slider.find(selectors.heroTextContent),
      $pauseButton: $slider.find(selectors.pause),
      $textWrapperMobile: $sliderWrapper.find(selectors.heroAdaptTextWrap)
    };

    this.currentActiveSlide = 0;

    /*
     * Init slick slider
     *   - Add any additional option changes here
     *   - https://github.com/kenwheeler/slick/#options
     */
    this.$slider
      .on(
        'init',
        function (event, slick) {
          this.onInit(slick);
        }.bind(this)
      )
      .on(
        'beforeChange',
        function (event, slick, currentSlide, nextSlide) {
          this.beforeChange(slick, currentSlide, nextSlide);
        }.bind(this)
      )
      .on(
        'afterChange',
        function (event, slick) {
          this.afterChange(slick);
        }.bind(this)
      );

    this.$slider.slick(this.settings);
  }

  Slideshow.prototype = _.assignIn({}, Slideshow.prototype, {
    onInit: function (obj) {
      this.$allSlides = obj.$slides;
      this.$activeSlide = obj.$slider.find(
        selectors.slides + selectors.activeSlide
      );
      this.$pagination = obj.$slider.find(selectors.pagination);

      if (!this.settings.isTouch) {
        obj.$slides.addClass(classes.heroSlideHidden);
        this.$activeSlide.removeClass(classes.heroSlideHidden);
      }

      if (this.settings.autoplay) {
        this.cache.$pauseButton.on('click', this.togglePause.bind(this));

        $(document).scroll(
          theme.debounce(
            function () {
              var slideshowOffsetY =
                obj.$slider.offset().top + obj.$slider.outerHeight();

              if (slideshowOffsetY < window.pageYOffset) {
                this.togglePauseAttributes(this.cache.$pauseButton, false);
                obj.$slider.slick('slickPause');
              } else if (!this.cache.$pauseButton.hasClass(classes.isPaused)) {
                this.togglePauseAttributes(this.cache.$pauseButton, true);
                obj.$slider.slick('slickPlay');
              }
            }.bind(this),
            250
          )
        );
      }

      // Prevent default slick behaviour of autoplaying on mouseleave
      obj.$slider.find(selectors.slickList).off('mouseleave.slick');

      if (this.settings.adaptHeight) {
        this.showMobileText(0);
      }

      this.slideshowA11ySetup(obj.$slider);
      this.applySlideColor(0, 1);
    },

    beforeChange: function (obj, currentSlide, nextSlide) {
      obj.$slider.attr('data-slide-index', nextSlide);

      if (!this.settings.isTouch) {
        obj.$slides.removeClass(classes.heroSlideHidden);
      }

      if (this.settings.adaptHeight) {
        this.showMobileText(nextSlide);
      }

      this.applySlideColor(nextSlide, currentSlide);

      this.$pagination.each(
        function (index, element) {
          var labelString =
            index === nextSlide
              ? this.activeSlideA11yString
              : this.loadSlideA11yString;

          labelString = labelString.replace('[slide_number]', index + 1);

          $(element).attr('aria-label', labelString);
        }.bind(this)
      );

      // Set upcoming slide as index
      this.currentActiveSlide = nextSlide;
    },

    afterChange: function (obj) {
      if (this.settings.isTouch) {
        return;
      }

      this.$activeSlide = this.$slider.find(
        selectors.slides + selectors.activeSlide
      );

      obj.$slides.addClass(classes.heroSlideHidden).attr('aria-hidden', true);

      this.$activeSlide
        .removeClass(classes.heroSlideHidden)
        .attr('aria-hidden', false);
    },

    keyboardNavigation: function (evt) {
      if (evt.keyCode === 37) {
        this.$slider.slick('slickPrev');
      }
      if (evt.keyCode === 39) {
        this.$slider.slick('slickNext');
      }
    },

    togglePause: function (evt) {
      var $pauseButton = $(evt.currentTarget);
      var isPaused = $pauseButton.hasClass(classes.isPaused);

      this.togglePauseAttributes($pauseButton, isPaused);

      if (this.settings.autoplay) {
        if (isPaused) {
          this.$slider.slick('slickPlay');
        } else {
          this.$slider.slick('slickPause');
        }
      }
    },

    togglePauseAttributes: function ($pauseButton, isPaused) {
      if (this.settings.autoplay) {
        $pauseButton
          .toggleClass(classes.isPaused, !isPaused)
          .attr(
            'aria-label',
            isPaused
              ? $pauseButton.data('label-pause')
              : $pauseButton.data('label-play')
          );
      }
    },

    showMobileText: function (slideIndex) {
      var $allTextContent = this.cache.$textWrapperMobile.find(
        selectors.heroTextContent
      );
      var $currentTextContent = this.cache.$textWrapperMobile.find(
        '[data-index="' + slideIndex + '"]'
      );

      if (!$currentTextContent.length && this.$allSlides.length === 1) {
        this.cache.$textWrapperMobile.hide();
      } else {
        this.cache.$textWrapperMobile.show();
      }

      $allTextContent.hide();
      $currentTextContent.show();
    },

    // Apply when slideshow is in first position
    applySlideColor: function (nextSlideIndex, previousSlideIndex) {
      var prefixClassName = 'hero--color-';

      this.$slider
        .removeClass(prefixClassName + previousSlideIndex)
        .addClass(prefixClassName + nextSlideIndex);
    },

    slideshowA11ySetup: function ($slider) {
      var $list = $slider.find(selectors.slickList);

      // When an element in the slider is focused
      // pause slideshow and set aria-live.
      $slider
        .on(
          'focusin mouseenter',

          function (evt) {
            if (
              !$slider.has(evt.target).length ||
              $list.attr('aria-live') === 'polite'
            ) {
              return;
            }

            $list.attr('aria-live', 'polite');
            if (this.settings.autoplay) {
              $slider.slick('slickPause');
            }
          }.bind(this)
        )
        .on(
          'focusout mouseleave',

          function (evt) {
            if ($slider.has(evt.relatedTarget).length) {
              return;
            }

            $list.removeAttr('aria-live');
            if (this.settings.autoplay) {
              // Only resume playing if the user hasn't paused using the pause
              // button
              if (!this.cache.$pauseButton.hasClass(classes.isPaused)) {
                $slider.slick('slickPlay');
              }
            }
          }.bind(this)
        )
        .on('keyup', this.keyboardNavigation.bind(this));

      $list.removeAttr('tabindex');

      this.$allSlides.each(function (index) {
        $(this)
          .attr('id', 'SlickSlide' + (index + 1))
          .attr('aria-hidden', true);
      });

      this.$activeSlide.attr('aria-hidden', false);

      if (this.$allSlides.length > 1) {
        this.$pagination.each(function () {
          $(this).on('click keyup', function (evt) {
            if (evt.type === 'keyup' && evt.which !== 13) return;

            evt.preventDefault();

            if (evt.type === 'keyup') {
              $slider.focus();
            }
          });
        });
      }
    }
  });

  return Slideshow;
})();

theme.Disclosure = (function () {
  var selectors = {
    disclosureList: '[data-disclosure-list]',
    disclosureToggle: '[data-disclosure-toggle]',
    disclosureInput: '[data-disclosure-input]',
    disclosureOptions: '[data-disclosure-option]'
  };

  var classes = {
    listVisible: 'disclosure-list--visible'
  };

  function Disclosure($disclosure) {
    this.$container = $disclosure;
    this.cache = {};
    this._cacheSelectors();
    this._connectOptions();
    this._connectToggle();
    this._onFocusOut();
  }

  Disclosure.prototype = _.assignIn({}, Disclosure.prototype, {
    _cacheSelectors: function () {
      this.cache = {
        $disclosureList: this.$container.find(selectors.disclosureList),
        $disclosureToggle: this.$container.find(selectors.disclosureToggle),
        $disclosureInput: this.$container.find(selectors.disclosureInput),
        $disclosureOptions: this.$container.find(selectors.disclosureOptions)
      };
    },

    _connectToggle: function () {
      this.cache.$disclosureToggle.on(
        'click',
        function (evt) {
          var ariaExpanded =
            $(evt.currentTarget).attr('aria-expanded') === 'true';
          $(evt.currentTarget).attr('aria-expanded', !ariaExpanded);

          this.cache.$disclosureList.toggleClass(classes.listVisible);
        }.bind(this)
      );
    },

    _connectOptions: function () {
      this.cache.$disclosureOptions.on(
        'click',
        function (evt) {
          evt.preventDefault();
          this._submitForm($(evt.currentTarget).data('value'));
        }.bind(this)
      );
    },

    _onFocusOut: function () {
      this.cache.$disclosureToggle.on(
        'focusout',
        function (evt) {
          var disclosureLostFocus =
            this.$container.has(evt.relatedTarget).length === 0;

          if (disclosureLostFocus) {
            this._hideList();
          }
        }.bind(this)
      );

      this.cache.$disclosureList.on(
        'focusout',
        function (evt) {
          var childInFocus =
            $(evt.currentTarget).has(evt.relatedTarget).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(
            classes.listVisible
          );

          if (isVisible && !childInFocus) {
            this._hideList();
          }
        }.bind(this)
      );

      this.$container.on(
        'keyup',
        function (evt) {
          if (evt.which !== slate.utils.keyboardKeys.ESCAPE) return;
          this._hideList();
          this.cache.$disclosureToggle.focus();
        }.bind(this)
      );

      $('body').on(
        'click',
        function (evt) {
          var isOption = this.$container.has(evt.target).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(
            classes.listVisible
          );

          if (isVisible && !isOption) {
            this._hideList();
          }
        }.bind(this)
      );
    },

    _submitForm: function (value) {
      this.cache.$disclosureInput.val(value);
      this.$container.parents('form').submit();
    },

    _hideList: function () {
      this.cache.$disclosureList.removeClass(classes.listVisible);
      this.cache.$disclosureToggle.attr('aria-expanded', false);
    },

    unload: function () {
      this.cache.$disclosureOptions.off();
      this.cache.$disclosureToggle.off();
      this.cache.$disclosureList.off();
      this.$container.off();
    }
  });

  return Disclosure;
})();

theme.ProductModel = (function () {
  var modelJsonSections = {};
  var models = {};
  var xrButtons = {};

  var selectors = {
    productMediaGroup: '[data-product-single-media-group]',
    productMediaGroupWrapper: '[data-product-single-media-group-wrapper]',
    xrButton: '[data-shopify-xr]',
    xrButtonSingle: '[data-shopify-xr-single]'
  };

  var classes = {
    viewInSpaceDisabled: 'product-single__view-in-space--disabled'
  };

  function init(modelViewerContainers, sectionId) {
    modelJsonSections[sectionId] = {
      loaded: false
    };

    modelViewerContainers.each(function (index) {
      var $modelViewerContainer = $(this);
      var mediaId = $modelViewerContainer.data('media-id');

      var $modelViewerElement = $(
        $modelViewerContainer.find('model-viewer')[0]
      );
      var modelId = $modelViewerElement.data('model-id');

      if (index === 0) {
        var $xrButton = $modelViewerContainer
          .closest(selectors.productMediaGroupWrapper)
          .find(selectors.xrButtonSingle);

        xrButtons[sectionId] = {
          $element: $xrButton,
          defaultId: modelId
        };
      }

      models[mediaId] = {
        modelId: modelId,
        sectionId: sectionId,
        $container: $modelViewerContainer,
        $element: $modelViewerElement
      };
    });

    window.Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
        onLoad: setupShopifyXr
      }
    ]);

    if (models.length < 1) return;
    window.Shopify.loadFeatures([
      {
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: setupModelViewerUi
      }
    ]);
    theme.LibraryLoader.load('modelViewerUiStyles');
  }

  function setupShopifyXr(errors) {
    if (errors) return;

    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', function (event) {
        if (event.detail.shopifyXREnabled) {
          setupShopifyXr();
        } else {
          $(selectors.xrButton).addClass(classes.viewInSpaceDisabled);
        }
      });
      return;
    }

    for (var sectionId in modelJsonSections) {
      if (modelJsonSections.hasOwnProperty(sectionId)) {
        var modelSection = modelJsonSections[sectionId];

        if (modelSection.loaded) continue;
        var $modelJson = $('#ModelJson-' + sectionId);

        window.ShopifyXR.addModels(JSON.parse($modelJson.html()));
        modelSection.loaded = true;
      }
    }
    window.ShopifyXR.setupXRElements();
  }

  function setupModelViewerUi(errors) {
    if (errors) return;

    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (!model.modelViewerUi) {
          model.modelViewerUi = new Shopify.ModelViewerUI(model.$element);
        }
        setupModelViewerListeners(model);
      }
    }
  }

  function setupModelViewerListeners(model) {
    var xrButton = xrButtons[model.sectionId];

    var $productMediaGroup = model.$container.closest(
      selectors.productMediaGroup
    );

    model.$element
      .on('shopify_model_viewer_ui_toggle_play', function () {
        theme.updateSlickSwipe($productMediaGroup, false);
      })
      .on('shopify_model_viewer_ui_toggle_pause', function () {
        theme.updateSlickSwipe($productMediaGroup, true);
      });

    model.$container.on('mediaVisible', function () {
      xrButton.$element.attr('data-shopify-model3d-id', model.modelId);
      if (Modernizr.touch) return;
      model.modelViewerUi.play();
    });

    model.$container
      .on('mediaHidden', function () {
        xrButton.$element.attr('data-shopify-model3d-id', xrButton.defaultId);
        model.modelViewerUi.pause();
      })
      .on('xrLaunch', function () {
        model.modelViewerUi.pause();
      });
  }

  function removeSectionModels(sectionId) {
    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (model.sectionId === sectionId) {
          models[key].modelViewerUi.destroy();
          delete models[key];
        }
      }
    }
    delete modelJsonSections[sectionId];
  }

  return {
    init: init,
    removeSectionModels: removeSectionModels
  };
})();

// Youtube API callback
// eslint-disable-next-line no-unused-vars
function onYouTubeIframeAPIReady() {
  theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
}

theme.ProductVideo = (function () {
  var videos = {};

  var hosts = {
    html5: 'html5',
    youtube: 'youtube'
  };

  var selectors = {
    productMediaWrapper: '[data-product-single-media-wrapper]',
    productMediaGroup: '[data-product-single-media-group]'
  };

  var attributes = {
    enableVideoLooping: 'enable-video-looping',
    videoId: 'video-id'
  };

  function init(videoContainer, sectionId) {
    if (!videoContainer.length) {
      return;
    }

    var videoElement = videoContainer.find('iframe, video')[0];
    var mediaId = videoContainer.data('mediaId');

    if (!videoElement) {
      return;
    }

    videos[mediaId] = {
      mediaId: mediaId,
      sectionId: sectionId,
      host: hostFromVideoElement(videoElement),
      container: videoContainer,
      element: videoElement,
      ready: function () {
        createPlayer(this);
      }
    };

    var video = videos[mediaId];

    switch (video.host) {
      case hosts.html5:
        window.Shopify.loadFeatures([
          {
            name: 'video-ui',
            version: '1.1',
            onLoad: setupPlyrVideos
          }
        ]);
        theme.LibraryLoader.load('plyrShopifyStyles');
        break;
      case hosts.youtube:
        theme.LibraryLoader.load('youtubeSdk');
        break;
    }
  }

  function setupPlyrVideos(errors) {
    if (errors) {
      fallbackToNativeVideo();
      return;
    }

    loadVideos(hosts.html5);
  }

  function createPlayer(video) {
    if (video.player) {
      return;
    }

    var productMediaWrapper = video.container.closest(
      selectors.productMediaWrapper
    );
    var enableLooping = productMediaWrapper.data(attributes.enableVideoLooping);

    switch (video.host) {
      case hosts.html5:
        // eslint-disable-next-line no-undef
        video.player = new Shopify.Plyr(video.element, {
          loop: { active: enableLooping }
        });

        var $productMediaGroup = $(video.container).closest(
          selectors.productMediaGroup
        );

        video.player.on('seeking', function () {
          theme.updateSlickSwipe($productMediaGroup, false);
        });

        video.player.on('seeked', function () {
          theme.updateSlickSwipe($productMediaGroup, true);
        });

        break;
      case hosts.youtube:
        var videoId = productMediaWrapper.data(attributes.videoId);

        video.player = new YT.Player(video.element, {
          videoId: videoId,
          events: {
            onStateChange: function (event) {
              if (event.data === 0 && enableLooping) event.target.seekTo(0);
            }
          }
        });
        break;
    }

    productMediaWrapper.on('mediaHidden xrLaunch', function () {
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.pause();
      }

      if (video.host === hosts.youtube && video.player.pauseVideo) {
        video.player.pauseVideo();
      }
    });

    productMediaWrapper.on('mediaVisible', function () {
      if (Modernizr.touch) return;
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.play();
      }

      if (video.host === hosts.youtube && video.player.playVideo) {
        video.player.playVideo();
      }
    });
  }

  function hostFromVideoElement(video) {
    if (video.tagName === 'VIDEO') {
      return hosts.html5;
    }

    if (video.tagName === 'IFRAME') {
      if (
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
          video.src
        )
      ) {
        return hosts.youtube;
      }
    }
    return null;
  }

  function loadVideos(host) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];
        if (video.host === host) {
          video.ready();
        }
      }
    }
  }

  function fallbackToNativeVideo() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.nativeVideo) continue;

        if (video.host === hosts.html5) {
          video.element.setAttribute('controls', 'controls');
          video.nativeVideo = true;
        }
      }
    }
  }

  function removeSectionVideos(sectionId) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.sectionId === sectionId) {
          if (video.player) video.player.destroy();
          delete videos[key];
        }
      }
    }
  }

  return {
    init: init,
    hosts: hosts,
    loadVideos: loadVideos,
    removeSectionVideos: removeSectionVideos
  };
})();

/* ================ Sections ================ */
window.theme = window.theme || {};

theme.Product = (function () {
  function Product(container) {
    var $window = $(window);
    var $container = (this.$container = $(container));
    var sectionId = $container.attr('data-section-id');

    this.settings = {
      productPageLoad: false,
      preloadImage: false,
      enableHistoryState: true,
      namespace: '.productSection',
      sectionId: sectionId
    };

    this.selectors = {
      productMediaWrapper: '[data-product-single-media-wrapper]',
      productMediaGroup: '[data-product-single-media-group]',
      productMediaFlexWrapper: '[data-product-single-media-flex-wrapper]',
      productMediaTypeModel: '[data-product-media-type-model]',
      productMediaTypeVideo: '[data-product-media-type-video]',
      productThumbnails: '[data-product-thumbnails]',
      productThumbnail: '[data-product-thumbnail]',
      productFullDetails: '.product-single__full-details',
      productImageZoom: '[data-mfp-src]',
      productForm: '.add-to-cart__form',
      addToCart: '.btn--add-to-cart',
      addToCartText: '.btn__text',
      priceContainer: '[data-price-container]',
      productPrice: '#ProductPrice',
      SKU: '.variant-sku',
      priceA11y: '#PriceA11y',
      comparePrice: '#ComparePrice',
      comparePriceA11y: '#ComparePriceA11y',
      comparePriceWrapper: '.product-single__price--wrapper',
      quantityElements: '.js-quantity-selector, label + .js-qty',
      originalSelectorId: '#ProductSelect',
      singleOptionSelector: '.single-option-selector__radio',
      radioWrapper: '.radio-wrapper',
      meta: '.product-single__meta',
      productWrapper: '.product-single',
      shopifyPaymentButton: '.shopify-payment-button',
      slickDots: '[data-slick-dots]',
      slickNext: '[data-slick-next]',
      slickPrevious: '[data-slick-previous]',
      unitPrice: '[data-unit-price]',
      unitPriceBaseUnit: '[data-unit-price-base-unit]'
    };

    this.classes = {
      priceContainerUnitAvailable: 'price-container--unit-available',
      activeThumb: 'active-thumb',
      hide: 'hide'
    };

    this.slickSettings = {
      slide: this.selectors.productMediaFlexWrapper,
      accessibility: true,
      arrows: true,
      appendDots: this.selectors.slickDots,
      prevArrow: this.selectors.slickPrevious,
      nextArrow: this.selectors.slickNext,
      dots: true,
      infinite: false,
      adaptiveHeight: true,
      customPaging: function (slick, index) {
        var slideA11yString = theme.strings.productSlideLabel
          .replace('[slide_number]', index + 1)
          .replace('[slide_max]', slick.slideCount);

        var mediaA11yString = $(
          '[data-slick-index="' + index + '"]',
          this.$container
        ).data('slick-media-label');

        var ariaCurrent = index === 0 ? ' aria-current="true"' : '';
        return (
          '<a href="#ProductMediaGroup-' +
          sectionId +
          '" aria-label="' +
          slideA11yString +
          ' ' +
          mediaA11yString +
          '" aria-controls="slick-slide0' +
          index +
          '"' +
          ariaCurrent +
          '></a>'
        );
      }.bind(this)
    };

    this.slickTranslateDistance = 0;
    this.isCarouselActive = false;

    if (!$('#ProductJson-' + sectionId).html()) {
      return;
    }

    this.productSingleObject = JSON.parse(
      document.getElementById('ProductJson-' + sectionId).innerHTML
    );
    this.zoomType = $container.data('image-zoom-type');
    this.isStackedLayout = $container.data('stacked-layout');

    this.focusableElements = [
      'iframe',
      'input',
      'button',
      'video',
      '[tabindex="0"]'
    ].join(',');

    this.initBreakpoints();
    this.stringOverrides();
    this.initProductVariant();
    this.initStickyProductMeta();
    this.productThumbnailSwitch();
    this.initProductVideo();
    this._initModelViewerLibraries();
    this._initShopifyXrLaunch();

    if (this.zoomType) {
      this.productMediaZoom();
    }

    if (theme.settings.cartType === 'drawer') {
      ajaxCart.init({
        formSelector: '#AddToCartForm--' + sectionId,
        cartContainer: '#CartContainer',
        addToCartSelector: '#AddToCart--' + sectionId,
        enableQtySelectors: true,
        moneyFormat: theme.strings.moneyFormat
      });
    }

    $window
      .on('load' + this.settings.namespace, theme.initStickyProductMeta)
      .on(
        'resize' + this.settings.namespace,
        theme.debounce(this.initStickyProductMeta, 150).bind(this)
      );
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    initProductVariant: function () {
      var options = {
        $container: this.$container,
        enableHistoryState:
          this.$container.data('enable-history-state') || false,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId:
          this.selectors.originalSelectorId + '--' + this.settings.sectionId,
        product: this.productSingleObject
      };

      this.variants = new slate.Variants(options);
      this.$container.on(
        'variantChange' + this.settings.namespace,
        this.productPage.bind(this)
      );
      this.$container.on(
        'variantMediaChange' + this.settings.namespace,
        this.showVariantMedia.bind(this)
      );
    },

    initBreakpoints: function () {
      var self = this;
      var $container = self.$container;
      self.zoomType = $container.data('image-zoom-type');

      enquire.register(theme.variables.mediaQuerySmall, {
        match: function () {
          self.createMediaCarousel();
          if (self.zoomType) {
            if ($(self.selectors.productImageZoom).length) {
              // remove event handlers for product zoom on mobile
              $(self.selectors.productImageZoom).off();
            }
          }
        },
        unmatch: function () {
          self.destroyMediaCarousel();

          if (self.zoomType) {
            // reinit product zoom
            self.productMediaZoom();
          }
        }
      });
    },

    _initModelViewerLibraries: function () {
      if (!this.$container.data('has-model')) return;

      var $modelViewerElements = $(
        this.selectors.productMediaTypeModel,
        this.$container
      );
      theme.ProductModel.init($modelViewerElements, this.settings.sectionId);
    },

    _initShopifyXrLaunch: function () {
      $(document).on(
        'shopify_xr_launch',
        function () {
          var $currentMedia = $(
            this.selectors.productMediaWrapper +
              ':not(.' +
              this.classes.hide +
              ')',
            this.$container
          );
          $currentMedia.trigger('xrLaunch');
        }.bind(this)
      );
    },

    initProductVideo: function () {
      var sectionId = this.settings.sectionId;

      $(this.selectors.productMediaTypeVideo, this.$container).each(
        function () {
          var $videoContainer = $(this);
          theme.ProductVideo.init($videoContainer, sectionId);
        }
      );
    },

    stringOverrides: function () {
      // Override defaults in theme.strings with potential
      // template overrides

      theme.productStrings = theme.productStrings || {};
      $.extend(theme.strings, theme.productStrings);
    },

    resizeElements: function () {
      $(this.selectors.productGridImages, this.$container).imagesLoaded(
        function () {
          $(this.selectors.productGridImages, this.$container)
            .css('height', 'auto')
            .equalHeights();
        }
      );
    },

    showVariantMedia: function (evt) {
      var variant = evt.variant;
      var variantMediaId =
        this.settings.sectionId + '-' + variant.featured_media.id;

      var $newMedia = $(
        this.selectors.productMediaWrapper +
          '[data-media-id="' +
          variantMediaId +
          '"]'
      );

      this.triggerMediaChangeEvent(variantMediaId);

      var mediaIndex;

      if (variant && variant.featured_media) {
        this.setActiveThumbnail(variantMediaId);
      }

      if (
        theme.variables.bpSmall &&
        !this.$container.data('featured-product')
      ) {
        // Switch carousel slide, unless it's the first photo on load
        mediaIndex = $newMedia.closest('.slick-slide').data('slick-index');
        // Navigate to slide unless it's the first photo on load
        // If there is no index, slider is not initalized.
        if (_.isUndefined(mediaIndex)) {
          return;
        }

        if (mediaIndex !== 0 || theme.variables.productPageLoad) {
          $(this.selectors.productMediaGroup, this.$container).slick(
            'slickGoTo',
            mediaIndex
          );
        }
        // Switch media variant on thumbnail layout for desktop view;
        // When a media variant is updated on mobile view, update the
        // desktop view also.
        if (!this.isStackedLayout) {
          this.switchMedia(variantMediaId);
        }
      } else {
        if (this.isStackedLayout) {
          mediaIndex = $newMedia.closest('.slick-slide').index();
          // Scroll to/reorder media unless it's the first photo on load
          if (mediaIndex !== 0 || theme.variables.productPageLoad) {
            if (theme.variables.productPageSticky) {
              // Scroll to variant media
              $('html, body').animate(
                {
                  scrollTop: $newMedia.offset().top
                },
                250
              );
            } else {
              // Move selected variant media to top, preventing scrolling
              var currentScroll = $(document).scrollTop();
              $newMedia
                .closest(
                  $(this.selectors.productMediaFlexWrapper, this.$container)
                )
                .prependTo(
                  $(this.selectors.productMediaGroup, this.$container)
                );
              $(document).scrollTop(currentScroll);
            }
          }
        } else {
          // Switch media variant for thumbnail layout
          this.switchMedia(variantMediaId);
        }
      }

      if (!theme.variables.productPageLoad) {
        theme.variables.productPageLoad = true;
      }
    },

    triggerMediaChangeEvent: function (mediaId) {
      var $otherMedia = $(this.selectors.productMediaWrapper, this.$container);
      $otherMedia.trigger('mediaHidden');

      var $newMedia = $(
        this.selectors.productMediaWrapper,
        this.$container
      ).filter('#ProductMediaWrapper-' + mediaId);
      $newMedia.trigger('mediaVisible');
    },

    switchMedia: function (mediaId) {
      var $otherMedia = $(this.selectors.productMediaWrapper, this.$container);

      $otherMedia.addClass(this.classes.hide);
      var $newMedia = $(
        this.selectors.productMediaWrapper,
        this.$container
      ).filter('#ProductMediaWrapper-' + mediaId);
      $newMedia.removeClass(this.classes.hide);
    },

    productThumbnailSwitch: function () {
      var $productThumbnails = $(
        this.selectors.productThumbnails,
        this.$container
      ).find(this.selectors.productThumbnail);

      if ($productThumbnails.length) {
        // Switch the main media with one of the thumbnails
        // Note: this does not change the variant selected, just the media
        $productThumbnails
          .on(
            'click',
            function (evt) {
              evt.preventDefault();
              var newMediaId = $(evt.currentTarget).attr('data-media-id');

              this.switchMedia(newMediaId);
              this.setActiveThumbnail(newMediaId);
              this.triggerMediaChangeEvent(newMediaId);
            }.bind(this)
          )
          .on('keyup', this.handleMediaFocus.bind(this));
      }
    },

    handleMediaFocus: function (evt) {
      if (evt.keyCode !== 13) return;

      var mediaId = $(evt.currentTarget).data('media-id');

      $(
        this.selectors.productMediaWrapper +
          "[data-media-id='" +
          mediaId +
          "']",
        this.$container
      ).focus();
    },

    setActiveThumbnail: function (mediaId) {
      var $productThumbnails = $(
        this.selectors.productThumbnails,
        this.$container
      ).find(this.selectors.productThumbnail);

      if ($productThumbnails.length) {
        var $thumbnail = $(
          this.selectors.productThumbnail + "[data-media-id='" + mediaId + "']",
          this.$container
        );

        $productThumbnails.removeClass(this.classes.activeThumb);
        $thumbnail.addClass(this.classes.activeThumb);
      }
    },

    productMediaZoom: function () {
      if (
        !$(this.selectors.productImageZoom, this.$container).length ||
        theme.variables.bpSmall
      ) {
        return;
      }

      $(this.selectors.productImageZoom, this.$container).magnificPopup({
        type: 'image',
        mainClass: 'mfp-fade',
        closeOnBgClick: true,
        closeBtnInside: false,
        closeOnContentClick: true,
        tClose: theme.strings.zoomClose,
        removalDelay: 500,
        gallery: {
          enabled: true,
          navigateByImgClick: false,
          arrowMarkup:
            '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><span class="mfp-chevron mfp-chevron-%dir%"></span></button>',
          tPrev: theme.strings.zoomPrev,
          tNext: theme.strings.zoomNext
        }
      });
    },

    createMediaCarousel: function () {
      if (
        $(this.selectors.productMediaFlexWrapper).length < 2 ||
        !$(this.selectors.productMediaGroup, this.$container) ||
        this.isCarouselActive
      ) {
        return;
      }

      this.isCarouselActive = true;
      var dotStyle = {
        max: 9,
        width: 20
      };

      var focusTrapped = false;
      $(this.selectors.productMediaFlexWrapper, this.$container).on(
        'focusin',
        function () {
          if (focusTrapped) {
            return;
          }
          this.trapCarouselFocus($(this.selectors.productMediaGroup));
          focusTrapped = true;
        }.bind(this)
      );

      $(this.selectors.productMediaGroup, this.$container)
        .slick(this.slickSettings)
        .on(
          'beforeChange',
          function (event, slick, currentSlide, nextSlide) {
            this.updateCarouselDotsA11y(nextSlide);
            this.translateCarouselDots(slick.slideCount, nextSlide, dotStyle);
          }.bind(this)
        )
        .on(
          'afterChange',
          function (event, slick) {
            this.trapCarouselFocus(slick.$slider);
            // Let's do this after changing slides
            // Update featured media and active thumbnail on desktop
            // when changing slides
            this.setFeaturedMedia();
          }.bind(this)
        );

      if (this.isStackedLayout) return;
      var slideIndex = $(
        this.selectors.productMediaWrapper + ':not(.' + this.classes.hide + ')',
        this.$container
      )
        .closest(this.selectors.productMediaFlexWrapper)
        .data('slick-index');

      if (!slideIndex) return;
      $(this.selectors.productMediaGroup, this.$container).slick(
        'slickGoTo',
        slideIndex,
        true
      );
    },

    updateCarouselDotsA11y: function (nextSlide) {
      var $dotLinks = $(this.selectors.slickDots).find('a');
      $dotLinks
        .removeAttr('aria-current')
        .eq(nextSlide)
        .attr('aria-current', 'true');
    },

    translateCarouselDots: function (totalSlides, nextSlide, dotStyle) {
      if (totalSlides <= dotStyle.max) {
        return;
      }
      var calculatedTranslateDistance = 0;

      var maxTranslateDistance = (totalSlides - dotStyle.max) * dotStyle.width;
      if (nextSlide >= dotStyle.max - 1) {
        calculatedTranslateDistance =
          (nextSlide + 2 - dotStyle.max) * dotStyle.width;

        calculatedTranslateDistance =
          maxTranslateDistance < calculatedTranslateDistance
            ? maxTranslateDistance
            : calculatedTranslateDistance;
      }

      $(this.selectors.slickDots)
        .find('ul')
        .css('transform', 'translateX(-' + calculatedTranslateDistance + 'px)');
    },

    trapCarouselFocus: function ($slider, removeFocusTrap) {
      if (!$slider) return;

      $slider
        .find('.slick-slide:not(.slick-active)')
        .find(this.focusableElements)
        .attr('tabindex', removeFocusTrap ? '0' : '-1');

      $slider
        .find('.slick-active')
        .find(this.focusableElements)
        .attr('tabindex', '0');
    },

    setFeaturedMedia: function () {
      var mediaId = $(this.selectors.productMediaGroup, this.$container)
        .find('.slick-slide.slick-active ' + this.selectors.productMediaWrapper)
        .attr('data-media-id');
      this.triggerMediaChangeEvent(mediaId);

      // Thumbnail layout only
      if (this.isStackedLayout) return;
      this.switchMedia(mediaId);
      this.setActiveThumbnail(mediaId);
    },

    destroyMediaCarousel: function () {
      if (
        !$(this.selectors.productMediaGroup, this.$container).length ||
        !this.isCarouselActive
      ) {
        return;
      }

      this.trapCarouselFocus(
        $(this.selectors.productMediaGroup, this.$container),
        true
      );

      $(this.selectors.productMediaGroup, this.$container).slick('unslick');
      this.isCarouselActive = false;
    },

    productPage: function (evt) {
      var moneyFormat = theme.strings.moneyFormat;
      var variant = evt.variant;
      var translations = theme.strings;

      if (variant) {
        // Display variant media on featured product
        if (!$('body').hasClass('template-product')) {
          if (variant.featured_media) {
            var variantMediaId =
              this.settings.sectionId + '-' + variant.featured_media.id;
            var $newMedia = $(
              this.selectors.productMediaWrapper +
                '[data-media-id="' +
                variantMediaId +
                '"]',
              this.$container
            );
            var $otherMedia = $(
              this.selectors.productMediaWrapper +
                ':not([data-media-id="' +
                variantMediaId +
                '"])',
              this.$container
            );

            $newMedia.removeClass(this.classes.hide);
            $otherMedia.addClass(this.classes.hide);
          }
        }

        $(this.selectors.priceContainer, this.$container).removeClass(
          'visibility-hidden ' + this.classes.priceContainerUnitAvailable
        );
        $(this.selectors.productPrice, this.$container).attr(
          'aria-hidden',
          'false'
        );
        $(this.selectors.priceA11y, this.$container).attr(
          'aria-hidden',
          'false'
        );

        // Select a valid variant if available
        if (variant.available) {
          // Available, enable the submit button, change text, show quantity elements
          $(this.selectors.addToCart, this.$container)
            .removeClass('disabled')
            .prop('disabled', false);
          $(this.selectors.addToCartText, this.$container).html(
            translations.addToCart
          );
          $(this.selectors.quantityElements, this.$container).show();
          $(this.selectors.shopifyPaymentButton, this.$container).show();

          // Update the full details link
          var $link = $(this.selectors.productFullDetails, this.$container);
          if ($link.length) {
            $link.attr(
              'href',
              this.updateUrlParameter($link.attr('href'), 'variant', variant.id)
            );
          }
        } else {
          // Sold out, disable the submit button, change text, hide quantity elements
          $(this.selectors.addToCart, this.$container)
            .addClass('disabled')
            .prop('disabled', true);
          $(this.selectors.addToCartText, this.$container).html(
            translations.soldOut
          );
          $(this.selectors.quantityElements, this.$container).hide();
          $(this.selectors.shopifyPaymentButton, this.$container).hide();
        }

        $(this.selectors.productPrice, this.$container)
          .html(theme.Currency.formatMoney(variant.price, moneyFormat))
          .show();

        // Also update and show the product's compare price if necessary
        if (variant.compare_at_price > variant.price) {
          $(this.selectors.comparePrice, this.$container).html(
            theme.Currency.formatMoney(variant.compare_at_price, moneyFormat)
          );
          $(this.selectors.comparePriceWrapper, this.$container).removeClass(
            this.classes.hide
          );
          $(this.selectors.productPrice, this.$container).addClass('on-sale');
          $(this.selectors.comparePriceWrapper, this.$container).attr(
            'aria-hidden',
            'false'
          );
          $(this.selectors.comparePriceA11y, this.$container).attr(
            'aria-hidden',
            'false'
          );
        } else {
          $(this.selectors.comparePriceWrapper, this.$container)
            .addClass(this.classes.hide)
            .attr('aria-hidden', 'true');
          $(this.selectors.productPrice, this.$container).removeClass(
            'on-sale'
          );
          $(this.selectors.comparePrice, this.$container).html('');
          $(this.selectors.comparePriceA11y, this.$container).attr(
            'aria-hidden',
            'true'
          );
        }

        if (variant.unit_price) {
          var $unitPrice = $(this.selectors.unitPrice, this.$container);
          var $unitPriceBaseUnit = $(
            this.selectors.unitPriceBaseUnit,
            this.$container
          );

          $unitPrice.html(
            theme.Currency.formatMoney(variant.unit_price, moneyFormat)
          );
          $unitPriceBaseUnit.html(this.getBaseUnit(variant));

          $(this.selectors.priceContainer, this.$container).addClass(
            this.classes.priceContainerUnitAvailable
          );
        }

        // Also Show SKU
        $(this.selectors.SKU).html(variant.sku);
      } else {
        // The variant doesn't exist, disable submit button.
        // This may be an error or notice that a specific variant is not available.
        // To only show available variants, implement linked product options:
        //   - http://docs.shopify.com/manual/configuration/store-customization/advanced-navigation/linked-product-options
        $(this.selectors.addToCart, this.$container)
          .addClass('disabled')
          .prop('disabled', true);
        $(this.selectors.addToCartText, this.$container).html(
          translations.unavailable
        );
        $(this.selectors.quantityElements, this.$container).hide();
        $(this.selectors.shopifyPaymentButton, this.$container).hide();

        $(this.selectors.priceContainer, this.$container).addClass(
          'visibility-hidden'
        );
        $(this.selectors.productPrice, this.$container).attr(
          'aria-hidden',
          'true'
        );
        $(this.selectors.priceA11y, this.$container).attr(
          'aria-hidden',
          'true'
        );
        $(this.selectors.comparePriceWrapper, this.$container).attr(
          'aria-hidden',
          'true'
        );
        $(this.selectors.comparePriceA11y, this.$container).attr(
          'aria-hidden',
          'true'
        );
      }
    },

    updateUrlParameter: function (url, key, value) {
      var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
      var separator = url.indexOf('?') === -1 ? '?' : '&';

      if (url.match(re)) {
        return url.replace(re, '$1' + key + '=' + value + '$2');
      } else {
        return url + separator + key + '=' + value;
      }
    },

    initStickyProductMeta: function () {
      var $meta = $(this.selectors.meta, this.$container);
      var $wrapper = $(this.selectors.productWrapper, this.$container);

      if ($meta.find('#shopify-product-reviews').length) {
        theme.variables.productPageSticky = false;
        return;
      }

      if (
        !$meta.length ||
        $(this.selectors.productMediaWrapper, this.$container).length < 2
      ) {
        return;
      }

      // Force detatch if already detached. Prevent layout issues.
      $meta.trigger('detach.ScrollToFixed');

      // Detach and stop if on mobile breakpoint
      if (theme.variables.bpSmall) {
        return;
      }

      var productCopyHeight = $meta.outerHeight();
      var productMediaGroupHeight = $(
        this.selectors.productMediaGroup,
        this.$container
      ).height();

      /*============================================================================
        Calculate when to detach fixed element to avoid content overlap.
        Subtract product copy height from the limit because plugin uses offset().top
      ==============================================================================*/
      var calcLimit = $wrapper.offset().top + $wrapper.height();
      calcLimit -= productCopyHeight;

      // Init sticky if desc shorter than images and fits in viewport
      if (
        productCopyHeight < productMediaGroupHeight &&
        productCopyHeight < $(window).height()
      ) {
        theme.variables.productPageSticky = true;
        $meta.scrollToFixed({
          limit: calcLimit
        });
      } else {
        theme.variables.productPageSticky = false;
      }
    },

    onUnload: function () {
      this.$container.off(this.settings.namespace);
      theme.ProductModel.removeSectionModels(this.settings.sectionId);
      theme.ProductVideo.removeSectionVideos(this.settings.sectionId);
      this.destroyMediaCarousel();
    },

    getBaseUnit: function (variant) {
      return variant.unit_price_measurement.reference_value === 1
        ? variant.unit_price_measurement.reference_unit
        : variant.unit_price_measurement.reference_value +
            variant.unit_price_measurement.reference_unit;
    }
  });

  return Product;
})();

window.theme = window.theme || {};

theme.Collection = (function () {
  function Collection(container) {
    this.selectors = {
      productGridImages: '.grid-uniform .grid-product__image-wrapper',
      $productGridRows: $('.collage-grid__row'),
      productGridPhotosLarge: '.grid__item--large .grid-product__image-link',
      $collectionImage: $('.collection-hero__image'),
      filterDropdowns: '.filter-dropdown',
      filterSelect: '.filter-dropdown__select',
      filterLabel: '.filter-dropdown__label',
      sortDropdown: '#sortBy'
    };

    var $container = (this.$container = $(container));
    this.gridType = $container.data('grid-type');

    this.selectors.$collectionImage.addClass('is-init');

    // Enable parallax effect if 3d transforms are supported
    if (!Modernizr.csstransforms3d) {
      return;
    }

    theme.cache.$window.on('scroll', function () {
      var scrolled = theme.cache.$window.scrollTop();
      theme.cache.$collectionImage.css({
        transform: 'translate3d(0, ' + scrolled / 4.5 + 'px, 0)'
      });
    });

    this.init();
  }

  Collection.prototype = _.assignIn({}, Collection.prototype, {
    init: function () {
      this.cacheSelectors();
      this.setQueryParams();

      this.cache.$sortDropdown.on('change', this.sortCollection.bind(this));

      if (this.gridType === 'collage') {
        this.initCollageGrid();
      } else if (this.gridType === 'grid') {
        theme.equalHeights.call(this);
      }
    },

    updateFilterLabel: function (evt, element) {
      var $select = evt ? $(evt.target) : $(element);
      var $label = $select
        .prev('.filter-dropdown__label')
        .find('.filter-dropdown__label--active');
      var selectedVariant = $select.find('option:selected').text();

      $label.html(' ' + selectedVariant);
      this.cache.$filterDropdowns.addClass('loaded');
    },

    cacheSelectors: function () {
      this.cache = {
        $html: $('html'),
        $window: $(window),
        $productGridImages: $(this.selectors.productGridImages),
        $productGridRows: $(this.selectors.productGridRows),
        $productGridPhotosLarge: $(this.selectors.productGridPhotosLarge),
        $filterDropdowns: $(this.selectors.filterDropdowns),
        $filterSelect: $(this.selectors.filterSelect),
        $filterLabel: $(this.selectors.filterLabel),
        $sortDropdown: $(this.selectors.sortDropdown)
      };
    },

    setQueryParams: function () {
      //don't execute if sort dropdown is not present.
      if (!this.cache.$sortDropdown.length) {
        return;
      }

      Shopify.queryParams = this.parseQueryString();
    },

    parseQueryString: function () {
      if (!location.search.length) {
        return {};
      }

      var params = {};

      for (
        var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&');
        i < aCouples.length;
        i++
      ) {
        aKeyValue = aCouples[i].split('=');
        if (aKeyValue.length > 1) {
          params[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(
            aKeyValue[1]
          );
        }
      }
      return params;
    },

    initCollageGrid: function () {
      if (!this.cache.$productGridRows.length) {
        return;
      }

      this.collageGridHeights();

      theme.cache.$window.on(
        'resize',
        theme.debounce(this.collageGridHeights, 500)
      );
    },

    collageGridHeights: function () {
      if (theme.variables.bpSmall || !this.cache.$productGridRows.length) {
        return;
      }

      // calculate image heights for each row of grid images
      for (var i = this.cache.$productGridRows.length - 1; i >= 0; i--) {
        var $currentRow = $(this.cache.$productGridRows[i]);
        var $smallImages = $currentRow.find(
          '.grid__item--small .grid-product__image-wrapper'
        );
        var $largeImageWrapper = $currentRow.find(
          '.grid__item--large .grid-product__image-wrapper'
        );
        var $largeImage = $largeImageWrapper.find('.grid-product__image-link');

        // calculate the bottom edge of the small image
        var smallImageOffset =
          $smallImages[1].offsetTop + $smallImages[1].offsetHeight;

        // calculate the bottom edge of the large image for the row
        var largeImageOffset =
          $largeImageWrapper[0].offsetTop + $largeImageWrapper[0].offsetHeight;

        var largeImageHeight = 0;

        // Depending on which image is lower, increase or decrease the large
        // image size
        if (smallImageOffset > largeImageOffset) {
          largeImageHeight =
            $largeImage.height() + (smallImageOffset - largeImageOffset);
        } else {
          largeImageHeight =
            $largeImage.height() - (largeImageOffset - smallImageOffset);
        }

        $largeImage.css('height', largeImageHeight);
      }
    },

    clearCollageGridHeights: function () {
      if (!this.cache.$productGridRows.length) {
        return;
      }

      this.cache.$productGridPhotosLarge.removeAttr('style');
    },

    collectionSorting: function () {
      if (!this.cache.$tagList.length) {
        return;
      }

      this.cache.$tagList.on('change', function () {
        window.location.href = $(this).val();
      });
    },

    sortCollection: function () {
      if (!this.cache.$sortDropdown.length) {
        return;
      }

      if (Shopify.queryParams.page) {
        delete Shopify.queryParams.page;
      }
      Shopify.queryParams.sort_by = this.cache.$sortDropdown.val();
      location.search = decodeURIComponent(jQuery.param(Shopify.queryParams));
    }
  });

  return Collection;
})();

window.theme = window.theme || {};

theme.HeaderSection = (function () {
  var classes = {
    headerWrapperTransparent: 'header-wrapper--transparent'
  };

  function Header(container) {
    timber.drawersInit();
    theme.initCache();
    theme.fitNav();
    theme.resizeLogo();
    theme.searchModal();

    var $container = (this.$container = $(container));
    this.template = $container.attr('data-template');
    this.$headerWrapper = theme.cache.$siteHeader.closest(
      '[data-header-wrapper]'
    );

    // ajaxCart.init will run from Product.prototype when on the product page
    if (
      theme.settings.cartType === 'drawer' &&
      this.template.indexOf('product') === -1
    ) {
      ajaxCart.init({
        formSelector: '.add-to-cart__form',
        cartContainer: '#CartContainer',
        addToCartSelector: '.add-to-cart',
        enableQtySelectors: true,
        moneyFormat: theme.strings.moneyFormat
      });
    }

    theme.cache.$window.on('load', theme.resizeLogo);
    theme.cache.$window.on('resize', theme.debounce(theme.resizeLogo, 150));

    this.initSideBarDropDowns();
    this.updateHeaderTransparency();

    // Reorder & load events for all section
    // Only trigger when sections list contain slideshow
    $(document).on(
      'shopify:section:reorder shopify:section:load',
      this.updateHeaderTransparency.bind(this)
    );

    // setTimeout is added since we want to see the newest DOM structure
    // unLoad is triggered before the removal of the DOM
    $(document).on(
      'shopify:section:unload',
      function () {
        setTimeout(this.updateHeaderTransparency.bind(this));
      }.bind(this)
    );
  }

  Header.prototype = _.assignIn({}, Header.prototype, {
    onSelect: function () {
      this.handleDrawerOpenInEditor(event);
    },

    onDeselect: function () {
      timber.LeftDrawer.close(event);
    },

    handleDrawerOpenInEditor: function (event) {
      if (
        theme.cache.$siteNav.hasClass('site-nav--compress') ||
        theme.variables.bpSmall
      ) {
        setTimeout(function () {
          timber.LeftDrawer.drawerIsOpen = false;
          timber.LeftDrawer.open();
        }, 500);
      } else if (!theme.cache.$siteNav.hasClass('site-nav--compress')) {
        timber.LeftDrawer.drawerIsOpen = true;
        timber.LeftDrawer.close(event);
      }
    },

    initSideBarDropDowns: function () {
      var $toggleBtns = $('.mobile-nav__toggle-btn');
      // Setup aria attributes
      $toggleBtns.attr('aria-expanded', 'false');

      $toggleBtns.each(function () {
        var $button = $(this);
        $button.attr('aria-controls', $button.attr('data-aria-controls'));
      });

      $toggleBtns.on('click', function () {
        var $button = $(this);
        var currentlyExpanded = $button.attr('aria-expanded');
        var toggleState = false;
        // Updated aria-expanded value based on state pre-click
        if (currentlyExpanded === 'true') {
          $button.attr('aria-expanded', 'false');
        } else {
          $button.attr('aria-expanded', 'true');
          toggleState = true;
        }

        // Toggle that expands/collapses sublist
        $button
          .closest('.mobile-nav__has-sublist')
          .toggleClass('mobile-nav--expanded', toggleState)
          .next()
          .slideToggle();
      });
    },

    /**
     * Check whether the first section is slideshow
     * and enable transparency setting (header) is enabled
     */
    updateHeaderTransparency: function () {
      var $sectionsWrapper = theme.cache.$body.find('[data-sections-wrapper]');
      var $firstSection = $sectionsWrapper.find('[data-section-type]').first();

      this.$headerWrapper.removeClass(classes.headerWrapperTransparent);

      if (
        $firstSection.data('section-type') === 'slideshow-section' &&
        theme.cache.$siteHeader.data('transparent-header') === true
      ) {
        this.$headerWrapper.addClass(classes.headerWrapperTransparent);
      }
    }
  });

  return Header;
})();

window.theme = window.theme || {};

theme.FeaturedContentSection = (function () {
  function FeaturedContent() {
    theme.styleTextLinks();
  }

  return FeaturedContent;
})();

window.theme = window.theme || {};

theme.NewsletterSection = (function () {
  function Newsletter() {
    theme.styleTextLinks();
  }

  return Newsletter;
})();

theme.slideshows = {};

theme.SlideshowSection = (function () {
  var classes = {
    headerWrapperTransparent: 'header-wrapper--transparent',
    isPaused: 'is-paused'
  };

  var selectors = {
    pause: '[data-pause]',
    headerWrapper: '[data-header-wrapper]'
  };

  function SlideshowSection(container) {
    theme.initCache();

    var $container = $(container);
    var sectionId = $container.attr('data-section-id');
    var slideshow = '#Hero-' + sectionId;
    this.$slideshow = $(slideshow);
    this.autoplay = this.$slideshow.data('autoplay');
    this.$headerWrapper = theme.cache.$siteHeader.closest(
      selectors.headerWrapper
    );

    theme.slideshows[slideshow] = new theme.Slideshow(this.$slideshow);

    // remove header absolute display if slideshow is empty
    if (!this.$slideshow.hasClass('hero')) {
      this.$headerWrapper.removeClass(classes.headerWrapperTransparent);
    }

    if (Shopify.designMode) {
      // Fix the slideshow height in the iOS theme editor
      this.setSlideshowHeight(this.$slideshow);
    }
  }

  SlideshowSection.prototype = _.assignIn({}, SlideshowSection.prototype, {
    onUnload: function () {
      this.$slideshow.slick('unslick');
    },

    onBlockSelect: function (evt) {
      var $slide = $('.slide--' + evt.detail.blockId);
      var slideIndex = $slide.attr('index');

      // Go to selected slide, pause autoplay
      this.$slideshow.slick('slickGoTo', slideIndex);

      if (this.autoplay) {
        this.$slideshow.slick('slickPause');
      }
    },

    onBlockDeselect: function () {
      var $pauseButton = this.$slideshow.find(selectors.pause);

      if (this.autoplay && $pauseButton.hasClass(classes.isPaused)) {
        this.$slideshow.slick('slickPlay');
      }
    },

    setSlideshowHeight: function ($slideshow) {
      enquire.register(theme.variables.mediaQuerySmall, {
        match: function () {
          $slideshow.css('height', $(window.parent.document).height());
        },
        unmatch: function () {
          $slideshow.removeAttr('height');
        }
      });
    }
  });

  return SlideshowSection;
})();

window.theme = window.theme || {};

theme.PasswordHeader = (function () {
  function PasswordHeader() {
    this.init();
  }

  PasswordHeader.prototype = _.assignIn({}, PasswordHeader.prototype, {
    init: function () {
      $('.js-toggle-login-modal').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        closeOnBgClick: false,
        closeBtnInside: false,
        closeOnContentClick: false,
        tClose: password.strings.pageClose,
        removalDelay: 500,
        callbacks: {
          open: function () {
            window.setTimeout(function () {
              document.getElementById('password').focus();
            }, 50);
          },
          close: function () {
            window.setTimeout(function () {
              document.getElementById('email').focus();
            }, 50);
          }
        }
      });
      if ($('.storefront-password-form .errors').size()) {
        $('.js-toggle-login-modal').click();
      }
    }
  });

  return PasswordHeader;
})();

window.theme = window.theme || {};

theme.PasswordContent = (function () {
  function PasswordContent() {
    theme.styleTextLinks();
  }

  return PasswordContent;
})();

window.theme = window.theme || {};

theme.ProductRecommendations = (function () {
  function ProductRecommendations(container) {
    this.$container = $(container);

    var self = this;
    var baseUrl = this.$container.data('baseUrl');
    var productId = this.$container.data('productId');
    var recommendationsSectionUrl =
      baseUrl +
      '?section_id=product-recommendations&product_id=' +
      productId +
      '&limit=4';

    $.get(recommendationsSectionUrl).then(function (section) {
      var recommendationsMarkup = $(section).html();
      if (recommendationsMarkup.trim() !== '') {
        self.$container.html(recommendationsMarkup);
      }
    });
  }

  return ProductRecommendations;
})();

theme.Maps = (function () {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];

  var errors = {
    addressNoResults: theme.strings.addressNoResults,
    addressQueryLimit: theme.strings.addressQueryLimit,
    addressError: theme.strings.addressError,
    authError: theme.strings.authError
  };

  var selectors = {
    section: '[data-section-type="map"]',
    map: '[data-map]',
    mapOverlay: '[data-map-overlay]'
  };

  var classes = {
    mapError: 'map-section--load-error',
    errorMsg: 'map-section__error errors text-center'
  };

  // Global function called by Google on auth errors.
  // Show an auto error message on all map instances.
  // eslint-disable-next-line camelcase, no-unused-vars
  window.gm_authFailure = function () {
    if (!Shopify.designMode) return;

    if (Shopify.designMode) {
      $(selectors.section).addClass(classes.mapError);
      $(selectors.map).remove();
      $(selectors.mapOverlay).after(
        '<div class="' +
          classes.errorMsg +
          '">' +
          theme.strings.authError +
          '</div>'
      );
    }
  };

  function Map(container) {
    this.$container = $(container);
    this.$map = this.$container.find(selectors.map);
    this.key = this.$map.data('api-key');

    if (typeof this.key !== 'string' || this.key === '') {
      return;
    }

    if (apiStatus === 'loaded') {
      var self = this;

      // Check if the script has previously been loaded with this key
      var $script = $('script[src*="' + this.key + '&"]');
      if ($script.length === 0) {
        $.getScript(
          'https://maps.googleapis.com/maps/api/js?key=' + this.key
        ).then(function () {
          apiStatus = 'loaded';
          self.createMap();
        });
      } else {
        this.createMap();
      }
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript(
            'https://maps.googleapis.com/maps/api/js?key=' + this.key
          ).then(function () {
            apiStatus = 'loaded';
            initAllMaps();
          });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    $.each(mapsToLoad, function (index, instance) {
      instance.createMap();
    });
  }

  function geolocate($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');

    geocoder.geocode({ address: address }, function (results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }

      deferred.resolve(results);
    });

    return deferred;
  }

  Map.prototype = _.assignIn({}, Map.prototype, {
    createMap: function () {
      var $map = this.$map;

      return geolocate($map)
        .then(
          function (results) {
            var mapOptions = {
              zoom: config.zoom,
              center: results[0].geometry.location,
              draggable: false,
              clickableIcons: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true
            };

            var map = (this.map = new google.maps.Map($map[0], mapOptions));
            var center = (this.center = map.getCenter());

            //eslint-disable-next-line no-unused-vars
            var marker = new google.maps.Marker({
              map: map,
              position: map.getCenter()
            });

            google.maps.event.addDomListener(window, 'resize', function () {
              google.maps.event.trigger(map, 'resize');
              map.setCenter(center);
              $map.removeAttr('style');
            });
          }.bind(this)
        )
        .fail(function () {
          var errorMessage;

          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = errors.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = errors.addressQueryLimit;
              break;
            case 'REQUEST_DENIED':
              errorMessage = errors.authError;
              break;
            default:
              errorMessage = errors.addressError;
              break;
          }

          // Show errors only to merchant in the editor.
          if (Shopify.designMode) {
            $map
              .parent()
              .addClass(classes.mapError)
              .html(
                '<div class="' +
                  classes.errorMsg +
                  '">' +
                  errorMessage +
                  '</div>'
              );
          }
        });
    },

    onUnload: function () {
      if (this.$map.length === 0) {
        return;
      }
      google.maps.event.clearListeners(this.map, 'resize');
    }
  });

  return Map;
})();

window.theme = window.theme || {};

theme.Search = (function () {
  function Search() {
    theme.equalHeights();
  }

  return Search;
})();

window.theme = window.theme || {};

var selectors = {
  disclosureLocale: '[data-disclosure-locale]',
  disclosureCurrency: '[data-disclosure-currency]'
};

theme.FooterSection = (function () {
  function Footer(container) {
    this.$container = $(container);
    this.cache = {};
    this.cacheSelectors();

    if (this.cache.$localeDisclosure.length) {
      this.localeDisclosure = new theme.Disclosure(
        this.cache.$localeDisclosure
      );
    }

    if (this.cache.$currencyDisclosure.length) {
      this.currencyDisclosure = new theme.Disclosure(
        this.cache.$currencyDisclosure
      );
    }
  }

  Footer.prototype = _.assignIn({}, Footer.prototype, {
    cacheSelectors: function () {
      this.cache = {
        $localeDisclosure: this.$container.find(selectors.disclosureLocale),
        $currencyDisclosure: this.$container.find(selectors.disclosureCurrency)
      };
    },

    onUnload: function () {
      if (this.cache.$localeDisclosure.length) {
        this.localeDisclosure.unload();
      }

      if (this.cache.$currencyDisclosure.length) {
        this.currencyDisclosure.unload();
      }
    }
  });

  return Footer;
})();

theme.variables = {
  productPageLoad: false,
  productPageSticky: true,

  // Breakpoints from src/stylesheets/global/variables.scss.liquid
  mediaQuerySmall: 'screen and (max-width: 590px)',
  mediaQueryMedium: 'screen and (min-width: 591px) and (max-width: 768px)',
  mediaQueryMediumUp: 'screen and (min-width: 591px)',
  mediaQueryLarge: 'screen and (min-width: 769px)',
  bpSmall: false
};

theme.initCache = function () {
  theme.cache = {
    $window: $(window),
    $html: $('html'),
    $body: $('body'),
    $drawerRight: $('.drawer--right'),

    $hero: $('#Hero'),
    $customSelect: $('.js-selector'),

    $collectionImage: $('.collection-hero__image'),

    $siteHeader: $('.site-header'),
    $siteNav: $('.site-nav'),
    $siteNavOpen: $('.site-nav--open'),
    $cartBuggle: $('.cart-link__bubble'),
    $logoWrapper: $('.site-header__logo'),
    $logo: $('.site-header__logo img'),
    $toggleSearchModal: $('.js-toggle-search-modal'),
    $searchBox: $('.site-nav--search__bar'),

    $indentedRteImages: $('.rte--indented-images'),

    $productGridRows: $('.collage-grid__row'),
    $productGridPhotosLarge: $('.grid__item--large .grid-product__image-link'),

    // Equal height elements
    $productGridImages: $('.grid-uniform .grid-product__image-wrapper'),

    $returnLink: $('.return-link')
  };
};

theme.init = function () {
  theme.initCache();
  theme.setBreakpoints();
  theme.fitNav();
  theme.cartInit();
  theme.afterCartLoad();
  theme.checkoutIndicator();
  theme.returnLink();
  theme.styleTextLinks();
  theme.searchModal();
  theme.productCardImageLoadingAnimation();

  // Functions to run on load so image sizes can be calculated
  theme.cache.$window.on('load', theme.resizeLogo);
  theme.cache.$window.on('load', theme.articleImages);

  // Functions to re-run on resize
  theme.cache.$window.on('resize', theme.debounce(theme.resizeLogo, 150));
};

theme.returnLink = function () {
  if (
    !document.referrer ||
    !theme.cache.$returnLink.length ||
    !window.history.length
  ) {
    return;
  }

  theme.cache.$returnLink.on('click', theme.backButton);
};

theme.backButton = function () {
  var referrerDomain = urlDomain(document.referrer);
  var shopDomain = urlDomain(document.url);

  if (shopDomain === referrerDomain) {
    history.back();
    return false;
  }

  function urlDomain(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
  }
};

theme.setBreakpoints = function () {
  enquire.register(theme.variables.mediaQuerySmall, {
    match: function () {
      if (theme.settings.gridType === 'collage') {
        theme.clearCollageGridHeights();
      }

      theme.variables.bpSmall = true;
    },
    unmatch: function () {
      theme.variables.bpSmall = false;
    }
  });
};

theme.fitNav = function () {
  // Measure children of site nav on load and resize.
  // If wider than parent, switch to mobile nav.
  controlNav();
  theme.cache.$window.on('load', controlNav);
  theme.cache.$window.on('resize', theme.debounce(controlNav, 150));

  function controlNav() {
    // Subtract 20 from width to account for inline-block spacing
    var navWidth = theme.cache.$siteNav.parent().outerWidth() - 20;
    var navItemWidth = 0;
    theme.cache.$siteNav.find('> li').each(function () {
      var $el = $(this);
      // Round up to be safe
      navItemWidth += Math.ceil($(this).width());
    });

    if (navItemWidth > navWidth) {
      theme.cache.$siteNav.addClass('site-nav--compress');
      theme.cache.$siteNav
        .parent()
        .removeClass('large--two-thirds')
        .addClass('large--one-sixth');
      theme.cache.$siteNavOpen.addClass('site-nav--open__display');
      theme.cache.$siteNavOpen.parent().removeClass('large--hide');
      theme.cache.$logoWrapper
        .parent()
        .removeClass('large--one-third')
        .addClass('large--two-thirds');
      theme.cache.$logoWrapper
        .removeClass('large--left')
        .addClass('text-center');
      theme.cache.$searchBox.hide();
    } else {
      theme.cache.$siteNav.removeClass('site-nav--compress');
      theme.cache.$siteNavOpen.removeClass('site-nav--open__display');
      theme.cache.$siteNavOpen.parent().addClass('large--hide');
      theme.cache.$searchBox.show();
    }

    theme.cache.$siteNav.addClass('site-nav--init');
    theme.cache.$siteNavOpen.addClass('site-nav--init');
  }
};

theme.resizeLogo = function () {
  // Using .each() as there can be a reversed logo too
  theme.cache.$logo.each(function () {
    var $el = $(this),
      logoWidthOnScreen = $el.width(),
      containerWidth = $el.closest('.grid__item').width();
    // If image exceeds container, let's make it smaller
    if (logoWidthOnScreen > containerWidth) {
      $el.css('maxWidth', containerWidth);
    } else {
      $el.removeAttr('style');
    }
  });
};

theme.sizeCartDrawerFooter = function () {
  // Stop if our drawer doesn't have a fixed footer
  if (!theme.cache.$drawerRight.hasClass('drawer--has-fixed-footer')) {
    return;
  }

  // Elements are reprinted regularly so selectors are not cached
  var $cartFooter = $('.ajaxcart__footer').removeAttr('style');
  var $cartInner = $('.ajaxcart__inner').removeAttr('style');
  var cartFooterHeight = $cartFooter.outerHeight();
  var cartDrawerTitleHeight = $('.drawer--right .drawer__header').outerHeight();
  var $cartDrawerInner = $('.drawer--right .drawer__inner');

  if (cartDrawerTitleHeight != 80) {
    $cartDrawerInner.css('top', cartDrawerTitleHeight);
  }

  $cartInner.css('bottom', cartFooterHeight);
  $cartFooter.css('height', cartFooterHeight);
};

theme.afterCartLoad = function () {
  theme.cache.$body.on('ajaxCart.afterCartLoad', function (evt, cart) {
    // Open cart drawer
    timber.RightDrawer.open();

    // Size the cart's fixed footer
    theme.sizeCartDrawerFooter();

    // Show cart bubble in nav if items exist
    if (cart.items.length > 0) {
      theme.cache.$cartBuggle.addClass('cart-link__bubble--visible');
    } else {
      theme.cache.$cartBuggle.removeClass('cart-link__bubble--visible');
    }
  });
};

theme.checkoutIndicator = function () {
  // Add a loading indicator on the cart checkout button (/cart and drawer)
  theme.cache.$body.on('click', '.cart__checkout', function () {
    $(this).addClass('btn--loading');
  });
};

theme.searchModal = function () {
  if (!theme.cache.$toggleSearchModal.length) {
    return;
  }

  theme.cache.$toggleSearchModal.magnificPopup({
    type: 'inline',
    mainClass: 'mfp-fade',
    closeOnBgClick: true,
    closeBtnInside: false,
    closeOnContentClick: false,
    tClose: theme.strings.zoomClose,
    alignTop: true,
    removalDelay: 500,
    focus: '.search-bar > input'
  });
};

theme.clearCollageGridHeights = function () {
  if (!theme.cache.$productGridRows.length) {
    return;
  }

  theme.cache.$productGridPhotosLarge.removeAttr('style');
};

theme.articleImages = function () {
  if (!theme.cache.$indentedRteImages.length) {
    return;
  }

  theme.cache.$indentedRteImages.find('img').each(function () {
    var $el = $(this);
    var attr = $el.attr('style');

    // Check if undefined or float: none
    if (!attr || attr == 'float: none;') {
      // Remove grid-breaking styles if image isn't wider than parent
      if ($el.width() < theme.cache.$indentedRteImages.width()) {
        $el.addClass('rte__no-indent');
      }
    }
  });
};

theme.styleTextLinks = function () {
  $('.rte').find('a:not(:has(img))').addClass('text-link');
};

theme.equalHeights = function () {
  var self = this;
  theme.cache.$window.on('load', resizeElements());

  theme.cache.$window.on(
    'resize',
    afterResize(
      function () {
        resizeElements();
      },
      250,
      'equal-heights'
    )
  );

  function resizeElements() {
    self.cache.$productGridImages.css('height', 'auto').equalHeights();
  }
};

theme.cartInit = function () {
  if (!theme.cookiesEnabled()) {
    theme.cache.$body.addClass('cart--no-cookies');
  }
};

theme.cookiesEnabled = function () {
  var cookieEnabled = navigator.cookieEnabled;

  if (!cookieEnabled) {
    document.cookie = 'testcookie';
    cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
  }
  return cookieEnabled;
};

theme.productCardImageLoadingAnimation = function () {
  var selectors = {
    image: '[data-image]',
    imageLink: '[data-image-link]'
  };

  var classes = {
    loadingAnimation: 'grid-product__image-link--loading',
    lazyloaded: '.lazyloaded'
  };

  $(document).on('lazyloaded', function (e) {
    var $target = $(e.target);

    if (!$target.is(selectors.image)) {
      return;
    }

    $target.closest(selectors.imageLink).removeClass(classes.loadingAnimation);
  });

  // When the theme loads, lazysizes might load images before the "lazyloaded"
  // event listener has been attached. When this happens, the following function
  // hides the loading placeholders.
  $(selectors.image + classes.lazyloaded)
    .closest(selectors.imageLink)
    .removeClass(classes.loadingAnimation);
};

theme.updateSlickSwipe = function (element, allowSwipe) {
  if (!element.hasClass('slick-initialized')) {
    return;
  }

  var slickOptions = {
    accessibility: allowSwipe,
    draggable: allowSwipe,
    swipe: allowSwipe,
    touchMove: allowSwipe
  };
  element.slick('slickSetOption', slickOptions, false);
};

$(document).ready(function () {
  theme.init();
  var sections = new theme.Sections();

  sections.register('product-template', theme.Product);
  sections.register('collection-template', theme.Collection);
  sections.register('header-section', theme.HeaderSection);
  sections.register('featured-content-section', theme.FeaturedContentSection);
  sections.register('newsletter-section', theme.NewsletterSection);
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('password-header', theme.PasswordHeader);
  sections.register('password-content', theme.PasswordContent);
  sections.register('product-recommendations', theme.ProductRecommendations);
  sections.register('map', theme.Maps);
  sections.register('search', theme.Search);
  sections.register('footer-section', theme.FooterSection);
});

/*
 * Run function after window resize
 * http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
 */
var afterResize = (function () {
  var t = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (t[uniqueId]) {
      clearTimeout(t[uniqueId]);
    }
    t[uniqueId] = setTimeout(callback, ms);
  };
})();
