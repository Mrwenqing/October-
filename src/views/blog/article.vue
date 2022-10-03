<template>
  <div>
    <!-- 文章管理 -->
    <!-- 封装 头部 表单 -->
    <div class="mtb-20">
      <queryForm
        :queryFormList="queryFormList"
        :optionList="optionList"
        v-model.sync="queryForm"
        :inline="true"
      >
        <template v-slot:active>
          <el-button icon="el-icon-search" type="primary" @click="search"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh" @click="resetForm(queryForm)"
            >重置</el-button
          >
        </template>
      </queryForm>
    </div>
    <!-- 封装表格 -->
    <Table
      :tableHeade="tableHeade"
      :tableData="tableData"
      :optionList="optionList"
    >
      <template v-slot:function="scope">
        <el-button type="primary" size="mini" @click="examine(scope.row.id)"
          >查看</el-button
        >
        <el-button
          type="success"
          size="mini"
          @click="audit(scope.row.id)"
          v-if="scope.row.status == 0"
        >
          审核</el-button
        >
        <el-button type="danger" size="mini" v-else-if="scope.row.status !== 3"
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
      :total="this.page.total"
    >
    </pagination>
    <!-- 封装模态框 -->
    <!-- dialogInfo="dialogInfo" -->
    <Dialog
      :title="title"
      :button="button"
      :dialogVisible="dialogVisible"
      :width="width"
      :labelWidth="labelWidth"
      v-model.sync="form"
      :queryFormList="dialogForm"
      @handleClose="handleClose"
    ></Dialog>
  </div>
</template>

<script>
import Api from "../../api/article.js";
export default {
  components: {
    queryForm: () => import("../../components/queryForm.vue"), //封装表单
    Table: () => import("../../components/Table.vue"), //表格 封装
    pagination: () => import("../../components/pagination.vue"), //分页
    Dialog: () => import("../../components/dialog.vue"), //模态框
    
  },
  data() {
    return {
      // 表单数据
      // 搜索表单数据
      queryFormList: [
        { label: "文章标题", prop: "title", placeholder: "请输入文章标题" },
        {
          label: "状态",
          type: "select",
          prop: "status",
          placeholder: "请选择",
          width: "120px",
        },
        { type: "active" },
      ],
      // 搜索表单 v-model 数据
      queryForm: {
        title: "", //文章标题
        status: "", //状态
      },
      // 下拉菜单数据
      optionList: [
        {
          value: 0,
          label: "未审核",
        },
        {
          value: 1,
          label: "审核通过",
        },
        {
          value: 2,
          label: "审核未通过",
        },
        {
          value: 3,
          label: "已删除",
        },
      ],

      // 表格数据

      // 表格 头部信息
      tableHeade: [
        { label: "序号", type: "index", width: "80px" },
        { label: "文章标题", prop: "title" },
        { label: "浏览数", prop: "viewCount" },
        { label: "点赞数", prop: "thumhup" },
        { label: "是否公开", prop: "ispublic", type: "radio"},
        { label: "状态", prop: "status", type: "status" },
        { label: "最后更新时间", prop: "updateDate" },
        { label: "操作", type: "function", width: "280px" },
      ],
      tableData: [], //总共数据

      // 分页数据
      page: {
        current: 1, //当前页
        size: 20, //每页展示多少条
        total: 100, // 总共条数
      },
      button: false,

      // 模态框 数据
      labelWidth: "80px", //label 数
      title: "查看", //模态框头部信息
      dialogVisible: false, //模态框显示隐藏
      width: "60%", //模态框宽度
      // 模态框 表单数据
      dialogForm: [
        { label: "标题", prop: "title", width: "80%", readonly: true },
        {
          label: "标签",
          type: "select",
          prop: "labelIds",
          width: "80%",
          disabled: true,
        },
        { label: "主图", type: "img", prop: "imageUrl", width: "80%" },
        { label: "是否公开", type: "radio", prop: "ispublic", disabled: true,flag:"ispublic"},
        {
          label: "简介",
          type: "textarea",
          prop: "summary",
          width: "80%",
          readonly: true,
        },
        {
          label: "内容",
          type: "richtext",
          prop: "htmlContent",
          width: "80%",
          readonly: true,
        },
      ],
      // 标签数据
      labelLists: [],
      form: {
        title: "",
        imageUrl: "",
        htmlContent: "",
        ispublic: "",
        labelIds: "",
        mdContent: "",
        summary: "",
        title: "",
        updateDate: "",
      },
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    // 请求表格数据
    async getArticleList() {
      let { title, status } = this.queryForm;
      let { current, size } = this.page;
      let response = await Api.getArticleList({ title, status, current, size });
      this.tableData = response.data.data.records;
      this.page.total = response.data.data.total;
    },

    // 审核
    audit(id) {
      console.log(id);
      this.button = true;
      this.examine(id);
    },
    // 搜索
    search() {
      console.log(this.queryForm);
      this.getArticleList();
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
        console.log(i);
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
      this.getArticleList();
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
      this.getArticleList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getArticleList();
    },
  },
};
</script>

<style scoped lang="scss"></style>
