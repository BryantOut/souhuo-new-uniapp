import {
  request
} from '@/utils/request.js';

/**
 * 用户名片接口
 */
export function getMyInfo(data = {}) {
  return request({
    url: '/notice-service-user/businessCard/getMyInfo',
    method: 'get',
    data: data
  })
}

// 爬取用户链接信息接口
export function submitUrl(data = {}) {
  return request({
    url: '/notice-service-user/businessCard/submitUrl',
    method: 'post',
    data: data
  })
}

// 获取名片主页信息接口
export function getSubmitUrlResult(data = {}) {
  return request({
    url: '/notice-service-user/businessCard/getSubmitUrlResult',
    method: 'get',
    data: data
  })
}

// 提交名片认证接口
export function create(data = {}) {
  return request({
    url: '/notice-service-user/businessCard/create',
    method: 'post',
    data: data
  })
}

// 编辑名片接口
export function editCard(data = {}) {
  return request({
    url: '/notice-service-user/businessCard/editCard',
    method: 'post',
    data: data
  })
}

// 编辑模特认证接口
export function editModelCard(data = {}) {
  return request({
    url: '/notice-service-user/businessCard/editModelCard',
    method: 'post',
    data: data,
    contentType: 'application/json;charset=UTF-8'
  })
}

// 名片删除接口
export function deleteBusinessCard(data = {}) {
  return request({
    url: '/notice-service-user/businessCard/delete',
    method: 'post',
    data: data
  })
}