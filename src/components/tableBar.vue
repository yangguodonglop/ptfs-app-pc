
  <template>
    <el-table
     :data="tableData"
      style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column  v-for="(item,index) in rowHeader" :key="index" :prop="item.prop" :label="item.label"> </el-table-column>
    <el-table-column :label="tableOption.label">
    <template slot-scope="scope">
        <el-button size="mini" v-for="(item,index) in tableOption.options" :key="index" :type="item.type" @click="handleButton(item.methods,scope.row)">
            {{item.label}}
        </el-button>
    </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    rowHeader: {
      type: Array,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => {}
    },
    tableOption: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  mounted: function() {

  },
  methods: {
      handleButton(methods,row){
          this.$emit('handleButton',{'methods':methods,'row':row})
      }
  }
};
</script>
<style lang="less" >
.el-table{
    font-size: 12px;
}
</style>
