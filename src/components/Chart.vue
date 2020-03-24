<template>
 <div class="top">
         <span class="el-icon-s-fold"></span><p>故障处理视图</p>
      <span class="el-icon-date">数据时间：17/10/2019 ~ 31/10/2019</span>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tags">
    <el-tab-pane label="近15天" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="近30天" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="近90天" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="自定义" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.tags {
    display: inline !important;
}
.tags el-tab-pane {
    font-size:12px;
}
.el-icon-s-fold {
    font-size: 18px;
    color:#80818B
}
.bg-purple-dark {
    display:inline;
    color:#92949E;
    font-size:16px;
    margin-left:5px;
}
</style>
