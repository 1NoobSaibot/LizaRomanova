import axios from 'axios'

export function purchase ({ state, commit }, email) {
  const cart = state.items

  return axios.post('api/purchase', { cart, email })
    .then(() => commit('clear'))
}
