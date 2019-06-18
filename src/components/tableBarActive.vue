<template>
<el-table border :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" id="rebateSetTable">
    <el-table-column type="selection" width="55" v-if="clomnSelection"> </el-table-column>
    <el-table-column v-for="(item,index) in rowHeader" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
    </el-table-column>
    <el-table-column :label="tableOption.label" :width="tableOption.width">
        <template slot-scope="scope">
           
             <el-button @click="toDelete(scope.row)" type="danger" size="small">删除</el-button>
             <el-button @click="toChange(scope.row)" type="primary" size="small">修改</el-button>
             <el-button @click="toSet(scope.row)" type="success" size="small">设置发布渠道</el-button>
             <el-button @click="toRelease(scope.row)" type="info" size="small" v-if="scope.row.status==0">发布</el-button>
            <!-- <el-button size="mini" v-for="(item,index) in tableOption.options" :key="index" :type="item.type" @click="handleButton(item.methods,scope.row)">
                {{item.label}}
            </el-button> -->
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
        },
        clomnSelection: {
            type: String,
            default: () => {

            }
        }
    },
    data() {
        return {

        };
    },
    mounted: function () {

    },
    methods: {
    
        toDelete(val) {
            this.$emit('toDelete',val)
        },
         toChange(val) {
            this.$emit('toChange',val)
        },
         toRelease(val) {
            this.$emit('toRelease',val)
        },
          toSet(val) {
            this.$emit('toSet',val)
        },
        
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.$emit('handleSelectionChange', val)
        }
    }
};
</script>

<style lang="less">
.el-table {
    font-size: 12px;
}
</style>
