import {
    request
} from '@/utils/request.js';


// 获取通告列表数据接口
export function getNoticeList(data = {}) {
    return request({
        url: '/notice-service-user/tNotice/getNoticeList',
        method: 'get',
        data: data
    })
}

// 获取通告详情数据接口
export function getNoticeDetail(data = {}) {
    return request({
        url: '/notice-service-user/tNotice/getNoticeDetail',
        method: 'get',
        data: data
    })
}

// 通告报名接口
export function signUp(data = {}) {
    return request({
        url: '/notice-service-user/tNotice/signUp',
        method: 'post',
        data: data
    })
}

// 用户端-获取用户已报名列表数据接口
export function mySignedUpList(data = {}) {
    return request({
        url: '/notice-service-user/tNoticeSignUp/mySignedUpList',
        method: 'get',
        data: data
    })
}


// 用户端-获取用户任务列表接口
export function myTaskList(data = {}) {
    return request({
        url: '/notice-service-user/tNoticeSignUp/myTaskList',
        method: 'get',
        data: data
    })
}

// 用户端-报名记录操作接口，optType 0=取消;1=删除
export function optSignUp(data = {}) {
    return request({
        url: '/notice-service-user/tNoticeSignUp/optSignUp',
        method: 'post',
        data: data
    })
}

// 获取顾问二维码接口
export function getConsultantInfo(data = {}) {
    return request({
        url: '/notice-service-user/tNotice/getConsultantInfo',
        method: 'get',
        data: data
    })
}

// 获取通告报名状态接口 返回状态：未报名(-1),待筛选(0), 已选中(1),未选中(2),已取消(3)
export function getLastSignUpStatus(data = {}) {
    return request({
        url: '/notice-service-user/tNoticeSignUp/getLastSignUpStatus',
        method: 'get',
        data: data
    })
}