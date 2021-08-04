import Vue from 'vue'
import BaseSvgIcon from '@/components/BaseSvgIcon.vue' // svg组件

// 全局注册
Vue.component('svg-icon', BaseSvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
