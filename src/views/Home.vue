<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <div class="vue">Vue</div>
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

<style lang="scss" scoped>
.home {
  .vue {
    width: 100px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    color: #fff;
    background-color: cadetblue;
  }
}
</style>
