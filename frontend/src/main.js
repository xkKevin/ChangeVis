import Vue from 'vue'
import App from './App.vue'
import router from './router'
// https://element.eleme.cn/#/zh-CN
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')