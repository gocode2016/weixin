<template>
    <el-table
      :data="table.tableData"
       @selection-change="handleSelectionChange">
      <el-table-column
        v-for="head in table.tableHead"
        v-if= "head.wordOperate"
        :key="head.prop"
        :type="head.type"
        :prop="head.prop"
        :label="head.label"
        :width="head.width">
            <template scope="scope">
              <el-button @click="Detail(scope)" type="text" size="small">详情</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, table.tableData)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
      </el-table-column>
      <el-table-column
        v-else-if= "head.select"
        :key="head.prop"
        :type="head.type"
        :prop="head.prop"
        :label="head.label"
        :width="head.width">
         <template scope="scope">
                <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index,scope.row)">{{scope.row.radio}}</el-radio>
            </template>
      </el-table-column>
       <el-table-column
        v-else-if= "head.img"
        :key="head.prop"
        :type="head.type"
        :prop="head.prop"
        :label="head.label"
        :width="head.width">
          <template scope="scope">
              <img :src="scope.row.imgurl">
          </template>
      </el-table-column>
      <el-table-column
        v-else-if= "head.audio "
        :key="head.prop"
        :type="head.type"
        :prop="head.prop"
        :label="head.label"
        class="audioUrl"
        :width="head.width">
          <template scope="scope">
              <audio controls="controls">
                <source src="../../common/audio/song.mp3" type="audio/ogg">
                <source src="../../common/audio/song.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
              </audio>
          </template>
      </el-table-column>
      <el-table-column
        v-else-if= "head.video "
        :key="head.prop"
        :type="head.type"
        :prop="head.prop"
        :label="head.label"
        class="audioUrl"
        :width="head.width">
          <template scope="scope">
            <video  controls="controls" >
              <source src="../../common/vidio/movie.ogg" type="video/ogg" />
              <!--<source src="/i/movie.mp4" type="video/mp4" />
              <source src="/i/movie.webm" type="video/webm" />
              <object data="/i/movie.mp4" width="320" height="240">
                <embed width="320" height="240" src="/i/movie.swf" />
              </object>-->
            </video>
          </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="head.prop"
        :type="head.type"
        :prop="head.prop"
        :label="head.label"
        :width="head.width">
      </el-table-column>
    </el-table>
</template>
<script>
  export default {
    name:"table",
    data(){
      return {
        radio:''
      }
    },
    props:{
      table:Object
    },
    created(){
        console.log(this.table.tableHead.wordOperate)
    },
    methods:{
      handleSelectionChange(selection){
        console.log("table")
        console.log(selection)
         this.$emit('listenerFromTable',{
           selection
         })
      },
      getCurrentRow(index,row){
          console.log("row")
          console.log(row)
          this.$emit('listenerFromTable',row)
      },
      Detail(data){
        console.log("detel")
        this.$emit('listenerFromTable',data)
      },
      deleteRow(index, rows){
       rows.splice(index, 1);
      }

    }
  }
</script>

<style lang="scss" >

</style>
