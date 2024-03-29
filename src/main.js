// Initialize firebase first
import firebase from 'firebase/app'
import 'firebase/auth'
import './firebase'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import vuetify from './plugins/vuetify'

import './helpers/registerServiceWorker'
import './helpers/snackbar'

import './filters/string'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeCreate () {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('user/SET_LOGGEDIN', true)
        this.$store.commit('user/SET_USER', user)
        this.$store.dispatch('user/fetch')
      } else {
        this.$store.commit('user/SET_LOGGEDIN', false)
        this.$store.commit('user/SET_USER', {})
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
