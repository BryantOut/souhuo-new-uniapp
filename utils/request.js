import store from '@/store/index'
import baseUtil from "@/utils/baseUtils";
import {
	BASE_API_URL
} from '@/config.js';

define({
	request: function({
		url = '',
		data = {},
		method = 'post',
		contentType = 'application/x-www-form-urlencoded'
	}) {
		return new Promise((resolve, reject) => {
			let tokenid = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''
			uni.request({
				url: BASE_API_URL + url,
				data: {
					tokenid,
					...data
				},
				method: method ? method : 'GET',
				header: {
					'content-type': contentType
				},
				timeout: 10000,
				success: function(res) {
					let {
						IsError,
						ErrCode
					} = res.data
					if (IsError) {
						if (ErrCode === 303) {
							// token 不存在或者已过期.
							uni.clearStorageSync()
							store.commit('SET_CODE_IS_VAILD', false)
							if (process.env.NODE_ENV === 'development') {
								baseUtil.normalErrMsgHandler(res.ErrMsg);
							} else {
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/Index/index'
									})
								}, 1000)
							}
						} else {
							reject(res.data)
						}
					} else {
						resolve(res.data)
					}
				},
				fail: function(res) {
					uni.hideLoading();
					reject(res.data)
				}
			})
		})
	}
});
