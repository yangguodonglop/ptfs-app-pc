<template>
<section class="chart-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple new_grid-content">
                    <div style="display: flex;justify-content: space-between;">
                        <div>
                            <div class="div_MapDetails" v-if="MapDetailsShow">
                                <p style=" width:260px;word-wrap:break-word;margin-top:20px;overflow:hidden;"><span style="float:left;width:auto;">节点ID:</span><span style="float:left;width:180px;text-indent: 0px; padding-top:2px;">{{details_minerId}}</span></p>
                                <p>节点类型:{{details_lx}}</p>
                                <p>节点所在地：{{details_city}}-{{details_region}}</p>
                                <p>分区-分组：{{details_RgnGrpInfo}}</p>
                                <p style=" width:260px;word-wrap:break-word;margin-top:0px;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">节点IP：{{details_Ip}}</p>
                                <p>节点状态：{{details_nodeState}}</p>
                                <p>存储量/存储空间：{{details_storeUsage}}/{{details_totalCap}}</p>
                                <p style="padding-bottom:30px">
                                    <el-button type="primary" @click="getMoreDetails()">更多详情</el-button>
                                </p>
                            </div>
                            <div class="item_one_child" id="chartColumn">
                                <ve-map :data="chartData" width="740px" height="600px" :settings="chartSettings"></ve-map>
                            </div>
                        </div>
                        <div class="item_one_child_r">
                            <div class="child_r_t">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox v-for="item in testarray" :key="item.id" :label="item.name" :value="item.id" @change="handleCheckedChange(item)">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="child_r_t">
                                <el-checkbox style="color:#ffb980;margin-top:10px;" v-model="showOnelineOnly">只显示在线节点</el-checkbox>
                            </div>
                            <div class="child_r_t" style="margin-top:20px;">
                                <el-button type="primary" @click="getNodesNewDetails()">刷新</el-button>
                            </div>
                            <div class="child_r_b" v-for="item in nodeTypeCount" :key="item.id">
                                {{item.nodeType}}： {{item.nodeCount}}
                            </div>
                            <div class="child_r_table" style="margin-top:30px;">
                                <el-table ref="container" :data="tableDataDetails.slice((currentPageJd-1)*pagesizeJd,currentPageJd*pagesizeJd)" @row-click="openDetails" :border="true" @sort-change="tabDataChange">
                                    <el-table-column prop="nodeType" label="类型" width="110" align="center"> </el-table-column>
                                    <el-table-column prop="nodeId" label="节点ID" min-width="300" align="center"> </el-table-column>
                                    <el-table-column prop="backUpUsage" label="备份已占用" align="center" min-width="90" sortable :formatter="common.formatByte "> </el-table-column>
                                    <el-table-column prop="cacheUsage" label="缓存已占用" align="center" min-width="90" sortable :formatter="common.formatByte"> </el-table-column>
                                    <el-table-column prop="totalUsage" label="占用总空间" align="center" min-width="90" :formatter="common.formatByte" sortable> </el-table-column>
                                </el-table>
                                <el-pagination @size-change="handleSizeChangeJd" @current-change="handleCurrentChangeJd" :current-page="currentPageJd" :page-sizes="[5, 10, 20]" :page-size="pagesizeJd" layout="total, sizes, prev, pager, next, jumper" style="float:right" :total="tableDataDetails.length">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-col>
    <!-- 节点更多详情弹窗  -->
    <el-dialog title="" :visible.sync="dialogTableVisible" id="el-dialog-new" customClass="customWidth">

        <div class="dialog_item_table" style="margin-top:0px">
            <el-tabs v-model="activeNameTab" @tab-click="handleClick">
                <el-tab-pane label="备份文件列表" name="firstBackUp">
                    <el-col :span="24">
                        <div class="item_title_child" style="text-align:left;">
                            <el-table :data="tableDataMoreDetailsBackUp.slice((currentPageBackUp-1)*pagesizeBackUp,currentPageBackUp*pagesizeBackUp)" :border="true" @sort-change="tabDataChangeBackUp">
                                <el-table-column prop="fileName" label="文件名" align="center" sortable></el-table-column>
                                <el-table-column property="fileSize" label="文件大小" align="center" sortable :formatter="common.formatByte"></el-table-column>
                                <el-table-column property="fileCreateTime" label="上传时间" align="center" min-width="100" sortable></el-table-column>
                                <el-table-column property="fileHashId" label="文件哈希" align="center" min-width="250"></el-table-column>
                                <el-table-column property="fileOwner" label="上传者哈希" align="center" min-width="300"></el-table-column>
                            </el-table>
                            <el-pagination @size-change="handleSizeChangeBackUp" @current-change="handleCurrentChangeBackUp" :current-page="currentPageBackUp" :page-sizes="[5, 10, 20]" :page-size="pagesizeBackUp" layout="total, sizes, prev, pager, next, jumper" style="float:right" :total="tableDataMoreDetailsBackUp.length">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="缓存文件列表" name="secondCache">
                    <el-col :span="24">
                        <div class="item_title_child" style="text-align:left;">
                            <el-table :data="tableDataMoreDetailsCache.slice((currentPageCache-1)*pagesizeCache,currentPageCache*pagesizeCache)" :border="true" @sort-change="tabDataChangeCache">
                                <el-table-column prop="fileName" label="文件名" align="center" sortable></el-table-column>
                                <el-table-column property="fileSize" label="文件大小" align="center" sortable :formatter="common.formatByte"></el-table-column>
                                <el-table-column property="fileCreateTime" label="上传时间" align="center" sortable></el-table-column>
                                <el-table-column property="fileHashId" label="文件哈希" align="center" min-width="300"></el-table-column>
                                <el-table-column property="fileOwner" label="上传者哈希" align="center" min-width="250"></el-table-column>

                            </el-table>
                            <el-pagination @size-change="handleSizeChangeCache" @current-change="handleCurrentChangeCache" :current-page="currentPageCache" :page-sizes="[5, 10, 20]" :page-size="pagesizeCc1" layout="total, sizes, prev, pager, next, jumper" style="float:right" :total="tableDataMoreDetailsCache.length">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </div>

    </el-dialog>
</section>
</template>

<script>
import newUrl, {
    deleteFileList
} from "../../api/api";
import echarts from "echarts";
import {
    queryAllNodeProfiesByNodeTypes,
    queryNodeInfoById,
    queryNodeStoredFileListByNodeId
} from "../../api/api";
import common from '../../common/js/util.js'

export default {
    data() {
        this.chartSettings = {
            position: "china",
            label: false,
            itemStyle: {
                normal: {
                    borderColor: "#409EFF"
                }
            }
        };
        return {
            newUrl: newUrl.customData(), //获取服务器 或则本地请求base
            nodeTypeCount: [],
            descript: "6",
            fileList: [],
            currentPageJd: 1, //初始页
            pagesizeJd: 10, //    每页的数据
            currentPagePz: 1, //初始页
            pagesizePz: 10, //    每页的数据
            currentPage: 1, //初始页
            pagesizePz: 10, //    每页的数据
            currentPageBackUp: 1, //初始页
            pagesizeBackUp: 10, //    每页的数据
            currentPageCache: 1, //初始页
            pagesizeCache: 10, //    每页的数据

            tableData1: [],
            tableData: [],
            tableDataNodeConfig: [],
            tableDataNodeConfig: [],
            chartEvents: "",
            testarray: [{
                    id: "1",
                    name: "超级管理节点"
                },
                {
                    id: "2",
                    name: "超级存储节点"
                },
                {
                    id: "3",
                    name: "矿机节点"
                },
                {
                    id: "4",
                    name: "应用层节点"
                }
            ],
            dialogTableVisible: false,
            dialogCreateVisible: false,
            activeName: "first",
            MapDetailsShow: false,
            chartColumn: null,
            details_gl: "",
            details_No: "",
            details_lx: "",
            details_time: "",
            details_minerId: "",
            details_length: "",
            details_Ip: "",
            details_nodeState: "",
            details_city: "",
            details_region: "",
            input_nodeId: "",
            details_RgnGrpInfo: "",
            details_storeUsage: "",
            details_totalCap: "",
            downLoadfileName: "",
            input: "请输入",
            showOnelineOnly: true,
            chartData: {
                columns: ["位置", ""],
                rows: [{
                        位置: ""
                    }
                    // { 位置: "北京", 超级管理员: 555551, 超级储存节点: 444441,应用层节点:8888881,矿工节点:66666661}
                ]
            },
            checkList: ["位置", "超级管理节点"],
            checkListActive: ["位置", ""],
            tableDataDetails: [],
            tableDataMoreDetailsBackUp: [],
            tableDataMoreDetailsCache: [],
            propname: "",

        };
    },
    mounted: function () {

        // 获取节点分布列表
        this.getDetails();
        this.chartData.columns = this.checkList;
    },
    methods: {

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
        //节点列表排序改变时触发函数
        tabDataChange(column) {
            this.propname = column.prop;
            if (column.order === "descending") {
                this.tableDataDetails = this.tableDataDetails.sort(this.my_desc_sort);
                this.$forceUpdate();
            } else if (column.order === "ascending") {
                this.tableDataDetails = this.tableDataDetails.sort(this.my_asc_sort);
                this.$forceUpdate();
            }
        },
        //缓存文件列表排序
        tabDataChangeCache(column) {
            this.propname = column.prop;
            if (column.order === "descending") {
                this.tableDataMoreDetailsCache = this.tableDataMoreDetailsCache.sort(
                    this.my_desc_sort
                );
                this.$forceUpdate();
            } else if (column.order === "ascending") {
                this.tableDataMoreDetailsCache = this.tableDataMoreDetailsCache.sort(
                    this.my_asc_sort
                );
                this.$forceUpdate();
            }
        },

        //备份文件列表排序
        tabDataChangeBackUp(column) {
            this.propname = column.prop;
            if (column.order === "descending") {
                this.tableDataMoreDetailsBackUp = this.tableDataMoreDetailsBackUp.sort(
                    this.my_desc_sort
                );
                this.$forceUpdate();
            } else if (column.order === "ascending") {
                this.tableDataMoreDetailsBackUp = this.tableDataMoreDetailsBackUp.sort(
                    this.my_asc_sort
                );
                this.$forceUpdate();
            }
        },
        //右下角table分页
        handleCurrentChangeJd: function (currentPage) {
            this.currentPageJd = currentPage; //点击第几页
        },
        //右下角table改变下拉分页
        handleSizeChangeJd: function (size) {
            this.pagesizeJd = size; //每页下拉显示数据
        },
        //备份文件列表分页
        handleCurrentChangeBackUp: function (currentPage) {
            this.currentPageBackUp = currentPage; //点击第几页
        },

        //备份文件列表改变下拉分页
        handleSizeChangeBackUp: function (size) {
            this.pagesizeBackUp = size; //每页下拉显示数据
        },
        //缓存文件列表分页
        handleCurrentChangeCache: function (currentPage) {
            this.currentPageCache = currentPage; //点击第几页
        },
        //缓存文件列表改变下拉分页
        handleSizeChangeCache: function (size) {
            this.pagesizeCache = size; //每页下拉显示数据
        },

        //获取节点详细信息
        getDetails() {
            this.currentPageJd = 1
            var nowparam = this.checkList.slice(1, this.checkList.length);
            for (var i = 0; i < nowparam.length; i++) {
                if (
                    nowparam[i] == "" ||
                    nowparam[i] == null ||
                    typeof nowparam[i] == undefined
                ) {
                    nowparam.splice(i, 1);
                    i = i - 1;
                }
            }
            if (nowparam.length == 0) {
                this.$message({
                    message: "请至少选择一种节点类型",
                    type: "warning"
                });
                return false;
            }
            let param = {
                nodeTypeArr: nowparam,
                showOnelineOnly: this.showOnelineOnly
            };
            queryAllNodeProfiesByNodeTypes(param).then(res => {
                let {
                    result,
                    msg,
                    data
                } = res;
                // if (data != null) {
                //   this.tableDataDetails = res.data.allNodeProfiles;
                //   this.nodeTypeCount = res.data.totalNodeCnt;
                //   this.details_length = res.data.length;
                //   this.chartData.rows = res.data.regionNodeDist;
                // }
                if (data.allNodeProfiles != null) {
                    this.tableDataDetails = res.data.allNodeProfiles;
                }
                if (data.totalNodeCnt != null) {
                    this.nodeTypeCount = res.data.totalNodeCnt;
                }
                if (data.regionNodeDist != null) {
                    this.chartData.rows = res.data.regionNodeDist;
                }
                this.details_length = res.data.length;
            });
        },
        //选择节点发生改变时。checklist发生改变
        handleCheckedChange: function (val) {
            if (this.checkList.length <= 1) {
                this.chartData.columns = this.checkListActive;
                this.chartData.columns;
            } else {
                this.chartData.columns = this.checkList;
            }
        },
        //刷新，更新节点信息
        getNodesNewDetails() {
            // this.chartData.rows = [{ 位置: "湖北", 税收: 888, 人口: 888, 面积: 666 }];
            this.getDetails();
        },
        //点击表格获取每一行数据
        openDetails(row) {
            this.MapDetailsShow = true;
            let param = {
                NodeId: row.nodeId
            };

            queryNodeInfoById(param)
                .then(res => {
                    let {
                        result,
                        msg,
                        data
                    } = res;
                    if (data != null) {
                        this.details_lx = res.data.nodeType;
                        this.details_minerId = res.data.minerId;
                        this.details_Ip = res.data.ip;
                        if (res.data.nodeState == 0) {
                            this.details_nodeState = "在线";
                        } else {
                            this.details_nodeState = "离线";
                        }

                        this.details_city = res.data.city;
                        this.details_region = res.data.region;
                        this.details_RgnGrpInfo = res.data.RgnGrpInfo;
                        this.details_storeUsage = res.data.storeUsage;
                        this.details_totalCap = res.data.totalCap;
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        //获取更多详情
        getMoreDetails() {
            //查询时选项卡自动回复到第一项
            this.activeNameTab = "firstBackUp"
            this.currentPageBackUp = 1
            this.currentPageCache = 1
            this.dialogTableVisible = true;
            let param = {
                Nodeid: this.details_minerId
            };
            queryNodeStoredFileListByNodeId(param)
                .then(res => {
                    let {
                        result,
                        msg,
                        data
                    } = res;
                    this.tableDataMoreDetailsBackUp = []
                    this.tableDataMoreDetailsCache = []
                    if (data.backUpFileList != null) {
                        this.tableDataMoreDetailsBackUp = res.data.backUpFileList;
                    }
                    if (data.cacheFileList != null) {
                        this.tableDataMoreDetailsCache = res.data.cacheFileList;
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

<style lang="less">
.chart-container {
    width: 100%;
    //float: initial !important;
    // min-width: 1600px;

}

.new_grid-content {
    height: auto;

    //background: #999999;
    .item_one_child_r {
        width: 100%;
        overflow: hidden;

        .el-checkbox__inner {
            margin-left: 15px;
        }

        width: 100%;
        height: auto;
        margin: 50px auto;
        overflow: hidden;

        .child_r_b {
            width: auto;
            padding: 0 10px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 30px;
            float: left;
            border: 1px solid #dfe6ec;
            margin-left: 15px;
            background: #20a0ff;
            color: #ffffff;

            &:nth-child(2) {
                margin-left: 0px;
            }
        }

        .child_r_table {
            .el-table .cell {
                line-height: 18px;
            }
        }

        .el-checkbox+.el-checkbox {
            margin-left: 0px;
            width: 100%;
            margin-top: 10px;
        }

        .child_checkbox {
            width: 100%;
            float: left;
        }
    }
}

.div_MapDetails {
    width: 260px;
    height: auto;
    background: #999999;
    position: absolute;
    top: 100px;
    z-index: 1;
    background-image: linear-gradient(-53deg, #3d5bd9 0%, #71a2e0 100%),
        linear-gradient(#ffffff, #ffffff);
    background-blend-mode: normal, normal;
    box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    opacity: 0.6;
    color: #ffffff;

    p {
        text-indent: 10px;
        width: 230px;
    }
}

.child_r_t .el-button--primary {
    margin-left: 15px;
}
</style>
