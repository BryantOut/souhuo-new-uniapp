import { request } from "@/utils/request.js";

/*通告任务内容接口*/
export function getTaskContentDetail(data = {}) {
  return request({
    url: "/notice-service-user/tNoticeTaskContent/getTaskContentDetail",
    method: "get",
    data: data,
    contentType: 'application/json;charset=UTF-8'
  });
}

// 通告任务内容接口
export function submitTaskContent(data = {}) {
    return request({
      url: "/notice-service-user/tNoticeTaskContent/submitTaskContent",
      method: "post",
      data: data,
      contentType: 'application/json;charset=UTF-8'
    });
  }
