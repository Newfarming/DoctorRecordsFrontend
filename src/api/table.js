import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export function getUserList(params) {
  params.token = getToken()
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function getDepartList(params) {
  params.token = getToken()
  return request({
    url: '/depart/list',
    method: 'get',
    params
  })
}
export function getDepartDetails(params) {
  params.token = getToken()
  return request({
    url: '/depart/details',
    method: 'get',
    params
  })
}
export function departDelete(params) {
  params.token = getToken()
  return request({
    url: '/depart/delete',
    method: 'get',
    params
  })
}
export function departEdit(params) {
  params.token = getToken()
  return request({
    url: '/depart/edit',
    method: 'post',
    data: params
  })
}
export function departAdd(params) {
  params.token = getToken()
  return request({
    url: '/depart/add',
    method: 'post',
    data: params
  })
}
