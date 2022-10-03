<template>
  <!-- 首页 -->

  <el-container>
    <el-aside width="200px"> <AppAside></AppAside></el-aside>
    <el-container>
      <el-header><AppHeader></AppHeader></el-header>
      <el-main><AppMain></AppMain></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  components: {
    AppHeader: () => import("./AppHeader/index.vue"),
    AppAside: () => import("./AppAside/index.vue"),
    AppMain: () => import("./AppMain/index.vue"),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.el-container {
  background-color: pink;
  width: 100%;
  height: 100%;
}
.el-header {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  line-height: 50px;
  background-color: #fff;
  border-bottom: 3px solid #ccc;
  height: 50px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
  background-color: #304155;
}

.el-main {
  padding: 0;
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
</style>
