<template>
  <div class="row">
    <div class="col-2"></div>
    <videolist :videos='videos' class="col-8"></videolist>
    <div class="col-2"></div>
  </div>
</template>

<script>
import axios from 'axios'
import videolist from '@/components/videoList'
import store from '@/store'
import { mapState } from 'vuex'

export default {
  name: 'liked',
  components: {
    videolist
  },
  data () {
    return {
      videos: [],
    }
  },
  methods: {
    getLikedVideos () {
      let likedVideosJoined = this.likedVideos.join(',')
      axios({
        url: `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAdWzQKjrCGpt0Oam6yR9ZhN49a29FOXfE&part=snippet&id=${likedVideosJoined}&maxResults=5`
      })
      .then(data => {
        this.videos = data.data.items
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getLikedVideos()
  },
  computed: {
    ...mapState(['likedVideos'])
  }
}
</script>

<style>

</style>
