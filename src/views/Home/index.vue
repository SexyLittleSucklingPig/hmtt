<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button
          round
          type="info"
          icon="search"
          class="search-btn"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab v-for="item in Mychannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChangelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <!-- 占位 -->
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChangelPanelShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChangelPanel
        :Mychannels="Mychannels"
        :active="active"
        @changeActive="
          active = $event;
          isChangelPanelShow = false;
        "
        @del-event="active = $event"
      >
        ></ChangelPanel
      >
    </van-popup>
  </div>
</template>

<script>
import ChangelPanel from '@/views/Home/commponents/ChangelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getchannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNEL = 'CHANNEL'
export default {
  name: 'Home',
  created () {
    this.getMychannels()
  },
  data () {
    return {
      active: 0,
      Mychannels: [],
      isChangelPanelShow: false
    }
  },
  methods: {
    async getMychannels () {
      const channels = getItem(CHANNEL)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        console.log(channels)
        this.Mychannels = channels
      } else {
        try {
          const res = await getchannels()
          this.Mychannels = res.data.data.channels
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},
  filters: {},
  components: {
    ArticleList,
    ChangelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}

/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 90px;
  z-index: 1;
}

/deep/.van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
