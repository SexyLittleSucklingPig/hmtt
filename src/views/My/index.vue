<template>
  <div>
    <!-- 登陆后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
            round
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="btn">编辑资料</div>
      </div>
      <div>
        <ul class="list">
          <li>
            <p>{{ userInfo.art_count }}</p>
            <p>头条</p>
          </li>
          <li>
            <p>{{ userInfo.fans_count }}</p>
            <p>头条</p>
          </li>
          <li>
            <p>{{ userInfo.follow_count }}</p>
            <p>头条</p>
          </li>
          <li>
            <p>{{ userInfo.like_count }}</p>
            <p>头条</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- 两个选框 -->
    <div>
      <van-grid clickable :column-num="2">
        <van-grid-item text="收藏" to="/">
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
        </van-grid-item>
        <van-grid-item icon="clock-o" text="历史" to="/">
          <template #icon> <i class="toutiao toutiao-lishi"></i> </template
        ></van-grid-item>
      </van-grid>
    </div>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- 退出按钮 -->
    <van-button
      class="logout"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) { // 有token 才赋值
      try {
        const res = await getUserInfo() // 调用获取用户接口
        console.log('res', res)
        this.userInfo = res.data.data // 把获取的数据赋值给变量
      } catch (error) {
        console.log('error', error)
      }
    }
  },
  data () {
    return {
      userInfo: {} // 用户信息变量
    }
  },
  methods: {
    async logout () {
      try {
        // 退出弹窗 vuex 销毁token
        await this.$dialog.confirm({ message: '确定退出？' }) // 轻提示
        this.$store.commit('setuser', {}) // 调用 vuex的方法 把token清空
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState(['user']) // vuex 辅助函数
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
//一个 公共样式 再分登录和未登录两个样式  用v-if去显示和隐藏
.header {
  width: 750px;
  height: 401px;
  background-color: hsla(210, 95%, 59%, 0.7);
  background: url("@/assets/banner.png") no-repeat;
  background-size: cover;
}

//登录
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #fff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
  .btn {
    width: 116px;
    height: 33px;
    background-color: #ffffff;
    border-radius: 16px;
    font-size: 20px;
    letter-spacing: 1px;
    color: #666666;
    text-align: center;
    line-height: 33px;
  }
}
.toutiao {
  font-size: 45px;
}
/deep/.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
//未登录
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    color: #ffffff;
    font-weight: 400;
    padding: 0;
    margin: 0;
  }
}
</style>
