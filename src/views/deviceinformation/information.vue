<template>
<section class="myself-container">
    <div class="devide_title">
        <el-row type="flex">
            <el-col :span="24">
                <titleBar :listArray="listArray"></titleBar>
            </el-col>
        </el-row>
    </div>
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex" class="row_active">
                <el-form-item label="用户ID">
                    <el-input v-model="form.inputText" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="设备SN">
                    <el-input v-model="form.inputText1" placeholder="请输入设备SN"></el-input>
                </el-form-item>
                <el-form-item label="节点ID">
                    <el-input v-model="form.inputText2" placeholder="请输入节点ID"></el-input>
                </el-form-item>

                <el-form-item label="设备状态">
                    <el-select v-model="form.selectedValue" @change="change">
                        <el-option v-for="item in form.optionArr" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="getInfo()">搜索</el-button>
            </el-row>
        </el-form>
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="6">
                <myDropdown :dropdownArr="dropdownArr" @handleCommand="handleCommand"></myDropdown>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active" justify="space-between">
            <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col>
            <el-col :span="1" type="flex" style="margin-right:10px;">
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" @handleSelectionChange="handleSelectionChange"></tableBar>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <myDatanums :dataNum="dataNum"></myDatanums>
            </el-col>
        </el-row>
    </div>
    <div class="devide_pageNation">
        <div class="devide_pageNation_active">
            <el-row type="flex">
                <el-col :span="6">
                    <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
                </el-col>
            </el-row>
        </div>
    </div>

</section>
</template>

<script>
import titleBar from "../../components/titleBar";
import tableBar from "../../components/tableBar";
import pageNation from "../../components/pageNation";
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";
import myDropdown from "../../components/myDropdown";
import myAlert from "../../components/myAlert";
import myDatanums from "../../components/myDatanums";
import {
    devicelist
} from "../../api/api.js";
import common from "../../common/js/util.js"
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            listArray: [{
                    title: "激活西柚机",
                    nums: "80022"
                },
                {
                    title: "西柚机总数",
                    nums: "1800"
                },
                {
                    title: "在线西柚机",
                    nums: "2800"
                },
                {
                    title: "备用模块",
                    nums: "3800"
                }
            ],

            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "miner_sn",
                    label: "设备SN"
                },
                {
                    prop: "miner_type",
                    label: "设备型号"
                },
                {
                    prop: "miner_name",
                    label: "设备昵称"
                },
                {
                    prop: "bind_user_tel_num",
                    label: "手机号"
                },
                {
                    prop: "userSex",
                    label: "性别"
                },
                {
                    prop: "bind_state",
                    label: "状态"
                },
                {
                    prop: "online_state",
                    label: "是否激活"
                },
                {
                    prop: "time_create",
                    label: "注册日期"
                },
                {
                    prop: "time_update",
                    label: "首次绑定日期"
                }
            ],
            tableData: [],
            tableOption: {
                label: "操作",
                width: 250,
                options: [{
                        label: "开机",
                        type: "primary",
                        methods: "editOnchange"
                    },
                    {
                        label: "关机",
                        type: "primary",
                        methods: "deleteOnchange"
                    },
                    {
                        label: "重启",
                        type: "primary",
                        methods: "deleteOnchange"
                    },
                    {
                        label: "强制解绑",
                        type: "primary",
                        methods: "deleteOnchange"
                    },
                    {
                        label: "拉黑",
                        type: "primary",
                        methods: "deleteOnchange"
                    }
                ]
            },
            pager: {
                count: 40,
                page: 1,
                rows: 10
            },
            form: {
                labelName: "用户ID",
                inputText: "",
                inputTextactive: "请输入用户ID",
                labelName1: "设备SN",
                inputText1: "",
                inputTextactive1: "请输入设备SN号",

                labelName2: "节点ID",
                inputText2: "",
                inputTextactive2: "请输入节点ID",

                optionArr: ["全部", "在线", "离线", "磁盘异常"],
                selectName: "设备状态",
                selectedValue: "全部",
            },

            optionStateArr: ["全部", "是", "否"],
            selectStateName: "是否激活",
            selectStateValue: "全部",

            optionSexArr: ["全部", "男", "女", "未知"],
            selectSexName: "显示性别",
            selectSexValue: "全部",

            dataResName: "注册日期",
            dataBindName: "首次绑定日期",

            showState: false,
            datapickeResValue: [
                new Date(1800, 10, 10, 10, 10),
                new Date(1900, 10, 11, 10, 10)
            ],
            datapickerBindValue: [
                new Date(2000, 10, 10, 10, 10),
                new Date(2100, 10, 11, 10, 10)
            ],
            dropdownArr: [{
                    name: "批量冻结",
                    value: "1"
                },
                {
                    name: "批量解冻",
                    value: "2"
                }
            ],
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: true,
            push_key: ""
        };
    },
    mounted: function () {

        this.push_key = this.$route.query.push_key
        this.dataNum = this.tableData.length;
        this.queryInfo()
    },
    methods: {
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                alert("此处为解冻方法" + "***" + "解冻id为" + val.row.userId);
            } else {
                alert("此处为冻结方法" + "***" + "冻结id为" + val.row.userId);
            }
        },
        handleSelectionChange(val) {
            alert(val.length)
            this.alertNum = val.length
            alert(JSON.stringify(val))
        },
        handleSizeChange(val) {
            alert("每页" + "***" + val.val + "条");
        },
        handleCurrentChange(val) {
            alert("当前页" + "***" + val.val);
        },
        getInfo() {
            alert(JSON.stringify(this.selectedValue));
        },
        change(val) {
            alert(val + "****");
        },
        getShow() {
            this.showState = !this.showState;
        },
        handleCommand(command) {
            if (this.alertNum == 0) {
                this.$message({
                    message: '请至少选择一条数据',
                    type: 'warning'
                });
            } else {
                alert('click on item *' + command);
            }

        },
        getInfo() {
            this.queryInfo()
        },
        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()
            if (this.push_key != undefined) {
                param.push_key = this.push_key;
                param.user_id = "";
                param.sn = "";
                param.node_hash = "";
                param.status = "";
            } else {
                param.push_key = "";
                param.user_id = this.form.inputText;
                param.sn = this.form.inputText1;
                param.node_hash = this.form.inputText2;
                param.status = this.form.selectedValue;
            }

            param.page = this.pager.page - 1
            devicelist(param)
                .then(res => {
                    console.log(res)
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {

                        let nowarractive = res.result.cols
                        let nowarrLength = res.result.page * 10 + nowarractive.length + res.result.les_count
                        this.pager.count = nowarrLength
                        this.dataNum = nowarrLength

                        for (var i = 0; i < nowarractive.length; i++) {
                            nowarractive[i].time_create = this.common.getTimes(parseInt(nowarractive[i].time_create * 1000))
                            nowarractive[i].time_update = this.common.getTimes(parseInt(nowarractive[i].time_update * 1000))
                            switch (nowarractive[i].bind_state) {
                                case "0":
                                    nowarractive[i].bind_state = "未绑定"
                                    break;
                                case "1":
                                    nowarractive[i].bind_state = "已绑定"
                                    break;

                            }
                            switch (nowarractive[i].online_state) {
                                case "0":
                                    nowarractive[i].online_state = "在线"
                                    break;
                                case "1":
                                    nowarractive[i].online_state = "离线"
                                    break;

                            }
                        }
                        this.tableData = nowarractive
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },

    },
    components: {
        titleBar: titleBar,
        tableBar: tableBar,
        pageNation: pageNation,
        formInput: formInput,
        genderSelector: genderSelector,
        dateTimePicker: dateTimePicker,
        myDropdown: myDropdown,
        myAlert: myAlert,
        myDatanums: myDatanums
    }
};
</script>

<style lang="less">
.myself-container {
    width: 100%;
    min-width: 1600px;

    .devide_title {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 10px;
        background: #f2f2f2;
        padding: 15px 0px;
        box-sizing: border-box;

        .el-col {
            padding: 0px 20px;
        }
    }

    .device_form {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;
        background: #f2f2f2;
        padding: 15px 30px;
        box-sizing: border-box;

        .el-form-item {
            margin-bottom: 0px;
        }

        .row_active {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .div_show {
            width: auto;
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            color: #409eff;
            cursor: pointer;
        }
    }

    .devide_table {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;

        .el-table td,
        .el-table th {
            padding: 6px 0px;
        }

        .row_active {
            margin-top: 10px;
        }
    }

    .devide_pageNation {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;

        .devide_pageNation_active {
            float: right;
        }
    }
}
</style>
