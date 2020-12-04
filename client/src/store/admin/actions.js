import axios from 'axios'

export function check ({ commit }) {
  return axios.get('api/admin/check')
    .then(({ data }) => commit('setAdmin', data))
    .catch(e => {
      commit('setAdmin', null)
      throw e
    })
}

export function login ({ commit, dispatch }, data) {
  return axios.post('api/admin/login', data)
    .then(({ data }) => commit('setAdmin', data))
    .catch((e) => {
      dispatch('check')
      throw e
    })
}

export function logout ({ commit }) {
  return axios.get('api/admin/logout')
    .finally(() => commit('setAdmin', null))
}
