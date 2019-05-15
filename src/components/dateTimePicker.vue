<template>
    <el-form-item :label="datapickerName">
        <el-date-picker
            v-model="datapickerValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
    </el-date-picker>
        </el-form-item>
</template>

<script>
export default {
    props:{
        datapickerName:{
            type:String,
            default:()=>{
            }
        },
        datapickerValue:{
             type:Array,
            default:()=>{
            }
        }
    },
 data() {
      return {
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        
      };
    }

};
</script>

<style>
</style>
