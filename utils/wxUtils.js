const wx = require('jweixin-module')
import {
    wxJsSignatureInfo
} from '@/api/user'
import {
    SHARE_URL,
    APP_ID
} from "@/config.js";
import store from '@/store/index'

export default {
    // https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
    // 微信网页开发 /JS-SDK说明文档
    signatureInfoApi() {
        return new Promise((resolve, reject) => {
            let htmlArray = window.location.href.split('#')
            let params = {
                url: htmlArray[0]
            }
            // params = encodeURIComponent(params)
            wxJsSignatureInfo(params).then(res => {
                // 通过config接口注入权限验证配置
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: APP_ID, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名
                    jsApiList: [
                        'updateAppMessageShareData',
                        'onMenuShareAppMessage',
                        'hideMenuItems',
                        'showMenuItems',
                        'chooseImage',
                        'getLocalImgData',
                        'getImageInfo',
                        'getFileSystemManager'
                    ] // 必填，需要使用的JS接口列表
                });
                store.commit('SET_WX_JS_SIGNATURE_INFO', res)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 分享接口
    shareApi(params) {
        wx.ready(function () { //需在用户可能点击分享按钮前就先调用
            let {
                title,
                desc,
                redirectRouter,
                imgUrl
            } = params;
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: `${SHARE_URL}/?redirectRouter=${redirectRouter}#`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 设置成功
                },
            })
        });
    },
    // 批量隐藏功能按钮接口
    hideMenuItems() {
        // https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#64
        // 附录3-所有菜单项列表
        wx.ready(function () {
            wx.hideMenuItems({
                menuList: ['menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:share:appMessage'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        })
    },
    // 批量显示功能按钮接口
    showMenuItems() {
        wx.ready(function () {
            wx.showMenuItems({
                menuList: ['menuItem:share:appMessage']
            })
        })
    }
}