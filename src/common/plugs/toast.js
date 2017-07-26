/**
 * Toast 弹出框插件
 * Version Beta 0.0.1
 */

/* eslint-disable */
let Vue;
class Toast {
  constructor () {
  }

  install (externalVue) {
    if (this.installed) {
      return;
    }

    Vue = externalVue;

    let t = null;
    Vue.prototype.$toast = function (tips, opt = {duration: 3500}) {
      if (document.querySelector('.toast')) {
        clearTimeout(t);
        document.body.removeChild(document.querySelector('.toast'));
      }

      let toastTpl = Vue.extend({
        template: `<div class="toast">${tips}</div>`
      });

      let tpl = new toastTpl().$mount().$el;
      document.body.appendChild(tpl);

      t = setTimeout(function () {
        document.body.removeChild(tpl);
      }, opt.duration);
    };

    this.installed = true;
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Toast);
}

export default new Toast();
/* eslint-enable */