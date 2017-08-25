<template>
  <el-dialog
    class="detail"
    :title="detail.title"
    :visible.sync="detail.wordDialogVisible">
      <el-form label-position="left" >
          <el-form-item label="标识名称">
              <el-input v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="正文">
              <el-input v-model="content"></el-input>
          </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    name:"table",
    data(){
      return {
          title:"",
          content:""
      }
    },
    props:{
      detail:Object
    },
    created(){

    },
    methods:{
      save(){
        console.log("detail")
        // this.$emit('')
      },
      cancel(){
        console.log("detai取消")
      }

    }
  }
</script>

<style lang="scss" >

</style>
