/* eslint-disable */

let _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; };

(function () {

  /**
   * Install plugin
   * @param Vue
   * @param axios
   */

  function plugin(Vue) {

    if (plugin.installed) {
      return;
    }
    plugin.installed = true;

    Vue.$loading = function (tips = '请求数据...') {
      setTimeout(function () {
        let el = document.querySelector('.loading');
        if (el) {
          el.parentNode.removeChild(el);
        }

        let loadingTpl = Vue.extend({
          template: `<div class="loading">
                        <div class="loading-body">
                          <i class="loading-icon"></i>
                          <p class="loading-text">${tips}</p>
                        </div>
                      </div>`
        });

        let tpl = new loadingTpl().$mount().$el;
        document.body.appendChild(tpl);
        document.getElementsByTagName('body')[0].className = 'in-fixed';
      }, 500)


    };

    Vue.$loadingClose = function () {
      setTimeout(function () {
        let el = document.querySelector('.loading');
        if (el) {
          el.parentNode.removeChild(el);
          document.getElementsByTagName('body')[0].className = '';
        }
      }, 500);
    }
  }

  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object') {
    module.exports = plugin;
  } else if (typeof define == 'function' && define.amd) {
    define([], function () {
      return plugin;
    });
  } else if (window.Vue && window.axios) {
    Vue.use(plugin, window.axios);
  }
})();

/* eslint-enable */