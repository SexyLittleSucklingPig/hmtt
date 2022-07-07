<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Articleitem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></Articleitem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import Articleitem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false, // onLoad
      finished: false, // onLoad
      refreshing: false // 下拉刷新方法变量
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.list.push(...res.data.data.results)
        this.refreshing = false
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    // onload 加载事件
    onLoad () {
      this.page++
      this.getSearchResult()
    },
    // 下拉刷新功能
    onRefresh () {
      this.page = 1
      this.getSearchResult()
      this.list = []
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    Articleitem
  }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
