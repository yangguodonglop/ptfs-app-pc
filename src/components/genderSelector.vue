<template>
  
        <el-form-item :label="selectName">
        <el-select v-model="selectedValue" @change="change">
             <el-option v-for="item in optionArr" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        </el-form-item>


  
</template>

<script>
export default {
  props: {
    optionArr: {
      type: Array,
      default: () => {}
    },
    selectName:{
        type:String,
        default:()=>{}
    },
    selectedValue:{
        type:String,
        default:()=>{} 
    }
  },
  data() {
    return {
     
     
    };
  },
  model: {
    event: "change"
  },
  // watch: {
  //     selected: function (val) {
  //         this.$emit("change", val);
  //     }
  // },
  methods: {
    change(val) {
      this.$emit("change", val);
    }
  }
};
</script>