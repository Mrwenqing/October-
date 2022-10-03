<template>
  <div>
    <!-- 菜单 -->
    <queryForm
      class="mtb-20"
      ref="queryForm"
      :queryFormList="queryFormList"
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

    <!-- 封装表格 -->
    <Table :tableHeade="tableHeade" :tableData="tableData" >
      <template v-slot:function="scope">
        <el-button type="primary" size="mini" @click="handleAdds(scope.row.id)"
          >新增</el-button
        >
        <el-button size="mini" @click="handleEdit(scope.row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="mini" @click="handleDel(scope.row.id)"
          >删除</el-button
        >
      </template>
    </Table>

    <!-- 模态框  -->
    <Dialog
      :title="title"
      :dialogVisible="dialogVisible"
      :width="width"
      :labelWidth="labelWidth"
      v-model.sync="form"
      :queryFormList="labelForm"
      @handleClose="handleClose"
      :radioBTN="radioBTN"
      :rules="rules"
      @Add="Add"
      @Edit="Edit"
    ></Dialog>
  </div>
</template>

<script>
import Api from "../../api/menu.js";
export default {
  components: {
    queryForm: () => import("../../components/queryForm.vue"), //封装表单
    Table: () => import("../../components/Table.vue"), //表格 封装
    pagination: () => import("../../components/pagination.vue"), //分页
    Dialog: () => import("../../components/dialog.vue"), //模态框
  },
  data() {
    return {
      // 表单
      queryFormList: [
        {
          label: "菜单名称",
          prop: "title",
          placeholder: "审批人",
        },
        { type: "active" },
      ],
      // v-model
      queryForm: {
        title: "",
        status: "",
      },

      // 模态框 数据
      title: "", //模态框 头部 信息
      dialogVisible: false, //模态框 显示隐藏
      width: "50%", //模态框 宽度
      labelWidth: "100px", //label 宽度

      radioBTN:"two",// 单选框 中 （按钮） 选项
       // 模态框 表单数据
      form: {},
      // 模态框 表单 展示 数据
      labelForm: [
      { label: "类型",prop: "type",type:"radio", width: "80%" },
        { label: "名称", prop: "name", width: "80%" },
        { label: "权限标识", prop: "code", width: "80%" },
        { label: "请求地址", prop: "url", width: "80%" },
        { label: "图标", prop: "icon", width: "80%" },
        { label: "排序", type: "number", prop: "sort", width: "80%" },
        { label: "备注", type: "textarea", prop: "remark", width: "80%" },
     
        { type: "button" },
      ],
      // 模态框 验证规则
      rules: {
        type: { required: true, message: "请选择类型", trigger: "blur" },
        name: { required: true, message: "请输入名称", trigger: "blur" },
        code: { required: true, message: "请输入权限标识", trigger: "blur" },
      },

      // 分页
      page: {
        current: 1,
        size: 20,
      },
      // 展示数据
      tableData: [],
      total: 100, //总条数
      // 表格数据
      tableHeade: [
        { label: "序号", type: "index", width: "80px" },
        { label: "名称", prop: "name", sortable: true },
        { label: "请求地址", prop: "url", sortable: true },
        { label: "权限标识", prop: "code", sortable: true },
        { label: "类型", prop: "type", sortable: true,
      formatter:item=>{
       const statusType={
          1:"目录",
          2:"菜单",
          3:"按钮"
        }
        return statusType[item.type]
      } },
        { label: "图标", prop: "icon", sortable: true },
        { label: "排序", prop: "sort", sortable: true },
        { label: "操作", type: "function", width: "280px" },
      ],
     
    };
  },

  created() {
    this.getMenuList();
  },
  methods: {
    // 获取数据
    async getMenuList() {
      let response = await Api.getMenuList();
      console.log(response, "数据");
      this.tableData = response.data.data;
      console.log(this.tableData);
    },
    // 添加
    handleAdd() {
      this.title = "添加";
      this.radioBTN="two"
      this.dialogVisible = true;
      for (let i in this.from) {
        this.from[i] = "";
      }
    },
    handleAdds(){
      this.title = "添加";
      this.radioBTN="three"
      this.dialogVisible = true;
      for (let i in this.from) {
        this.from[i] = "";
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async Add(val) {
      let { title, status } = this.queryForm;
      let { current, size } = this.page;
      let response = await Api.AddList({
        title,
        status,
        current,
        size,
      });
      console.log(response.data.message);
      this.$message.success(response.data.message);
      this.dialogVisible = false;
    },

    async Edit() {
      let response = await Api.setEdit();
      console.log(response, "response");
      this.$message.success(response.data.message);
      this.dialogVisible = false;
    },
    // 搜索
    handleSearch() {
      this.getMenuList();
    },

    // 重置
    resetForm(formName) {
      for (let i in formName) {
        formName[i] = "";
      }
    },
    // 编辑
    async handleEdit(id) {
      this.title = "编辑";
      this.radioBTN="three"
      console.log(id);
      
      let response = await Api.EditList({ id });
      console.log(response.data.data);
      this.form = response.data.data;
      this.dialogVisible = true;
    },
    // 删除
    handleDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let response = await Api.categoryDel({ id });
          this.getMenuList();
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

    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      this.getMenuList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getMenuList();
    },
  },
};
</script>

<style scoped lang="scss"></style>
