import Vue    from 'vue';
import Router from 'vue-router';

/**
 * 异步按需加载模块
 */
const Home = resolve => require(['../components/home'], resolve);
const News = resolve => require(['../components/news'], resolve);

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path      : '/',
      name      : 'Home',
      component : Home,
    },
    {
      path      : '/news',
      name      : 'News',
      component : News,
    }
  ]
});