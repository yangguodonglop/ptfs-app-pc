<template>
<div>
   <el-alert
            type="success"
            :closable="false"
            show-icon>
            <div>共搜索到 <span>{{dataNum}}</span>条数据</div>
    </el-alert>
    
</div>
     
</template>

<script>
export default {
  props: {
    dropdownArr: {
      type: Array,
      default: () => {}
    },
    dataNum:{
      type:String,
      default:()=>{}
    }

  },
  data() {
      return{
      
      }
  },
  mounted: function() {},
  methods: {
  
  }
};
</script>

<style <style lang="less">
    .el-alert .el-alert__description{
        margin: 0px;
        
    }
    .el-alert--info{
        background: #f0f9eb;
        span{
          color: red;
          padding: 0px 5px;
          color: #409eff;
        }
    }
    .el-icon-info:before{
        color: #409EFF;
    }

</style>
