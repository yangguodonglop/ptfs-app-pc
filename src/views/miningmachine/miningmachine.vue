<template>
  <el-table
    v-loading="loading2"
    element-loading-text="功能开发中，敬请期待！"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#000000"
    style="border: none;">
    
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        loading2: true
      };
    }
  };
</script>