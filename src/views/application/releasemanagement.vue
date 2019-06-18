<template>
<section class="myself-container">
    <div class="device_release">
        <div class="bottom_boador">
            <el-row type="flex" class="row_active" justify="center" style="margin-bottom:20px;">
                <el-col :span="18">
                    <div class="device_release_step">
                        <el-steps :active="stepActive" align-center>
                            <el-step title="筛选设备"></el-step>
                            <el-step title="选定应用"></el-step>
                            <el-step title="选定操作"></el-step>
                            <el-step title="确认执行"></el-step>
                        </el-steps>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="bottom_boador">
            <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active">
                    <el-col :span="6">
                        <div>1、筛选设备</div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row_active row_active1">
                    <el-form-item label="用户ID">
                        <el-input v-model="form.inputText" placeholder="请输入用户ID"></el-input>
                    </el-form-item>
                    <el-form-item label="设备SN区间">
                        <el-input v-model="form.inputText1" placeholder="请输入SN起始编号"></el-input>
                    </el-form-item>
                    <div style="margin-bottom:20px;">一</div>
                    <el-form-item label="">
                        <el-input v-model="form.inputText2" placeholder="请输入SN结束编号"></el-input>
                    </el-form-item>
                    <el-form-item label="设备型号">
                        <el-select v-model="form.selectedValue" @change="change">
                            <el-option v-for="item in form.optionArr" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备状态">
                        <el-select v-model="form.selectedValue2" @change="change">
                            <el-option v-for="item in form.optionArr2" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" @click="onClickQueryinfo()">确定执行</el-button>

                    </el-form-item>

                </el-row>
            </el-form>
        </div>
        <div class="bottom_boador">
            <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active">
                    <el-col :span="6">
                        <div>2、选定应用</div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row_active row_active1 row_active2" justify="start">
                    <el-form-item label="选择应用">
                        <el-select v-model="form.selectedValue3" @change="change">
                            <el-option v-for="item in form.optionArr3" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div class="bottom_boador">
            <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active">
                    <el-col :span="6">
                        <div>3、选定操作</div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row_active row_active1 row_active2">
                    <el-form-item label="选择操作">
                        <el-select v-model="form.selectedValue4" @change="change">
                            <el-option v-for="item in form.optionArr4" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div class="bottom_boador bottom_boador_active">
            <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active row_active1 row_active3">
                    <el-button type="primary" @click="onClickGetinfo()">确定执行</el-button>

                </el-row>
            </el-form>
        </div>

    </div>
    <div class="devide_table">

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
    updateNodeConfigtest,
    queryRom,
    saveRom,
    deleteRom,
    findRomById,
    updateRom,
    getpacketbyversion,
    publish,
    updateMod,
    saveapp,
    applist,
    appdevicelist

} from "../../api/api.js";
import common from '../../common/js/util.js'
import echarts from 'echarts'

// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            tableData11: [],
            stepActive: "4",
            form: {
                labelName: "用户ID",
                inputText: "",
                inputTextactive: "请输入用户ID",
                labelName1: "设备SN区间",
                inputText1: "",
                inputTextactive1: "请输入SN起始编号",
                labelName2: "",
                inputText2: "",
                inputTextactive2: "请输入SN终止编号",
                optionArr: ["全部", "P001", "P002"],
                selectedValue: "全部",
                optionArr1: ["麻花影视1.0.1", "麻花影视1.0.2", "麻花影视1.0.3"],
                selectedValue1: "麻花影视1.0.1",
                optionArr2: ["不限", "未下发", "已下发", "下发中"],
                selectedValue2: "不限",
                optionArr3: ["麻花影视1.0.1", "麻花影视1.0.2", "麻花影视1.0.3"],
                selectedValue3: "麻花影视1.0.1",
                optionArr4: ["未下发", "已下发", "下发中"],
                selectedValue4: "未下发"
            },
            rowHeader: [{
                    prop: "sn",
                    label: "设备SN",
                },
                // 未做任何格式化处理的数据
                {
                    prop: "dev_type",
                    label: "设备型号",
                },

                {
                    prop: "ip",
                    label: "设备IP",
                },
                {
                    prop: "status",
                    label: "设备状态",

                },
                {
                    prop: "user_id",
                    label: "绑定用户ID",
                },
                {
                    prop: "app_count",
                    label: "应用数量",
                },

            ],
            tableOption: {
                label: "操作",
                options: [{
                        label: "详情",
                        type: "primary",
                        methods: "editOnchange"
                    },
                    {
                        label: "冻结",
                        type: "danger",
                        methods: "deleteOnchange"
                    }
                ]
            },
            tableData: [],

            pager: {
                count: 40,
                page: 1,
                rows: 10
            },
            alertNum: 0,
            dataNum: "",
            clomnSelection: false,
            textareaText: "添加版本描述",

        };
    },
    mounted: function () {
        this.getinfo();
    },

    methods: {

        handleSizeChange(val) {

        },
        handleCurrentChange(val) {
            this.getinfo()
        },

        //确认执行
        onClickQueryinfo() {
            this.getinfo();

        },

        //获取页面表格数据
        getinfo() {

            let param = new Object()
            let sn_range = new Array()
            sn_range.push(this.form.inputText1)
            sn_range.push(this.form.inputText2)
            param.user_id = this.form.inputText
            param.type = this.form.selectedValue
            param.status = this.form.selectedValue2
            if (this.form.inputText1 == "" || this.form.inputText2 == "") {
                param.sn_range = []
            } else {
                param.sn_range = sn_range
            }

            param.page = this.pager.page - 1
            appdevicelist(param)
                .then(res => {

                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {

                        let nowarr = res.result.dev_array
                         let nowarractive = res.result.cols
                              let nowarrLength = res.result.page * 10 + nowarractive.length + res.result.les_count
                            this.pager.count = nowarrLength
                            this.dataNum = nowarrLength

                        // if (res.page <= 0) {

                        //     let nowarrLength = res.result.dev_array.length
                        //     this.pager.count = nowarrLength
                        //     this.dataNum = nowarrLength
                        // } else {
                        //     let nowarrLength = res.page * 10 + res.result.dev_array.length
                        //     this.pager.count = nowarrLength
                        //     this.dataNum = nowarrLength
                        // }
                        for (var i = 0; i < nowarr.length; i++) {
                            switch (nowarr[i].dev_type) {
                                case 0:
                                    nowarr[i].dev_type = "设备1"
                                    break;
                            }
                            switch (nowarr[i].status) {
                                case 0:
                                    nowarr[i].status = "离线"
                                    break;
                                case 1:
                                    nowarr[i].status = "在线"
                                    break;

                            }

                        }
                        this.tableData = nowarr
                        console.log(this.tableData1)
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

    .my_dialogForm .el-dialog {
        width: 25%;
    }

    #device_echars_l {
        width: 50%;
        height: 300px;
        margin: 0 auto;
        background: red;
    }

    #device_echars_l1 {
        width: 50%;
        height: 300px;
        margin: 0 auto;
        background: red;
    }

    #device_echars_l2 {
        width: 50%;
        height: 300px;
        margin: 0 auto;
        background: red;
    }

    .dialog_div .dialog_div_con {
        padding-bottom: 20px;
    }

    .upload-demo {
        margin: 0 auto;
    }

    .dialog_div .dialog_div_upload .el-upload-dragger {
        width: 390px;
    }

    .dialog_div .dialog_div_desc {
        padding-left: 0px;

        textarea {
            width: 96%;
            border: 1px solid #DCDFE6;
        }
    }

    .my_dialogForm {
        .dialog_item {
            width: 90%;
            height: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto;
            margin-bottom: 10px;

            .dialog_item_l {
                width: 90px;
                height: 35px;
                line-height: 35px;
                text-align: left;
                float: left;
            }

            .dialog_item_r {
                width: 350px;

            }
        }
    }

}

.device_release {
    width: 100%;
    height: auto;
    overflow: hidden;

    .bottom_boador {
        border-bottom: 1px solid #EBEEF5;
        margin-bottom: 20px;
        margin-top: 20px;

        &.bottom_boador_active {
            border: none;
        }
    }

    .device_release_step {
        margin-top: 30px;
        margin: 0 auto;
    }

    .row_active1 {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        &.row_active2 {
            justify-content: flex-start;
        }

        &.row_active2 {
            justify-content: space-between;
        }
    }
}
</style>
