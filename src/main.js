import Vue from 'vue'
import VConsole from 'vconsole';
import VueLazyload from 'vue-lazyload';
import App from './App.vue'
import router from './router';

import './styles/reset.css';

Vue.config.productionTip = false

// 调试
if(process.env.NODE_ENV === 'development') {
  new VConsole();
}

// 图片懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/placeholder.gif')
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
