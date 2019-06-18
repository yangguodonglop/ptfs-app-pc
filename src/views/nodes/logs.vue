<template>
<div class="logs_con_total">
    <div class="">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" ref="findForm" :model="logsFrom">
                <el-form-item label="开始时间">
                    <el-date-picker v-model="logsFrom.startTime" type="datetime" @change="getSTimestart" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="logsFrom.endTime" @change="getSTimeend" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="文件哈希">
                    <el-input v-model.trim="logsFrom.fileHashId" style="width:522px" placeholder="请输入文件哈希"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="item in testarray" :key="item" :label="item" :value="item" @change="handleCheckedChange(item)">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="节点哈希">
                    <el-input v-model.trim="logsFrom.minerId" style="width:522px" placeholder="请输入节点哈希"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitRefresh">刷新</el-button>
                </el-form-item>
                <el-form-item label="选择要清空的表">
                    <el-select v-model="arrValue" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitDelete">删除</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="图表展示" name="first">

            <div class="echarts_div">
                <div id="device_echars_miner" class="device_echars_miner"></div>
            </div>
        </el-tab-pane>
    
        <el-tab-pane label="表格展示" name="second">
            <div class="logs_con">
                <el-table :data="logsarray" @row-click="openDetails" :border="true" style="max-height:660px;overflow: auto;" @sort-change="tabDataChange" :default-sort="{prop: 'timestamp', order: 'descending'}">
                    <el-table-column prop="timestamp" label="上传时间" width="170" align="center" sortable> </el-table-column>
                    <el-table-column prop="minerId" label="来源节点哈希" align="center" width="370"> </el-table-column>
                    <el-table-column prop="nodeType" label="类型" align="center" width="80"> </el-table-column>
                    <el-table-column prop="msg" label="上传日志内容" align="center"> </el-table-column>
                    <el-table-column prop="logType" label="操作类型" align="center" width="190"> </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
          

    </el-tabs>

</div>
</template>

<script>
import echarts from 'echarts'
import common from "../../common/js/util.js";
import {
    showNodeNetworkLogs,
    queryLogTypes,
    deleteHistoryDatas
} from "../../api/api";
export default {
    data() {
        return {
            activeName: 'first',
            logsFrom: {
                startTime: "",
                endTime: "",
                minerId: "",
                fileHashId: ""
            },
            checkListarr: 1,
            checkList: ["日志"],
            testarray: [],
            logsarray: [],
            options: [{
                    value: "元表"
                },
                {
                    value: "文件存储分布表"
                },
                {
                    value: "节点状态表"
                },
                {
                    value: "日志详情表"
                }
            ],
            arrValue: "",
            linksdata: [{
                    source: '节点1',
                    target: '节点1_3',

                }, {
                    source: '节点1_3',
                    target: '节点1_3_1'
                },
                {
                    source: '节点1_3',
                    target: '节点1_3_2'
                }, {
                    source: '节点1_2',
                    target: '节点1_2_1'
                },
                {
                    source: '节点1_2',
                    target: '节点1_2_2'
                },
                {
                    source: '节点1',
                    target: '节点1_2'
                },

            ],
        };
    },
    mounted: function () {
        //获取当前时间
        let nowDate = new Date();
        let endTime = this.common.getTimes(nowDate);
        this.logsFrom.endTime = endTime;

        //获取前一小时间
        let bfDate = new Date(new Date(nowDate.getTime() - 1 * 60 * 60 * 1000));
        let startTime = this.common.getTimes(bfDate);
        this.logsFrom.startTime = startTime;

        //日志类型数据获取
        let param = {};
        queryLogTypes(param)
            .then(res => {
                let {
                    msg,
                    result
                } = res;
                if ((result = "ok")) {
                    this.testarray = res.data;
                }
            })
            .catch(error => {
                this.$message({
                    message: "网络出错，请重新请求",
                    type: "error"
                });
            });
        //日志查询
        this.onSubmit();
        this.drawLine();
    },
    methods: {
        handleCheckedChange: function (val) {
            //console.log(this.checkList);
        },
        getSTimestart(val) {
            this.logsFrom.startTime = val; //获取文件查询开始时间改变是的值
        },
        getSTimeend(val) {
            this.logsFrom.endTime = val; //获取文件查询结束时间改变是的值
        },
        //刷新数据
        onSubmitRefresh: function () {
            this.onSubmit();
            this.linksdata = [{
                    source: '节点1',
                    target: '节点1_3',

                },
                {
                    source: '节点1_3',
                    target: '节点1_3_2'
                }, {
                    source: '节点1_2',
                    target: '节点1_2_1'
                },
                {
                    source: '节点1_2',
                    target: '节点1_2_2'
                },

            ]
            this.drawLine()
            let nowDate = new Date();
            let endTime = this.common.getTimes(nowDate);
            this.logsFrom.endTime = endTime;
            let param = {
                startTime: this.logsFrom.startTime,
                stopTime: this.logsFrom.endTime,
                logType: this.checkListarr,
                fileHash: this.logsFrom.fileHashId,
                nodeHash: this.logsFrom.minerId
            };

        },

        //日志查询
        onSubmit: function () {
            if (this.checkList.length < 1) {
                this.$message.error("请至少勾选一项");
                return false;
            } else if (this.checkList.length < 2 && this.checkList[0] == "日志") {
                this.checkListarr = 1;
            } else if (this.checkList.length < 2 && this.checkList[0] == "通知") {
                this.checkListarr = 2;
            } else {
                this.checkListarr = 3;
            }
            let param = {
                startTime: this.logsFrom.startTime,
                stopTime: this.logsFrom.endTime,
                logType: this.checkListarr,
                fileHash: this.logsFrom.fileHashId,
                nodeHash: this.logsFrom.minerId
            };
            //判断结束时间是否大于起始时间

            //IE兼容时间格式化，将时间中的“-”替换成“/”
            var IEtimetypeStart = param.startTime
            var IEtimetypeStop = param.stopTime
            IEtimetypeStart = IEtimetypeStart.replace(/-/g, "/");
            IEtimetypeStop = IEtimetypeStop.replace(/-/g, "/");
            var timeStatus = this.common.checkTimes(IEtimetypeStart, IEtimetypeStop)
            if (timeStatus == false) {
                this.$message.error("结束时间必须大于起始时间");
                return false;
            }
            showNodeNetworkLogs(param)
                .then(res => {
                    let {
                        msg,
                        result
                    } = res;
                    if ((result = "ok")) {
                        //将查询结果赋值给要显示的数组
                        this.logsarray = res.data;
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },
        //清除表中历史数据
        onSubmitDelete: function () {
            debugger
            let nowParam = []
            nowParam.push(this.arrValue)
            let param = {
                tables: nowParam
            }
            deleteHistoryDatas(param).then(res => {
                    let {
                        msg,
                        result
                    } = res;
                    if ((result = "ok")) {
                        this.testarray = res.data;
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        //echars图
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('device_echars_miner'));
            let option = {
                // title: {
                //     text: 'Graph 简单示例'
                // },
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [{
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    data: [{
                            name: '节点1_3',
                            x: 300,
                            y: 300
                        },
                        {
                            name: '节点1_3_1',
                            x: 0,
                            y: 500
                        },
                        {
                            name: '节点1_3_2',
                            x: 300,
                            y: 500
                        },
                        {
                            name: '节点1_2',
                            x: 800,
                            y: 300
                        }, {
                            name: '节点1',
                            x: 550,
                            y: 100
                        }, {
                            name: '节点1_2_1',
                            x: 600,
                            y: 500
                        },
                        {
                            name: '节点1_2_2',
                            x: 900,
                            y: 500
                        },
                    ],
                    // links: [],
                    links: this.linksdata,
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                }]
            };

            myChart.setOption(option);

            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        },

    }
};
</script>

<style lang="less" scoped>
.logs_con_total {
    display: flex;
    flex-direction: column;
    color: #606266;
}

.logs_text_active {
    width: 1600px;
    height: 40px;
    text-align: center;
    line-height: 40px;
}

.logs_con {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.echarts_div {
    width: 100%;
    height: 600px;

}

#device_echars_miner {
    width: 50%;
    height: 600px;
    margin: 0 auto;

}
</style>
