import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testID: "",
    AllTests:[],
    TestResult:0,
    AllQuestions:[],
    role:[],
    users:[],
    UserID:"",
    roleForUnderstande:0
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
