<template>
<section class="myself-container">

    <div class="device_form">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全网发布" name="first">
                <el-form ref="form" :model="form">
                    <el-row type="flex">

                        <el-col :span="5">
                            <gender-selector size="small" :optionArr="optionArr" :selectedValue="selectedValue" :selectName="selectName" @change="change"></gender-selector>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="发布渠道">
                                <el-radio v-model="radio" label="HTTPS">HTTPS</el-radio>
                                <el-radio v-model="radio" label="PTFS">PTFS</el-radio>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="发布描述">
                                <el-input v-model="form.inputText" placeholder="请输入发布描述"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="2">
                            <el-button type="primary" @click="getInfo()" :disabled="disableStatusActive">发布并预览</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" :disabled="disableStatus" @click="getInfo()">重新发布</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="灰度发布" name="second">
                <el-form ref="form" :model="form">
                    <el-row type="flex">
                        <el-col :span="3">
                            <el-button type="primary" @click="getShow()">添加设备清单</el-button>
                        </el-col>
                        <el-col :span="5">
                            <gender-selector size="small" :optionArr="optionArr" :selectedValue="selectedValue" :selectName="selectName" @change="change"></gender-selector>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="发布渠道">
                                <el-radio v-model="radio" label="HTTPS">HTTPS</el-radio>
                                <el-radio v-model="radio" label="PTFS">PTFS</el-radio>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="发布描述">
                                <el-input v-model="form.inputText" placeholder="请输入发布描述"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="2">
                            <el-button type="primary" @click="getInfo()" :disabled="disableStatusActive">发布并预览</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" :disabled="disableStatus" @click="getInfo()">重新发布</el-button>
                        </el-col>

                    </el-row>
                    <el-row type="flex" class="row_active" v-show="showState">
                        <textarea placeholder="请输入文字描述" v-model="textareaText"></textarea>
                    </el-row>
                </el-form>
            </el-tab-pane>
        </el-tabs>
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
    <el-dialog :visible.sync="dialogReleaseState" class="my_dialog_set" :show-close="false" :close-on-click-modal="false">
        <div>
            <div>版本号： {{releaseVersion}}</div>
            <div>发布渠道： {{pushMod}}</div>

            <div v-for="(item,index) in releaseInfo" :key="index">
                <div>文件名称： {{item.version_name}}</div>
                <div>md5: {{item.md5}}</div>
                <div>URl: {{item.rom_url}}</div>
                <div>hashid: {{item.hashid}}</div>
            </div>
            <!-- <div>名称：1.0.5</div>

            <div>hashid：sasadsadasdsadsadasdsads</div>
            <div>md5：asdsadasdsadsadsadsadsadsad</div>
            <div>点击确认后，系统包将分发给上述渠道</div> -->
        </div>
        <div slot="footer" class="dialog-footer" style="">
            <el-button type="primary" @click="determine()">确 定</el-button>
        </div>
    </el-dialog>

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
    getpacketbyversion,
    publishlist,
    getversion,
    publish

} from "../../api/api.js";
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            activeName: 'first',
            radio: "HTTPS",
            textareaText: "复制SN或MAC清单，用换行隔开",
            dialogReleaseState: false,
            releaseInfo: [],
            releaseVersion: "",
            pushMod: "",
            push_type: "全网推送",
            nowVersion: "",
            disableStatus: true,
            disableStatusActive:false,

            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "id",
                    label: "ID"
                },
                {
                    prop: "time_create",
                    label: "发布日期"
                },
                {
                    prop: "version_group",
                    label: "版本组"
                },
                {
                    prop: "push_type",
                    label: "发布类型"
                },
                {
                    prop: "push_mod",
                    label: "发布渠道"
                },

                {
                    prop: "descript",
                    label: "发布描述"
                },

            ],
            tableData: [],
            tableOption: {
                label: "操作",
                options: [{
                        label: "详情",
                        type: "primary",
                        methods: "editOnchange"
                    },

                ]
            },
            pager: {
                count: "",
                page: 1,
                rows: 10
            },
            form: {
                labelName: "发布描述",
                inputText: ""
            },
            optionArr: [],
            selectName: "当前版本组",
            selectedValue: "",

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
            clomnSelection: false,
        };
    },
    mounted: function () {
        this.dataNum = this.tableData.length;
        this.queryInfo();
        this.getversionInfo();
        if (this.nowVersion != this.selectedValue) {
            this.disableStatus = true
        } else {
            this.disableStatus = false
        }

    },
    methods: {
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                this.$router.push({
                    path: "/deviceinformation",
                    query: {
                        push_key: val.row.push_key
                    }
                })

            }
        },
        handleSelectionChange(val) {
            this.alertNum = val.length
        },
        handleSizeChange(val) {
            //this.pager.page=val

        },
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryInfo()
        },
        getInfo() {
            this.dialogReleaseState = true
            let param = new Object()
            param.version = this.selectedValue
            getpacketbyversion(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        console.log(res)

                        this.releaseVersion = res.result.cols[0].rom_version
                        this.pushMod = res.result.cols[0].push_mod
                        this.releaseInfo = res.result.cols
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        },
        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()
            param.page = this.pager.page - 1
            publishlist(param)
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

                        }
                        this.tableData = nowarractive
                        console.log(this.tableData)
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },
        //版本下拉执行操作
        change(val) {
            this.selectedValue = val
            if (this.nowVersion != val) {
                this.disableStatus = true
            } else {
                this.disableStatus = false
            }

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
            } else {}

        },
        //获取版本列表
        getversionInfo() {
            let param = new Object()
            getversion(param)
                .then(res => {
                    console.log(res)

                    if (res.status == 0) {
                        console.log(res)
                        let nowarr = res.result.cols
                        if (nowarr.length > 0) {
                            for (var i = 0; i < nowarr.length; i++) {
                                this.optionArr.push(nowarr[i].rom_version)
                            }
                            this.selectedValue = nowarr[0].rom_version
                            this.nowVersion = res.result.high_version
                            this.disableStatusActive=false
                            this.disableStatus=false
                        }
                        else{
                            this.disableStatusActive=true
                            this.disableStatus=true
                        }

                    } else {
                        this.$message({
                            message: "网络出错，请重新请求",
                            type: "error"
                        });
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },
        //确定发布
        determine() {
            this.dialogReleaseState = false
            let param = new Object()
            if (this.activeName == "first") {
                this.push_type = "全网发布"
                this.textareaText = ""

            } else {
                this.push_type = "灰度发布"
                this.textareaText = this.textareaText
            }
            param.version_group = this.selectedValue
            param.push_mod = this.radio
            param.push_type = this.push_type
            param.descript = this.form.inputText
            param.sn_list = this.textareaText
      
            publish(param)
                .then(res => {
                    //this.updateFrom = res.result
                    console.log(res)
                    if (res.status != 0) {
                        this.$message({
                            message: "发布失败",
                            type: "error"
                        })
                    } else {
                        this.$message({
                            message: "发布成功",
                            type: "success"
                        });
                        this.queryInfo()
                        this.getversionInfo()
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        }

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

            textarea {
                width: 255px;
                padding: 5px 5px;
                font-family: "微软雅黑";

                height: 60px;
                border: 1px solid #999999;
                border-radius: 5px;
                resize: none
            }
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

.myself-container .my_dialog_set .el-dialog {
    width: 23%;
}
</style>
