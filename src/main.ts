import Vue from 'vue'
import App from './App.vue'
import moment from 'moment';

Vue.config.productionTip = false

Vue.filter('time', (date: Date, sFormat: string) => {
  return moment(date).format(sFormat);
});

new Vue({
  render: h => h(App),
}).$mount('#app')
