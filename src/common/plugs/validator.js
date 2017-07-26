/**
 * Validator表单验证插件
 * Version Beta 0.0.1
 */

/* eslint-disable */
let Vue;

/**
 *	vd-validate 验证
 *	vd-notify 	返回提示信息
 *	vd-type   	正则组匹配类型
 */

import _ 					from 'lodash';
import rulesData 	from '../services/validator';

class Validator {
	constructor () {
		this.installed 	= false;
		this.validate  	= 'vd-validate';
		this.required  	= 'vd-required';
		this.type 	 		= 'vd-type';
		this.notify 	  = 'vd-notify';
		this.name 	 		= 'name';
		this.isBreak		= false;
		this.data      	= {
			// 0 返回正常，1 空值，2 验证不通过，3 正则组找不到
			code: 0,
			data: {}
		};
	}

	// 正则组
	rules () {
		return _.assign({}, rulesData, {
		});
	}

	// 判断空值
	isEmpty (value) {
		if (0 >= value.length) {
			return true;
		}
		return false;
	}

	// 验证过滤
	valiData (item) {
		let type 	= item.getAttribute(this.type);
		if (undefined === this.rules()[type]) {
			return false;
		}
		let value = item.value;
		return this.rules()[type](value);
	}

	// 无限循环子节点
	hasAttribute (item) {
		let self = this;

		if (0 < item.children.length) {
			for (let i = 0; i < item.children.length; i ++) {
				let that = item.children[i];

				let name 		= that.getAttribute(self.name) || that.getAttribute(self.type) || null;
				let type 		= that.getAttribute(self.type);
				let notify 	= that.getAttribute(self.notify);

				let objTip  = {};

				let objData = {
					text: `${name}不能为空`,
					patt: `${name}填写不正确`,
				}

				try {
					objTip = JSON.parse(notify);
				}
				catch (err) {
					objTip = objData
				}

				if (_.isEmpty(objTip)) {
					objTip = objData
				}

				if (true === that.hasAttribute(self.required) && self.isEmpty(that.value)) {

					self.data = {
						code: 1,
						data: {
							msg: objTip.text,
							el: name
						}
					};
					that.focus();
					self.isBreak = true;
					return self.data;
				}
				else if (true === that.hasAttribute(self.validate)) {

					if (self.isEmpty(that.value)) {
						self.data = {
							code: 1,
							data: {
								msg: objTip.patt,
								el: name
							}
						};
						that.focus();
						self.isBreak = true;
						break;
					}
					else {
						let data = self.valiData(that);
						if (true !== data && null !== type) {
							self.data = Object.assign({}, self.data, {
								code: undefined === self.rules()[type] ? 3 : 2,
								data: Object.assign({}, self.data.data, {
									msg: undefined === self.rules()[type] ? `${name}找不到验证规则` : objTip.patt,
									el: name
								}),
							});
							that.focus();
							self.isBreak = true;
							return self.data;
						}
					}
				}

				if (0 < that.children.length && false === self.isBreak) {
					self.hasAttribute(that);
				}
			}
		}

	}

	install (externalVue) {
		if (this.installed) {
			return;
		}

		Vue = externalVue;
		let self = this;

		// 验证方法
		Vue.prototype.$validator = function (item) {
			if (0 < item.children.length) {
				self.data   = {
					code: 0
				};
				self.isBreak = false;
				self.hasAttribute(item);
			}

			return self.data;
		},

		Vue.prototype.$rules = self.rules();

		this.installed = true;
	}
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Validator);
}

export default new Validator();

/* eslint-enable */