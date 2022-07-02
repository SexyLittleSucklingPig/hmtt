<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelect">
        <span @click="$store.commit('delAllHistory')">全部删除</span> &nbsp;
        <span @click="isDelect = !isDelect">完成</span>
      </template>
      <van-icon name="delete" v-else @click="isDelect = !isDelect" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in historyList"
      :key="index"
      @click="$emit('search',item)"
    >
      <van-icon
        name="close"
        v-if="isDelect"
        @click.stop="$store.commit('delAllHistory')"
      />
    </van-cell>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelect: false
    }
  },
  computed: {
    ...mapState(['historyList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
