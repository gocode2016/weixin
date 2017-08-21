<template>
<div class="edit">
    <el-dialog class="tuwen"title="选择图文消息" :visible.sync="dialogTableVisible">
        <el-form :inline="true">
          <el-form-item label="名称">
            <el-input v-model="formInline"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="time"
            label="上传时间">
          </el-table-column>
        </el-table>
        <el-pagination class="pagination"
        layout="prev, pager, next"
        :total="50">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button  @click="cancel">取消</el-button>
        </span>
    </el-dialog>
    <el-popover
      ref="popover1"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus">从图文库中选择</el-button>
        <el-button size="small" class="el-icon-plus">新建图文</el-button>
    </el-popover>
    <el-popover
      ref="popover2"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus">从文字库中选择</el-button>
        <el-button size="small" class="el-icon-plus">新建文字</el-button>
    </el-popover>
    <el-popover
      ref="popover3"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus">从语音库中选择</el-button>
        <el-button size="small" class="el-icon-plus">上传语音</el-button>
    </el-popover>
    <el-popover
      ref="popover4"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus">从视频库中选择</el-button>
        <el-button size="small" class="el-icon-plus">上传视频</el-button>
    </el-popover>
    <el-popover
      ref="popover5"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus">从图文库中选择</el-button>
        <el-button size="small" class="el-icon-plus">新建图文</el-button>
    </el-popover>
   <div class="edit_left">
           <el-button type="primary" size="small" @click="editMenu">{{bianJi}}</el-button>
           <el-button type="primary" v-show="Edit" size="small" @click="noEdit">取消</el-button>
          <el-menu
              @select="handleSelect"
             :default-active="activeIndex"
             :default-openeds="openeds"
              class="el-menu-vertical-demo">
            <el-submenu
              v-for="(items,Parentindex) in menu"
              :key="items.key"
              :index="items.index">
              <template slot="title"><i class="el-icon-star-on"></i>{{items.name}}
                    <el-button type="text" size="small" v-show="menuShow" @click.stop="deleteEvent(Parentindex,'parent',null,items,menu)">删除</el-button>
                    <template v-if="Parentindex == 0 && Parentindex !==  Object.keys(menu).length - 1">
                        <el-button type="text" size="small" v-show="menuShow" @click.stop="buttonEvent(Parentindex,'parent',null, items, menu)">下移</el-button>
                    </template>
                    <template v-else-if="Parentindex !== 0 && Parentindex ==  Object.keys(menu).length - 1">
                        <el-button type="text" size="small" v-show="menuShow" @click.stop="topEvent(Parentindex,'parent',null, items ,menu)">上移</el-button>
                    </template>
                    <template v-else-if="Parentindex !== 0 && Parentindex !==  Object.keys(menu).length - 1">
                        <el-button type="text" size="small" v-show="menuShow" @click.stop="buttonEvent(Parentindex,'parent',null, items ,menu)">下移</el-button>
                        <el-button type="text" size="small" v-show="menuShow" @click.stop="topEvent(Parentindex,'parent',null, items ,menu)">上移</el-button>
                    </template>
              </template>
                <template v-if="items.children">
                   <el-menu-item
                       v-for="(children,index) in items.children"
                       :key="children.key"
                       :index="children.index">{{children.name}}
                        <el-button type="text" size="small" v-show="menuShow" @click.stop="deleteEvent(index,'child',Parentindex,items,items)">删除</el-button>
                        <template v-if="index == 0 && index !== items.children.length - 1">
                            <el-button type="text" size="small" v-show="menuShow "@click.stop="buttonEvent(index,'child',Parentindex,children, items)">下移</el-button>
                        </template>
                        <template v-else-if="index !== 0 && index == items.children.length - 1">
                            <el-button type="text" size="small" v-show="menuShow"  @click.stop="topEvent(index,'child',Parentindex, items ,items)">上移</el-button>
                        </template>
                        <template v-else-if="index !== 0 && index !== items.children.length - 1 ">
                            <el-button type="text" size="small" v-show="menuShow" @click.stop="buttonEvent(index,'child',Parentindex,children, items)">下移</el-button>
                            <el-button type="text" size="small" v-show="menuShow" @click.stop="topEvent(index,'child',Parentindex, items ,items)">上移</el-button>
                        </template>
                    </el-menu-item>
                </template>
            </el-submenu>
        </el-menu>
   </div>
   <div class="edit_right">
      <div class="con">
        <div class="menu_xq">
          <span class="menu_xq_wz">菜单详情</span>
          <el-button type="primary" size="small" v-show="build">新建</el-button>
        </div>
        <el-form  v-model="form.labelPosition"  label-width="80px">
          <el-form-item
                v-for="(data,index) in handle"
                :key="data.label"
                :label="data.label">
            <el-select
               v-model="form.regin"
               v-if="data.select"
               placeholder="无">
              <el-option
                v-for="item in data.select"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-radio-group
              v-else-if="data.radio"
              v-model="form.resource"
              @change="openLink">
                  <el-radio class="radio" v-model="radio" label="1">打开链接</el-radio>
                  <el-radio class="radio" v-model="radio" label="2">回复消息</el-radio>
              </el-radio-group>
            <el-input v-else-if="data.name"  v-model="activeIndex" ></el-input>
          </el-form-item >
          <el-form-item
              v-show="openLink_url"
              label="链接网址">
             <el-input  v-model="form.url" ></el-input>
                <el-button  type="text" @click="dialogTableVisible=true">选择图文消息地址</el-button>
          </el-form-item>
          <el-form-item
            v-show="hfxx"
            label="回复消息">
            <el-button size="small" v-popover:popover1>图文</el-button>
            <el-button size="small" v-popover:popover2>文字</el-button>
            <el-button size="small" v-popover:popover3>语音</el-button>
            <el-button size="small" v-popover:popover4>音频</el-button>
            <el-button size="small" v-popover:popover5>视频</el-button>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" >完成</el-button>
              <el-button >取消</el-button>
          </el-form-item>
        </el-form>
      </div>
   </div>

</div>
</template>

<script>
export default {
  name: 'edit',
  data () {
    return {
      menuShow:false,
      activeIndex: '遥控器',
      Edit:false,
      radio: '',
      dialogTableVisible:false,
      openLink_url:false,
      hfxx:false,
      formInline:'',
      tableData:[
        {
          title:"标题一",
          time:"2018-12-01"
        },
         {
          title:"标题一",
          time:"2018-12-01"
        },
         {
          title:"标题一",
          time:"2018-12-01"
        }, {
          title:"标题一",
          time:"2018-12-01"
        }
      ],
      openeds:["精华","服务","个人中心"],
      handle:[
        {
          label:"上级菜单",
          modle:"",
          select:[
           {
             label:"精华",
             value:"dff"
           },
           {
             label:"服务",
             value:"erere"
           },
           {
             label:"个人中心",
             value:"sfsd"}

          ]
        },
        {
          name:true,
          label:"名称"
        },
        {
          label:"交互类型",
          radio:[
            {
              label:"打开链接",
            },
            {
              label:"回复消息"
            }
          ]
        }
        // {
        //   url:true,
        //   label:"链接网址"
        // }
      ],
      build:false,
      bianJi:'编辑',
      form:{
        labelPosition:'right',
        resource:'打开链接',
        regin:'',
        name:'',
        url:'www.baidu.com',
      },
      menu:[
        {
          name:"精华",
          index:"精华",
          key:"1",
          children:[
                {
                    name:"遥控器",
                    index:"遥控器",
                    key:"1-2"
                },
                {
                    name:"推片",
                    index:"推片",
                    key:"1-3"
                },
                {
                  name:"遥控器app",
                  index:"遥控器app",
                  key:"1-4"
                },
                {
                  name:"快速玩转盒子",
                  index:"快速玩转盒子",
                  key:"1-5"
                }
          ]
        },
        {
          name:"服务",
          index:"服务",
          key:"2",
          children:[
              {
                  name:"开通会员",
                  index:"开通会员",
                  key:"2-2"
              },
              {
                name:"充值麦币",
                index:"充值麦币",
                key:"2-3"
              }
          ]
        },
        {
          name:"个人中心",
          index:"个人中心",
          key:"3",
          children:[
              {
                  name:"每日签到",
                  index:"每日签到",
                  key:"3-1"
              },
              {
                name:"我的红包",
                index:"我的红包",
                key:"3-2"
              }
          ]
        }
      ]
    }
  },
  components:{
  },
  created(){

  },
  methods:{
    /**
    * [menue 导航模块移动]
    * @param {[number]} index [当前下移模块的index]
    * @param {[string]} type [判断是父级移动还是字迹移动 'parent':表示父级移动，'child'：表示子集移动 ]
    * @param {[number]} parentIndex [当前下移模块的父级模块的index]
    * @param {[number]} firs11t [当前下移模块的index]
    * @param {[string]} data [判断是父级移动还是字迹移动 'parent':表示父级移动，'child'：表示子集移动 ]
    */
    menue(index,type,Parentindex,first,data){
      if(type === 'parent'){
          let temp = this.menu[index]
          this.menu[index] =  this.menu[index + 1]
          this.menu[index + 1] = temp

          this.menu = Object.assign({}, this.menu);
          Object.keys(this.menu)
          console.log(  Object.keys(this.menu).length)
      }
      if(type === 'child'){
         let temp =  data.children[index]
         data.children[index] = data.children[index + 1]
         data.children[index + 1] = temp
         this.menu[Parentindex] = data
         this.menu = Object.assign({}, this.menu)
        Object.keys(this.menu[Parentindex].children)
      }
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(){

    },
    handleSelect(index,indexPath){
        this.form.name =  index
        this.form.regin = indexPath[0]

    },
    shuliqi(){
      console.log("ksfjsdkf")
    },
    deleteEvent(Index,type,ParentIndex,now,data){
       let index = parseInt(Index)
       let Parentindex = parseInt(ParentIndex)
      if(type === 'child' ){
         data.children.splice(index,1)
      }
      if(type === 'parent'){
        if(data[index].children.length !== 0){
          this.$message({
            message: '请先删除子集',
            type: 'warning'
          });
        }else{
          console.log(data)
          data.splice(index,1)
        }
     }
    },
    topEvent(Index,type,ParentIndex,first,data){
      let index = parseInt(Index) -1
      let Parentindex = parseInt(ParentIndex)
      this.menue(index,type,Parentindex,first,data)
    },
    buttonEvent(Index,type,ParentIndex,first,data){
      let index = parseInt(Index)
      let Parentindex = parseInt(ParentIndex)
      this.menue(index,type,Parentindex,first,data)
    },
    noEdit(){
        this.menuShow = false
        this.Edit = false
       this.build = false
    },
    onSubmit(){
      console.log(this.formInline)
    },
    editMenu(){
        this.menuShow = true
        this.Edit = true
        this.build = true
        this.bianJi = "发布"
    },
    save(){
      console.log("skdjs")
      this.dialogTableVisible = false
    },
    cancel(){
      this.dialogTableVisible = false
    },
    openLink(value){
      console.log(value)
      if(value == '1'){
           this.openLink_url = true
           this.hfxx= false
      }else{
        this.openLink_url = false
         this.hfxx= true
      }


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
// .el-message{
//   left:10%;
// }
.edit{
  .tuwen{
    .el-dialog__body{
          text-align: left;
    }
    .pagination{
          margin: 17px 0 0 -6px;
           text-align: center;
    }
    .el-dialog__footer{
      text-align: center;
    }
  }
  width:100%;
  // height:50px;
  // background:#ccc;
  .edit_left{
    float:left;
    width:25%;
    text-align: left;
    // height:100px;
    background:#eef1f6;
    .el-button{
      margin:20px;
    }
    .el-menu-vertical-demo{
        .el-submenu{
            // border-bottom: 1px solid #000;
            border-top: 1px solid #ccc;
        }
        .el-submenu__title {
          position: relative;
          font-weight: bold;

       }
      .el-button{
          float:right;
          margin: 5px;
          margin-top: 13px;
      }
      .el-submenu {
        .el-menu-item{
            padding: 0 21px 0 0;
        }
        .el-submenu__icon-arrow{
            top: 43%;
            right: 6px;
        }
      }
    }
  }
  .edit_right{
    width:100%;
    // background:seagreen;
    // height:400px;
    .con{
      width:75%;
      margin-left:25%;
      // height:600px;
      // background:red;
      .menu_xq{
        width: 100%;
        height: 68px;
        // background: pink;
        border-bottom: 1px solid #ccc;
        line-height: 68px;
        text-align: left;
        .menu_xq_wz{
          margin:0 10px;
        }
      }
      .el-form{
        width:70%;
        margin: 30px 42px;
        .el-form-item{
          height:40px;
          .el-button--small{
            float: left;
            padding: 9px 30px;
          }
          .el-button--text{
            float:left;
          }
          .el-select{
            width:100%;
          }
          .el-radio-group{
            float:left;
            margin-top: 7px;
          }
        }

      }
    }
  }
}
</style>
