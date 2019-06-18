<template>
<section class="chart-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" ref="blackListForm" :model="blackListForm">
            <el-form-item label="开始时间">
                <el-date-picker v-model="blackListForm.startTime" type="datetime" @change="getSTimestartBlackList" value-format="yyyy-MM-dd HH:mm" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker v-model="blackListForm.endTime" type="datetime" @change="getSTimeendBlackList" value-format="yyyy-MM-dd HH:mm" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="文件名">
                <el-input v-model.trim="blackListForm.fileName"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model.trim="blackListForm.descript"></el-input>
            </el-form-item>
            <el-form-item label="文件哈希">
                <el-input v-model.trim="blackListForm.fileHashId" style="width:522px;"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmitBlackList('single')">查询</el-button>
                <el-button type="primary" @click="onSubmitBlackList('all')">加载所有黑名单</el-button>
                <el-button type="primary" @click="onCreate('single')">新增</el-button>
                <el-button type="primary" @click="onCreate('all')">批量新增</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <!--黑名单列表-->
    <template>
        <el-table :data="tableDataBlacklist.slice((currentPageHmd-1)*pagesizeHmd,currentPageHmd*pagesizeHmd)" highlight-current-row v-loading="loading" :border="true" style="width: 100%;">
            <el-table-column prop="fileName" label="文件名" min-width="250" align="center">
            </el-table-column>
            <el-table-column prop="fileHashId" min-width="200" label="文件哈希" align="center">
            </el-table-column>
            <el-table-column prop="version" label="版本" align="center">
            </el-table-column>
            <el-table-column prop="descript" label="描述" align="center">
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination @size-change="handleSizeChangeHmd" @current-change="handleCurrentChangeHmd" :current-page="currentPageHmd" :page-sizes="[5, 10, 20]" :page-size="pagesizeHmd" layout="total, sizes, prev, pager, next, jumper" style="float:right;margin-top:10px;" :total="tableDataBlacklist.length">
        </el-pagination>
    </template>

    <!-- 黑名单新增弹窗 -->
    <el-dialog title="" :visible.sync="dialogCreateVisible" customClass="customWidth1">
        <div class="dialog_item_title">
            <el-col :span="24">
                <div class="item_title_create">
                    <el-form :inline="true" ref="createForm" :model="createForm">
                        <el-col :span="24">
                            <div style="width:80%;margin:0 auto;">
                                <el-col :span="4">
                                    <div class="create_div">文件名:</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="create_div_input">
                                        <el-input v-model.trim="createForm.fileName" placeholder="请输入文件名"></el-input>
                                    </div>
                                </el-col>
                            </div>

                        </el-col>
                        <el-col :span="24">
                            <div style="width:80%;margin:0 auto;">
                                <el-col :span="4">
                                    <div class="create_div">文件ID:</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="create_div_input">
                                        <el-input v-model.trim="createForm.fileHashId" placeholder="请输入文件ID"></el-input>
                                    </div>
                                </el-col>
                            </div>

                        </el-col>
                        <el-col :span="24">
                            <div style="width:80%;margin:0 auto;">
                                <el-col :span="4">
                                    <div class="create_div">文件描述:</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="create_div_input">
                                        <el-input v-model.trim="createForm.descript" placeholder="请输入文件描述"></el-input>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>

                        <el-col :span="24">
                            <div style="width:60px; margin:20px auto;">
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmitAdd()">确定</el-button>
                                </el-form-item>
                            </div>
                        </el-col>

                    </el-form>

                </div>
            </el-col>
        </div>
    </el-dialog>

    <!-- 黑名单批量新增弹窗 -->
    <el-dialog title="" :visible.sync="dialogAllCreateVisible" customClass="customWidth1">
        <div class="dialog_item_title">
            <el-col :span="24">
                <div class="item_title_create">
                    <el-form :inline="true" ref="createForm" :model="createForm">
                        <el-col :span="24">
                            <div style="width:80%;margin:0 auto;">
                                <el-col :span="4">
                                    <div class="create_div">文件名:</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="create_div_input">
                                        <el-upload class="upload-demo" ref="upload" drag name="file" :before-upload="beforeAvatarUpload" action="" :file-list="fileList" :http-request="uploadSectionFile" :auto-upload="false">
                                            <i class="el-icon-upload"></i>
                                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                            <div class="el-upload__tip" slot="tip">只能上传.bl文件.</div>
                                        </el-upload>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div style="width:60px; margin:20px auto;">
                                <el-form-item>
                                    <el-button type="primary" @click="submitUpload()">确定</el-button>
                                </el-form-item>
                            </div>
                        </el-col>

                    </el-form>

                </div>
            </el-col>
        </div>
    </el-dialog>
</section>
</template>

<script>
import {
    queryBlackListByCondition,
    addNewForbiddenFile,
    uploadBlackListFile,
    updateBlackListFile
} from "../../api/api.js";
export default {
    data() {
        return {
            blackListForm: {
                startTime: "",
                endTime: "",
                fileName: "",
                fileHashId: "",
                descript: ""
            },
            //新增弹窗初始值
            createForm: {
                descript: "",
                fileHashId: "",
                fileName: ""
            },
            tableDataBlacklist: [],
            currentPageHmd: 1, //黑名单初始页
            pagesizeHmd: 10, //黑名单每页初始显示几条
            dialogAllCreateVisible: false,
            dialogCreateVisible: false,
            activeType: "Seven" //记录查询的是7天还是所有的
        };
    },
    mounted: function () {
        //获取当前时间
        let nowDate = new Date();
        let endTime = this.common.getTimes(nowDate);
        this.blackListForm.endTime = endTime;

        //获取往前往前一星期时间
        let befDate = new Date(nowDate.getTime() - 7 * 24 * 3600 * 1000);
        let startTime = this.common.getTimes(befDate);
        this.blackListForm.startTime = startTime;

        //页面初始化加载明明但列表
        this.getBlacklist();
    },
    methods: {
        //黑名单点击改变页码
        handleCurrentChangeHmd: function (currentPage) {
            this.currentPageHmd = currentPage; //点击第几页
        },
        //黑名单点击改变下拉分页
        handleSizeChangeHmd: function (size) {
            this.pagesizeHmd = size; //每页下拉显示数据
        },
        //获取黑名单列表
        getBlacklist() {
            let param = this.blackListForm;
            //NProgress.start();
            queryBlackListByCondition(param)
                .then(res => {
                    let {
                        result,
                        msg,
                        data
                    } = res;
                    if (data != null) {
                        this.tableDataBlacklist = res.data;
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        //黑名单查询
        onSubmitBlackList(e) {
            this.currentPageHmd = 1;
            let param = "";
            if (e === "all") {
                this.activeType = "All";
                this.blackListFormAll = {
                    startTime: "",
                    endTime: "",
                    fileName: "",
                    fileHashId: "",
                    descript: ""
                };
                param = this.blackListFormAll;
            } else {
                this.activeType = "Seven";
                param = this.blackListForm;

                var IEtimetypeStart = param.startTime;
                var IEtimetypeEnd = param.endTime;
                IEtimetypeStart = IEtimetypeStart.replace(/-/g, "/");
                IEtimetypeEnd = IEtimetypeEnd.replace(/-/g, "/");
                // 判断结束时间是否大于起始时间
                var timeStatus = this.common.checkTimes(IEtimetypeStart, IEtimetypeEnd);
                if (timeStatus == false) {
                    this.$message.error("结束时间必须大于起始时间");
                    return false;
                }
            }
            this.dialogCreateVisible = false;
            queryBlackListByCondition(param)
                .then(res => {
                    let {
                        result,
                        msg,
                        data
                    } = res;
                    if (data != null) {
                        this.tableDataBlacklist = res.data;
                    } else {
                        this.$message({
                            message: "msg",
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
        //删除
        handleDel: function (index, row) {
            this.$confirm("确认删除该记录吗?", "提示", {
                    type: "warning"
                })

                .then(() => {
                    let param = {
                        FileHashId: row.fileHashId
                    };

                    updateBlackListFile(param).then(res => {
                        let {
                            result,
                            msg,
                            data
                        } = res;
                        if ((result = "ok")) {
                            this.getNewBlacklist();
                        }
                    });
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        //黑名单新增
        onCreate: function (e) {
            if (e === "all") {
                this.dialogAllCreateVisible = true;
            } else {
                this.dialogCreateVisible = true;
            }
        },
        //黑名单新增
        onSubmitAdd: function () {
            let param = this.createForm;
            this.dialogCreateVisible = false;
            addNewForbiddenFile(param)
                .then(res => {
                    let {
                        result,
                        msg,
                        data
                    } = res;
                    if (result == "ok") {
                        this.getNewBlacklist();
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        //黑名单批量上传
        submitUpload() {
            this.dialogAllCreateVisible = false;
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
            this.$refs.upload.submit();
        },
        uploadSectionFile(param) {
            var fileObj = param.file;
            // FormData 对象
            var form = new FormData();
            // 文件对象
            form.append("file", fileObj);
            uploadBlackListFile(form).then(res => {
                if (res.result == "ok") {
                    this.getNewBlacklist();
                } else {}
            });
        },
        //上传前验证是否时规定的格式
        beforeAvatarUpload(file) {
            var fileName = new Array();
            fileName = file.name.split(".");
            const extension = fileName[fileName.length - 1] === "bl";
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!extension) {
                this.$message({
                    message: "上传模板只能是.bl格式!",
                    type: "warning"
                });
                //
            }
            //                 if (!isLt2M) {
            //                     this.$message({
            //                         message: '上传模板大小不能超过 10MB!',
            //                         type: 'warning'
            //                     });
            // //                    console.log('上传模板大小不能超过 10MB!')
            //                 }
            // if (extension || extension2 && isLt2M == true) {
            //     console.log(file)
            //     let fd = new FormData()
            //     fd.append('invoiceTypeId', this.invoice_type_id)//随文件上传的其他参数
            //     fd.append('epid', this.epid)
            //     fd.append('file', file)
            //     // console.log(fd)
            //     this.newImport(fd).then(function (res) {//校验完成后提交
            //         console.log(res)
            //     }, function () {
            //         console.log('failed');
            //     });
            //     return true
            // }
            return extension;
        },
        //新增，批量新增，删除后不传起始时间，结束时间的查询
        getNewBlacklist() {
            let newparam = {};
            if (this.activeType == "Seven") {
                newparam.startTime = this.blackListForm.startTime;
            } else {
                newparam.startTime = "";
            }
            newparam.descript = "";
            newparam.fileHashId = "";
            newparam.fileName = "";
            newparam.endTime = "";

            //NProgress.start();
            queryBlackListByCondition(newparam)
                .then(res => {
                    let {
                        result,
                        msg,
                        data
                    } = res;
                    if (data != null) {
                        this.tableDataBlacklist = res.data;
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        }
    }
};
</script>

<style>
</style>
