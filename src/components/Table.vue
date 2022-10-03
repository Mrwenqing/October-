<template>
  <div>
    <!-- 封装表格 -->

    <el-table :data="tableData" border style="width: 100%"   
    row-key="id"  :tree-props="{children: 'children'}" 
    >
      <template v-for="item in tableHeade" >

        <!-- selection -->
        <!-- 复选框 -->
        <el-table-column v-if="item.type==='selection'" v-bind="item"  align="center"></el-table-column>
        <!-- 序号 -->
      <el-table-column v-else-if="item.type==='index'" v-bind="item"  align="center"></el-table-column>
     
      <!-- :tree-props="{children: 'children', hasChildren: 'hasChildren'}"> -->
      <!-- 一般表格 -->
      <el-table-column v-else-if="!item.type"
       v-bind="item" align="center"></el-table-column>
     <!-- 是否公开 -->
     <el-table-column v-else-if="item.type=='ispublic'" v-bind="item" align="center">
      <template v-slot="scope">
        <el-tag  :type="scope.row[item.prop]==1?'success':'danger'" align="center">{{scope.row[item.prop]==1?'公开':'不公开'}}</el-tag>
      </template>
     </el-table-column>
     <!-- 展示图片 -->

     <el-table-column 
     v-else-if="item.type=='img'" v-bind="item" align="center" >
     {{item.prop}}
     <template v-slot="scope">

<el-image 
    style="width: 100px; height: 100px"
    :src="scope.row[item.prop]" 
    :preview-src-list="srcList">
  </el-image>
</template>
     </el-table-column>
     <!-- 状态 -->
     <el-table-column 
      v-else-if="item.type=='status'" v-bind="item" align="center">
      <template v-slot="scope">
        <el-tag  v-if="optionList[scope.row[item.prop]].label=='禁用'" 
        type="danger">禁用</el-tag> 
      <el-tag v-else :type="scope.row[item.prop]==0&&optionList[scope.row[item.prop]].label!=='禁用'?'':scope.row[item.prop]==1?
      'success':scope.row[item.prop]==2?'warning':'danger'">
      {{optionList[scope.row[item.prop]].label}}</el-tag> 
      </template>
     </el-table-column>

     <!-- 操作 -->
     <el-table-column v-else-if="item.type=='function'" v-bind="item" >
      <template v-slot="scope">
      <slot :name="item.type" :row="scope.row"></slot>
      </template>

     </el-table-column>

      </template>
      
        <!-- <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props:{
    // 表格 头部信息
    tableHeade:{
      type:Array,
      default:()=>[]
    },
    // 全部数据
    tableData:{
      type:Array,
      default:()=>[]
    },
      // 状态 数据
      optionList: {
      type: Array,
      default: () => [],
    },
  },
  

  data() {
    return {
      srcList:[
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg"
      ]
    };
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
  .img{
    width: 160px;
    height: 100px;
  }
</style>
