import { request } from "@/utils/request.js";

/*获取取消申请数据接口*/
export function getCancelApplyInfoVo(data = {}) {
  return request({
    url: "/notice-service-user/tNoticeTaskCancel/getCancelApplyInfoVo",
    method: "get",
    data: data,
    contentType: 'application/json;charset=UTF-8'
  });
}

/*申请取消合作接口*/
export function applyCancelCooperation(data = {}) {
  return request({
    url: "/notice-service-user/tNoticeTaskCancel/applyCancelCooperation",
    method: "post",
    data: data,
    contentType: 'application/json;charset=UTF-8'
  });
}
