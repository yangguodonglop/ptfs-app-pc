<template>
     <section class="chart-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple new_grid-content">
            <div style="display: flex;justify-content: space-between;">
					<div class="item_two_child">
						<div class="item_top">
						    <div class="item_top_id">节点ID</div>
								<div class="item_top_input">
									<el-input v-model.trim="input_nodeId" placeholder="请输入节点ID查询"></el-input>
								</div>
								<div class="item_top_button">
									<el-button type="primary" @click="getNodesDetails()">查询</el-button>
								</div>
							</div>
						<div class="item-bottom">
                            <p>节点ID:<span style=" width:200px;word-wrap:break-word;margin-top:20px;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">{{details_minerId}}</span></p>
                            <p>节点类型:{{details_lx}}</p>
                            <p>节点所在地：{{details_city}}-{{details_region}}</p>
                            <p>分区-分组：{{details_RgnGrpInfo}}</p>
                            <p >节点IP：<span style=" width:200px;word-wrap:break-word;margin-top:0px;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">{{details_Ip}}</span></p>
                            <p>节点状态：{{details_nodeState}}</p>
                            <p>存储量/存储空间：{{details_storeUsage}}/{{details_totalCap}}</p>
                            <p style="padding-bottom:30px">	<el-button type="primary" @click="getMoreDetails()">更多详情</el-button></p>
						</div>
					</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
      <!-- 节点更多详情弹窗  -->
  <el-dialog title="" :visible.sync="dialogTableVisible"  id="el-dialog-new" customClass="customWidth">
	 
	  <div class="dialog_item_table" style="margin-top:0px">
      <el-tabs v-model="activeNameTab" @tab-click="handleClick">
          <el-tab-pane label="备份文件列表" name="firstBackUp">
           <el-col :span="24">
            <div class="item_title_child" style="text-align:left;">
                <el-table :data="tableDataMoreDetailsBackUp.slice((currentPageBackUp-1)*pagesizeBackUp,currentPageBackUp*pagesizeBackUp)" :border="true" @sort-change="tabDataChangeBackUp">
                  <el-table-column prop="fileName" label="文件名" align="center" sortable ></el-table-column>
                  <el-table-column property="fileSize" label="文件大小" align="center" sortable :formatter="common.formatByte"></el-table-column>
                  <el-table-column property="fileCreateTime" label="上传时间" align="center" min-width="100" sortable></el-table-column>
                  <el-table-column property="fileHashId" label="文件哈希" align="center" min-width="300"></el-table-column>
                        <el-table-column property="fileOwner" label="上传者哈希" align="center" min-width="250" ></el-table-column>
                </el-table>
                <el-pagination
                  @size-change="handleSizeChangeBackUp"
                                  @current-change="handleCurrentChangeBackUp"
                                  :current-page="currentPageBackUp"
                                  :page-sizes="[5, 10, 20]" 
                                  :page-size="pagesizeBackUp"        
                                  layout="total, sizes, prev, pager, next, jumper"
                                  style="float:right"
                                  :total="tableDataMoreDetailsBackUp.length">  
                </el-pagination>
            </div>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="缓存文件列表" name="secondCache">
              <el-col :span="24">
                  <div class="item_title_child" style="text-align:left;">
                      <el-table :data="tableDataMoreDetailsCache.slice((currentPageCache-1)*pagesizeCache,currentPageCache*pagesizeCache)" :border="true" @sort-change="tabDataChangeCache">
                        <el-table-column prop="fileName" label="文件名" align="center" sortable ></el-table-column>
                        <el-table-column property="fileSize" label="文件大小" align="center" sortable :formatter="common.formatByte"></el-table-column>
                        <el-table-column property="fileCreateTime" label="上传时间" align="center" min-width="100"  sortable></el-table-column>
                        <el-table-column property="fileHashId" label="文件哈希" align="center" min-width="300"></el-table-column>
                        <el-table-column property="fileOwner" label="上传者哈希" align="center" min-width="250" ></el-table-column>

                      </el-table>
                      <el-pagination
                        @size-change="handleSizeChangeCache"
                                        @current-change="handleCurrentChangeCache"
                                        :current-page="currentPageCache"
                                        :page-sizes="[5, 10, 20]" 
                                        :page-size="pagesizeCc1"        
                                        layout="total, sizes, prev, pager, next, jumper"
                                        style="float:right"
                                        :total="tableDataMoreDetailsCache.length">  
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
import { queryNodeInfoById,queryNodeStoredFileListByNodeId } from "../../api/api.js";
import common from '../../common/js/util.js'
export default {
  data() {
    return {
      input_nodeId: "",
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
      dialogTableVisible: false,
      currentPageBackUp: 1, //备份table初始页
      pagesizeBackUp: 10, //    备份table每页的数据
      currentPageCache: 1, //缓存table初始页
      pagesizeCache: 10, //  缓存table每页的数据
      tableDataMoreDetailsBackUp: [],
      tableDataMoreDetailsCache:[]
    };
  },
  mounted: function() {
     //判断从备份数量查看详情传递过来的
    if (this.$route.query.nowStoreNodeId == undefined) {
    }
     else {
      this.input_nodeId = this.$route.query.nowStoreNodeId;
      //this.MapDetailsShow=false
          //输入节点查询详情
    this.getNodesDetails();
    }
  },
  methods: {
    //输入节点查询详情
    getNodesDetails() {
      // this.MapDetailsShow = true;
      let param = {
        NodeId: this.input_nodeId
      };
      queryNodeInfoById(param)
        .then(res => {
          let { result, msg, data } = res;
          if (data != null) {
            this.details_lx = res.data.nodeType;
            this.details_minerId = res.data.minerId;
            this.details_Ip = res.data.ip;
            this.details_nodeState = res.data.nodeState;
            this.details_city = res.data.city;
            this.details_region = res.data.region;
            this.details_RgnGrpInfo = res.data.RgnGrpInfo;
            this.details_storeUsage = res.data.storeUsage;
            this.details_totalCap = res.data.totalCap;
          }
        })
        .catch(error => {
          this.$message({
            message: "请输入正确节点ID",
            type: "error"
          });
        });
    },
    //备份文件列表分页
    handleCurrentChangeBackUp: function(currentPage) {
      this.currentPageBackUp = currentPage; //点击第几页
    },

    //备份文件列表改变下拉分页
    handleSizeChangeBackUp: function(size) {
      this.pagesizeBackUp = size; //每页下拉显示数据
    },
    //缓存文件列表分页
    handleCurrentChangeCache: function(currentPage) {
      this.currentPageCache = currentPage; //点击第几页
    },
    //缓存文件列表改变下拉分页
    handleSizeChangeCache: function(size) {
      this.pagesizeCache = size; //每页下拉显示数据
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
          let { result, msg, data } = res;
               this.tableDataMoreDetailsBackUp=[]
          this.tableDataMoreDetailsCache=[]
          if (data.backUpFileList != null) {
            this.tableDataMoreDetailsBackUp = res.data.backUpFileList;
          }
          if(data.cacheFileList != null){
              this.tableDataMoreDetailsCache = res.data.cacheFileList;
          }
    
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    //  //将字节大小转化成GB/KB/KB/
    // formatByte: function(row, column, cellValue, index) {
    //   var limit = parseInt(cellValue);
    //   var size = "";
    //   if (limit < 0.1 * 1024) {
    //     //小于0.1KB，则转化成B
    //     size = limit.toFixed(2) + "B";
    //   } else if (limit < 0.1 * 1024 * 1024) {
    //     //小于0.1MB，则转化成KB
    //     size = (limit / 1024).toFixed(2) + "KB";
    //   } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //     //小于0.1GB，则转化成MB
    //     size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    //   } else {
    //     //其他转化成GB
    //     size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    //   }

    //   var sizeStr = size + ""; //转成字符串
    //   var index = sizeStr.indexOf("."); //获取小数点处的索引
    //   var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
    //   // if (dou == "00") {
    //   //   //判断后两位是否为00，如果是则删除00
    //   //   return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    //   // }
    //   return size;
    // },
     my_desc_sort(a, b) {
      if (a[this.propname] > b[this.propname]) {
        return -1;
      } else if (a[this.propname] < b[this.propname]) {
        return 1;
      } else {
        return 0;
      }
    },
    my_asc_sort(a, b) {
      if (a[this.propname] < b[this.propname]) {
        return -1;
      } else if (a[this.propname] > b[this.propname]) {
        return 1;
      } else {
        return 0;
      }
    },
    //排序改变时触发函数
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
   
  }
};
</script>

<style lang=less>
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
    .el-checkbox + .el-checkbox {
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
 .item_two_child {
    width: 800px;
    height: 600px;

    margin: 50px auto;
    .item_top {
      width: 700px;
      height: 50px;
      margin: 0 auto;
      .item_top_id {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        float: left;
      }
      .item_top_input {
        width: 500px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        float: left;
      }
      .item_top_button {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        float: left;
      }
    }
    .item-bottom {
      width: 500px;
      height: auto;
      margin-top: 50px;
      margin: 100px auto;
      background: #e4e8f1;
      padding-top: 15px;
      background-image: linear-gradient(-53deg, #3d5bd9 0%, #71a2e0 100%),
        linear-gradient(#ffffff, #ffffff);
      background-blend-mode: normal, normal;
      box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      color: #ffffff;

      p {
        width: 100%;
        text-align: center;
        font-size: 14px;
      }
    }
  }
</style>
