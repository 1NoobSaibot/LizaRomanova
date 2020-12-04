import Vue from 'vue'
import Vuex from 'vuex'

import admin from './admin'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      admin
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
