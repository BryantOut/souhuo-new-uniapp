import { request } from "@/utils/request.js";

/**
 * 检测登陆态
 * 返回 isLogin
 */
export function checkLogin(data = {}) {
  return request({
    url: "/WechatService/CheckLogin",
    method: "post",
    data,
  });
}

/**
 * 小程序登录接口
 */
export function wxLogin(data = {}) {
  return request({
    url: "/wyfl-auth/miniAppService/login",
    method: "get",
    data: data,
  });
}

/**
 * h5登录接口
 */
export function h5Login(data = {}) {
  return request({
    url: "/WechatService/Login",
    method: "post",
    data,
  });
}

// 注册接口
export function register(data = {}) {
  return request({
    url: "/notice-service-user/userMp/register",
    method: "get",
    data: data,
  });
}

// 获取短信验证码接口
export function getTelCode(data = {}) {
  return request({
    url: "/notice-service-user/login/getTelCode",
    method: "get",
    data: data,
  });
}

// 获取用户个人信息接口
export function personalInfo(data = {}) {
  return request({
    url: "/notice-service-user/user/my",
    method: "get",
    data: data,
  });
}

// 获取上传图片信息接口
export function upaiyunUploadInfoGet(data = {}) {
  return request({
    url: "/notice-service-user/keyValue/upaiyunUploadInfoGet",
    method: "get",
    data: data,
  });
}

// JS-SDK使用权限签名算法
export function wxJsSignatureInfo(data = {}) {
  return request({
    url: "/wyfl-service-thirdapi/noticeWechat/wxJsSignatureInfo",
    method: "get",
    data: data,
  });
}
