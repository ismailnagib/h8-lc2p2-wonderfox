import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: false,
    likedVideos: []
  },
  mutations: {
    mutateSignedIn (state, value) {
      state.signedIn = value
    },
    mutateLikedVideos (state, value) {
      state.likedVideos = value
    }
  },
  actions: {
    updateLikedVideos (context) {
      axios({
        url: 'http://localhost:3000/users/liked',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(data => {
        context.commit('mutateLikedVideos', data.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
