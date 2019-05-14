<template>
  <section class="myself-container">
    <div class="devide_title" >
       <el-row type="flex"  >
          <el-col :span="24" >
           <titleBar :listArray="listArray"></titleBar>
        </el-col>
      </el-row>
    </div>
    <div class="devide_table" >
      <el-row type="flex"  >
          <el-col :span="24" >
        <tableBar :tableData="tableData" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton"></tableBar>
         </el-col>
      </el-row>
    </div>
       <div class="devide_pageNation" >
         <div class="devide_pageNation_active">
       <el-row type="flex">
          <el-col :span="6" >
         <pageNation  :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" ></pageNation>
         </el-col>
      </el-row>
      </div>
       </div>

    
   
 
            
  </section>
</template>

<script>
import titleBar from "../../components/titleBar";
import tableBar from "../../components/tableBar";
import pageNation from "../../components/pageNation";
export default {
  data() {
    return {
      listArray: [
        {
          title: "在线节点个数",
          nums: "80022"
        },
        {
          title: "在线节点个数1",
          nums: "1800"
        },
        {
          title: "在线节点个数2",
          nums: "2800"
        },
        {
          title: "在线节点个数3",
          nums: "3800"
        }
      ],

      rowHeader: [
        // 未做任何格式化处理的数据
        {
          prop: "userId",
          label: "稀有用户ID"
        },
        {
          prop: "userName",
          label: "用户姓名"
        },
        {
          prop: "userNc",
          label: "用户昵称"
        },
        {
          prop: "userPhoneNum",
          label: "手机号"
        },
        {
          prop: "userSex",
          label: "性别"
        },
        {
          prop: "userState",
          label: "状态"
        },
        {
          prop: "userActivation",
          label: "是否激活"
        },
        {
          prop: "userResdate",
          label: "注册日期"
        },
        {
          prop: "userBinddate",
          label: "首次绑定日期"
        }
      ],
      tableData: [
        {
          userId: "000001",
          userName: "王小虎",
          userNc: "张三",
          userPhoneNum: "15951813234",
          userSex: "男",
          userState: "冻结",
          userActivation: "是",
          userResdate: "2016-09-08 16:00:00",
          userBinddate: "2016-09-08 16:00:00"
        },
        {
          userId: "000002",
          userName: "王小虎",
          userNc: "张三",
          userPhoneNum: "15951813234",
          userSex: "男",
          userState: "冻结",
          userActivation: "是",
          userResdate: "2016-09-08 16:00:00",
          userBinddate: "2016-09-08 16:00:00"
        },
        {
          userId: "000003",
          userName: "王小虎",
          userNc: "张三",
          userPhoneNum: "15951813234",
          userSex: "男",
          userState: "冻结",
          userActivation: "是",
          userResdate: "2016-09-08 16:00:00",
          userBinddate: "2016-09-08 16:00:00"
        }
      ],
      tableOption: {
        label: "操作",
        options: [
          { label: "解冻", type: "primary", methods: "editOnchange" },
          { label: "冻结", type: "danger", methods: "deleteOnchange" }
        ]
      },
      pager: {
        count: 400,
        page: 1,
        rows: 100
      }
    };
  },
  mounted: function() {},
  methods: {
    handleButton(val) {
      console.log(val);
      if (val.methods == "editOnchange") {
        alert("此处为解冻方法" + "***" + "解冻id为" + val.row.userId);
      } else {
        alert("此处为冻结方法" + "***" + "冻结id为" + val.row.userId);
      }
    },
    handleSizeChange(val) {
      alert("每页" + "***" + val.val + "条");
    },
    handleCurrentChange(val) {
      alert("当前页" + "***" + val.val);
    }
  },
  components: {
    titleBar: titleBar,
    tableBar: tableBar,
    pageNation: pageNation
  }
};
</script>
<style lang="less" >
.myself-container {
  width: 100%;

  .devide_title {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 50px;
    .el-col {
      padding: 0px 20px;
    }
  }
  .devide_table {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 50px;
  }
  .devide_pageNation {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 50px;
    .devide_pageNation_active {
      float: right;
    }
  }
}
</style>
