<template>
  <div>
    <el-form
      :model="value"
      :inline="inline"
      :label-width="labelWidth"
      :rules="rules"
      ref="ruleForm"
    >
      <template v-for="item in queryFormList">
        <!-- 一般数据 -->
        <el-form-item v-bind="item" v-if="!item.type">
          <el-input
            v-model="value[item.prop]"
            v-bind="item"
            :style="{ width: `${item.width}` }"
          ></el-input>
        </el-form-item>

        <!-- 下拉菜单 -->
        <el-form-item v-else-if="item.type === 'select'" v-bind="item">
          <el-select
            v-bind="item"
            v-model="value[item.prop]"
            :style="{ width: `${item.width}` }"
          >
            <el-option
              :label="ele.label"
              :value="ele.value"
              v-for="ele in optionList"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item
          :label="item.label"
          v-else-if="item.type === 'img'"
          v-bind="item"
        >
          <img :src="value[item.prop]" alt="" class="img" />
        </el-form-item>

        <!-- 单选 -->
        <el-form-item v-else-if="item.type === 'radio'" v-bind="item">
        <!-- 当 item.prop=='ispublic' 为 公开 / 不公开 -->
            <el-radio-group  v-if="item.flag=='ispublic'" v-bind="item" v-model="value[item.prop]" >
              <el-radio :label="0">公开</el-radio>
              <el-radio :label="1">不公开</el-radio>
            </el-radio-group>
            
            <el-radio-group v-model="value[item.prop]" v-bind="item"
             v-else-if="item.flag=='publicity'">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
            
           <el-radio-group v-model="value[item.prop]" v-bind="item"
             v-else-if="radioBTN=='two'">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">菜单</el-radio>
            </el-radio-group> 
            

            <el-radio-group v-model="value[item.prop]" v-bind="item"
             v-else-if="radioBTN=='three'">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">菜单</el-radio>
              <el-radio :label="3">按钮</el-radio>
            </el-radio-group> 
        </el-form-item>

        <!-- 文本域 -->

        <el-form-item
          :label="item.label"
          v-else-if="item.type === 'textarea'"
          v-bind="item"
        >
          <el-input
            v-bind="item"
            :rows="2"
            placeholder="请输入内容"
            v-model="value[item.prop]"
            :style="{ width: `${item.width}`}"
          >
          </el-input>
        </el-form-item>

        <!-- richtext -->
        <!-- 富文本 -->

        <el-form-item :label="item.label" v-else-if="item.type === 'richtext'">
          <!-- 失去焦点时手动校验该字段 (当前 articleBody 属性值) -->
          <mavon-editor
    
  
          v-model="value[item.prop]">
     
          <quill-editor
            @blur="$refs.ruleForm.validateField('articleBody')"
          
            v-html="value[item.prop]"
          />
        </mavon-editor>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item v-else-if="item.type === 'active'">
          <slot :name="item.type"></slot>
        </el-form-item>

        <!-- 计数器 -->
        <el-form-item
          v-else-if="item.type === 'number'"
          :label="item.label"
          v-bind="item"
        >
          <el-input-number
            v-model="value[item.prop]"
            @change="handleChange"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <!-- 广告  -->
        <!-- upload -->
        <el-form-item v-else-if="item.type === 'upload'" v-bind="item">
          <el-upload
           
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 审核 按钮 -->

        <!-- 按钮 -->
        <el-form-item v-else-if="item.type === 'button'">
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </el-form-item>
      </template>
    </el-form>
    <dev v-if="button" class="button">
      <el-button type="primary" @click="pass">审核通过</el-button>
      <el-button type="danger" @click="fail">审核未通过</el-button>
    </dev>
  </div>
</template>

<script>
  
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css"; 
export default {
  props: {
     // 判断 显示两个 或者 三个
     radioBTN:{
      type: String,
      default: "",
    },
    // 审核 按钮 判断 是否 显示
    button: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: () => {},
    },
    // label 宽度
    labelWidth: {
      type: String,
      default: "",
    },
    // 表单数据
    queryFormList: {
      type: Array,
      default: () => [],
    },
    // v-model
    value: {
      type: Object,
      default: () => {},
    },
    // 是否开启一行显示
    inline: {
      type: Boolean,
      default: false,
    },
    // 下拉菜单数据
    optionList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  watch:{
      value(){
        console.log(this.value,8888);
         this.imageUrl=this.value.imageUrl
      }
    },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.imageUrl = URL.createObjectURL(file);

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 计步器时间
    handleChange(val) {},
  

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.value);
          if (!this.value.id) {
            this.$emit("Add", this.value);
          } else {
            this.$emit("Edit", this.value);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 通过
    pass() {
      this.$message.success("审核通过");
      this.$emit("flag");
    },
    // 未通过
    fail() {
      this.$message.success("审核未通过");
      this.$emit("flag");
    },
  },
  components: {mavonEditor,},
};
</script>

<style scoped lang="scss">
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.el-from {
  margin: 0;
  padding: 0;
}
.img {
  width: 100px;
  height: 100px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
