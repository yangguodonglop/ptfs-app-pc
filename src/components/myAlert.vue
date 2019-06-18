<template>
<div>
   <el-alert
            type="info"
            :closable="false"
            show-icon>
            <div>已选择<span>{{alertNum}}</span>项</div>
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
    alertNum:{
      type:String,
      default:()=>{}
    }

  },
  data() {
      return{
        alertNum:2  
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
        background: #e6f3fc;
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
