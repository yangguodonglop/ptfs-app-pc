<template>
<section class="chart-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple new_grid-content">
                    <div style="display: flex;justify-content: space-between;flex-direction: column;">
                        <div class="item_three_child">
                            <div class="three_child_button" style="margin-top:10px;">
                                <el-button type="primary" @click="createFrom">新增</el-button>
                                <el-button type="primary" @click="getNodeslist()">刷新</el-button>
                            </div>
                        </div>
                        <div class="item_three_table" style="margin-top:20px;">
                            <el-table :data="tableDataNodeConfig.slice((currentPagePz-1)*pagesizePz,currentPagePz*pagesizePz)" :border="true" @sort-change="tabDataChangeNodeConfig" style="width: 100%">
                                <el-table-column prop="timeStamp" align="center" sortable label="时间"> </el-table-column>
                                <el-table-column prop="msgId" align="center" label="命令编号" min-width="150"> </el-table-column>
                                <el-table-column prop="commandTargetId" align="center" label="目标节点"> </el-table-column>
                                <el-table-column prop="commandExecResult" align="center" label="执行结果"></el-table-column>
                                <el-table-column prop="commandExecData" align="center" label="命令附件参数" min-width="150"></el-table-column>
                                <el-table-column prop="descript" align="center" label="描述"> </el-table-column>
                                <el-table-column align="center" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click.native="downLoadFile(scope.row)">下载</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination @size-change="handleSizeChangePz" @current-change="handleCurrentChangePz" :current-page="currentPagePz" :page-sizes="[5, 10, 20]" :page-size="pagesizePz" layout="total, sizes, prev, pager, next, jumper" style="float:right" :total="tableDataNodeConfig.length">
                            </el-pagination>
                        </div>

                    </div>
                </div>
            </el-col>
        </el-row>
    </el-col>
    <!-- 更新节点配置新增弹窗 -->
    <el-dialog title="" :visible.sync="dialogCreateVisible" customClass="customWidth1">
        <div class="dialog_item_title">
            <el-col :span="24">
                <div class="item_title_create">
                    <el-form :inline="true" ref="form" :model="form">
                        <el-col :span="24">
                            <div style="width:80%;margin:0 auto;">
                                <el-col :span="4">
                                    <div class="create_div">文件名:</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="create_div_input">
                                        <el-upload class="upload-demo" ref="upload" drag name="configFile" :before-upload="beforeAvatarUpload" action="" :file-list="fileList" :http-request="uploadSectionFile" :auto-upload="false">
                                            <i class="el-icon-upload"></i>
                                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                            <div class="el-upload__tip" slot="tip">只能上传.cfg文件.</div>
                                        </el-upload>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div style="width:80%;margin:0 auto;">
                                <el-col :span="4">
                                    <div class="create_div">描述:</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="create_div_input">
                                        <el-input v-model.trim="descript" placeholder="请输入文件名"></el-input>
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
import newUrl from "../../api/api";
import {
    queryAllConfigRecords,
    updateNodeConfig
} from "../../api/api.js";
export default {
    data() {
        return {
            tableDataNodeConfig: [],
            currentPagePz: 1, //节点配置TABLE初始页
            pagesizePz: 10, // 节点配置TABLE每页的数据
            newUrl: newUrl.customData(), //获取服务器 或则本地请求base
            dialogCreateVisible: false,
            descript:""
        };
    },
    mounted: function () {
        //页面进来获取节点加载列表
        this.getNodeslist();
    },
    methods: {
        //节点配置TABLE分页
        handleCurrentChangePz: function (currentPage) {
            this.currentPagePz = currentPage; //点击第几页
        },
        //节点配置TABLE改变下拉分页
        handleSizeChangePz: function (size) {
            this.pagesizePz = size; //每页下拉显示数据
        },
        //获取节点配置列表
        getNodeslist() {
            let param = {};
            //NProgress.start();
            queryAllConfigRecords(param)
                .then(res => {
                    let {
                        result,
                        msg,
                        data
                    } = res;
                    if (data != null) {
                        this.tableDataNodeConfig = res.data;
                        this.details_length = res.data.length;
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        //table分页降序
        my_desc_sort(a, b) {
            if (a[this.propname] > b[this.propname]) {
                return -1;
            } else if (a[this.propname] < b[this.propname]) {
                return 1;
            } else {
                return 0;
            }
        },
        //table分页升序
        my_asc_sort(a, b) {
            if (a[this.propname] < b[this.propname]) {
                return -1;
            } else if (a[this.propname] > b[this.propname]) {
                return 1;
            } else {
                return 0;
            }
        },
        //更新节点配置
        tabDataChangeNodeConfig(column) {
            this.propname = column.prop;
            if (column.order === "descending") {
                this.tableDataNodeConfig = this.tableDataNodeConfig.sort(
                    this.my_desc_sort
                );
                this.$forceUpdate();
            } else if (column.order === "ascending") {
                this.tableDataNodeConfig = this.tableDataNodeConfig.sort(
                    this.my_asc_sort
                );
                this.$forceUpdate();
            }
        },
        //下载
        downLoadFile(row) {
            this.downLoadfileName = row.commandExecData;
            location.href =
                `${this.newUrl}/PTFSFileManage/downloadConfigFile?fileName=` +
                this.downLoadfileName;
        },
        //新增
        createFrom: function () {
            this.dialogCreateVisible = true;
        },
        //文件上传
        submitUpload() {
            this.dialogCreateVisible = false;
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
            form.append("setConfigDescript", this.descript);
            updateNodeConfig(form)
                .then(res => {
                    if (res.result == "success") {
                        this.$message({
                            type: "success",
                            message: res.msg
                        });
                        this.getNodeslist();
                    } else {}
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        //c上传前验证
        beforeAvatarUpload(file) {
            var fileName = new Array();
            fileName = file.name.split(".");
            const extension = fileName[fileName.length - 1] === "cfg";
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

    }
};
</script>

<style lang="less">
.chart-container {
    // width: 100%;
    float: initial !important;
    min-width: 1600px;
}

.new_grid-content {
    height: auto;

    .item_one_child_r {
        .el-checkbox__inner {
            margin-left: 15px;
        }

        width: 100%;
        height: auto;
        margin: 50px auto;
        overflow: hidden;
    }

    .item_three_table {
        width: 100%;
    }
}
</style>
