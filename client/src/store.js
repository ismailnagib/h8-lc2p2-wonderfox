import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: false
  },
  mutations: {
    mutateSignedIn (state, value) {
      state.signedIn = value
    }
  },
  actions: {

  }
})
