import { upaiyunUploadInfoGet } from "@/api/user";
const md5 = require("js-md5");

const getDefaultState = () => {
  return {
    token: "",
    unionID: "",
    sappCode: "",
    loginState: false,
    codeIsValid: false,
    headPortraitUrl: "",
    nick: "",
    wxCode: "",
    uploadUserInfo: "", // 上传图片信息接口
    wxJsSignatureInfo: null, // JS-SDK使用权限签名算法
  };
};

const NEWCOMER = 'NEWCOMER'

const user = {
  state: {
    token: uni.getStorageSync("token") ? uni.getStorageSync("token") : "", // token
    unionID: uni.getStorageSync("unionID") ? uni.getStorageSync("unionID") : "", // unionID
    sappCode: "", // 用户编码
    loginState: false, // 登录状态
    codeIsValid: false, // code是否有效
    headPortraitUrl: "", // 头像
    nick: "", // 昵称
    wxCode: "", // 微信手机号code（用于解析手机号）
    uploadUserInfo: "", // 上传图片信息接口
    wxJsSignatureInfo: null, // JS-SDK使用权限签名算法
  },
  actions: {
    // 获取又拍云配置信息
    getUploadUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        upaiyunUploadInfoGet()
          .then((response) => {
            let uploadUserInfo = {
              uploadUrl: response.uploadUrl,
              loginName: response.loginName,
              screct: response.screct,
              uploadVideo: response.uploadVideo,
            };
            commit("SET_UPLOAD_USER_INFO", uploadUserInfo);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  mutations: {
    SET_LOGIN_STATE: (state, loginState) => {
      state.loginState = loginState;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      uni.setStorageSync("token", token);
    },
    SET_IS_HAVE_UNFINISHED_ORDER: (state, hasOrder) => {
        state.hasOrder = hasOrder;
    },
    SET_NEW_PERSON_FREE_ORDER_COUNT: (state, newPersonFreeOrderCount) => {
        state.newPersonFreeOrderCount = newPersonFreeOrderCount;
    },
    SET_IS_NEW_PERSON: (state, isNewPerson) => {
        if (isNewPerson) {
            uni.setStorageSync(md5(NEWCOMER), md5(isNewPerson))
        } else {
            uni.removeStorageSync(md5(NEWCOMER))
        }
    },
    SET_UNION_ID: (state, unionID) => {
      state.unionID = unionID;
      uni.setStorageSync("unionID", unionID);
    },
    SET_CODE_IS_VAILD: (state, codeIsValid) => {
      state.codeIsValid = codeIsValid;
    },
    SET_HEAD_PORTRAITURL: (state, headPortraitUrl) => {
      state.headPortraitUrl = headPortraitUrl;
    },
    SET_NICK: (state, nick) => {
      state.nick = nick;
    },
    SET_WX_CODE: (state, wxCode) => {
      state.wxCode = wxCode;
    },
    SET_UPLOAD_USER_INFO: (state, uploadUserInfo) => {
      state.uploadUserInfo = uploadUserInfo;
    },
    SET_WX_JS_SIGNATURE_INFO: (state, wxJsSignatureInfo) => {
      state.wxJsSignatureInfo = wxJsSignatureInfo;
    },
    RESET_ALL_FILTERS: (state) => {
      const initState = getDefaultState();
      Object.keys(initState).forEach((key) => {
        state[key] = initState[key];
        uni.setStorageSync(key, initState[key]);
      });
    },
  },
  getters: {
    loginState: (state) => state.loginState,
    token: (state) => state.token,
    unionID: (state) => state.unionID,
    codeIsValid: (state) => state.codeIsValid,
    headPortraitUrl: (state) => state.headPortraitUrl,
    nick: (state) => state.nick,
    wxCode: (state) => state.wxCode,
    uploadUserInfo: (state) => state.uploadUserInfo,
    wxJsSignatureInfo: (state) => state.wxJsSignatureInfo,
  },
};

export default user;
