
/**
  * 用法：在实例里面
  * this.$rules.phone(13800138000);
  */

export default {
	// 邮箱
	email (value) {
		return /^([a-z0-9\+\_\-]+)(\.[a-z0-9\+\_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/.test(value) || 'regexp';
	},

	// 手机号码
  phone (value) {
    return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/.test(value) || 'regexp';
  },

  // 身份证
  identity (value) {
    return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/.test(value) || 'regexp';
  },

  // 银行卡
  bank (value) {
    return /^(\d{16}|\d{19})$/.test(value) || 'regexp';
  },
};