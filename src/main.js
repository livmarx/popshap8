import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';

Vue.config.productionTip = false;

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    Vue.filter('snippet', val => {
      if (!val || typeof val !== 'string' || val.length < 79) {
        return val;
      } else {
        val = val.slice(0, 80);
        return val + '...';
      }
    });

    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
