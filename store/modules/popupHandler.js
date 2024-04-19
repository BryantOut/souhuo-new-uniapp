const popupHandler = {
    state: {
        loginPopupShow: false, // 登录弹窗是否展示
        loginByPhonePopupShow: false, // 手机验证码登录弹窗是否展示
        sharePopupInfo: {
            isShow: false, // 是否展现
            posterSrc: '' // 图片资源
        }, // 分享弹窗信息
        privacyAgreementPopupShow: false, // 隐私政策是否展示
        userAgreementPopupShow: false, // 用户协议是否展示
        howToBehaviorPopupShow: {
            isShow: false, // 是否展示教程弹窗
            title: '如何设置截图验证码', // 弹窗标题
            imgList: [] // 教程图片列表
        }
    },
    mutations: {
        SET_LOGIN_POPUP_SHOW: (state, loginPopupShow) => {
            state.loginPopupShow = loginPopupShow
        },
        SET_LOGIN_BY_PHONE_POPUP_SHOW: (state, loginByPhonePopupShow) => {
            state.loginByPhonePopupShow = loginByPhonePopupShow
        },
        SET_SHARE_POPUP_INFO: (state, sharePopupInfo) => {
            state.sharePopupInfo = sharePopupInfo
        },
        SET_PRIVACY_AGREEMENT_POPUP_SHOW: (state, privacyAgreementPopupShow) => {
            state.privacyAgreementPopupShow = privacyAgreementPopupShow
        },
        SET_USER_AGREEMENT_POPUP_SHOW: (state, userAgreementPopupShow) => {
            state.userAgreementPopupShow = userAgreementPopupShow
        },
        SET_HOW_TO_BEHAVIOR_POPUP_SHOW: (state, howToBehaviorPopupShow) => {
            state.howToBehaviorPopupShow = howToBehaviorPopupShow
        },
    },
    getters: {
        getLoginPopupShow: state => state.loginPopupShow,
        getLoginByPhonePopupShow: state => state.loginByPhonePopupShow,
        getSharePopupInfo: state => state.sharePopupInfo,
        getPrivacyAgreementPopupShow: state => state.privacyAgreementPopupShow,
        getUserAgreementPopupShow: state => state.userAgreementPopupShow,
        getHowToBehaviorPopupShow: state => state.howToBehaviorPopupShow
    }
}

export default popupHandler