<template>
 <section class="chart-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple new_grid-content">
            <div style="display: flex;justify-content: space-between;">
				<div class="item_three_table" style="margin-top:10px;">
                    <el-button type="primary" style="margin-bottom:20px;" @click="reFresh">刷新</el-button>
						<el-table ref="container" @click="handlerClick11" :data="tableGroupInfo.slice((currentPageFq-1)*pagesizeFq,currentPageFq*pagesizeFq)" :border="true" @sort-change="tabDataChangeGroupInfo" style="width: 100%">
                            <el-table-column prop="nodeType" align="center"  label="类型" > </el-table-column>
                            <el-table-column prop="nodeHashId" align="center"  label="哈希" min-width="400">	</el-table-column>
                            <el-table-column	prop="regionNum" align="center" sortable		label="分区号">	</el-table-column>
                            <el-table-column	prop="groupCnt" align="center" sortable	label="组数">
                                <template slot-scope="scope">
                                    <div style="cursor: pointer;color:blue;" @click="groupInfoMore(scope.row)">{{scope.row.groupCnt}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="minerCnt" align="center" sortable label="矿机总数"></el-table-column>
                       </el-table>
						<el-pagination
                             @size-change="handleSizeChangeFq"
                            @current-change="handleCurrentChangeFq"
                            :current-page="currentPageFq"
                            :page-sizes="[5, 10, 20]" 
                            :page-size="pagesizeFq"        
                            layout="total, sizes, prev, pager, next, jumper"
                            style="float:right"
                            :total="tableGroupInfo.length">    
                  </el-pagination>
                  
				</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
     <!-- 分组详情弹窗  -->
  <el-dialog title="" :visible.sync="dialogGroupInfoVisible"  id="el-dialog-new" customClass="customWidth">
	 
	  <div class="dialog_item_table" style="margin-top:0px">
      <el-tabs v-model="activeNameTab" @tab-click="handleClick">
          <el-tab-pane label="分组详情" name="firstBackUp">
           <el-col :span="24">
            <div class="item_title_child" style="text-align:left;">
            
            
                 <el-table :data="tableQueryGroupInfo.slice((currentPageGroup-1)*pagesizeGroup,currentPageGroup*pagesizeGroup)" :border="true" @sort-change="tabDataChangeQueryGroupInfo">
                  <el-table-column prop="groupNum" label="分组号" align="center" sortable  ></el-table-column>
                  <el-table-column property="nodeHash" label="矿机哈希" align="center"  min-width="500"></el-table-column>
                  <el-table-column  label="操作" align="center" >
                      <template slot-scope="scope">
                          <el-button size="small" @click="groupInfoLink(scope.row)">查看详情</el-button>
                      </template>
                  </el-table-column>

                </el-table> 
                
                 <el-pagination
                  @size-change="handleSizeChangeGroup"
                                  @current-change="handleCurrentChangeGroup"
                                  :current-page="currentPageGroup"
                                  :page-sizes="[5, 10, 20]" 
                                  :page-size="pagesizeGroup"        
                                  layout="total, sizes, prev, pager, next, jumper"
                                  style="float:right"
                                  :total="queryGroupInfoLength">  
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
import { queryRegionGroupInfo, queryGroupInfo } from "../../api/api";
export default {
  data() {
    return {
      tableGroupInfo: [],
      currentPageFq: 1, //初始页
      pagesizeFq: 10, //每页的数据
      tableQueryGroupInfo: [],
      currentPageGroup: 1, //初始页
      pagesizeGroup: 10, //    每页的数据
      queryGroupInfoLength: "",
      dialogGroupInfoVisible: false,
      activeNameTab: "firstBackUp"
    };
  },
  mounted: function() {
    //获取分区分组信息
    this.getGroupInfo();
  },
  methods: {
    //分页
    handleCurrentChangeFq: function(currentPage) {
      this.currentPageFq = currentPage; //点击第几页
    },
    //改变下拉分页
    handleSizeChangeFq: function(size) {
      this.pagesizeFq = size; //每页下拉显示数据
    },
    //分页
    handleCurrentChangeGroup: function(currentPage) {
      this.currentPageGroup = currentPage; //点击第几页
    },

    //改变下拉分页
    handleSizeChangeGroup: function(size) {
      this.pagesizeGroup = size; //每页下拉显示数据
    },
    //分区分组展示信息
    getGroupInfo() {
      let param = {};
      queryRegionGroupInfo(param)
        .then(res => {
          let { result, msg, data } = res;
          if (data != null) {
            this.tableGroupInfo = res.data;
            // this.details_length = res.data.length;
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    //点击组数查看详情
    groupInfoMore(row) {
      console.log(row)
      let param = {};
      param.nodeId = row.nodeHashId;
      this.dialogGroupInfoVisible = true;
      queryGroupInfo(param)
        .then(res => {
          let { result, msg, data } = res;
          if (data != null) {
            this.tableQueryGroupInfo = res.data;
            this.queryGroupInfoLength = res.data.length;
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
    //分区/分组列表品排序
    tabDataChangeGroupInfo(column) {
      this.propname = column.prop;
      if (column.order === "descending") {
        this.tableGroupInfo = this.tableGroupInfo.sort(this.my_desc_sort);
        this.$forceUpdate();
      } else if (column.order === "ascending") {
        this.tableGroupInfo = this.tableGroupInfo.sort(this.my_asc_sort);
        this.$forceUpdate();
      }
    },
    //分组详情列表品排序
    tabDataChangeQueryGroupInfo(column) {
      this.propname = column.prop;
      if (column.order === "descending") {
        this.tableQueryGroupInfo = this.tableQueryGroupInfo.sort(
          this.my_desc_sort
        );
        this.$forceUpdate();
      } else if (column.order === "ascending") {
        this.tableQueryGroupInfo = this.tableQueryGroupInfo.sort(
          this.my_asc_sort
        );
        this.$forceUpdate();
      }
    },
    //刷新分区分组信息
    reFresh() {
      this.getGroupInfo();
    },
     
    //查看详情跳转
    groupInfoLink(row) {
      this.dialogGroupInfoVisible = false;
      this.input_nodeId = row.nodeHash;
      this.$router.push({
     path: "/nodequery",
        query: { nowStoreNodeId: row.nodeHash }
      });
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
.dialog_item_table {
  width: 100%;
  height: auto;
  padding: 30px auto;
  overflow: hidden;
  margin: 50px auto;
  margin-top: 0px;
  .item_title_child {
    width: 100%;
    margin: 0 auto;
    height: auto;
    background: #f2f2f2;
    overflow: hidden;
    text-align: center;
  }
}
</style>
