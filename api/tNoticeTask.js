import { request } from "@/utils/request.js";

/*获取确认合作页面接口*/
export function getConfirmCooperationInfo(data = {}) {
  return request({
    url: "/notice-service-user/tNoticeTask/getConfirmCooperationInfo",
    method: "get",
    data: data,
    contentType: 'application/json;charset=UTF-8'
  });
}
