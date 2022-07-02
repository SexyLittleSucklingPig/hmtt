import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    historyList: []
  },
  getters: {
  },
  mutations: {
    setuser (state, payload) {
      state.user = payload
    },
    setHistoryList (state, payload) {
      let arr = state.historyList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.historyList = arr
    },
    // 删除
    delHistory (state, payload) {
      state.historyList.splice(payload, 1)
    },
    delAllHistory (state) {
      state.historyList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
