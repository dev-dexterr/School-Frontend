import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import CountryFlag from 'vue-country-flag';
import store from './store';
import Vuex from 'vuex';
import moment from 'moment';

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.component('moment', moment)
Vue.component('country-flag', CountryFlag)
Vue.config.productionTip = false
Vue.prototype.moment = moment;
Vue.use(VueAxios, axios, Vuex)

axios.defaults.baseURL = "http://localhost:8082/api/school"

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
