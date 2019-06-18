<template>
<section class="myself-container">
    <div class="device-echars">

        <div id="device_echars_l" class="device_echars_l"></div>

        <div id="device_echars_r">
            666666666
        </div>
    </div>

    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="2">
                <el-button type="primary" @click="dialogFormVisible">上传系统包</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="golink()">发布设置</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <!-- <tableBarActive :tableData="tableData" :rowHeader="rowHeader" :clomnSelection="clomnSelection" :tableOption="tableOption" @toSet="toSet" @toRelease="toRelease" @toChange="toChange" @toDelete="toDelete" @handleButton="handleButton"></tableBarActive> -->
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <el-table :data="tableData11" style="width: 100%;margin-bottom: 20px;" border row-key="id">
                    <el-table-column prop="version_name" label="包名" width="250">
                        <template slot-scope="scope">

                            <div style="text-align:center" v-for="(item,index) in scope.row.version_name" :key="index">{{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="equip_type" label="包类型" width="70">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.equip_type" :key="index">{{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="rom_size" label="文件大小" width="90" :formatter="common.formatByte">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.rom_size" :key="index">{{item}}</div>

                        </template>
                    </el-table-column>
                    <el-table-column prop="md5" label="md5" width="250">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.md5" :key="index">{{item}}</div>

                        </template>
                    </el-table-column>
                    <el-table-column prop="hashid" label="hashid" width="400">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.hashid" :key="index">{{item}}</div>

                        </template>
                    </el-table-column>
                    <el-table-column prop="rom_version" label="版本号" width="70">
                    </el-table-column>
                    <el-table-column prop="rom_desc" label="文件描述">
                    </el-table-column>
                    <el-table-column prop="time_create" label="上传日期">
                    </el-table-column>
                    <el-table-column prop="push_mod" label="发布方式">
                    </el-table-column>
                    <el-table-column prop="time_update" label="近发布日期">
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <a style="color:#6699ff;cursor: pointer;" @click="toDelete(scope.row)" type="danger" size="small">删除</a>
                            <a  style="color:#6699ff;cursor: pointer;" @click="toChange(scope.row)" type="primary" size="small">修改</a>
                        </template>
                    </el-table-column>

                </el-table>
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
    <el-dialog :visible.sync="dialogFormState" id="my_dialogForm" :show-close="false" :close-on-click-modal="false">
        <div class="dialog_div" v-loading="loading2" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="dialog_div_con">
                <div class="dialog_div_title">上传FULL包</div>
                <div class="dialog_div_warning">*必传，full包为包含完整系统资源的文件，一般带有full后缀，如1.0.0_full.zip</div>
                <div class="dialog_div_upload">
                    <el-upload id="1" class="upload-demo" ref="upload1" :limit="1" drag name="configFile" :before-upload="beforeAvatarUpload" action="" :file-list="fileList" :http-request="uploadSectionFile1" :auto-upload="false">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">
                            <div>只能上传.zip文件.</div>
                            <el-button type="primary" class="el-upload__tip" @click="submitUpload1">上传</el-button>
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
            <div class="dialog_div_con">
                <div class="dialog_div_title">上传DIFF包</div>
                <div class="dialog_div_warning">diff包为包含增量系统资源的文件，一般带有diff后缀，如：1.0.0_1.0.1_diff.zip</div>
                <div class="dialog_div_upload">
                    <el-upload class="upload-demo" ref="upload2" :limit="1" drag name="configFile" :before-upload="beforeAvatarUpload1" action="" :file-list="fileList" :http-request="uploadSectionFile2" :auto-upload="false">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">
                            <div>只能上传.zip文件.</div>
                            <el-button type="primary" class="el-upload__tip" @click="submitUpload2">上传</el-button>
                        </div>
                    </el-upload>
                    <div class="dialog_div_uploadinfo" v-if="uploadinfoState2">
                        <div><span>版本号：</span>{{this.uploadinfo2.version}}</div>
                        <div><span>包名：</span>{{this.uploadinfo2.name}}</div>
                        <div><span>类型：</span>{{this.uploadinfo2.type}}</div>
                        <div><span>大小：</span>{{this.uploadinfo2.size}}M</div>
                        <div><span>md5：</span>{{this.uploadinfo2.md5}}</div>
                        <div><span>hashid:</span>{{this.uploadinfo2.hashid}}</div>

                    </div>
                </div>
            </div>
            <div class="dialog_div_con">
                <div class="dialog_div_title">上传DIFF包</div>
                <div class="dialog_div_warning">diff包为包含增量系统资源的文件，一般带有diff后缀，如：1.0.0_1.0.1_diff.zip</div>
                <div class="dialog_div_upload">
                    <el-upload id="3" class="upload-demo" ref="upload3" :limit="1" drag name="configFile" :before-upload="beforeAvatarUpload1" action="" :file-list="fileList" :http-request="uploadSectionFile3" :auto-upload="false">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">
                            <div>只能上传.zip文件.</div>
                            <el-button type="primary" class="el-upload__tip" @click="submitUpload3">上传</el-button>
                        </div>
                    </el-upload>
                    <div class="dialog_div_uploadinfo" v-if="uploadinfoState3">
                        <div><span>版本号：</span>{{this.uploadinfo3.version}}</div>
                        <div><span>包名：</span>{{this.uploadinfo3.name}}</div>
                        <div><span>类型：</span>{{this.uploadinfo3.type}}</div>
                        <div><span>大小：</span>{{this.uploadinfo3.size}}M</div>
                        <div><span>md5：</span>{{this.uploadinfo3.md5}}</div>
                        <div><span>hashid:</span>{{this.uploadinfo3.hashid}}</div>

                    </div>
                </div>
            </div>
            <div class="dialog_div_desc">
                <textarea placeholder="请输入文字描述" v-model="textareaText"></textarea>
            </div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button @click="dialogFormState = false">取 消</el-button>
                <el-button type="primary" @click="onUpload()">确 定</el-button>
            </div>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogSetState" class="my_dialog_release" :show-close="false" :close-on-click-modal="false">
        <el-table :data="arr">
            <el-table-column prop="types" label="发布渠道">
            </el-table-column>
            <el-table-column prop="name" label="发布优先级渠道">
                <template slot-scope="scope">
                    <el-radio v-model="radio" :label="scope.row.name">优先</el-radio>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" style="">
            <el-button @click="dialogSetState = false">取 消</el-button>
            <el-button type="primary" @click="onSet()">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogReleaseState" class="my_dialog_set" :show-close="false" :close-on-click-modal="false">
        <div>
            <div>版本号：{{releaseVersion}}</div>
            <div v-for="(item,index) in releaseInfo" :key="index">
                <div>名称：{{item.version_name}}</div>
                <div>发布渠道：{{item.push_mod}}</div>
            </div>
            <div>点击确认后，系统包将分发给上述渠道</div>
        </div>
        <div slot="footer" class="dialog-footer" style="">
            <el-button @click="dialogReleaseState = false">取 消</el-button>
            <el-button type="primary" @click="determine()">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogUpdate" class="my_dialog_update" :show-close="false" :close-on-click-modal="false">
        <div class="dialog_div" v-loading="loading2" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="dialog_div_con">
                <div class="dialog_div_title" style="text-align:center">修改文件描述</div>
                <div class="dialog_div_item">
                    <div class="item_l">文件描述：</div>
                    <div>
                        <el-input v-model="updateFrom.rom_desc" placeholder="请输入内容"></el-input>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button @click="dialogUpdate = false">取 消</el-button>
                <el-button type="primary" @click="onUpdate()">确 定</el-button>
            </div>
        </div>
    </el-dialog>

</section>
</template>

<script>
import titleBar from "../../components/titleBar";
import tableBarActive from "../../components/tableBarActive";

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
    updateMod
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
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "id",
                    label: "文件ID",
                },
                {
                    prop: "version_name",
                    label: "包名",
                    width: "150"
                },
                {
                    prop: "equip_type",
                    label: "包类型",
                    width: "100"
                },
                {
                    prop: "rom_size",
                    label: "文件大小",
                    formatter: "formatterSize"

                },
                {
                    prop: "md5",
                    label: "md5",
                    width: "150"
                },
                {
                    prop: "hashid",
                    label: "hashid",
                    width: "150"
                },
                {
                    prop: "rom_version",
                    label: "版本号",
                    width: "80"
                },
                {
                    prop: "rom_desc",
                    label: "文件描述",
                    width: "150"
                },
                {
                    prop: "time_create",
                    label: "上传日期",
                    width: "150"
                },
                {
                    prop: "push_mod",
                    label: "发布方式"
                },
                {
                    prop: "time_update",
                    label: "最近发布日期",
                    width: "150"
                }
            ],
            tableOption: {
                label: "操作",
                width: "250",
                options: [{
                        label: "删除",
                        type: "danger",
                        methods: "toDelete"
                    },
                    {
                        label: "修改",
                        type: "primary",
                        methods: "toChange"
                    },
                    {
                        label: "设置发布渠道",
                        type: "success",
                        methods: "toSet"
                    },
                    {
                        label: "发布",
                        type: "info",
                        methods: "toRelease"
                    }
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
            dialogStatus: ""

        };
    },
    mounted: function () {

        this.getinfo();
        this.drawLine();
        this.drawColumn();

        // 绘制图表

    },

    methods: {
        //发布设置跳转
        golink() {
            this.$router.push({
                path: "/systemset"
            })

        },
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
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    top: "100px",
                    data: ['1.1.1版', '1.1.2版', '1.1.3版']
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
        drawColumn() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('device_echars_r'));
            let option = {
                title: {
                    text: '版本在线分布图',
                    x: 'center'

                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['在线', '离线'],
                    top: "30px"
                },
                toolbox: {
                    show: true,
                    feature: {

                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'value',
                    boundaryGap: [0, 0.01]
                }],
                yAxis: [{
                    type: 'category',
                    data: ['1.1.1版', '1.1.2版', '1.1.3版', ]
                }],
                series: [{
                        name: '在线',
                        type: 'bar',
                        data: [1000, 2000, 3000, ]
                    },
                    {
                        name: '离线',
                        type: 'bar',
                        data: [200, 200, 100, ]
                    }
                ]
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

        //确定选中发布渠道方式
        onSet() {
            this.dialogSetState = false
            if (this.radio == 1) {
                this.pushType = "HTTP"
            } else {
                this.pushType = "PTFS"
            }
            let param = new Object()
            param.rom_version = this.releaseVersion
            param.push_mod = this.pushType
            updateMod(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        this.$message({
                            type: 'success',
                            message: '修改发布渠道成功'
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
            fileName = file.name.split("_");
            const extension = fileName[fileName.length - 1] === "full.zip";

            if (!extension) {
                this.$message({
                    message: "上传文件只能是以带有full后缀并且为.zip格式的压缩包",
                    type: "warning"
                });
                return false;
            } else {
                this.loading2 = true
            }
            return extension;
        },
        //c上传前验证
        beforeAvatarUpload1(file) {
            var fileName = new Array();
            fileName = file.name.split("_");
            const extension = fileName[fileName.length - 1] === "diff.zip";
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!extension) {
                this.$message({
                    message: "上传文件只能是以带有diff后缀并且为.zip格式的压缩包",
                    type: "warning"
                });
                return false;
            } else {
                this.loading2 = true
            }
            return extension;
        },
        submitUpload1() {

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
        submitUpload2() {
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
            this.$refs.upload2.submit();
        },
        submitUpload3() {
            //debugger
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
            this.$refs.upload3.submit();
        },
        submitUpload4() {
            //debugger
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
            this.$refs.upload4.submit();
        },
        uploadSectionFile1(param) {
            var fileObj = param.file;
            // FormData 对象
            var form = new FormData();
            // 文件对象
            form.append("file", fileObj);
            form.append("setConfigDescript", this.descript);
            updateNodeConfigtest(form)
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
        uploadSectionFile2(param) {
            var fileObj = param.file;
            // FormData 对象
            var form = new FormData();
            // 文件对象
            form.append("file", fileObj);
            form.append("setConfigDescript", this.descript);
            updateNodeConfigtest(form)
                .then(res => {
                    if (res.status == 0) {
                        this.loading2 = false
                    }
                    var arr = Object.keys(res)
                    if (arr.length > 0) {
                        this.uploadinfoState2 = true
                        this.newObject2.equip_type = res.type
                        this.newObject2.rom_version = res.version
                        this.newObject2.version_name = res.name
                        this.newObject2.rom_url = res.url
                        this.newObject2.rom_size = res.size
                        this.newObject2.md5 = res.md5
                        this.newObject2.push_mod = this.pushType
                        this.newObject2.hashid = res.hashid

                    }
                    this.uploadinfo2 = res
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        uploadSectionFile3(param) {
            var fileObj = param.file;
            // FormData 对象
            var form = new FormData();
            // 文件对象
            form.append("file", fileObj);
            form.append("setConfigDescript", this.descript);
            updateNodeConfigtest(form)
                .then(res => {
                    if (res.status == 0) {
                        this.loading2 = false
                    }
                    var arr = Object.keys(res)
                    if (arr.length > 0) {
                        this.uploadinfoState3 = true
                        this.newObject3.equip_type = res.type
                        this.newObject3.rom_version = res.version
                        this.newObject3.version_name = res.name
                        this.newObject3.rom_url = res.url
                        this.newObject3.rom_size = res.size
                        this.newObject3.md5 = res.md5
                        this.newObject3.push_mod = this.pushType
                        this.newObject3.hashid = res.hashid

                    }
                    this.uploadinfo3 = res
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
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        },

        //获取页面表格数据
        getinfo() {
            let param = new Object()
            param.page = this.pager.page - 1
            queryRom(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        let nowarr = res.result.cols
                        let nowarractive = res.data

                        let nowarractives = res.result.cols
                        let nowarrLength = res.result.page * 10 + nowarractives.length + res.result.les_count
                        this.pager.count = nowarrLength
                        this.dataNum = nowarrLength

                        this.pager.page = res.result.page + 1
                        for (var i = 0; i < nowarractive.length; i++) {
                            nowarractive[i].time_create = this.common.getTimes(parseInt(nowarractive[i].time_create * 1000))
                            nowarractive[i].time_update = this.common.getTimes(parseInt(nowarractive[i].time_update * 1000))

                            var sizearr = nowarractive[i].rom_size;
                            for (var j = 0; j < sizearr.length; j++) {
                                nowarractive[i].rom_size[j] = this.common.formatByteActive(sizearr[j])
                            }

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
        tableBarActive: tableBarActive,
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

    #my_dialogForm {
        .upload-demo {
            margin-left: 0px;
        }

        .el-dialog {
            width: 35%;

            .dialog-footer {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
                margin-bottom: 20px;
            }

            .el-dialog__body {
                padding: 0px;
                padding-bottom: 0px;
            }
        }

        .el-upload-dragger .el-icon-upload {
            font-size: 36px;
            line-height: 20px;
        }
    }

    .my_dialog_release {
        .el-dialog {
            width: 20%;

            .el-dialog__body {
                padding: 0px 20px;
                padding-bottom: 0px;
            }

            .el-dialog__header {
                padding: 0px;
            }

            .el-dialog__footer {
                text-align: center;

                .el-button {
                    padding: 6px 10px;

                }
            }
        }
    }

    .my_dialog_set {
        .el-dialog {
            width: 20%;

            .el-dialog__body {
                padding: 0px 20px;
                padding-bottom: 0px;

            }

            .el-dialog__footer {
                text-align: center;

                .el-button {
                    padding: 6px 10px;

                }
            }
        }
    }

    .my_dialog_update {
        .el-dialog {
            width: 27%;

            .el-dialog__body {
                padding: 0px;
            }
        }

        .dialog_div {

            .dialog_div_item {
                width: 100%;
                height: auto;
                overflow: hidden;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-top: 10px;

                .item_l {
                    width: 90px;

                }

                .el-input {
                    width: 360px;
                }

            }

            .dialog-footer {
                margin-top: 15px;
                text-align: center;
                margin-bottom: 15px
            }

            .el-upload-dragger {
                width: 450px;
                height: 100px;
            }
        }
    }

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

.dialog_div {
    width: 100%;
    height: auto;
    overflow: hidden;

    .dialog_div_con {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding-left: 20px;
        box-sizing: border-box;
    }

    .dialog_div_title {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
    }

    .dialog_div_upload {
        width: 100%;
        height: auto;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;

        .el-upload-dragger {
            width: 260px;
            height: 75px;
        }

        .el-upload-dragger .el-icon-upload {
            margin-top: 10px;
        }

        .el-upload__tip {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .el-button {
                padding: 7px 10px;
                margin-left: 10px;
            }
        }
    }

    .dialog_div_warning {
        font-size: 12px;
        color: red;
        height: 30px;
        line-height: 30px;
        width: 100%;
    }

    .dialog_div_uploadinfo {
        width: auto;
        height: auto;
        overflow: hidden;
        margin-left: 30px;
        font-size: 12px;
        margin-top: 0px;
    }

    .dialog_div_desc {
        width: 90%;
        margin-top: 20px;
        height: auto;
        overflow: hidden;
        padding-left: 20px;
        box-sizing: border-box;
        margin-left: 20px;

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

    .el-upload-list__item:first-child {
        margin-top: 0px;
    }
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.el-table th>.cell {
    text-align: center;
}

.el-table .cell {
    text-align: center;
}

.device-echars {
    width: 100%;
    height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

}

h2 {
    text-align: center;
    padding: 30px;
    font-size: 18px;
}

#device_echars_l {
    width: 50%;
    height: 300px;
    margin: 0 auto;
    background: red;
}

#device_echars_r {
    width: 50%;
    height: 300px;
    margin: 0 auto;
    background: red;
}
</style>
