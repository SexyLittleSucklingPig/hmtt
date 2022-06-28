<template>
  <div>
    <router-view class="main"/>

    <van-tabbar  route>
      <van-tabbar-item replace to="/home">首页<i class="toutiao toutiao-shouye" slot="icon"></i></van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search">视频<i class="toutiao toutiao-shipin" slot="icon"></i></van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="friends-o">问答<i class="toutiao toutiao-wenda" slot="icon"></i></van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="setting-o">我的 <i class="toutiao toutiao-wode" slot="icon"></i></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao{
  font-size:40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
.main{
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>
