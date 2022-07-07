<template>
  <!-- 评论弹出层 -->
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="text"
  >
    <template #extra>
      <van-button
        type="default"
        :disabled="message.length === 0"
        @click="upcommand"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comments'
export default {
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  mounted () {
    this.$refs.text.$el.querySelector('textarea').focus()
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async upcommand () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
button {
  border: none;
}
</style>
