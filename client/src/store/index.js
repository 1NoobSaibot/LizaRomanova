import Vue from 'vue'
import Vuex from 'vuex'

import admin from './admin'
import cart from './cart'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      admin,
      cart
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
