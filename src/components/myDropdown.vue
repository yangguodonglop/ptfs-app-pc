<template>
<el-dropdown trigger="click" @command="handleCommand">
    <el-button type="primary">
        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in dropdownArr" :key="index" :command="item.value">{{item.name}}</el-dropdown-item>
    </el-dropdown-menu>
</el-dropdown>
</template>

<script>
export default {
    props: {
        dropdownArr: {
            type: Array,
            default: () => {}
        }
    },
    data() {
        return {

        }
    },
    mounted: function () {},
    methods: {
        handleCommand(command) {
            //alert("click on item " + command);
            this.$emit("handleCommand", command);
        }
    }
};
</script>

<style>
</style>
