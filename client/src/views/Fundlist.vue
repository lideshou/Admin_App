<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight">
                    <el-button type="primary" size="small" icon="view" @click="handAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableContainer">
            <el-table v-if="tableData.length>0" :data="tableData" max-height="450" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
                <el-table-column prop="date" label="创建时间" align="center" width="250">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
                <el-table-column prop="desc" label="收支描述" align="center" width="80"></el-table-column>
                <el-table-column prop="income" label="收入" align="center" width="50">
                    <template slot-scope="scope">
                        <span style="color:#00d053">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expend" label="支出" align="center" width="50">
                    <template slot-scope="scope">
                        <span style="color:#f56767">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cash" label="账户现金" align="center" width="50">
                    <template slot-scope="scope">
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" icon="delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Dialog :dialog="dialog" :formData="formData" @updata="getProfile"></Dialog>
     </div>   
</template>

<script>
    import Dialog from "../components/Dialog"
    export default{
        name:"fundList",
        data(){
            return {
                formData:{
                    type:"",
                    describe:"",
                    income:"",
                    expend:"",
                    cash:"",
                    remark:"",
                    id:""
                },
                tableData:[],
                dialog:{
                    show:false,
                    title:"",
                    option:"edit"
                }
            };
        },
        created(){
            this.getProfile();
        },
        methods:{
            getProfile(){
                //获取表格数据
            this.$axios.get("/api/profiles")
            .then(res=>{
                this.tableData=res.data;
            })
            .catch(err=>console.log(err));
            },
            handleEdit(index,row){
                //编辑
                this.dialog={
                    show:true,
                    title:"修改资金信息",
                    option:"edit"
                };
                this.formData={
                    type:row.type,
                    describe:row.describe,
                    income:row.income,
                    expend:row.expend,
                    cash:row.cash,
                    remark:row.remark,
                    id:row._id
                }
            },
            handleDelete(index,row){
                this.$axios.delete(`/api/profiles/del/${row._id}`).then(res => {
                    this.$message("删除成功");
                    //刷新页面
                    this.getProfile();
                });
            },
            handAdd(){
                //添加
                this.dialog={
                    show:true,
                    title:"添加资金信息",
                    option:"add"
                };
                this.formData={
                    type:"",
                    describe:"",
                    income:"",
                    expend:"",
                    cash:"",
                    remark:"",
                    id:""
                }
            }
        },
        components:{
            Dialog
        }
    }
</script> 

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>