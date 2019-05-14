<template>
    <el-col :span="24" style="padding-bottom: 0px;">
      <el-row>
            <el-col :span="6"  v-for="(items,index) in listArray" v-bind:key="index">
                <div class="new_cont" :class="onchaneClass(index)" style="width:100%;" >
                    <div class="item_one">{{items.title}}</div>
                    <div class="item_two">{{items.nums}}</div>
                </div>
            </el-col>
      </el-row>
    </el-col>
</template>

<script>
export default {
  props: ["listArray"],
  data() {
    return {
   
    };
  },
  mounted: function() {},
  methods: {
    onchaneClass(index) {
      return "new_cont_active" + (index + 1);
    }
  }
};
</script>
<style lang="less" >
.new_cont {
  background: #f2f2f2;
  height: 80px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.new_cont_active1 {
  background-image: linear-gradient(159deg, #b87cf6 0%, #903be7 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.new_cont_active2 {
  background-image: linear-gradient(-53deg, #3d5bd9 0%, #71a2e0 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.new_cont_active3 {
  background-image: linear-gradient(-90deg, #fb9a8d 0%, #feb485 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.new_cont_active4 {
  background-image: linear-gradient(-90deg, #ff463f 0%, #ff8157 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
</style>
