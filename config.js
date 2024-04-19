// url助手
function urlHandler() {
	let BASE_API_URL = 'http://192.168.2.68:9092'; // 接口地址
	let SHARE_URL = 'http://192.168.2.68:8080'; // 分享地址
	let HREF_BASE_URL = 'http://192.168.2.68:8080?code=xxx'; // 前端基础路径
	let IMG_BASE_URL = 'http://youp-read.leqilucky.com'; // 图片地址
	let APP_ID = 'wxaa3a999db5d744c6'; // 测试号appid

	// #ifndef MP-WEIXIN
	if (process.env.NODE_ENV === 'production') {
		// 生产接口地址
		// APP_ID = 'wxaa3a999db5d744c6';
		SHARE_URL = 'https://sapph5.lqlucky.com';
		BASE_API_URL = 'https://sapph5api.leqilucky.com'
		HREF_BASE_URL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${SHARE_URL}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
	}
	// #endif
	// #ifdef MP-WEIXIN
	let envVs = wx.getAccountInfoSync().miniProgram.envVersion
	if (envVs != 'develop') {
		// 体验版和生产版本
		BASE_API_URL = 'https://sapph5api.leqilucky.com'
		SHARE_URL = 'https://sapph5.lqlucky.com'
	}
	// #endif
	return {
		BASE_API_URL,
		SHARE_URL,
		IMG_BASE_URL,
		HREF_BASE_URL,
		APP_ID,
	}
}

export const BASE_API_URL = urlHandler().BASE_API_URL
export const SHARE_URL = urlHandler().SHARE_URL
export const IMG_BASE_URL = urlHandler().IMG_BASE_URL
export const APP_ID = urlHandler().APP_ID
export const HREF_BASE_URL = urlHandler().HREF_BASE_URL