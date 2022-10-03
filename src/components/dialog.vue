<template>
  <div>
    <!-- 模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="handleClose"
    >
      <!-- <queryForm
      v-bind="$attrs" v-on="$listeners"></queryForm>
       -->
      <queryForm :inline="false"
        :queryFormList="queryFormList"
        v-model="value"
        :labelWidth="labelWidth"
        :rules="rules"
        @Add="Add"
        :radioBTN="radioBTN"
        @Edit="Edit"
        @flag="handleClose"
        :optionList="optionList"
        :button="button" 
     ></queryForm>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name:"dialogItem",
  components: {
    queryForm: () => import("../components/queryForm.vue"),
  },
  props: {
    // 判断 显示两个 或者 三个
        radioBTN:{
      type: String,
      default: "",
    },
    // 审核 按钮 判断 是否 显示
    button:{
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: () => {},
    },
    optionList: {
      type: Array,
      default: () => [],
    },
    // label 宽度
    labelWidth: {
      type: String,
      default: "",
    },
    // 模态框头部信息
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Object,
      default: () => {},
    },
    // 模态框显示隐藏
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // 模态框宽度
    width: {
      type: String,
      default: "300px",
    },
    queryFormList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.value);
  },
  methods: {
    // 模态框点击叉号事件
    handleClose() {
      this.$emit("handleClose");
    },
    Add(val) {
      console.log(val);
      this.$emit("Add",val)
    },
    
    Edit(val){
        console.log(val);
      this.$emit("Edit",val)
    },
//     flag(){
// this.$emit("flag")
//     },

    submit() {
      console.log(12);
    },
  },
};
</script>

<style scoped lang="scss"></style>
