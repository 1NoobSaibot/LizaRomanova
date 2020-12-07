import axios from 'axios'
import { Cookies } from 'quasar'
const cookieName = 'cart'

export function purchase ({ state, commit }, email) {
  const cart = Cookies.get(cookieName)

  return axios.post('api/purchase', { cart, email })
    .then(({ data }) => commit('setAdmin', data))
    .catch(e => {
      commit('setAdmin', null)
      throw e
    })
}
