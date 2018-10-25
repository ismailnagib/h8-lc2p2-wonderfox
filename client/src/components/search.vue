<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Search videos across YouTube..."
      aria-label="Search videos across YouTube..."
      aria-describedby="go-button-addon"
      auto-complete="off"
      autofocus
      v-model='keyword'  
    >
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="go-button-addon"
        @click="search"  
      >
        Go!
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'search',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    search () {
      if (this.keyword.length > 0) {
        axios ({
          url: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAdWzQKjrCGpt0Oam6yR9ZhN49a29FOXfE&part=snippet&q=${this.keyword}&maxResults=5`
        })
        .then(data => {
          this.$emit('search', data.data.items)
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        this.$emit('search', [])
      }
    }
  }
}
</script>

<style>

</style>
