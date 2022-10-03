<template>
  <div>
    <!-- 分类管理 -->
    <!-- 封装表单 实现搜索  -->
    <!-- 
      queryFormList : 动态 渲染 表单 数据
      optionList  ： 下拉菜单 内容 选项
      v-model.sync="queryForm" 表单 v-model 双向绑定的数据
      inline="true"  是否 一行 展示 true 是  false 否
     -->

    <queryForm
      class="mtb-20"
      ref="queryForm"
      :queryFormList="queryFormList"
      :optionList="optionList"
      v-model.sync="queryForm"
      :inline="true">

      <!-- 
       <template v-slot:active> 使用 作用域插槽 添加 搜索 按钮
     -->
      <template v-slot:active>
        <el-button icon="el-icon-search" type="primary" 
        @click="handleSearch" size="mini">查询</el-button>
        <el-button icon="el-icon-refresh" @click="resetForm(queryForm)" 
        size="mini">重置</el-button>
        <el-button icon="el-icon-circle-plus-outline" type="primary" 
        @click="handleAdd" size="mini">新增</el-button>
      </template>
    </queryForm>

      <!-- 
        tableHeade  表格 头部 信息内容
        tableData 表格 展示内容
        optionList  下拉内容展示 （状态一栏）
       -->

    <!-- 封装表格 -->
    <Table
      :tableHeade="tableHeade"
      :tableData="tableData"
      :optionList="optionList">

      <!-- 使用 作用域插槽  实现 操作 按钮   -->
      <template v-slot:function="scope">
        <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="mini" @click="handleDel(scope.row.id)">删除</el-button>
      </template>

    </Table>

    <!-- 分页  -->
    <pagination
      class="mtb-20"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :page.sync="this.page.current"
      :size.sync="this.page.size"
      :total="this.page.total"
    ></pagination>

    <!-- 模态框  -->


    <!-- 
      title 模态框 头部信息
      dialogVisible 模态框 是否显示隐藏
      width 模态框 宽度

      :queryFormList="labelForm" 模态框 表单 展示 数据
      v-model.sync="form" 表单 v-model 双向绑定的数据
      labelWidth  表单 label 宽度
      rules 表单 中验证规则
      handleClose 点击叉号 关闭模态框 事件
      Add 成功  添加
      Edit 成功 编辑     
     -->
    <Dialog
      :title="title"
      :dialogVisible="dialogVisible"
      :width="width"

      :queryFormList="labelForm"
      :labelWidth="labelWidth"
      v-model.sync="form"
      :rules="rules"
      @handleClose="handleClose"
      @Add="Add"
      @Edit="Edit"></Dialog>
  </div>
</template>

<script>
import Api from "../../api/category.js";
export default {
  components: {
    queryForm: () => import("../../components/queryForm.vue"), //封装表单
    Table: () => import("../../components/Table.vue"), //表格 封装
    pagination: () => import("../../components/pagination.vue"), //分页
    Dialog: () => import("../../components/dialog.vue"), //模态框
  },

  data() {
    return {
// 表单 数据


      // 动态 渲染 表单 数据
      queryFormList: [
        { label: "分类名称", prop: "title" },
        { label: "状态", type: "select", prop: "status" },
        { type: "active" },
      ],
      // 搜索 表单 v-model 双向绑定 数据
      queryForm: {
        title: "",
        status: "",
      },
        // 下拉菜单数据
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

   
// 表格 数据


      // 表格 头部 展示 数据
            // label 表格 表头 内容数据
            // prop  表格 绑定的数据
            // type  表格 其他 类型  
            // width 单元格 宽度
      tableHeade: [
        { label: "序号", type: "index", width: "80px" },
        { label: "分类名称", prop: "name" },
        { label: "排序", prop: "sort" },
        { label: "备注", prop: "remark" },
        { label: "状态", prop: "status", type: "status" },
        { label: "操作", type: "function", width: "280px" },
      ],
   
      // 表格 所展示的数据
      tableData: [],
   

// 模态框 

      title: "", //模态框 头部 信息
      dialogVisible: false, //模态框 显示隐藏
      width: "", //模态框 宽度

      labelWidth: "100px", // 表单  label 宽度
      // 模态框 v-model 绑定的数据
      form: {
        name: "",//标签名称
        status: "",//状态
      },
      // 模态框 表单 展示 数据
      labelForm: [
        { label: "分类名称",prop: "name", width: "200px" },
        { label: "状态", type: "radio", prop: "status",flag:"publicity"},
        { label: "排序", type: "number", prop: "sort"},
        { label: "备注", type: "textarea", prop: "remark", width: "200px" },
        { type: "button" },
      ],
      // 模态框 验证规则
      rules: {
        name: { required: true, message: "请输入分类", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
        sort: { required: true, message: "请输入排序", trigger: "blur" },
      },



// 分页
      page: {
        current: 1,// 当前页
        size: 20,//一页 展示多少 条
        total: 1, //总条数
      },

    };
  },

  created() {
    this.getCategoryList();
  },
  methods: {
    // 获取数据
    async getCategoryList() {
      try {
        let { title, status } = this.queryForm;
      let { current, size } = this.page;
      let response = await Api.getCategoryList({
        title,
        status,
        current,
        size,
      });
      let {records,total}=response.data.data
      this.tableData = records;
      this.page.total = total;
      } catch (e) {
        console.log(e.message,'分类管理 获取 展示数据 失败');
      }
    },
    // 添加
    handleAdd() {
      this.title = "添加";
      this.dialogVisible = true;
      for (let i in this.from) {
        this.from[i] = "";
      }
    },
    // 关闭模态框
    handleClose() {
      this.dialogVisible = false;
    },
    // 点击 添加 确认
    async Add(val) {
      try {
        let { title, status } = this.queryForm;
      let { current, size } = this.page;
      let response = await Api.AddList({
        title,
        status,
        current,
        size,
      });
      this.$message.success(response.data.message);
      this.dialogVisible = false;
      } catch (e) {
        console.log(e.message,'添加');
      }
     
    },
    // 编辑
    async Edit() {
      try {
      let response = await Api.setEdit();
      console.log(response, "response");
      this.$message.success(response.data.message);
      this.dialogVisible = false;
      } catch (e) {
        console.log(e.message,'编辑');
      }
     
    },
    // 搜索
    handleSearch() {
      this.getCategoryList();
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
      let response = await Api.EditList({id});
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
          this.getCategoryList();
          this.$message.success("删除成功!")
        })
        .catch(() => {
          this.$message.info("已取消删除")
        });
    },

    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      this.getCategoryList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getCategoryList();
    },
  },
};
</script>

<style scoped lang="scss"></style>
