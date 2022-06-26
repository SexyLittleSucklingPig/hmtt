<template>
  <div>
    <van-nav-bar title="登录" left-arrow>
      <van-icon name="cross" slot="left" />
      <!-- <template #right>
        <van-icon name="search" size="18" />
      </template> -->
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/ },
        ]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /\d{6}/ },
        ]"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isdownshow"
            :time="time"
            @finish="isdownshow = false"
            format="ss s"
          />
          <van-button
            v-else
            size="small"
            class="yzm"
            native-type="button"
            @click="onsms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmscode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      time: 30 * 100,
      isdownshow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res.data.data)
        this.$store.commit('setuser', res.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    async onsms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isdownshow = true
        try {
          await getSmscode(this.mobile)
          this.$toast.success('发送成功')
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.log('校验失败')
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
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  font-size: 22px;
  background-color: #ededed;
  border-radius: 23px;
  color: rgb(106, 105, 105);
  line-height: 46px;
  position: fixed;
  right: 15px;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #439efa;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 15px;
}
</style>
