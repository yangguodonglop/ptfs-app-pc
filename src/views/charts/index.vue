<template>
    <section class="chart-container">
         <el-row>
            <el-col :span="6">
                <div class="new_cont new_cont_active1" style="width:100%;">
                    <div class="item_one">在线节点个数</div>
                    <div class="item_two">{{dataOne}}</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="new_cont new_cont_active2" style="width:100%;">
                    <div class="item_one">存储量/存储空间</div>
                    <div class="item_two">{{datatwo}}/{{datatwoactive}}</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="new_cont new_cont_active3" style="width:100%;">
                    <div class="item_one">实际存储数据量</div>
                    <div class="item_two">{{datathree}}</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="new_cont new_cont_active4" style="width:100%;">
                    <div class="item_one">实际存储文件个数</div>
                    <div class="item_two">{{datafour}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="div_item" style="width:100%;height:50px;">
                    <div class="item_start">
                         <span class="demonstration">开始时间:</span>
                       <el-date-picker
                            v-model="valueOnlinestrat"
                            type="datetime"
                            placeholder="选择日期时间"
                            @change="getSTimeOnlinestrat"
                            value-format="yyyy-MM-dd HH:mm"
						     >
                 
                         </el-date-picker>
                    </div>
                     <div class="item_end" style="">
                         <span class="demonstration">结束时间:</span>
                        <el-date-picker
                            v-model="valueOnlineend"
                            type="datetime"
                            placeholder="选择日期"
                              @change="getSTimeOnlineend"
						           value-format="yyyy-MM-dd HH:mm">
                            >
                         </el-date-picker>
                    </div>
                    <div class="item_button">
                          <el-button type="primary" @click="getData(1)">刷新</el-button>
                    </div>
                </div>
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div class="div_item" style="width:100%;height:50px;">
                    <div class="item_start">
                         <span class="demonstration">开始时间:</span>
                        <el-date-picker
                            v-model="valueDevStorestart"
                            type="datetime"
                             @change="getSTimeDevStorestart"
						     value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期">
                         </el-date-picker>
                    </div>
                     <div class="item_end" style="">
                         <span class="demonstration">结束时间:</span>
                        <el-date-picker
                            v-model="valueDevStoreend"
                            type="datetime"
                               @change="getSTimeDevStoreend"
						     value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期">
                         </el-date-picker>
                    </div>
                    <div class="item_button">
                           <el-button type="primary" @click="getData(2)">刷新</el-button>
                    </div>
                </div>
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div class="div_item" style="width:100%;height:50px;">
                    <div class="item_start">
                         <span class="demonstration">开始时间:</span>
                        <el-date-picker
                            v-model="valueUsagestart"
                            type="datetime"
                               @change="getSTimeUsagestart"
						     value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期">
                         </el-date-picker>
                    </div>
                     <div class="item_end" style="">
                         <span class="demonstration">结束时间:</span>
                        <el-date-picker
                            v-model="valueUsageend"
                            type="datetime"
                               @change="getSTimeUsageend"
						     value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期">
                         </el-date-picker>
                    </div>
                    <div class="item_button">
                           <el-button type="primary" @click="getData(3)">刷新</el-button>
                    </div>
                </div>
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div class="div_item" style="width:100%;height:50px;">
                    <div class="item_start">
                         <span class="demonstration">开始时间:</span>
                        <el-date-picker
                            v-model="valueFilestart"
                             type="datetime"
                               @change="getSTimeFilestart"
						     value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期">
                         </el-date-picker>
                    </div>
                     <div class="item_end" style="">
                         <span class="demonstration">结束时间:</span>
                        <el-date-picker
                            v-model="valueFileend"
                             type="datetime"
                               @change="getSTimeFileend"
						     value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期">
                         </el-date-picker>
                    </div>
                    <div class="item_button">
                           <el-button type="primary" @click="getData(4)">刷新</el-button>
                    </div>
                </div>
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import "axios";
import {
  queryOnlineNodeHistgraphs,
  querySummary,
  queryStoreUsageHistgraph,
  queryDevStoreHistgraph,
  queryFileCntHistgraph
} from "../../api/api";
import { error } from "util";
export default {
  data() {
    return {
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null,
      dataOne: "",
      datatwo: "",
      datatwoactive: "",
      datathree: "",
      datafour: "",
      valueOnlinestrat: "",
      valueOnlineend: "",
      valueDevStorestart: "",
      valueDevStoreend: "",
      valueUsagestart: "",
      valueUsageend: "",
      valueFilestart: "",
      valueFileend: "",
      NodeHistgraphsDataX: "",
      NodeHistgraphsDataY: "",
      UsageHistgraphDataX: "",
      UsageHistgraphDataY: "",
      DevStoreHistgraphDataX: "",
      DevStoreHistgraphDataY: "",
      DevStoreHistgraphDataYY: "",
      FileCntHistgraphDataX: "",
      FileCntHistgraphDataY: ""
    };
  },
  mounted: function() {
    //获取当前时间
    let nowDate = new Date();
    let endTime = this.common.getTimes(nowDate);
    this.valueOnlineend = endTime; // 当前的时间点
    this.valueDevStoreend = endTime;
    this.valueUsageend = endTime;
    this.valueFileend = endTime;

    //获取往前往前一星期时间
    let befDate = new Date(nowDate.getTime() - 7 * 24 * 3600 * 1000);
    let startTime = this.common.getTimes(befDate);
    this.valueOnlinestrat = startTime; // 向前推迟一周的时间点
    this.valueDevStorestart = startTime;
    this.valueUsagestart = startTime;
    this.valueFilestart = startTime;

    //this.getNowFormatDate()

    let _this = this;
    var timeParams = {
      startTime: this.valueOnlinestrat,
      endTime: this.valueOnlineend
    };
    let Summaryparam = {
      startTime: "",
      endTime: this.common.getTimes(nowDate)
    };

    //tilte展示数据
    querySummary(Summaryparam)
      .then(data => {
        //在线节点个数
        this.dataOne = data.data.OnlineNodeCount;
        //储存量
        this.datatwo = data.data.FileTotalStoreUsage;
        //存储空间
        this.datatwoactive = data.data.TotalMinerStoreCap;
        this.datafour = data.data.TotalFileCnt; //实际存储数据量
        this.datathree = data.data.TotalStoreUsage; //实际存储文件个数
        let { msg, result } = data;
        if (result !== "ok") {
          this.$message({
            message: msg,
            type: "error"
          });
        } else {
        }
      })
      .catch(error => {
        this.$message({
          message: "网络出错，请重新请求",
          type: "error"
        });
      });
    //在线结点数
    queryOnlineNodeHistgraphs(timeParams)
      .then(data => {
        let { msg, result } = data;
        if (result == "ok") {
          this.NodeHistgraphsDataX = data.data.dateList;
          this.NodeHistgraphsDataY = data.data.onlineNodeCntDailyList;
          this.drawColumnChart();
        } else {
          this.$message({
            message: msg,
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

    //存储量/存储空间
    queryDevStoreHistgraph(timeParams)
      .then(data => {
        let { msg, result } = data;
        if (result == "ok") {
          this.DevStoreHistgraphDataX = data.data.dateList;
          this.DevStoreHistgraphDataY = data.data.ipfsCapList;
          this.DevStoreHistgraphDataYY = data.data.totalDevCapList;
          this.drawBarChart();
        } else {
          this.$message({
            message: msg,
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

    //实际存储数据量
    queryStoreUsageHistgraph(timeParams)
      .then(data => {
        let { msg, result } = data;
        if (result == "ok") {
          this.UsageHistgraphDataX = data.data.dateList;
          this.UsageHistgraphDataY = data.data.storeUsage;
          this.drawLineChart();
        } else {
          this.$message({
            message: msg,
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

    //储存文件数
    queryFileCntHistgraph(timeParams)
      .then(data => {
        let { msg, result } = data;
        if (result == "ok") {
          this.FileCntHistgraphDataX = data.data.dateList;
          this.FileCntHistgraphDataY = data.data.fileCnt;
          this.drawPieChart();
        } else {
          this.$message({
            message: msg,
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
    //this.drawCharts();
  },

  methods: {
    //在线节点数
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        title: {
          text: "在线节点数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["在线节点数"]
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.NodeHistgraphsDataX
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}(个)"
          }
        },
        series: [
          {
            name: "在线节点数",
            type: "line",
            stack: "总量",
            data: this.NodeHistgraphsDataY
          }
        ]
      });
    },
    //储存量/储存空间
    drawBarChart() {
      this.chartBar = echarts.init(document.getElementById("chartBar"));
      this.chartBar.setOption({
        title: {
          text: "储存量/储存空间"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["储存量", "储存空间"]
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.DevStoreHistgraphDataX
        },
        yAxis: [
          {
            type: "value",
            name: "储存量",

            axisLabel: {
              formatter: "{value}(GB)"
            }
          },
          {
            type: "value",
            name: "储存空间",
            axisLabel: {
              formatter: "{value} (TB)"
            }
          }
        ],
        series: [
          {
            name: "储存量",
            type: "line",
            data: this.DevStoreHistgraphDataY
          },
          {
            name: "储存空间",
            type: "line",
            yAxisIndex: 1,
            data: this.DevStoreHistgraphDataYY
          }
        ]
      });
    },
    //实际存储数据量
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        title: {
          text: "实际存储数据量"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["实际存储数据量"]
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.UsageHistgraphDataX
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}(GB)"
          }
        },
        series: [
          {
            name: "实际存储数据量",
            type: "line",
            stack: "总量",
            data: this.UsageHistgraphDataY
          }
        ]
      });
    },
    //存储文件数
    drawPieChart() {
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        title: {
          text: "储存文件数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["储存文件数"]
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.FileCntHistgraphDataX
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}(个)"
          }
        },
        series: [
          {
            name: "储存文件数",
            type: "line",
            stack: "总量",
            data: this.FileCntHistgraphDataY
          }
        ]
      });
    },
    getSTimeOnlinestrat(val) {
      this.valueOnlinestrat = val;
    },
    //
    getSTimeOnlineend(val) {
      this.valueOnlineend = val;
    },
    getSTimeDevStorestart(val) {
      this.valueDevStorestart = val;
    },
    getSTimeDevStoreend(val) {
      this.valueDevStoreend = val;
    },
    getSTimeUsagestart(val) {
      this.valueUsagestart = val;
    },
    getSTimeUsageend(val) {
      this.valueUsageend = val;
    },
    getSTimeFilestart(val) {
      this.valueFilestart = val;
    },
    getSTimeFileend(val) {
      this.valueFileend = val;
    },

    //点击刷新请求数据
    getData(e) {
      switch (e) {
        case 1:
          var timeParams = {
            startTime: this.valueOnlinestrat,
            endTime: this.valueOnlineend
          };
          var IEtimetypeStart = timeParams.startTime;
          var IEtimetypeEnd = timeParams.endTime;
          IEtimetypeStart = IEtimetypeStart.replace(/-/g, "/");
          IEtimetypeEnd = IEtimetypeEnd.replace(/-/g, "/");
          // 判断结束时间是否大于起始时间
          var timeStatus = this.common.checkTimes(
            IEtimetypeStart,
            IEtimetypeEnd
          );
          if (timeStatus == false) {
            this.$message.error("结束时间必须大于起始时间");
            return false;
          }
          //在线节点数
          queryOnlineNodeHistgraphs(timeParams)
            .then(data => {
              let { msg, result } = data;
              if (result == "ok") {
                this.NodeHistgraphsDataX = data.data.dateList;
                this.NodeHistgraphsDataY = data.data.onlineNodeCntDailyList;
                this.drawColumnChart();
              } else {
                this.$message({
                  message: msg,
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

          break;
        case 2:
          var timeParams = {
            startTime: this.valueDevStorestart,
            endTime: this.valueDevStoreend
          };
          var IEtimetypeStart = timeParams.startTime;
          var IEtimetypeEnd = timeParams.endTime;
          IEtimetypeStart = IEtimetypeStart.replace(/-/g, "/");
          IEtimetypeEnd = IEtimetypeEnd.replace(/-/g, "/");
          // 判断结束时间是否大于起始时间
          var timeStatus = this.common.checkTimes(
            IEtimetypeStart,
            IEtimetypeEnd
          );
          if (timeStatus == false) {
            this.$message.error("结束时间必须大于起始时间");
            return false;
          }
          //存储量/存储空间
          queryDevStoreHistgraph(timeParams)
            .then(data => {
              let { msg, result } = data;
              if (result == "ok") {
                this.DevStoreHistgraphDataX = data.data.dateList;
                this.DevStoreHistgraphDataY = data.data.ipfsCapList;
                this.DevStoreHistgraphDataYY = data.data.totalDevCapList;
                this.drawBarChart();
              } else {
                this.$message({
                  message: msg,
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
          break;
        case 3:
          var timeParams = {
            startTime: this.valueUsagestart,
            endTime: this.valueUsageend
          };
          var IEtimetypeStart = timeParams.startTime;
          var IEtimetypeEnd = timeParams.endTime;
          IEtimetypeStart = IEtimetypeStart.replace(/-/g, "/");
          IEtimetypeEnd = IEtimetypeEnd.replace(/-/g, "/");
          // 判断结束时间是否大于起始时间
          var timeStatus = this.common.checkTimes(
            IEtimetypeStart,
            IEtimetypeEnd
          );
          if (timeStatus == false) {
            this.$message.error("结束时间必须大于起始时间");
            return false;
          }
          //实际存储数据量
          queryStoreUsageHistgraph(timeParams)
            .then(data => {
              let { msg, result } = data;
              if (result == "ok") {
                this.UsageHistgraphDataX = data.data.dateList;
                this.UsageHistgraphDataY = data.data.storeUsage;
                this.drawLineChart();
              } else {
                this.$message({
                  message: msg,
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
          break;
        case 4:
          var timeParams = {
            startTime: this.valueFilestart,
            endTime: this.valueFileend
          };
          var IEtimetypeStart = timeParams.startTime;
          var IEtimetypeEnd = timeParams.endTime;
          IEtimetypeStart = IEtimetypeStart.replace(/-/g, "/");
          IEtimetypeEnd = IEtimetypeEnd.replace(/-/g, "/");
          // 判断结束时间是否大于起始时间
          var timeStatus = this.common.checkTimes(
            IEtimetypeStart,
            IEtimetypeEnd
          );
          if (timeStatus == false) {
            this.$message.error("结束时间必须大于起始时间");
            return false;
          }
          //储存文件数
          queryFileCntHistgraph(timeParams)
            .then(data => {
              let { msg, result } = data;
              if (result == "ok") {
                this.FileCntHistgraphDataX = data.data.dateList;
                this.FileCntHistgraphDataY = data.data.fileCnt;
                this.drawPieChart();
              } else {
                this.$message({
                  message: msg,
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
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.chart-container {
  // width: 100%;
  float: left;
  min-width: 1500px;
}

.el-col {
  padding: 30px 20px;
}
.new_cont {
  background: #f2f2f2;
  height: 80px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
}
.new_cont_active1 {
  background-image: linear-gradient(159deg, #b87cf6 0%, #903be7 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.new_cont_active2 {
  background-image: linear-gradient(-53deg, #3d5bd9 0%, #71a2e0 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.new_cont_active3 {
  background-image: linear-gradient(-90deg, #fb9a8d 0%, #feb485 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.new_cont_active4 {
  background-image: linear-gradient(-90deg, #ff463f 0%, #ff8157 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.new_cont .item_one {
  padding-top: 20px;
  overflow: hidden;
}
.div_item {
  .item_start {
    float: left;
    margin-left: 20px;
  }
  .item_end {
    float: left;
    margin-left: 20px;
  }
  .item_button {
    float: left;
    margin-left: 20px;
  }
}
</style>
