import './index.scss';

import _      					from 'lodash';
import Vue        			from 'vue';
import Vuex        			from 'vuex';
import Router         	from 'vue-router';

import Common           from '~common';
import App        			from './App.vue';


Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Vuex);


let routerArr   = [];
let storeArr    = [];
let storeCommon = {};

if (!_.isEmpty(__PROJECTDIR__)) {
  __PROJECTDIR__.forEach((elem) => {

    // 组合不同模块的路由
    let item = require(`~appRoot/${elem}/router`);
    if (0 < item.default.routes.length) {
      let routes = item.default.routes;
      for (let i in routes) {
        let isBe = _.find(routerArr, (o) => {
          return o.name === routes[i].name;
        });
        if (_.isEmpty(isBe) || _.isEmpty(routes[i].name)) {
          routerArr.push(routes[i]);
        }
      }
    }

    // 组合不同模块的store
    let storeItem = require(`~appRoot/${elem}/store`);
    let store = storeItem.default;

    storeCommon = _.assign({}, storeCommon, store.common);
    store.store.forEach(function (elem) {
      _.assign(elem.modules, storeCommon);
      storeArr.push(elem);
    });

  });

  storeArr = _.uniqBy(storeArr, 'name');
}

/**
 * 组合新路由
 */
let router = _.assign({
  linkActiveClass: 'active',
  // mode: 'history',
  routes: routerArr,
});

if ('production' === process.env.NODE_ENV) {
  router.mode = 'history';
}

/**
 * 处理不同模块路由跳转
 * 找不到跳到404模块（Todo）
 */
let newRouter = new Router(router);

/**
 * 初始状态实例
 */

let newStore = {};
newRouter.beforeEach((to, from, next) => {

  // 不存在
  if (undefined === to.name) {
    next({
      name: 'home.Home',
    });
    return;
  }
  let modules = _.get(_.find(storeArr, { name: to.name }), 'modules');
  modules = _.assign({}, modules, storeCommon);
  newStore.get = new Vuex.Store({ modules });

  // 登录权限验证
  let userInfo = Common.Services.SessionStorage.get('userInfo');
  let time     = parseInt(new Date().getTime() / 1000);

  // 判断Session有效时间
  if (!_.get(userInfo, 'data.user_id') || _.get(userInfo, 'expired') && 0 >= userInfo.expired - time) {
    sessionStorage.removeItem('userInfo');
    userInfo = Common.Services.SessionStorage.get('userInfo');
  }

  _.filter(to.matched, (o) => {
    if (true === _.get(o, 'meta.authorization')) {
      if (_.isEmpty(userInfo) || _.isEmpty(_.get(userInfo, 'data')) || !_.isObject(userInfo, _.get('data'))) {

        // Todo，next只运行一次
        next({
          name: 'welcome.Login',
          query: {
            dt: to.name
          }
        });
        return;
      }
      newStore.get.dispatch({
        type: 'userInfo',
        userInfo: userInfo.data,
      });
    }
  });

  // 禁止重复登录
  if (!_.isEmpty(userInfo) && 'welcome.Login' === to.name) {
    next({
      name: from.name
    });
    return;
  }

  document.title = _.get(to, 'meta.title') || '标题';

  next();
});

/* eslint-disable */
let vm = new Vue({
  el: '#app',
  router: newRouter,
  store: newStore,
  Common,
  template: '<App/>',
  components: { App }
});

window.vm = vm;
/* eslint-enable */
