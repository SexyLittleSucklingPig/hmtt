<template>
  <div>
    <van-nav-bar left-arrow @click-left="$emit('close')" :title="title" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <Commentitem :item="comment" class="comment"></Commentitem>
    <van-cell title="全部回复" />
    <Commentitem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></Commentitem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddcommentshow = true"
        >信息按钮</van-button
      >
    </div>
    <van-popup position="bottom" v-model="isAddcommentshow">
      <Addcomment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddcommentshow"
        @add-comment="
          list.unshift($event);
          isAddcommentshow = false;
          comment.reply_count++;
        "
      ></Addcomment>
    </van-popup>
  </div>
</template>

<script>
import Addcomment from './AddComment.vue'
import Commentitem from './CommentItem.vue'
import { getcommentlist } from '@/api/comments'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({}) // 对象默认值 函数加括号表示是值 不加为函数体
    }
  },
  created () {
    this.getcommentlist()
  },
  data () {
    return {
      offset: null,
      limit: 999,
      list: [],
      isAddcommentshow: false
    }
  },
  methods: {
    async getcommentlist () {
      try {
        const res = await getcommentlist({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const num = this.comment.reply_count
      if (num === 0) {
        return '暂无回复'
      } else {
        return num + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: {
    Commentitem,
    Addcomment
  }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.bottom {
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
.comment1 {
  margin-bottom: 110px;
}
</style>
