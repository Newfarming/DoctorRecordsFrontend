import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getPermissionNameCookie, setPermissionNameCookie, removePermissionNameCookie, getPermissionTypeCookie, setPermissionTypeCookie, removePermissionTypeCookie } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    permission_name: getPermissionNameCookie(),
    permission_type: getPermissionTypeCookie(),
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION_TYPE: (state, permission_type) => {
    state.permission_type = permission_type
  },
  SET_PERMISSION_NAME: (state, permission_name) => {
    state.permission_name = permission_name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log('userInfo', userInfo)
      login({ username: username.trim(), password: password }).then(response => {
        console.log('response', response)
        const { data } = response
        console.log('data token', data)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_PERMISSION_NAME', data.permission_name)
        setPermissionNameCookie(data.permission_name)
        commit('SET_PERMISSION_TYPE', data.permission_type)
        setPermissionTypeCookie(data.permission_type)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        console.log('getinfo response', response)
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        console.log('getInfo error', error)
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

