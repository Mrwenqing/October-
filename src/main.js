import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 样式表
import './style/index.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 使用富文本
 
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css' 
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor) // 注册富文本编辑器



Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
