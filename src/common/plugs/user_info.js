
import SessionStorage from '../services/sessionStorage.cookie';

/**
 * User 弹出框插件
 * Version Beta 0.0.1
 */

/* eslint-disable */
let Vue;
class User {
  constructor () {
  }

  install (externalVue) {
    if (this.installed) {
      return;
    }

    Vue = externalVue;

    Vue.prototype.$user = {
      get () {
        return SessionStorage.get('userInfo') || {};
      },

      set (value) {
        return SessionStorage.set('userInfo', value);
      }
    };

    // SessionStorage
    Vue.prototype.$session = {
      get (name) {
        return SessionStorage.get(name) || {};
      },

      set (name, value, expired) {
        return SessionStorage.set(name, value, expired);
      }
    };

    this.installed = true;
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(User);
}

export default new User();
/* eslint-enable */