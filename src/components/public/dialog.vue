<template>
<el-dialog :size="dialog.size":class="dialog.class" :title="dialog.title" :visible.sync="dialog.dialogTableVisible">
<template v-if="dialog.caidanEdit">
    <el-form >
    <span>当前父级菜单名：{{dialog.caidan.name}}</span>
      <el-form-item :label="dialog.label">
        <el-input placeholder="请输入修改的菜单名"  v-model="caidanxiugai"></el-input>
      </el-form-item>
    </el-form>
</template>
<template v-else>
    <el-form :inline="true">
      <el-form-item :label="dialog.label">
        <el-input   v-model="model"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <TB :table="dialog.table" v-on:listenerFromTable="fromTable"></TB>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
</template>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button  @click="cancel">取消</el-button>
    </span>
</el-dialog>
</template>
<script>
  import TB from './table'
  export default {
    name:"dialog",
    data(){
      return {
          model:"",
          selection:[],
          caidanxiugai:''
      }
    },
    props:{
      dialog:Object
    },
    components:{
        TB
    },
    methods:{
        onSubmit(){
          console.log("查询")
          this.$emit('listnerFromDia',{
            data:{
              seach:this.model
            }
          })
        },
        save(){
          console.log("save")
          this.$emit('listnerFromDia',{
                dialogTableVisible:false,
                data:{
                  id:this.model,
                  section:this.selection
                }
            }
          )
        },
        cancel(){
          console.log("cancel")
          this.$emit('listnerFromDia',{dialogTableVisible:false})
        },
        fromTable(data){
          console.log("from table")
          console.log(data)
          this.$emit('listnerFromDia',data)
          this.selection = data
        }
    }
  }
</script>

<style lang="scss" >

</style>
