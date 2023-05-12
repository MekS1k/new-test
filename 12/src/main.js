import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import App from './App.vue'
import AddAndViewTest from './components/AddAndViewTest.vue'
import ViewQuestions from './components/ViewQuestions.vue'
import CreateQuestionsForTests from './components/CreateQuestionsForTests.vue'
import CreateDataTests from './components/CreateDataTests'
import ResultTest from './components/ResultTest'

import SingIn from './components/SingIn.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [

  {
    name: 'AddAndViewTest',
    path: '/AddAndViewTest',
    component: AddAndViewTest
  },
  {
    name: 'SingIn',
    path: '/',
    component: SingIn
  },
  {
    name: 'ViewQuestions',
    path: '/ViewQuestions',
    component: ViewQuestions
  },
  {
    name: 'CreateQuestionsForTests',
    path: '/CreateQuestionsForTests',
    component: CreateQuestionsForTests
  },
  {
    name: 'CreateDataTests',
    path: '/CreateDataTests',
    component: CreateDataTests
  },
  {
    name: 'ResultTest',
    path: '/ResultTest',
    component: ResultTest
  },
];

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({
  // init router
  router,
  store,
  render: h => h(App),
}).$mount('#app')


