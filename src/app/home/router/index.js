import Vue    from 'vue';
import Router from 'vue-router';

import Home   from '../components/home';
import News   from '../components/news';

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