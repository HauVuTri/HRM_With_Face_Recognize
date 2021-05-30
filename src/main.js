import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import "popper.js"
import jQuery from 'jquery'
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import MixinApp from "@/mixins/appMixin"

// font awesome
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
//
window.$ =  window.jQuery = jQuery;
Vue.use(VueRouter)
Vue.use(Element)
Vue.use(Vuelidate)
Vue.mixin(MixinApp);
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
