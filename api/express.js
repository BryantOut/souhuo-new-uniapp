import { request } from "@/utils/request.js";

/*识别快递单号公司接口*/
export function auto(data = {}) {
  return request({
    url: "/notice-service-user/express/auto",
    method: "get",
    data: data,
    contentType: "application/json;charset=UTF-8",
  });
}

/*提交快递单号接口*/
export function submitExpress(data = {}) {
  return request({
    url: "/notice-service-user/express/submitExpress",
    method: "post",
    data: data,
    contentType: "application/json;charset=UTF-8",
  });
}

/*提提交回寄快递单号接口*/
export function submitReturnExpress(data = {}) {
  return request({
    url: "/notice-service-user/returnExpress/submitReturnExpress",
    method: "post",
    data: data,
    contentType: "application/json;charset=UTF-8",
  });
}

/*获取物流信息接口*/
export function getUTaskExpress(data = {}) {
  return request({
    url: "/notice-service-user/express/getUTskExpress",
    method: "get",
    data: data,
    contentType: "application/json;charset=UTF-8",
  });
}

/*获获取回寄物流信息接口*/
export function getUTaskReturnExpress(data = {}) {
  return request({
    url: "/notice-service-user/returnExpress/getUTaskExpress",
    method: "get",
    data: data,
    contentType: "application/json;charset=UTF-8",
  });
}
