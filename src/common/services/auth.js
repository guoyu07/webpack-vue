import _ 						from 'lodash';
import md5 					from 'md5';
import axios 				from 'axios';
import LocalStorage from './localStorage.cookie';

/**
 * 获取appCode
 */
class Auth {
	constructor () {
		this.appKey 		= 'eg07697080465133';
		this.appSecret 	= 'SyZsXMHc1FK8yuD9XcJ7u7hagBsx7agaLyfk9k4BoAqwo2Q45pCmPmgMOCcSHKyk';
		this.timestamp 	= parseInt(new Date().getTime() / 1000);
		this.expired    = 60 * 50;
		this.appCode 		= md5(md5(this.appKey + this.appSecret) + this.timestamp);
	}

	get () {
		let self = this;
		let asyncData = async function () {
			let data = await LocalStorage.get('secretCode');
			if (!_.isEmpty(data) && data.expired > parseInt(new Date().getTime() / 1000)) {
				return data;
			}

			return await self.ajax().then(res => res);
		};

		return asyncData();
	}

	set (name, value) {
		if (!_.isEmpty(name) && !_.isEmpty(value)) {
			LocalStorage.set(name, value, this.expired);
		}
	}

	ajax () {
		return axios.get('/authorization/v100/index/getCode', {
			params: {
				appKey  	: this.appKey,
				appCode 	: this.appCode,
				timestamp : this.timestamp
			}
		})
		.then((res) => {
			if ('success' === res.state) {
				this.set('secretCode', res.data);
				return res;
			}
		})
		.catch(() => {});
	}
}

export default new Auth();
