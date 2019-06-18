<template>
    <el-form-item :label="labelName">
         <el-input v-model="inputText" placeholder="inputText"></el-input>
     </el-form-item>
</template>

<script>
export default {
  props: ["labelName", "inputText","inputTextactive"]
};
</script>

<style>
.el-form-item__label {
  font-size: 12px;
}
.el-form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-input__inner {
  font-size: 12px;
}
</style>
