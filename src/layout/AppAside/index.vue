<template>
  <div>
    <el-menu
      :default-active="paths"
      class="el-menu-vertical-demo"
      background-color="#304155"
      text-color="#fff"
      active-text-color="#409eff"
      router
    >
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/blog">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>博客管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/blog/article">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>文章管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/blog/category">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>分类管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/blog/label">
            <template slot="title">
              <i class="el-icon-collection-tag"></i>
              <span>标签管理</span>
            </template></el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/advert">
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title">广告管理</span>
      </el-menu-item>
      <el-submenu index="/system">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/user">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template></el-menu-item
          >
          <el-menu-item index="/system/role">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>角色管理</span>
            </template></el-menu-item
          >
          <el-menu-item index="/system/menu">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>菜单管理</span>
            </template></el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="">
        <a href="https://www.baidu.com/">
          <i class="el-icon-link"></i><span>积云教育官网</span>
        </a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AppAside",
  data() {
    return {};
  },
  computed: {
    paths() {
      console.log(this.$route.path);
      return this.$route.path;
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #fff;
}
</style>
