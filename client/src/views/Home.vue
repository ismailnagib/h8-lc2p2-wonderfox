<template>
  <div class="home">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-6 pt-4">
        <div class="row">
          <search @search='search'></search>
        </div>
        <div class="row">
          <randomvideo :searchresult='searchResult'></randomvideo>
        </div>
      </div>
      <div class="col-4">
        <detail></detail>
      </div>
    </div>
  </div>
</template>

<script>
import randomvideo from '@/components/randomVideo'
import detail from '@/components/detail'
import search from '@/components/search'

export default {
  name: 'home',
  data () {
    return {
      searchResult: []
    }
  },
  components: {
    randomvideo,
    detail,
    search
  },
  methods: {
    search (value) {
      this.searchResult = value
    }
  }
}
</script>
