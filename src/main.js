
import Vue from 'vue'
import App from './App'
import router from './router.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {auth} from './firebase'

Vue.use(Vuetify)
Vue.config.productionTip = false



new Vue({
  data: {
  	user: null
  },
  router,
  render: h => h(App),
  created () {
    auth.onAuthStateChanged( (user) => {
      this.user = user
    })
  }
}).$mount('#app')


