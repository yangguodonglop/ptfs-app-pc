<template>
<section class="myself-container">
    <div class="devide_title">
        <el-row type="flex">
            <el-col :span="24">
                <titleBar :listArray="listArray"></titleBar>
            </el-col>
        </el-row>
    </div>
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <el-col :span="6">
                    <formInput :labelName="form.labelName" :inputText="form.inputText"></formInput>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" @click="getInfo()">搜索</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <div class="devide_table">
      
        <el-row type="flex" class="row_active" justify="space-between">
            <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col>
            <el-col :span="1" type="flex" style="margin-right:10px;">
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar :tableData="tableData" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" @handleSelectionChange="handleSelectionChange"></tableBar>
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

</section>
</template>

<script>
import titleBar from "../../components/titleBar";
import tableBar from "../../components/tableBar";
import pageNation from "../../components/pageNation";
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";
import myDropdown from "../../components/myDropdown";
import myAlert from "../../components/myAlert";
import myDatanums from "../../components/myDatanums";
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            listArray: [{
                    title: "总存储力",
                    nums: "1010101S/d"
                },
                {
                    title: "西柚机总数",
                    nums: "1000台"
                },
                {
                    title: "累计收益",
                    nums: "341431341poc"
                },
                {
                    title: "备用模块",
                    nums: "备用模块数据"
                }
            ],

             rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "userId",
                    label: "用户ID"
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
                    prop: "userStorage",
                    label: "总存储力"
                },
                {
                    prop: "userDevicenums",
                    label: "西游记总数"
                },
                {
                    prop: "userDeviceincome",
                    label: "累计收益"
                },
               
            ],
            tableData: [{
                    userId: "1000000",
                    userName: "王小虎",
                    userNc: "张三",
                    userPhoneNum: "15951813234",
                    userStorage:"1.123242S/d" ,
                    userDevicenums: 5,
                    userDeviceincome: "88881.00POC",
                },
                {
                    userId: "1000000",
                    userName: "王小虎",
                    userNc: "张三",
                    userPhoneNum: "15951813234",
                    userStorage:"1.123241S/d" ,
                    userDevicenums: 55,
                    userDeviceincome: "88882.00POC",
                },
                {
                    userId: "1000000",
                    userName: "王小虎",
                    userNc: "张三",
                    userPhoneNum: "15951813234",
                    userStorage:"1.12324S/d" ,
                    userDevicenums:45,
                    userDeviceincome: "88881.00POC",
                },
                {
                    userId: "1000000",
                    userName: "王小虎",
                    userNc: "张三",
                    userPhoneNum: "15951813234",
                    userStorage:"1.12324S2/d" ,
                    userDevicenums: 35,
                    userDeviceincome: "88882.00POC",
                },
                {
                    userId: "1000000",
                    userName: "王小虎",
                    userNc: "张三",
                    userPhoneNum: "15951813234",
                    userStorage:"1.12324S/d" ,
                    userDevicenums: 25,
                    userDeviceincome: "8888.00POC",
                },
             
            ],
            tableOption: {
                label: "操作",
                options: [{
                        label: "详情",
                        type: "primary",
                        methods: "editOnchange"
                    },
                 
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
            ],
            dropdownArr: [{
                    name: "批量冻结",
                    value: "1"
                },
                {
                    name: "批量解冻",
                    value: "2"
                }
            ],
            alertNum: 0,
            dataNum: "8888"
        };
    },
    mounted: function () {
        this.dataNum = this.tableData.length
    },
    methods: {
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                alert("此处为解冻方法" + "***" + "解冻id为" + val.row.userId);
            } else {
                alert("此处为冻结方法" + "***" + "冻结id为" + val.row.userId);
            }
        },
        handleSelectionChange(val) {
            alert(val.length)
            this.alertNum = val.length
            alert(JSON.stringify(val))
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
        },
        handleCommand(command) {
            alert('click on item *' + command);
        },
        exportExcel() {
            // /* generate workbook object from table */
            // let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
            // /* get binary string as output */
            // let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
            // try {
            //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户提交返利表.xlsx');
            // } catch (e)
            // {
            //     if (typeof console !== 'undefined')
            //         console.log(e, wbout)
            // }
            // return wbout
        },
    },
    components: {
        titleBar: titleBar,
        tableBar: tableBar,
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
</style>
