<template>
<div class="edit">
    <Dia :dialog="dialog1" v-on:listnerFromDia="fromDia"></Dia>
    <Dia :dialog="dialog2" v-on:listnerFromDia="fromDia"></Dia>
    <Dia :dialog="dialog3" v-on:listnerFromDia="fromDia"></Dia>
    <Dia :dialog="dialog4" v-on:listnerFromDia="fromDia"></Dia>
    <Dia :dialog="dialog5" v-on:listnerFromDia="fromDia"></Dia>
    <Dia :dialog="parentDialog" v-on:listnerFromDia="fromDia"></Dia>
    <detail :detail="detail" v-on:listnerFromDetail="fromDetail"></detail>

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
                  <!--<el-popover
                      placement="right"
                      width="270"
                      trigger="click">
                       <el-form :inline="true"  class="demo-form-inline">
                            <el-form-item label="菜单名称">
                              <el-input v-model="menueEdit"  placeholder="请输入修改的菜单名称"></el-input>
                            </el-form-item>
                             <el-form-item>
                                <el-button size="small"type="primary" @click="xiugaicaidan">完成</el-button>
                                <el-button size="small" >取消</el-button>
                            </el-form-item>
                        </el-form >-->
                      <el-button type="text" size="small" v-show="menuShow" @click.stop="editParent(Parentindex,items)">编辑</el-button>
                    <!--</el-popover>-->
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
          <span class="menu_xq_wz">{{caidantitle}}</span>
          <el-button type="primary" size="small" v-show="build" @click="buildNew">新建菜单</el-button>
        </div>
        <el-form class="caidan" v-model="form.labelPosition"  label-width="80px">
          <el-form-item
                v-for="(data,index) in handle"
                :key="data.label"
                :label="data.label">
            <el-select
               v-model="form.regin"
               v-if="data.select"
               placeholder="无">
              <el-option
                :disabled="disabled"
                v-for="item in data.select"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-radio-group
             :disabled="disabled"
              v-else-if="data.radio"
              v-model="radio"
              @change="openLink">
                  <el-radio class="radio"  :label="1">打开链接</el-radio>
                  <el-radio class="radio"  :label="2">回复消息</el-radio>
            </el-radio-group>
            <el-input v-else-if="data.name" :disabled="disabled" v-model="activeIndex" ></el-input>
            <el-input v-else-if="data.parent" :disabled="disabled" v-model="myParent" ></el-input>
          </el-form-item >
          <el-form-item
              v-show="openLink_url"
              label="链接网址">
             <el-input :disabled="disabled" v-model="form.url" ></el-input>
                <el-button v-show="noEditcaidan" type="text" @click="dialog1.dialogTableVisible=true">选择图文消息地址</el-button>
          </el-form-item>
          <el-form-item
            v-show="hfxx"
            label="回复消息">
            <el-popover
                placement="bottom"
                v-model="popover.popover1"
                trigger="click">
                  <el-button size="small" class="el-icon-plus" @click="dialog2.dialogTableVisible=true">从图文库中选择</el-button>
                  <el-button size="small" slot="reference" >图文</el-button>
              </el-popover>
            <el-popover
                placement="bottom"
                v-model="popover.popover2"
                trigger="click">
                  <el-button size="small" class="el-icon-plus" @click="dialog3.dialogTableVisible=true">从文字库中选择</el-button>
                  <el-button size="small" slot="reference" >文字</el-button>
              </el-popover>
              <el-popover
                placement="bottom"
                v-model="popover.popover3"
                trigger="click">
                  <el-button size="small" class="el-icon-plus" @click="dialog1.dialogTableVisible=true">从图片库中选择</el-button>
                  <el-button size="small" slot="reference" >图片</el-button>
              </el-popover>
            <el-popover
                placement="bottom"
                v-model="popover.popover4"
                trigger="click">
                  <el-button size="small" class="el-icon-plus" @click="dialog4.dialogTableVisible=true">从语音库中选择</el-button>
                  <el-button size="small" slot="reference" >语音</el-button>
              </el-popover>
            <el-popover
                placement="bottom"
                v-model="popover.popover5"
                trigger="click">
                  <el-button size="small" class="el-icon-plus" @click="dialog5.dialogTableVisible=true">从视频库中选择</el-button>
                  <el-button size="small" slot="reference" >视频</el-button>
              </el-popover>
          </el-form-item>
          <car :car="carData" v-show="mycar"></car>
          <el-form-item v-show="menuShow">
              <el-button type="primary" >完成</el-button>
              <el-button >取消</el-button>
          </el-form-item>
        </el-form>
      </div>
   </div>

</div>
</template>

<script>
import Dia from '../public/dialog'
import car from '../public/car'
import detail from '../public/detail'
export default {
  name: 'edit',
  data () {
    return {
      disabled:true,
      noEditcaidan:false,
      caidantitle:"菜单详情",
      menuShow:false,
      myParent:"",
      popover:{
        popover1:false,
        popover2:false,
        popover3:false,
        popover4:false,
        popover5:false
      },
      carData:{
          show:true,
          button:this.menuShow,
          // wenzi:{
          //   content:"欢迎关注家视天下！回复一下【关键词】获取您想要的内容：【菜单】获取功能菜单列表；【红包】领取关注红包；【调研问券】填写用户调研问券；"
          // },
          img:{
            createTime:"2017-9-09",
            imgurl:"http://www.appllen.com/wp-content/uploads/2016/12/174010-1.jpg",
            imgName:"我的标题",
            store:'shfdsfhsjdfhsjdfhsjl'
          },
          // audio:{
          //   audiourl:"http://www.appllen.com/wp-content/uploads/2016/12/174010-1.jpg",
          //   title:"我的音频"
          // },
          // vedio:{
          //   vediourl:"http://www.appllen.com/wp-content/uploads/2016/12/174010-1.jpg",
          //   title:"我的视频"
          // }
      },
      wordDetails:false,
      activeIndex: '遥控器',
      Edit:false,
      radio: 1,
      mycar:true,
      menueEdit:'',
      dialogTableVisible:false,
      openLink_url:false,
      hfxx:false,
      formInline:'',
      tuWenVisible:false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      wordVisible:false,
      wordDialogVisible:false,
      parentDialog:{
        class:"caidan",
        title:"修改父级菜单",
        dialogTableVisible:false,
        label:"修改菜单名称：",
        size:"tiny",
        caidanEdit:true,
        caidan:{}
      },
      dialog5:{
        class:"viedio",
        title:"选择视频",
        dialogTableVisible:false,
        label:"视频名称",
        table:{
            tableHead:[
              {
                  label:"选择",
                  select:true,
                  width:65
              },
              {
                prop:"createTime",
                label:"创建时间"
              },
              {
                prop:"vidioName",
                label:"视频名称"
              },
              {
                prop:"imgurl",
                label:"视频封面",
                img:true
              },
              {
                prop:"vidiourl",
                video:true,
                label:"视频"
              },
              {
                prop:"store",
                label:"存储地址",
                width:300
              }
            ],
            tableData:[
              {
                vidioName:"视频名称",
                createTime:"2018-12-01",
                imgurl:'http://www.appllen.com/wp-content/uploads/2017/03/986108.png',
                vidiourl:"",
                store:'http://www.w3school.com.cn/i/song.mp3',
                type:"vidio"
              },
              {
                vidioName:"视频名称",
                createTime:"2018-12-01",
                imgurl:'http://www.appllen.com/wp-content/uploads/2017/04/1028198.png',
                vidiourl:"",
                store:'http://www.w3school.com.cn/i/song.mp3',
                type:"vidio"
              },
              {
                vidioName:"视频名称",
                createTime:"2018-12-01",
                vidiourl:"",
                imgurl:'http://www.appllen.com/wp-content/uploads/2017/03/986108.png',
                store:'http://www.w3school.com.cn/i/song.mp3',
                type:"vidio"
              },
              {
                 vidioName:"视频名称",
                 vidiourl:"",
                createTime:"2018-12-01",
                imgurl:'http://www.appllen.com/wp-content/uploads/2017/03/986108.png',
                store:'http://www.w3school.com.cn/i/song.mp3',
                type:"vidio"
              }
            ]
        }
      },
      dialog4:{
        class:"audio",
        title:"选择语音",
        dialogTableVisible:false,
        label:"语音名称",
        table:{
            tableHead:[
              {
                  label:"选择",
                  select:true,
                  width:65
              },
              {
                prop:"createTime",
                label:"创建时间"
              },
              {
                prop:"audioName",
                label:"语音名称"
              },
              {
                prop:"audiourl",
                audio:true,
                label:"语音",
              },
              {
                prop:"store",
                label:"存储地址",
                width:300
              }
            ],
            tableData:[
              {
                audioName:"语音名称",
                createTime:"2018-12-01",
                audiourl:'http://www.appllen.com/wp-content/uploads/2017/03/986108.png',
                store:'http://www.w3school.com.cn/i/song.mp3',
                type:"audio"
              },
              {
                audioName:"语音名称",
                createTime:"2018-12-01",
                audiourl:'http://www.appllen.com/wp-content/uploads/2017/04/1028198.png',
                store:'http://www.w3school.com.cn/i/song.mp3',
                type:"audio"
              },
              {
                audioName:"语音名称",
                createTime:"2018-12-01",
                audiourl:'http://www.appllen.com/wp-content/uploads/2017/03/986108.png',
                store:'http://www.w3school.com.cn/i/song.mp3',
                type:"audio"
              },
              {
                 audioName:"语音名称",
                createTime:"2018-12-01",
                audiourl:'http://www.appllen.com/wp-content/uploads/2017/03/986108.png',
                store:'http://www.w3school.com.cn/i/song.mp3',
                type:"audio"
              }
            ]
        }
      },
      dialog1:{
        class:"img",
        title:"选择图片",
        dialogTableVisible:false,
        label:"图片名称",
        table:{
            tableHead:[
              {
                  label:"选择",
                  select:true,
                  width:65
              },
              {
                prop:"createTime",
                label:"创建时间"
              },
              {
                prop:"imgName",
                label:"图片名称"
              },
              {
                prop:"imgurl",
                img:true,
                label:"图片",
              },
              {
                prop:"store",
                label:"存储地址",
                width:300
              }
            ],
            tableData:[
              {
                imgName:"图片名称",
                createTime:"2018-12-01",
                imgurl:'http://www.appllen.com/wp-content/uploads/2017/03/986108.png',
                store:'http://www.appllen.com/wp-content',
                type:"img"
              },
              {
                imgName:"图片名称",
                createTime:"2018-12-01",
                imgurl:'http://www.appllen.com/wp-content/uploads/2017/04/1028198.png',
                store:'http://www.appllen.com/wp-content',
                type:"img"
              },
              {
                 imgName:"图片名称",
                createTime:"2018-12-01",
                imgurl:'http://www.appllen.com/wp-content/uploads/2017/03/986108.png',
                store:'http://www.appllen.com/wp-content',
                 type:"img"
              },
              {
                imgName:"图片名称",
                createTime:"2018-12-01",
                imgurl:'http://www.appllen.com/wp-content/uploads/2017/04/1028198.png',
                store:'http://www.appllen.com/wp-content',
                type:"img"
              }
            ]
        },
        total:"50"
      },
      dialog2:{
        class:"tuwen",
        title:"选择图文",
        dialogTableVisible:false,
        label:"文章标题",
        table:{
          tableHead:[
            {
                lable:"选择",
                select:true,
                width:55
            },
            {
              prop:"createTime",
              label:"创建时间"
            },
            {
              prop:"articalTitle",
              label:"文章标题"
            },
            {
              prop:"originalLink",
              label:"原文链接",
              width:300
            },
            {
              prop:"wordOperate",
              wordOperate:true,
              label:"操作"
            }
          ],
          tableData:[
            {
              createTime:"12-01",
              articalTitle:"wenzhangbiaoti",
              originalLink:"http://www.appllen.com/wp-content/uploads/2017/01/444294.jpg",
              tuWenOperate:"详情",
               type:"tuwen"
            },
            {
              createTime:"12-0222",
              articalTitle:"wenzhangbiaoti",
              originalLink:"http://www.appllen.com/wp-content/uploads/2017/01/444294.jpg",
              tuWenOperate:"详情",
               type:"tuwen"
            },
            {
              createTime:"12-01",
              articalTitle:"wenzhangbiaoti",
              originalLink:"http://www.appllen.com/wp-content/uploads/2017/01/444294.jpg",
              tuWenOperate:"详情",
               type:"tuwen"
            },
            {
              createTime:"12-01",
              articalTitle:"wenzhangbiaoti",
              originalLink:"http://www.appllen.com/wp-content/uploads/2017/01/444294.jpg",
              tuWenOperate:"详情",
               type:"tuwen"
            },
            {
              createTime:"12-01",
              articalTitle:"wenzhangbiaoti",
              originalLink:"http://www.appllen.com/wp-content/uploads/2017/01/444294.jpg",
              tuWenOperate:"详情",
               type:"tuwen"
            },
          ]
        }
      },
      dialog3:{
        class:"wenzi",
        title:"选择文字",
        dialogTableVisible:false,
        label:"文章标题",
        table:{
          tableHead:[
            {
                type:"selection",
                width:55
            },
            {
              prop:"createTime",
              label:"创建时间"
            },
            {
              prop:"articalTitle",
              label:"文章标题"
            },
            {
              prop:"originalLink",
              label:"原文链接"
            },
            {
              prop:"wordOperate",
              wordOperate:true,
              label:"操作"
            }
          ],
          tableData:[
            {
              createTime:"12-01",
              articalTitle:"wenzhangbiaoti",
              originalLink:"www.xxxx.com/xxx=12312",
              tuWenOperate:"详情",
              type:"wenzi"
            },
            {
              createTime:"12-0222",
              articalTitle:"wenzhangbiaoti",
              originalLink:"www.xxxx.com/xxx545454545=12312",
              tuWenOperate:"详情",
               type:"wenzi"
            },
            {
              createTime:"12-01",
              articalTitle:"wenzhangbiaoti",
              originalLink:"www.xxxx.com/xxx=rd12345454454512",
              tuWenOperate:"详情",
               type:"wenzi"
            },
            {
              createTime:"12-01",
              articalTitle:"wenzhangbiaoti",
              originalLink:"www.xxxx.com/xxx=12sadsad312",
              tuWenOperate:"详情",
               type:"wenzi"
            },
            {
              createTime:"12-01",
              articalTitle:"wenzhangbiaoti",
              originalLink:"www.xxxx.com/xxx=123sdsadds12",
              tuWenOperate:"详情",
               type:"wenzi"
            },
          ]
        }
      },
      detail:{
        title:"提示",
        wordDialogVisible:false,
        // from:[
        //   {
        //     label:"标识名称",
        //     model:"title"
        //   },
        //   {
        //     label:"正文",
        //     model:"content"
        //   }
        // ]


      },

      // table:{
      //   tableHead:[
      //     {
      //         type:"selection",
      //         width:55
      //     },
      //     {
      //       prop:"title",
      //       label:"标题"
      //     },
      //     {
      //       prop:"time",
      //       label:"上传时间"
      //     }

      //   ],
      //   tableData:[
      //     {
      //       title:"标题一",
      //       time:"2018-12-01"
      //     },
      //     {
      //       title:"标题一",
      //       time:"2018-12-01"
      //     },
      //     {
      //       title:"标题一",
      //       time:"2018-12-01"
      //     }, {
      //       title:"标题一",
      //       time:"2018-12-01"
      //     }
      //   ]
      // },
      // tableData:[
      //   {
      //     title:"标题一",
      //     time:"2018-12-01"
      //   },
      //    {
      //     title:"标题一",
      //     time:"2018-12-01"
      //   },
      //    {
      //     title:"标题一",
      //     time:"2018-12-01"
      //   }, {
      //     title:"标题一",
      //     time:"2018-12-01"
      //   }
      // ],
      wordData:[
        {
          createTime:"12-031",
          articalTitle:"wenzhangbiaoti",
          originalLink:"www.xxxx.com/xxx=12312",
          wordOperate:["详情","删除"]
      },{
          createTime:"12-01",
          articalTitle:"wenzhangbiaoti",
          originalLink:"www.xxxx.com/xxx=12312",
          tuWenOperate:["详情","删除"]
      },{
          createTime:"12-01",
          articalTitle:"wenzhangbiaoti",
          originalLink:"www.xxxx.com/fsdfdsxx=12312",
          tuWenOperate:["详情","删除"]
      },{
          createTime:"12-01",
          articalTitle:"wenzhangbiaoti",
          originalLink:"www.xxxx.com/xxx=12312",
          tuWenOperate:["详情","删除"]
      },{
          createTime:"12-01",
          articalTitle:"wenzhangbiaoti",
          originalLink:"www.xxxx.com/xxx=12312",
          tuWenOperate:["详情","删除"]
      },{
          createTime:"12-01",
          articalTitle:"wenzhangbiaoti",
          originalLink:"www.xxxx.com/xxx=12312",
          tuWenOperate:["详情","删除"]
      },{
          createTime:"12-01",
          articalTitle:"wenzhangbiaoti",
          originalLink:"www.xxxx.com/xxx=12312",
          tuWenOperate:["详情","删除"]
      }],
      // tuWenData:[
      //   {
      //     createTime:"12-01",
      //     articalTitle:"wenzhangbiaoti",
      //     originalLink:"www.xxxx.com/xxx=12312",
      //     tuWenOperate:"详情"
      //   },
      //   {
      //     createTime:"12-0222",
      //     articalTitle:"wenzhangbiaoti",
      //     originalLink:"www.xxxx.com/xxx545454545=12312",
      //     tuWenOperate:"详情"
      //   },
      //   {
      //     createTime:"12-01",
      //     articalTitle:"wenzhangbiaoti",
      //     originalLink:"www.xxxx.com/xxx=rd12345454454512",
      //     tuWenOperate:"详情"
      //   },
      //   {
      //     createTime:"12-01",
      //     articalTitle:"wenzhangbiaoti",
      //     originalLink:"www.xxxx.com/xxx=12sadsad312",
      //     tuWenOperate:"详情"
      //   },
      //   {
      //     createTime:"12-01",
      //     articalTitle:"wenzhangbiaoti",
      //     originalLink:"www.xxxx.com/xxx=123sdsadds12",
      //     tuWenOperate:"详情"
      //   },
      // ],
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
      handle1:[
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
      handle2:[
        {
          label:"上级菜单",
          parent:true
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
      title:"",
      content:"",
      form:{
        labelPosition:'right',
        resource:'打开链接',
        regin:'精华',
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
   Dia,
   detail,
   car
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose(){

    },
    fromDetail(data){
          console.log("fromDetail")
          console.log(fromDetail)
    },
    //监听Dia组件传过来的数据
    fromDia(data){

        console.log("from child")

        if(data.type == "tuwen"){
          delete this.carData.img
          delete this.carData.wenzi
          delete this.carData.audio
          delete this.carData.vedio
          this.carData.tuwen = data
          this.carData = Object.assign({}, this.carData)
        }
        if(data.type == "img"){
          delete this.carData.tuwen
          delete this.carData.wenzi
          delete this.carData.audio
          delete this.carData.vedio

          this.carData.img = data
         this.carData = Object.assign({}, this.carData)
        }
        if(data.type == "audio"){
           delete this.carData.tuwen
          delete this.carData.img
          delete this.carData.vedio
          delete this.carData.wenzi
          this.carData.audio = data
          this.carData = Object.assign({},  this.carData)
        }
        if(data.type == "vedio"){
          delete this.carData.tuwen
          delete this.carData.img
          delete this.carData.audio
          delete this.carData.wenzi
          this.carData.vedio = data
          this.carData = Object.assign({},  this.carData)
        }
        if(data.type == "wenzi"){
          delete this.carData.tuwen
          delete this.carData.img
          delete this.carData.audio
          delete this.carData.vedio
          this.carData.wenzi = data
          this.carData = Object.assign({},  this.carData)

        }
        console.log(this.carData)
        this.dialog1.dialogTableVisible = data.dialogTableVisible


    },
    editParent(index,data){
      this.parentDialog.caidan = data
      this.parentDialog.dialogTableVisible = true
      console.log(index)
      console.log(data)
    },
    handleSelect(index,indexPath){
        console.log("skfjsdkjfdskjgfsdkgjskl;hgksg")
        console.log(this.activeIndex)
        this.activeIndex =  index
        this.form.regin = indexPath[0]

    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
        this.handle = this.handle1
        this.activeIndex = "遥控器"
        this.radio = 1
         this.form.url = "www.baidu.com"
         this.noEditcaidan = false
         this.mycar = true
        this.menuShow = false
        this.Edit = false

        this.build = false
        this.disabled = true
        this.caidantitle = "菜单详情"
        this.carData.button = false
        this.bianJi = "编辑"
    },
    wordDetail(){
      this.wordVisible=false
      this.wordDetails=true
      this.wordDialogVisible=true
    },
    Detail(data){
      console.log(data)
      this.wordVisible=false
      this.wordDetails=true
      this.wordDialogVisible=true
      this.title = data.row.articalTitle
      this.content = data.row.originalLink
     },
    xiugaicaidan(){
        console.log("修改菜单")
    },
    onSubmit(){
      console.log(this.formInline)
    },
    buildNew(){
      console.log("build")

        this.handle = this.handle2


        this.radio = ''
        this.form.url = ""
        this.activeIndex = ""
        this.hfxx = false
        this.noEditcaidan = true
        this.openLink_url = false
        this.mycar = false

    },
    editMenu(){
        this.menuShow = true
        this.Edit = true
        this.carData.button = true
        this.build = true
        this.disabled = false
        this.caidantitle = "菜单编辑"
        this.bianJi = "发布"
    },
    save(){
      this.dialogTableVisible = false
    },
    cancel(){
      this.dialogTableVisible = false
    },
    openLink(value){
      console.log("value")
      console.log(value)
      if(value == '1'){

           this.openLink_url = true
           this.hfxx= false
      }else if(value == '2'){
        this.openLink_url = false
         this.hfxx= true
      }


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.el-popover{
  text-align: center;
}
.edit{
  .tuwen,.img,.audio,.viedio,.caidan{
    .el-dialog{
       text-align: left;
    }
    .el-dialog__body{
          text-align: left;
    }
    .pagination{
          margin: 17px 0 0 -6px;
           text-align: right;
    }
    .el-dialog__footer {
        text-align: center;
    }
    .el-radio__label{
        padding-left: 1px;
    }
  }
  .audio{
    .audioUrl{
      text-align:center;

    }
  }
  .img,.viedio{
    img{
      width:60px;
      height:60px;
    }
    video{
      width:100px;
      height:100px;
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
            font-size: 17px;
            margin: 0 53px;
            font-weight: bold;
        }
      }
      .caidan{
        width:70%;
        margin: 30px 42px;
        .el-form-item{
          height:40px;
          .el-button--small{
            float: left;
            padding: 9px 15px;
            margin-right: 20px;
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
