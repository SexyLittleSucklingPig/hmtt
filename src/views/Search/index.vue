<template>
  <div>
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      autofocus
      show-action
      @cancel="$router.go(-1)"
      @search="onsearch"
      @focus="isSraech = false"
    />
    <SearchHistory v-if="searchText === ''" @search="onsearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSraech"  :searchText="searchText"></SearchResult>
      <SearchSuggester
        v-else
        :searchText="searchText"
        @search="onsearch"
      ></SearchSuggester>
    </template>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import SearchResult from '@/views/Search/components/SearResult.vue'
import SearchSuggester from '@/views/Search/components/SearSuggest.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSraech: false
    }
  },
  methods: {
    onsearch (str) {
      this.searchText = str
      this.isSraech = true
      this.$store.commit('setHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggester
  }
}
</script>

<style scoped lang='less'>
</style>
