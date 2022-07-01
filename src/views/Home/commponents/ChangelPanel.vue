<template>
  <div>
    <div class="changepanel">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          round
          plain
          type="danger"
          size="small"
          @click="isCloseshow = !isCloseshow"
          >{{ isCloseshow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in Mychannels" :key="index">
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onclick(index)"
          >
            {{ item.name }}
            <!-- 点击图标根据index 子传父 删除 -->
            <van-icon
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
              v-show="isCloseshow"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="changepanel">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in Alllist" :key="index">
          <div class="inner van-ellipsis" @click="add(item.id)">
            <span>+</span>{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllList, saveChangels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNEL = 'CHANNEL'
export default {
  props: {
    Mychannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res2 = await getAllList()
      console.log('res2', res2)
      // 因为获取的是全部数据    筛选全部所有我的频道删除 留下的就是推荐
      this.Alllist = res2.data.data.channels.filter(item => this.Mychannels.every(item1 => item1.id !== item.id))
      console.log(this.Alllist)
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      Alllist: [],
      isCloseshow: false
    }
  },
  methods: {
    add (id) { // 点击推荐频道添加到我的频道
      const index = this.Alllist.findIndex(item => item.id === id)
      this.Mychannels.push(this.Alllist[index])
      this.Alllist.splice(index, 1)
    },
    // 我的频道点击事件  根据删除图标的显示 去判断高亮和删除
    onclick (index) {
      if (this.isCloseshow) {
        if (index === 0) return
        const obj = this.Mychannels[index]
        // 删除
        this.Mychannels.splice(index, 1)
        this.Alllist.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('changeActive', index)
      }
    }
  },
  computed: {},
  watch: {
    Mychannels: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          try {
            const res = await saveChangels(arr)
            console.log(res)
            console.log(1)
          } catch (error) {
            console.log(error)
          }
        } else {
          setItem(CHANNEL, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.changepanel {
  padding-left: 24px;
  padding-right: 16px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    position: relative;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: 400;
    line-height: 86px;
    text-align: center;
    color: #222222;
    margin-left: 14px;
    margin-bottom: 20px;
  }
  .van-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>
