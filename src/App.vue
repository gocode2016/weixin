<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" >
*{
  padding:0;
  margin:0;
}
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    #app {
      width:100%;
      height:100%;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      text-align: center;
      color: #2c3e50;
    }
    .el-table-filter{
        margin-left: 45px;
    }
}
</style>
