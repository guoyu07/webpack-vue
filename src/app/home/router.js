
/**
 * 异步按需加载模块
 */
const Home    = resolve => require(['./components/home'], resolve);


/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [
    // 首页
    {
      path: '/',
      name: 'home.Home',
      component: Home,
      meta: {
        title: '全民易购首页',
      }
    },
  ]
};

export default router;