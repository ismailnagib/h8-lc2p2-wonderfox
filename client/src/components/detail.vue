<template>
  <div class="mt-4" v-if='detail.snippet'>
    <div class="card mb-2" style="width: 100%;">
      <div class="card-body">
        <h5 class="card-title">
          <img :src='detail.snippet.thumbnails.standard.url' style="max-width: 100%" v-if='detail.snippet'>
        </h5>
      </div>
    </div>
    <span v-if='detail.snippet'><strong>{{ detail.snippet.title }}</strong>&nbsp;</span>
    <button class="btn btn-sm btn-primary" v-if='signedIn && likedVideos.indexOf(detail.id) === -1 && detail.snippet' @click='likeToggle(detail.id)'>Like this Video!</button><br />
    <button class="btn btn-sm btn-primary" v-if='signedIn && likedVideos.indexOf(detail.id) !== -1 && detail.snippet' @click='likeToggle(detail.id)'>Unlike this Video!</button><br />
    <br />
    <pre class="card" v-if='detail.snippet'>{{ detail.snippet.description }}</pre>
    <br />
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'detail',
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    ...mapActions(['updateLikedVideos']),
    getDetail () {
      axios({
        url: `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAdWzQKjrCGpt0Oam6yR9ZhN49a29FOXfE&part=snippet&id=${this.$route.params.id}&maxResults=5`
      })
      .then(data => {
        this.detail = data.data.items[0]
      })
      .catch(err => {
        console.log(err)
      })
    },
    likeToggle (id) {
      axios({
        url: `http://localhost:3000/users/like/${id}`,
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() => {
        this.updateLikedVideos()
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getDetail()
    }
  },
  watch: {
    $route () {
      if (this.$route.params.id) {
        this.getDetail()
      } else {
        this.detail = {}
      }
    }
  },
  computed: {
    ...mapState(['signedIn', 'likedVideos'])
  }
}
</script>

<style>

</style>
