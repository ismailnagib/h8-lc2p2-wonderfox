<template>
  <videolist :videos='videos'></videolist>
</template>

<script>
import axios from 'axios'
import videolist from '@/components/videoList'

export default {
  name: 'randomvideo',
  props: ['searchresult'],
  data () {
    return {
      videos: []
    }
  },
  components: {
    videolist
  },
  methods: {
    getPopularVideos () {
      axios({
        url: 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAdWzQKjrCGpt0Oam6yR9ZhN49a29FOXfE&part=snippet&chart=mostPopular&maxResults=5'
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
    this.getPopularVideos()
  },
  watch: {
    searchresult () {
      if (this.searchresult.length !== 0) {
        this.videos = this.searchresult
      } else {
        this.getPopularVideos()
      }
    }
  }
}
</script>

<style>

</style>
