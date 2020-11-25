import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import './assets/formulate.css'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
