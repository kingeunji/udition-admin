import Vue from 'vue'
import router from './router'
import App from './App.vue'

/** ElementUI 적용 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

/** Bootstrap 적용 */
import BootstrapVue from 'bootstrap-vue'


Vue.use(ElementUI)
Vue.use(BootstrapVue)

new Vue({
  el : "#app",
  router,
  render: h => h(App)
})
