// I think all this is used to build the base for the vue app
// it imports it, sets bootstrap to it, imports the API service to it
// and prototypes it with that API service?
// then renders the thing and mounts it to the app id.
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import StudentAPIService from '@/services/StudentService'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$student_api = StudentAPIService

new Vue({
  render: h => h(App),
}).$mount('#app')
