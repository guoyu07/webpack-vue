import _ 				from 'lodash';
import qs     	from 'qs';
import Vue 			from 'vue';
import axios 		from 'axios';
import VueAxios from 'vue-axios';
import Auth 		from './auth';
import Loading  from '../plugs/loading';

Vue.use(VueAxios, axios);
Vue.use(Loading);

/*数据接口*/
window.APIs = {
	//图文列表_[首页]
	home_imglist : window.API_DOMAIN + '/img_list_page_1.json',
	//图文列表_[列表页]
	list_imglist : window.API_DOMAIN + '/img_list_page_1.json',
	//省份
	addr_provs : window.API_DOMAIN + '/addr_provs.json',
	//城市
	addr_citys : window.API_DOMAIN + '/addr_citys.json',
	//城镇
	addr_towns : window.API_DOMAIN + '/addr_towns.json',
	//品牌
	brands : window.API_DOMAIN + '/brands.json',

	/************详情页************/
	//getGoodsDetail : window.API_DOMAIN + '/getGoodsDetail.json',
	getGoodsDetail : '/goods/v100/index/getGoodsDetail?goodsId=9928',
	//用户定位
	location : window.API_DOMAIN + '/location.json',
	//收藏提交
	postGoodSave : window.API_DOMAIN + '/postTest.json',
	//评论
	getComments : window.API_DOMAIN + '/getComments.json',
	//尺寸
	details_size : window.API_DOMAIN + '/details_size.json',
};


/**
 * axios 配置
 */

axios.defaults.baseURL = 'http://api.eg.com/index.php',
axios.defaults.timeout = 20000;

const options = {
	headers: {}
};

/* eslint-disable */
let $toast = function (tips, opt = {duration: 3500}) {
  if (document.querySelector('.toast')) {
    return;
  }
  let toastTpl = Vue.extend({
    template: `<div class="toast">${tips}</div>`
  });

  let tpl = new toastTpl().$mount().$el;
  document.body.appendChild(tpl);
  setTimeout(function () {
    document.body.removeChild(tpl);
  }, opt.duration);
};

/* eslint-enable */


/**
 * 每次请求都在header里面带上appKey、secretCode
 */
Auth.get().then((res) => {
	if (res.data) {
		options.headers = _.assign({}, options.headers, {
			appKey 		: Auth.appKey,
			secretCode: res.data,
			'Content-Type': 'application/x-www-form-urlencoded'
		});
	}
});


// 注入request请求信息
axios.interceptors.request.use((config) => {
	// Vue.$loading();
	config = _.assign({}, config, options, {data: qs.stringify(config.data)});
	return config;
}, (err) => {
  return Promise.reject(err);
});


//返回结果拦截
axios.interceptors.response.use((response) => {
	// Vue.$loadingClose();
	if (`${axios.defaults.baseURL}/authorization/v100/index/verify` === _.get(response, 'config.url')) {
		if ('false' === response.data) {
			Auth.ajax();
		}
	}

	let data;
	if (200 === response.status) {
		data = _.get(response, 'data');
	}
	else {
		data = response;
	}
  return data;
}, (error) => {
	$toast(error);
  // return Promise.reject(error.response.data);
});