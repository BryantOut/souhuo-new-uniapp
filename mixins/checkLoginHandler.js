import { checkLogin, h5Login, wxLogin } from "@/api/user";

import { mapGetters, mapMutations } from "vuex";

import { SHARE_URL, HREF_BASE_URL, APP_ID } from "@/config.js";

import wxUtils from "@/utils/wxUtils";

export default {
  data() {
    return {
      sappCode: "", // 用户编码
      isFirstEnter: true, // 是否首次进入
      skeletonLoading: true, // 是否展示骨架屏
      unLoginCantReadPageRoutes: ["pages/Cooperation/index"], // 未登录查看不了的路由
      tabList: [
        "/pages/Index/index",
        "/pages/Cooperation/index",
        "/pages/My/index",
      ], // 是否是tabBar 页面
    };
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "token",
      "unionID",
      "loginState",
      "codeIsValid",
      "wxJsSignatureInfo",
    ]),
    // 当前页面路由地址
    currentRoute() {
      return this.$mp.page.route;
    },
  },
  onShow() {
    this.closePopup();
    if (!this.codeIsValid && !this.isFirstEnter) {
      // code无效且非首次进入则重新获取code
      this.onShowApp();
    } else if (
      !this.isFirstEnter &&
      this.codeIsValid &&
      (this.isNeedRefreshPage ||
        (this.unLoginCantReadPageRoutes.includes(this.currentRoute) &&
          !this.loginState))
    ) {
      // 非首次进入且code有效，并且每次重新进入需要刷新数据
      this.initHandler();
    } else if (!this.isFirstEnter && this.skeletonLoading) {
      this.initHandler();
    }
    if (this.wxJsSignatureInfo) {
      this.menuHandler();
    }
  },
  onHide() {
    this.isFirstEnter = false;
  },
  onLoad(option) {
    // #ifdef MP-WEIXIN
    this.sappCode = option.sappCode;
    // #endif
    this.onShowApp();
  },
  methods: {
    ...mapMutations([
      "SET_TOKEN",
      "SET_UNION_ID",
      "SET_LOGIN_STATE",
      "SET_CODE_IS_VAILD",
      "RESET_ALL_FILTERS",
      "SET_NICK",
      "SET_HEAD_PORTRAITURL",
      "SET_LOGIN_POPUP_SHOW",
      "SET_LOGIN_BY_PHONE_POPUP_SHOW",
      "SET_USER_AGREEMENT_POPUP_SHOW",
      "SET_PRIVACY_AGREEMENT_POPUP_SHOW",
      "SET_HOW_TO_BEHAVIOR_POPUP_SHOW",
      "SET_IN_COOPERATION_SIGNUP_NUM",
    ]),
    onShowApp() {
      // 首次进入调用检测登录接口
      if (this.codeIsValid) {
        this.initHandler();
      } else {
        // #ifdef MP-WEIXIN
        this.checkLogin();
        // #endif
        // #ifdef H5
        this.h5LoginHandler();
        // #endif
      }
    },
    // 退出登录
    logOut() {
      // 清除缓存
      uni.clearStorageSync();
      // 重置vuex的数据
      this.RESET_ALL_FILTERS();
      // #ifdef MP-WEIXIN
      // 重定向到首页
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/Index/index",
        });
      }, 1000);
      // #endif
      // #ifdef H5
      let baseHrefRandom = "";
      let redirectRouter = this.$baseUtil.getUrlKey("redirectRouter");
      if (process.env.NODE_ENV === 'production' && redirectRouter) {
        // 从分享页进来时，微信会给分享的链接添加一些后缀，所以进来时，需要将后缀截掉，否则无法跳转到相应的页面
        let link = `${SHARE_URL}?redirectRouter=${
          window.location.href.split("redirectRouter=")[1].split("&code=")[0]
        }`;
        let encodeLink = encodeURIComponent(link);
        baseHrefRandom = "?time=" + new Date().getTime();
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${encodeLink}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect${baseHrefRandom}`;
      } else {
        window.location.href = HREF_BASE_URL;
      }
      // #endif
    },
    // 检测登录
    checkLogin() {
      // 对接原有检测登录接口
      checkLogin()
        .then((res) => {
          // res.isLogin = false
          this.SET_LOGIN_STATE(res.isLogin);
          // #ifdef H5
          if (res.isLogin) {
            if (!this.isNeedUrlRedirect()) {
              this.initHandler();
            }
          } else {
            this.logOut();
          }
          // #endif
          // #ifdef MP-WEIXIN
          if (res.isLogin && this.unionID) {
            this.initHandler();
          } else {
            this.wxLoginHandler();
          }
          // #endif
        })
        .catch((err) => {
          this.$baseUtil.normalErrMsgHandler(err);
        });
    },
    // 是否需要重定向逻辑
    isNeedUrlRedirect() {
      let redirectRouter = this.$baseUtil.getUrlKey("redirectRouter"); // 重定向地址
      if (!redirectRouter) return false;
      const regForMainRoute = /\/pages\/[^?]*/gi; // 正则规则：重定向地址路由（不包含参数）
      let mainRoute = redirectRouter.match(regForMainRoute)
        ? redirectRouter.match(regForMainRoute)[0]
        : "/pages/Index/index"; // 重定向地址路由（不包含参数）
      const regForNavUrl = /\/pages\/.+/gi; // 正则规则：重定向地址路由（包含参数）
      let navUrl = redirectRouter.match(regForNavUrl)
        ? redirectRouter.match(regForNavUrl)[0]
        : "/pages/Index/index"; // 重定向地址路由（包含参数）
      if (mainRoute && mainRoute.indexOf(this.currentRoute) !== -1) {
        return false;
      } else {
        if (this.tabList.includes(mainRoute)) {
          uni.switchTab({
            url: navUrl,
          });
        } else {
          uni.navigateTo({
            url: navUrl,
          });
        }
        return true;
      }
    },
    // h5登录逻辑
    h5LoginHandler() {
      if (this.token) {
        // 已经有了token检查是否过期
        this.checkLogin();
        return;
      }
      let code = this.$baseUtil.getUrlKey("code");
      let getWechatCode = this.$baseUtil.getUrlKey("getWechatCode");
      if (code) {
        if (getWechatCode === "souhuo2024") return;
        this.login({
          code,
          tempFunName: h5Login,
        });
      } else {
        this.logOut();
      }
    },
    // 小程序登录逻辑
    wxLoginHandler() {
      uni.login({
        provider: "weixin",
        success: (res) => {
          this.login({
            code: res.code,
          });
        },
        fail: (err) => {
          if (err.errMsg)
            this.$baseUtil.showToast({
              title: err.errMsg,
            });
        },
      });
    },
    // 登录逻辑
    login({ code = "", tempFunName = wxLogin }) {
      tempFunName({
        code: code,
      })
        .then((res) => {
          // res.data.isLogin = false
          this.SET_TOKEN(res.data.tokenId);
          this.SET_LOGIN_STATE(res.data.isLogin);
          this.SET_IN_COOPERATION_SIGNUP_NUM(res.data.inCooperationSignUpNum);
		  this.SET_CODE_IS_VAILD(true);
          // #ifdef H5
          if (!this.isNeedUrlRedirect()) {
            this.initHandler();
          }
          // #endif
          // #ifdef MP-WEIXIN
          this.SET_UNION_ID(res.data.loginVoPart.unionid);
          this.initHandler();
          // #endif
        })
        .catch((err) => {
          // #ifdef H5
          if (process.env.NODE_ENV === "development") {
            this.$baseUtil.normalErrMsgHandler(err);
          } else {
            this.logOut();
          }
          // #endif
          // #ifdef MP-WEIXIN
          this.$baseUtil.normalErrMsgHandler(err);
          // #endif
        });
    },
    showLoginModal() {
      uni.showModal({
        title: "提示",
        content: "请先完成登录，登录后即可查看订单",
        confirmText: "我知道了",
        cancelText: "回到首页",
        success: (res) => {
          if (res.confirm) {
            this.checkLoginBeforeOperation(null, 1);
          } else if (res.cancel) {
            uni.switchTab({
              url: "/pages/Index/index",
            });
          }
        },
      });
    },
    async initHandler() {
      if (!this.codeIsValid) {
        this.SET_CODE_IS_VAILD(true);
      }
      if (
        this.unLoginCantReadPageRoutes.includes(this.currentRoute) &&
        !this.loginState
      ) {
        this.showLoginModal();
        return;
      }

      // 注入微信jsssdk
      if (!this.wxJsSignatureInfo) {
        await wxUtils.signatureInfoApi().then((res) => {
          this.menuHandler();
        });
      }
      setTimeout(() => {
        if (this.init) this.init();
      }, 100);
    },
    // 微信网页批量显示功能按钮接口
    menuHandler() {
      const showMenuRouterNameList = [
        "pages/Index/index",
        "pages/NoticeDetail/index",
        "pages/NoticeDetail/status2",
      ];
      if (showMenuRouterNameList.includes(this.currentRoute)) {
        wxUtils.showMenuItems();
      } else {
        wxUtils.hideMenuItems();
      }
      if (this.setJSSDK) {
        this.setJSSDK();
      }
    },
    // 操作前需要做登录校验
    checkLoginBeforeOperation(callback, loginMethods = 0) {
      if (this.loginState) {
        if (callback) callback();
      } else {
        // #ifdef H5
        if (loginMethods === 0) {
          // 弹出登录弹窗
          this.SET_LOGIN_BY_PHONE_POPUP_SHOW(true);
        } else {
          uni.navigateTo({
            url: "/pages/Login/loginByPhone",
          });
        }
        // #endif
        // #ifdef MP-WEIXIN
        this.getUserInfo(loginMethods);
        // #endif
      }
    },
    // 获取用户信息
    getUserInfo(loginMethods) {
      // uni.showLoading({
      //     title: "加载中",
      // });
      // ifdef MP-WEIXIN
      // 获取用户信息
      uni.getUserProfile({
        desc: "获取你的昵称、头像、地区及性别",
        success: (infoRes) => {
          // console.log(infoRes)
          // uni.hideLoading();
          let { nickName, avatarUrl } = infoRes.userInfo;
          this.SET_NICK(nickName);
          this.SET_HEAD_PORTRAITURL(avatarUrl);
          if (loginMethods === 0) {
            // 弹出登录弹窗
            this.SET_LOGIN_POPUP_SHOW(true);
          } else {
            // 进入登录页面
            uni.navigateTo({
              url: "/pages/Login/index",
            });
          }
        },
        fail: () => {
          this.$baseUtil.showToast({
            title: "请允许授权进行登录，再进行操作",
          });
        },
      });
      // endif
    },
    closePopup() {
      this.SET_LOGIN_POPUP_SHOW(false);
      this.SET_LOGIN_BY_PHONE_POPUP_SHOW(false);
      this.SET_USER_AGREEMENT_POPUP_SHOW(false);
      this.SET_PRIVACY_AGREEMENT_POPUP_SHOW(false);
      this.SET_HOW_TO_BEHAVIOR_POPUP_SHOW({
        isShow: false, // 是否展示教程弹窗
        title: "", // 弹窗标题
        imgList: [], // 教程图片列表
      });
    },
  },
};
