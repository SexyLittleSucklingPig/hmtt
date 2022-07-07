<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Commentitem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></Commentitem>
    </van-list>
  </div>
</template>

<script>
import Commentitem from './CommentItem.vue'
import { getcommentlist } from '@/api/comments'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: []
  },
  created () {
    this.getcommentlist()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      // 父穿子 状态提升 用父级 index传来的值
      // commentList: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getcommentlist () {
      try {
        const res = await getcommentlist(this.paramsObj)
        console.log(res)
        // 数据加载完毕 直接把finished为true
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        console.log(this.commentList)
        // 刷新结果最后一个评论ID 作为下次请求数据 若无数据 则为null
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 得到数据关闭加载圈
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getcommentlist()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    Commentitem
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
