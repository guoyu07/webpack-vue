import _   		from 'lodash';

const state = [
	{ Home 							: require('./components/home/state') },
];


/**
* 页面state请按照下面格式进行添加
*/
export default {

	// 公共部分
	common: {
	},

	//路由部分
	store: [
		// 首页
		{
			name 		: 'home.Home',
			modules : {
				Home 	 					: _.find(state, 'Home').Home.default,
			}
		},

	]
};