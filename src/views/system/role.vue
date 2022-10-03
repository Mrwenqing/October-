<template>
  <div>
    <!-- 角色 -->
    <!-- 封装 头部 表单 -->
    <!-- system/role/search -->
    <div class="mtb-20">
      <queryForm
        :queryFormList="queryFormList"
        v-model.sync="queryForm"
        :inline="true"
      >
        <template v-slot:active>
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="search"
            >查询</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            @click="resetForm(queryForm)"
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
    </div>
    <!-- 封装表格 -->
    <Table :tableHeade="tableHeade" :tableData="tableData">
      <template v-slot:function="scope">
        <el-button type="primary" size="mini" @click="distribute(scope.row.id)"
          >分配权限</el-button
        >
        <el-button type="success" size="mini" @click="handleEdit(scope.row.id)"
          >编辑</el-button
        >

        <el-button type="danger" size="mini" @click="handleDel(scope.row.id)"
          >删除</el-button
        >
      </template>
    </Table>

    <!-- 封装分页 -->
    <pagination
      class="mtb-20"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :page.sync="this.page.current"
      :size.sync="this.page.size"
      :total="this.total"
    >
    </pagination>
    <input type="text" disabled />

    <!-- 封装模态框 -->
    <!-- dialogInfo="dialogInfo" -->
    <Dialog
      :title="title"
      :dialogVisible="dialogVisible"
      :width="width"
      :labelWidth="labelWidth"
      v-model.sync="form"
      :queryFormList="dialogForm"
      @handleClose="handleClose"
      :rules="rules"
      @Add="Add"
      @Edit="Edit"
    ></Dialog>



    <!-- 分配权限 模态框  -->
    <el-dialog
  title="分配权限"
  :visible.sync="distributeDialog"
  width="50%"
  :before-close="handleClose">

  <el-tree
  :data="distributeList"
  :default-checked-keys="defaultList"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>

  <span slot="footer" class="dialog-footer">
    <el-button @click="distributeDialog = false">取 消</el-button>
    <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import Api from "../../api/role.js";

export default {
  components: {
    queryForm: () => import("../../components/queryForm.vue"), //封装表单
    Table: () => import("../../components/Table.vue"), //表格 封装
    pagination: () => import("../../components/pagination.vue"), //分页
    Dialog: () => import("../../components/dialog.vue"), //模态框
  },
  data() {
    return {
      // 搜索表单数据
      queryFormList: [
        { label: "角色名称",  prop: "name" },
        { type: "active" },
      ],
      // 搜索表单 v-model 数据
      queryForm: {
        name: "",
      },

      // 表格数据
      tableHeade: [
        { type: "selection", width: "80px" },
        { label: "序号", type: "index", width: "80px" },
        { label: "角色名称", prop: "name" },
        { label: "备注", prop: "remark" },
        { label: "操作", type: "function", width: "280px" },
      ],

      // 分页数据
      page: {
        current: 1,
        size: 20,
      },
      // 总共条数
      total: 100,
      tableData: [], //总共数据
      labelWidth: "80px",
      title: "查看", //模态框头部信息
      dialogVisible: false, //模态框显示隐藏
      width: "50%", //模态框宽度
      // 模态框 表单数据
      dialogForm: [
        { label: "角色名称",prop: "name" },
        { label: "备注", type: "textarea", prop: "remark" },
        { type: "button" },
      ],
      rules: {
        name: { required: true, message: "请输入角色名称", trigger: "blur" },
      },
      // 标签数据
      labelLists: [],
      form: {
        name: "",
      },

      // 分配权限 数据
      distributeList: [],
      defaultList:[],
      distributeDialog:false,//分配权限 模态框 显示隐藏 数据
      defaultProps: {
          children: 'children',
          label: 'name'
        }
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 请求表格数据
    async getRoleList() {
      let { title, status } = this.queryForm;
      let { current, size } = this.page;
      let response = await Api.getRoleList({ title, status, current, size });
      this.tableData = response.data.data.records;
      this.total = response.data.data.total;
      console.log(this.tableData);
    },

    // 审核
    audit(id) {
      console.log(id);
      this.examine(id);
    },
    // 分配权限
    async distribute(val) {
      this.distributeDialog=true
      let response = await Api.distributeList();
      console.log(response);
      this.distributeList = response.data.data;
      console.log(this.distributeList);

    let  distributeItem= await Api.distributeItem()
    console.log(distributeItem.data.data);
    this.defaultList=distributeItem.data.data
    console.log(this.defaultList,'this.defaultList ');
    },
    getCheckedNodes() {
      // this.defaultList=this.$refs.tree.getCheckedNodes()
        console.log(this.$refs.tree.getCheckedNodes());
        this.distributeDialog=false
      },
    // 搜索
    search() {
      console.log(this.queryForm);
      this.getRoleList();
    },

    handleAdd() {
      this.title = "添加";
      this.dialogVisible = true;
      for (let i in this.from) {
        this.from[i] = "";
      }
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

    // 查看
    async examine(id) {
      this.dialogVisible = true;
      // 随机获取一组数据
      let responst = await Api.detailsList({ id });
      this.form = responst.data.data;
      // 获取 表签数据

      let labelList = await Api.labelList();

      for (let i of labelList.data.data) {
        let item = `${i.name}/${i.labelList[0].name}`;
        this.labelLists.push(item + "    ");
      }
      console.log(this.labelLists.join(" "));
      this.form.labelIds = this.labelLists.join(" ");
      console.log(this.form.labelIds, "this.form.labelIds");
    },

    // 关闭模态框
    handleClose() {
      this.dialogVisible = false;
      this.distributeDialog=false
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
      console.log(id);
      let response = await Api.labelList({ id });
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
          let response = await Api.handleDel({ id });
          this.getRoleList();
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
      this.getRoleList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getRoleList();
    },
  },
};
</script>

<style scoped lang="scss"></style>
