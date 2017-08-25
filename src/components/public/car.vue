<template>
 <el-card class="car":body-style="{ padding: '0px' }" v-show="car.show">
  <div class="content">
        <div v-if="car.wenzi"class="wenzi">
              {{car.wenzi.articalTitle}}
        </div>
        <div v-else-if="car.audio" class="audio">
            <audio controls="controls">
              <source src="../../common/audio/song.mp3" type="audio/ogg">
              <source src="../../common/audio/song.mp3" type="audio/mpeg">
                  Your browser does not support the audio element.
            </audio>
            <h2 class="title">{{car.audio.title}}</h2>
        </div>
        <div v-else-if="car.vedio"class="vedio">
              <video  controls="controls" >
                  <source src="../../common/vidio/movie.ogg" type="video/ogg" />
                  <!--<source src="/i/movie.mp4" type="video/mp4" />
                  <source src="/i/movie.webm" type="video/webm" />
                  <object data="/i/movie.mp4" width="320" height="240">
                    <embed width="320" height="240" src="/i/movie.swf" />
                  </object>-->
              </video>

            <h2 class="title">{{car.vedio.title}}</h2>
        </div>
        <div v-else-if="car.img">
              <img :src="car.img.imgurl">
              <h2 class="title">{{car.img.imgName}}</h2>
        </div>
         <div v-else-if="car.tuwen">
              <img :src="car.tuwen.originalLink">
              <h2 class="title">{{car.tuwen.articalTitle}}</h2>
        </div>
  </div>
  <div >

    <div class="bottom clearfix" v-show="car.button">
      <el-form-item>
      <el-button type="text" class="button1" @click="xiugai">修改</el-button>
      <el-button type="text" class="button2" @click="shanchu">删除</el-button>
    </el-form-item>
    </div>
  </div>
</el-card>
</template>

<script>

export default {
  name: 'car',
  data(){
    return {

    }
  },
  props:{
    car:Object
  },
  methods:{
    xiugai(){
        console.log("修改")
    },
    shanchu(){
      console.log("删除")
    }
  }
}
</script>

<style lang="scss" >
    .car{
      width:330px;
      overflow:hidden;
      margin: 20px auto;
      // .title{
      //     margin-top:-22px;

      // }
      .content{
        width:300px;
        margin:0 auto;
        .title{
          margin:10px;
        }
        img{
          width: 300px;
          height: 200px;
          display: block;
          margin: 15px auto;
        }
        .wenzi{
          heoght:100px;
        }
        .audio,.vedio{
          margin-top:20px;

          audio{
              margin-bottom: 20px;
          }
          video{
            width:300px;
            margin:0 auto;
          }
        }
      }
      .bottom{
        margin:0 10px;
        .el-button{

        }

        .button1 {
          float:left;
          margin-left: -80px;
        }
        .button2 {
          float:right !important;
        }
      }


    }
</style>
