<template>
  <div>
    <!-- 标签管理 -->
    <!-- article/label/search -->
    <queryForm
      class="mtb-20"
      ref="queryForm"
      :queryFormList="queryFormList"
      :optionList="LableFind"
      v-model.sync="queryForm"
      :inline="true"
    >
      <template v-slot:active>
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="handleSearch"
          size="mini"
          >查询</el-button
        >
        <el-button
          icon="el-icon-refresh"
          @click="resetForm(queryForm)"
          size="mini"
          >重置</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </template>
    </queryForm>

    <!-- 表格 -->
    <Table :tableHeade="tableHeade" :tableData="laberList">
      <template v-slot:function="scope">
        <el-button size="mini" @click="handleEdit(scope.row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="mini" @click="handleDel(scope.row.id)"
          >删除</el-button
        >
      </template>
    </Table>

    <!-- 分页  -->
    <pagination
      class="mtb-20"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :page.sync="this.page.current"
      :size.sync="this.page.size"
      :total="this.total"
    ></pagination>

    <!-- 添加模态框 -->
    <!-- 模态框  -->

    <Dialog
      :title="title"
      :dialogVisible="dialogVisible"
      :width="width"
      :labelWidth="labelWidth"
      v-model.sync="form"
      :queryFormList="categoryForm"
      @handleClose="handleClose"
      :rules="rules"
      @Add="Add"
      @Edit="Edit"
    ></Dialog>
  </div>
</template>

<script>
import Api from "../../api/label.js";
export default {
  components: {
    queryForm: () => import("../../components/queryForm.vue"), //封装表单
    Table: () => import("../../components/Table.vue"), //表格 封装
    pagination: () => import("../../components/pagination.vue"),
    Dialog: () => import("../../components/dialog.vue"), //模态框
  },
  data() {
    return {
      // 表单
      queryFormList: [
        { label: "标签名称",prop: "name" },
        { label: "分类名称", type: "select", prop: "categoryName" },
        { type: "active" },
      ],

      // v-model
      queryForm: {
        name: "",
        categoryName: "",
      },

      // 模态框 数据
      title: "", //模态框 头部 信息
      dialogVisible: false, //模态框 显示隐藏
      width: "", //模态框 宽度
      labelWidth: "100px", //label 宽度
      // 模态框 表单数据
      form: {
        name: "",
        categoryName: "",
      },
      // 模态框 表单 展示 数据
      categoryForm: [
        { label: "标签名称", prop: "name", width: "200px" },
        {
          label: "分类名称",
          type: "select",
          prop: "categoryName",
          width: "200px",
        },
        { type: "button" },
      ],
      // 模态框 验证规则
      rules: {
        name: { required: true, message: "请输入分类", trigger: "blur" },
      },

      // 分页
      page: {
        current: 1,
        size: 20,
      },
      LableFind: [],
      // 展示数据
      laberList: [],
      total: 1, //总条数
      tableHeade: [
        { label: "序号", type: "index", width: "80px" },
        { label: "标签名称", prop: "name" },
        { label: "分类名称", prop: "categoryName" },
        { label: "操作", type: "function", width: "280px" },
      ],
    };
  },
  created() {
    this.getLaberList();
  },
  methods: {
    // 请求数据
    async getLaberList() {
      let { name, status } = this.queryForm;
      let { current, size } = this.page;
      let response = await Api.getLaberList({ name, status, current, size });
      console.log(response);
      this.laberList = response.data.data.records;
      this.total = response.data.data.total;
    },

    // 删除
    // 删除
    handleDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let response = await Api.labelDel({ id });
          this.getLaberList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async handleEdit(id) {
      this.title = "编辑";
      let response = await Api.EditList({ id });
      console.log(response.data.data);
      this.form = response.data.data;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },

    async Add(val) {
      this.$message.success("添加成功");
      this.getLaberList();
      this.dialogVisible = false;
    },
    async Edit() {
      let response = await Api.setEdit();
      console.log(response, "response");
      this.$message.success(response.data.message);
      this.dialogVisible = false;
    },
    // 添加
    handleAdd() {
      this.title = "添加";
      this.dialogVisible = true;
      for (let i in this.from) {
        this.from[i] = "";
      }
    },
    // 搜索
    handleSearch() {
      this.getLaberList();
    },

    // 重置
    resetForm(formName) {
      for (let i in formName) {
        formName[i] = "";
      }
    },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      this.getLaberList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getLaberList();
    },
  },
};
</script>

<style scoped lang="scss"></style>
