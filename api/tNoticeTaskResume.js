import { request } from "@/utils/request.js";

/*获取恢复申请页面数据接口*/
export function getResumeDetail(data = {}) {
  return request({
    url: "/notice-service-user/tNoticeTaskResume/getResumeDetail",
    method: "get",
    data: data,
    contentType: 'application/json;charset=UTF-8'
  });
}

// 提交恢复申请接口
export function submitResumeAudit(data = {}) {
    return request({
      url: "/notice-service-user/tNoticeTaskResume/submitResumeAudit",
      method: "post",
      data: data,
      contentType: 'application/json;charset=UTF-8'
    });
  }
