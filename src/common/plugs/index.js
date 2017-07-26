import Vue 							from 'vue';

// 待删除
import vueWechatTitle 	from 'vue-wechat-title';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueScroller      from 'vue-scroller';

import Toast    				from './toast';
import Loading 					from './loading';
import Validator 				from './validator';
import UserInfo 				from './user_info';

Vue.use(vueWechatTitle);
Vue.use(VueAwesomeSwiper);
Vue.use(VueScroller);

Vue.use(Toast);
Vue.use(Loading);
Vue.use(Validator);
Vue.use(UserInfo);