import Vue        from 'vue';

import App        from './App.vue';
import Store      from './store';
import router     from './router';

Vue.config.productionTip = false;

/* eslint-disable */
new Vue({
  el: '#app',
  Store,
  router,
  template: '<App/>',
  components: { App }
});
/* eslint-enable */
