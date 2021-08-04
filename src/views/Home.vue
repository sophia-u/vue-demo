<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
  </div>
</template>

<script>
import moment from 'moment'
// 引入中文
import 'moment/locale/zh-cn'
// 设置中文
moment.locale('zh-cn')

export default {
  name: 'Home',
  created () {
    const momentStr = moment().subtract(10, 'days').calendar()
    console.log('现在时间：', momentStr)
  }
}
</script>
