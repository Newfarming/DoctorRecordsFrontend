import Cookies from 'js-cookie'

const TokenKey = 'token'
const  permissionType = 'permission_type'
const  permissionName = 'permission_name'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setPermissionTypeCookie(token) {
  return Cookies.set(permissionType, token)
}
export function getPermissionTypeCookie(token) {
  return Cookies.get(permissionType, token)
}
export function removePermissionTypeCookie(token) {
  return Cookies.remove(permissionType, token)
}
export function setPermissionNameCookie(token) {
  return Cookies.set(permissionName, token)
}
export function getPermissionNameCookie(token) {
  return Cookies.get(permissionName, token)
}
export function removePermissionNameCookie(token) {
  return Cookies.remove(permissionName, token)
}
