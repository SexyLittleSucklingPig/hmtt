<template>
  <div>
    搜索建议
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
// 定义time开启定时器 （防抖）
let time = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    highlight (str) {
      const res = new RegExp(this.searchText, 'g')
      return str.replace(res, `<span style='color: red'>${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newval) {
        // 防抖
        clearTimeout(time)
        time = setTimeout(async () => {
          try {
            const res = await getSuggestList(newval)
            this.list = res.data.data.options
          } catch (error) {

          }
        }, 900)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    clearTimeout(time)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
