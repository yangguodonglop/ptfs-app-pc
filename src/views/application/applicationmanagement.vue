<template>
<section class="myself-container">
    <div class="device-echars">
        <div id="device_echars_l" class="device_echars_l"></div>
        <div id="device_echars_l1" class="device_echars_l"></div>
        <div id="device_echars_l2" class="device_echars_l"></div>
    </div>

    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="2">
                <el-button type="primary" @click="dialogFormVisible">新增应用</el-button>
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
    <el-dialog :visible.sync="dialogFormState" class="my_dialogForm" :show-close="false" :close-on-click-modal="false">
        <div class="dialog_div" v-loading="loading2" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="dialog_div_con">
                <div class="dialog_div_title" style="margin-bottom:10px;">新增应用</div>
                <div class="dialog_div_upload">
                    <el-upload id="1" class="upload-demo" ref="upload1" :limit="1" drag name="configFile" :before-upload="beforeAvatarUpload" action="" :file-list="fileList" :http-request="uploadSectionFile" :auto-upload="false">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">
                            <div>只能上传.zip文件.</div>
                            <!-- <el-button type="primary" class="el-upload__tip" @click="submitUpload1">上传</el-button> -->
                        </div>
                    </el-upload>
                    <div class="dialog_div_uploadinfo" v-if="uploadinfoState1">
                        <div><span>版本号：</span>{{this.uploadinfo1.version}}</div>
                        <div><span>包名：</span>{{this.uploadinfo1.name}}</div>
                        <div><span>类型：</span>{{this.uploadinfo1.type}}</div>
                        <div><span>大小：</span>{{this.uploadinfo1.size}}M</div>
                        <div><span>md5：</span>{{this.uploadinfo1.md5}}</div>
                        <div><span>hashid:</span>{{this.uploadinfo1.hashid}}</div>
                    </div>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">应用名称：</div>
                <div class="dialog_item_r">
                    <el-input v-model="app_name" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">应用版本：</div>
                <div class="dialog_item_r">
                    <el-input v-model="app_version" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="dialog_item dialog_div_desc">
                <div class="dialog_item_l">添加描述：</div>
                <div class="dialog_item_r">
                    <textarea placeholder="请输入文字描述" v-model="app_info"></textarea>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button @click="dialogFormState = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload()">确 定</el-button>
            </div>
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
    applist
} from "../../api/api.js";
import common from '../../common/js/util.js'
import echarts from 'echarts'

// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {

            dialogFormState: false,
            uploadinfoState1: false,
            uploadinfoState2: false,
            uploadinfoState3: false,
            dialogReleaseState: false,
            dialogSetState: false,
            dialogUpdate: false,
            loading2: false,
            tableData11: [],
            rowHeader: [{
                    prop: "app_name",
                    label: "应用名称",
                    width: "150"
                },
                // 未做任何格式化处理的数据
                {
                    prop: "app_id",
                    label: "应用ID",
                },

                {
                    prop: "app_id",
                    label: "版本顺序",
                    width: "100"
                },
                {
                    prop: "app_version",
                    label: "应用版本",
                    formatter: "formatterSize"

                },
                {
                    prop: "pkg_size",
                    label: "应用大小",
                    width: "150"
                },
                {
                    prop: "pkg_name",
                    label: "包名",
                    width: "150"
                },
                {
                    prop: "app_download_url",
                    label: "文件名",
                    width: "300"
                },
                {
                    prop: "time_create",
                    label: "上传日期",
                    width: "150"
                },
                {
                    prop: "ver_info",
                    label: "描述",
                    width: "150"
                },

            ],
            tableData: [],
            tableOption: {
                label: "操作",
                width: "250",
                options: [{
                        label: "修改",
                        type: "primary",
                        methods: "toChange"
                    },

                ],
            },
            pager: {
                count: 40,
                page: 1,
                rows: 10
            },
            alertNum: 0,
            dataNum: "",
            clomnSelection: false,
            uploadinfo1: {

            },
            uploadinfo2: {

            },
            uploadinfo3: {

            },
            arr: [{

                name: "1",
                types: "HTTP"
            }, {
                name: "2",
                types: "PTFS"
            }],
            textareaText: "添加版本描述",
            pushType: "HTTP",
            setArr: [],
            radio: "1",
            newObject1: {

            },
            newObject2: {

            },
            newObject3: {

            },
            updateFrom: {
                version_name: "",
                rom_desc: "",
                rom_size: "",
                md5: "",
                rom_version: "",
                rom_url: "",
                time_create: "",
                push_mod: "",
                time_update: ""
            },
            releaseInfo: [],
            releaseVersion: "",
            dialogStatus: "",
            app_name: "",
            app_version: "",
            app_info: ""

        };
    },
    mounted: function () {

        this.getinfo();
        this.drawLine();
        this.drawLine1();
        this.drawLine2();

    },

    methods: {

        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('device_echars_l'));
            let option = {
                title: {
                    text: '版本分布图',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                    }
                },
                calculable: true,
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{
                            value: 5000,
                            name: '1.1.1版'
                        },
                        {
                            value: 1000,
                            name: '1.1.2版'
                        },
                        {
                            value: 3000,
                            name: '1.1.3版'
                        }

                    ]
                }]
            };
            myChart.setOption(option);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        },

        drawLine1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('device_echars_l1'));
            let option = {
                title: {
                    text: '版本分布图',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                    }
                },
                calculable: true,
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{
                            value: 5000,
                            name: '1.1.1版'
                        },
                        {
                            value: 1000,
                            name: '1.1.2版'
                        },
                        {
                            value: 3000,
                            name: '1.1.3版'
                        }

                    ]
                }]
            };
            myChart.setOption(option);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        },

        drawLine2() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('device_echars_l2'));
            let option = {
                title: {
                    text: '版本分布图',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                    }
                },
                calculable: true,
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{
                            value: 5000,
                            name: '1.1.1版'
                        },
                        {
                            value: 1000,
                            name: '1.1.2版'
                        },
                        {
                            value: 3000,
                            name: '1.1.3版'
                        }

                    ]
                }]
            };
            myChart.setOption(option);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        },

        toDelete(val) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = new Object()
                console.log(val)
                param.rom_version = val.rom_version
                deleteRom(param)
                    .then(res => {
                        console.log(res)
                        if (res.status != 0) {
                            this.$message({
                                message: `${res.msg}`,
                                type: "error"
                            });
                        } else {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getinfo()
                        }
                    })
                    .catch(error => {
                        this.$message({
                            message: "网络出错，请重新请求",
                            type: "error"
                        });

                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        //修改
        toChange(val) {
            this.dialogUpdate = true
            let param = new Object()
            param.rom_version = val.rom_version
            findRomById(param)
                .then(res => {
                    this.updateFrom = res.result
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        },
        //发布时查询展示信息
        toRelease(val) {
            this.dialogReleaseState = true
            let param = new Object()
            param.version = val.rom_version
            getpacketbyversion(param)
                .then(res => {
                    //this.updateFrom = res.result
                    console.log(res)
                    this.releaseVersion = val.rom_version
                    this.releaseInfo = res.result.cols
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        },
        //设置发布渠道
        toSet(val) {
            this.dialogSetState = true

            this.releaseVersion = val.rom_version

        },

        handleSizeChange(val) {

        },
        handleCurrentChange(val) {
            this.getinfo()
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

        //点击上传

        handlePreview(file) {
            console.log(file);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //c上传前验证
        beforeAvatarUpload(file) {
            var fileName = new Array();
            fileName = file.name.split(".");
            const extension = fileName[fileName.length - 1] === "zip";

            if (!extension) {
                this.$message({
                    message: "上传文件只能是.zip格式的压缩包",
                    type: "warning"
                });
                return false;
            } else {
                this.loading2 = true
            }
            return extension;
        },

        submitUpload() {

            let list = document.getElementsByClassName(
                "el-upload-list__item is-ready"
            );
            if (list.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请选择需要导入的模板！"
                });
                return;
            }
            this.$refs.upload1.submit();
        },
        uploadSectionFile(param) {
            var fileObj = param.file;
            // FormData 对象
            var form = new FormData();
            // 文件对象
            form.append("file", fileObj);
            form.append("app_version", this.app_version);
            form.append("app_name", this.app_name);
            form.append("app_info", this.app_info);
            saveapp(form)
                .then(res => {
                    if (res.status == 0) {
                        this.loading2 = false
                    }
                    var arr = Object.keys(res)
                    console.log(res)
                    if (arr.length > 0) {
                        this.uploadinfoState1 = true
                        this.newObject1.equip_type = res.type
                        this.newObject1.rom_version = res.version
                        this.newObject1.version_name = res.name
                        this.newObject1.rom_url = res.url
                        this.newObject1.rom_size = res.size
                        this.newObject1.md5 = res.md5
                        this.newObject1.push_mod = this.pushType
                        this.newObject1.hashid = res.hashid
                    }
                    this.uploadinfo1 = res
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },

        dialogFormVisible() {
            this.dialogFormState = true
        },
        //确定发布
        determine() {
            this.dialogReleaseState = false
            let param = new Object()
            param.version = this.releaseVersion
            publish(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        this.$message({
                            type: 'success',
                            message: '发布成功!'
                        });
                        this.getinfo()

                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求11111111",
                        type: "error"
                    });

                });
        },

        //获取页面表格数据
        getinfo() {
            let param = new Object()
            param.page = this.pager.page - 1
            applist(param)
                .then(res => {

                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        let nowarr = res.result.cols

                        let nowarractive = res.result.cols
                        let nowarrLength = res.result.page * 10 + nowarractive.length + res.result.les_count
                        this.pager.count = nowarrLength
                        this.dataNum = nowarrLength
                        this.pager.page = res.result.page + 1
                        for (var i = 0; i < nowarractive.length; i++) {
                            nowarractive[i].time_create = this.common.getTimes(parseInt(nowarractive[i].time_create * 1000))
                        }
                        this.tableData = nowarr
                        this.tableData11 = nowarractive
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
        //确定上传
        onUpload() {
            let param = new Object()
            let data = new Array()

            let nowarr1 = Object.keys(this.newObject1)
            let nowarr2 = Object.keys(this.newObject2)
            let nowarr3 = Object.keys(this.newObject3)
            if (nowarr1.length > 0) {
                this.newObject1.rom_desc = this.textareaText
                data.push(this.newObject1)
            }
            if (nowarr2.length > 0) {

                this.newObject2.rom_desc = this.textareaText
                data.push(this.newObject2)
            }
            if (nowarr3.length > 0) {
                this.newObject3.rom_desc = this.textareaText
                data.push(this.newObject3)
            }
            param.data = data
            this.dialogFormState = false
            this.dialogUpdate = false
            saveRom(param)
                .then(res => {
                    if (res.status == -6) {
                        this.$message({
                            message: "上传包重复，请仔细检阅后重新上传",
                            type: "error"
                        });
                    } else {
                        this.$message({
                            type: 'success',
                            message: '上传成功!'
                        });
                        this.getinfo()
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求11111",
                        type: "error"
                    });

                });
        },
        //确定修改
        onUpdate() {
            this.dialogUpdate = false
            let param = new Object()
            param = this.updateFrom
            updateRom(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: "上传包重复，请仔细检阅后重新上传",
                            type: "error"
                        });
                    } else {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });

                    }
                    this.getinfo()
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求11111",
                        type: "error"
                    });
                });
        },
        //确定发布

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

        .dialog-footer {
            text-align: center;
        }
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
</style>
