function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
import 'bootstrap/dist/css/bootstrap.min.css';
requireAll(require.context('./fonts', true, /\.css$/));

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.scss';
import { showHeader } from './assets/utils.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

showHeader();
