<template>
  <section class="myself-container">
    <div class="devide_title" >
       <el-row type="flex"  >
          <el-col :span="24" >
           <titleBar :listArray="listArray"></titleBar>
        </el-col>
      </el-row>
    </div>
	 <div class="device_form">
      <el-form ref="form" :model="form">
         <el-row type="flex"  >
           <el-col :span="6" >
              <formInput :labelName="form.labelName" :inputText="form.inputText"></formInput>
           </el-col>
           <el-col :span="4" >
              <gender-selector size="small" :optionArr="optionArr" :selectedValue="selectedValue" :selectName="selectName"  @change="change"></gender-selector>
           </el-col>
           <el-col :span="4" >
              <gender-selector size="small"  :optionArr="optionStateArr" :selectedValue="selectStateName" :selectName="selectStateName"  @change="change"></gender-selector>
           </el-col>
            <el-col :span="4" >
              <gender-selector size="small"  :optionArr="optionSexArr" :selectedValue="selectSexName" :selectName="selectSexName"  @change="change"></gender-selector>
           </el-col>
            <el-col :span="1" >
             <el-button type="primary" @click="getInfo()">搜索</el-button>
            </el-col>
            <el-col :span="1" >
              <div @click="getShow()" class="div_show">展开</div>
            </el-col>
       </el-row>
        <el-row type="flex" class="row_active"  v-show="showState" >
           <el-col :span="8" >
              <dateTimePicker :datapickerName="dataResName" :datapickerValue="datapickeResValue"></dateTimePicker>
           </el-col>
           <el-col :span="8" >
              <dateTimePicker :datapickerName="dataBindName" :datapickerValue="datapickerBindValue"></dateTimePicker>
           </el-col>
       </el-row>
      </el-form>
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
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";

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
      },
      form: {
        labelName: "西柚用户ID/姓名/手机号1",
        inputText: "请输入ID/姓名/手机号1"
      },
      optionArr: ["全部", "冻结", "正常"],
      selectName: "状态",
      selectedValue: "全部",

      optionStateArr: ["全部", "是", "否"],
      selectStateName: "是否激活",
      selectStateName: "全部",

      optionSexArr: ["全部", "男", "女", "未知"],
      selectSexName: "性别",
      selectSexName: "全部",

      dataResName: "注册日期",
      dataBindName: "首次绑定日期",

      showState: false,
      datapickeResValue: [
        new Date(1800, 10, 10, 10, 10),
        new Date(1900, 10, 11, 10, 10)
      ],
      datapickerBindValue: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2100, 10, 11, 10, 10)
      ]
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
    },
    getInfo() {
      alert(JSON.stringify(this.selectedValue));
    },
    change(val) {
      alert(val + "****");
    },
    getShow() {
      this.showState = !this.showState;
    }
  },
  components: {
    titleBar: titleBar,
    tableBar: tableBar,
    pageNation: pageNation,
    formInput: formInput,
    genderSelector: genderSelector,
    dateTimePicker: dateTimePicker
  }
};
</script>
<style lang="less" >
.myself-container {
  width: 100%;
  min-width: 1600px;

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
</style>
