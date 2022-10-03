<template>
  <div>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        page:{
            type:[String,Number],
            default:'1',
        },
        size:{
            type:[String,Number],
            default:'10',
        },
        total:{
            type:[String,Number],
            default:'10',
        },
    },
  data () {
    return {

    }
  },
  methods: {
    handleSizeChange(val){
        this.$emit("handleSizeChange",val)
    },
    handleCurrentChange(val){
        this.$emit("handleCurrentChange",val)
    },


  },
  components: {

  }
}
</script>

<style scoped lang='scss'>

</style>
