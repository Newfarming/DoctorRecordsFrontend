import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export function login(data) {
  // console.log('data', data)
  return request({
    url: '/user/login',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token: token }
  })
}

export function getUserDetails(params) {
  params.token = getToken()
  return request({
    url: '/user/details',
    method: 'get',
    params: params
  })
}

export function userAdd(params) {
  console.log('userAdd params', params)
  params.token = getToken()
  return request({
    url: '/user/add',
    method: 'POST',
    data: params
  })
}

export function userEdit(params) {
  // console.log('data', data)
  params.token = getToken()
  return request({
    url: '/user/edit',
    method: 'post',
    data: params
  })
}

export function userDelete(params) {
  // console.log('data', data)
  params.token = getToken()
  return request({
    url: '/user/delete',
    method: 'get',
    data: params
  })
}

export function getPermissionList(params) {
  // console.log('data', data)
  params.token = getToken()
  return request({
    url: '/permission/list',
    method: 'get',
    data: params
  })
}

