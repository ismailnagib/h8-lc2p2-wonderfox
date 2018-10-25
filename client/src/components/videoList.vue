<template>
  <ul class="list-unstyled">
    <router-link :to='{name: "detail", params: {id: video.id}}' class="video-link" v-for='(video, index) in videos' :key='index'>
      <li class="media my-4 border py-4 px-2">
      <img class="mr-3" :src="video.snippet.thumbnails.default.url" alt="Thumbnail">
      <div class="media-body">
        <h5 class="mt-0 mb-1">{{ video.snippet.title }}</h5>
        {{ video.snippet.description.slice(0, 150) }} . . .
        <br />
      </div>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
    name: 'videolist',
    props: ['videos']
}
</script>

<style>

</style>
