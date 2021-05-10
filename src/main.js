import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import CountryFlag from 'vue-country-flag'

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.component('country-flag', CountryFlag)
Vue.config.productionTip = false

Vue.use(VueAxios, axios)

axios.defaults.baseURL = "http://localhost:8082/api/school"

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
