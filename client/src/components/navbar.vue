<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vuedio</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item px-4">
            <router-link to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if='signedIn'>
              <router-link to="/liked">Liked Videos <span style="background-color: blue; padding: 2.5px 5px">{{ likedVideos.length }}</span></router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <div v-if='!signedIn'>
              <span class='mr-4' style="color: red">{{ notice }}</span>
              <input class='mr-4' type="text" v-model='email' placeholder="Email">
              <input class='mr-4' type="password" v-model='password' placeholder="Password">
              <button class="btn btn-danger" @click="login">Login</button>
            </div>
            <button class="btn btn-danger" v-else @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
import store from '@/store'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'navbar',
  data () {
    return {
      email: '',
      password: '',
      notice: ''
    }
  },
  methods: {
    ...mapMutations(['mutateSignedIn', 'mutateLikedVideos']),
    ...mapActions(['updateLikedVideos']),
    login () {
      axios({
        url: 'http://localhost:3000/users/login',
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(data => {
        this.notice = ''
        localStorage.setItem('token', data.data.token)
        this.mutateSignedIn(true)
        this.updateLikedVideos()
      })
      .catch(err => {
        this.notice = err.response.data.message
      })
    },
    checkLogin () {
      axios({
        url: 'http://localhost:3000/users/checklogin',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(data => {
        this.mutateSignedIn(true)
        this.updateLikedVideos()
      })
      .catch(err => {
        this.mutateSignedIn(false)
      })
    },
    logout () {
      this.mutateSignedIn(false)
      localStorage.clear()
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.checkLogin()
    }
  },
  computed: {
    ...mapState(['signedIn', 'likedVideos'])
  }
}
</script>

<style>

</style>
