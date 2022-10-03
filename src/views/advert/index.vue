<template>
  <div>
    <!-- 新闻 -->
    <!-- article/advert/search -->
    <queryForm
      class="mtb-20"
      ref="queryForm"
      :queryFormList="queryFormList"
      :optionList="optionList"
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
    <Table
      :tableHeade="tableHeade"
      :tableData="advertList"
      :optionList="optionList"
    >
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
      :queryFormList="FormList"
      @handleClose="handleClose"
      :optionList="skip"
      :rules="rules"
      @Add="Add"
      @Edit="Edit"
    ></Dialog>
  </div>
</template>

<script>
import Api from "../../api/advert.js";
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
        { label: "广告标题", prop: "name" , placeholder:"请输出广告标题"},
        { label: "状态", type: "select", prop: "status"},
        { type: "active" },
      ],

      // v-model
      queryForm: {
        name: "",
        status: "",
      },

      // 模态框 数据
      title: "", //模态框 头部 信息
      dialogVisible: false, //模态框 显示隐藏
      width: "", //模态框 宽度
      labelWidth: "100px", //label 宽度
      // 模态框 表单数据
      form: {
        imageUrl:"",
        title:"",
        advertUrl:"",
        advertTarget:"",
        status:"",
        position:"",
        sort:"",
      },
      optionList: [
        {
          value: 0,
          label: "禁用",
        },
        {
          value: 1,
          label: "正常",
        },
      ],
      // 跳转方式
      skip: [
        {
          value:"_blank",
          label: "新窗口",
        },
        {
          value: "_self",
          label: "当前窗口",
        },
      ],

      // 模态框 表单 展示 数据
      FormList: [
        { label: "广告图片", type: "upload", prop: "imageUrl", width: "200px" },
        { label: "广告标题", type: "input", prop: "title", width: "200px" },
        { label: "广告链接", type: "input", prop: "advertUrl", width: "200px" },
        { label: "跳转方式", type: "select", prop: "advertTarget", width: "200px" },
        { label: "状态", type: "radio", prop: "status", width: "200px" , flag:"publicity"},
        { label: "广告位置", type: "number", prop: "position", width: "200px" },
        { label: "排序", type: "number", prop: "sort", width: "200px" },

        { type: "button" },
      ],
      // 模态框 验证规则
      rules: {
        name: { required: true, message: "请选择上传图片", trigger: "blur" },
        title: { required: true, message: "请输入广告标题", trigger: "blur" },
        advertUrl: {
          required: true,
          message: "请输入广告链接",
          trigger: "blur",
        },
        advertTarget: { required: true, message: "请选择跳转方式", trigger: "blur" },
        status: { required: true, message: "请输入分类", trigger: "blur" },
        position: { required: true, message: "请输入分类", trigger: "blur" },
        sort: { required: true, message: "请输入分类", trigger: "blur" },
      },

      // 分页
      page: {
        current: 1,
        size: 20,
      },
      LableFind: [],
      // 展示数据
      advertList: [],
      total: 1, //总条数
      tableHeade: [
        { label: "序号", type: "index", width: "80px" },
        { label: "广告标题", prop: "title" },
        { label: "广告图片", prop: "imageUrl", type: "img", width: "200px" },
        { label: "广告链接", prop: "advertUrl", width: "280px" },
        { label: "状态", prop: "status", type: "status" },
        { label: "排序", prop: "sort" },
        { label: "操作", type: "function", width: "280px" },
      ],
    };
  },
  created() {
    this.getAbvertList();
  },
  methods: {
    // 请求数据
    async getAbvertList() {
      let { title, status } = this.queryForm;
      let { current, size } = this.page;
      let response = await Api.getAbvertList({ title, status, current, size });
      console.log(response, 123);
      this.advertList = response.data.data.records;
      this.total = response.data.data.total;
      console.log(this.advertList);
    },

    // 删除
    handleDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let response = await Api.handleDel({ id });
          this.getAbvertList();
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
      // detailsList
      let response = await Api.detailsList({id});
      console.log(response.data.data,'编辑');
      this.form = response.data.data;
      console.log(this.form);
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },

    async Add(val) {
      console.log(val);
      let response = await Api.AddList(val);
      console.log(response);

      this.$message.success("添加成功");
      this.getAbvertList();
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
      this.getAbvertList();
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
      this.getAbvertList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getAbvertList();
    },
  },
};
</script>

<style scoped lang="scss"></style>
