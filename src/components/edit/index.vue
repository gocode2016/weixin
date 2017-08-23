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
            width="55">
              <template scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index)"></el-radio>
              </template>
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



    <el-dialog title="选择图文"
         class="mytuwen"
        :visible.sync="tuWenVisible">
        <el-form :inline="true">
          <el-form-item label="文章标题 :">
            <el-input v-model="formInline"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tuWenData"
          style="width: 100%">
          <el-table-column
            label="选择"
            width="70">
              <template scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index)">{{scope.row.radio}}</el-radio>
              </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="articalTitle"
            label="文章标题">
          </el-table-column>
          <el-table-column
            prop="originalLink"
            label="原文链接">
          </el-table-column>
          <el-table-column
            prop="tuWenOperate"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index,tuWenData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="30">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="tuWenSelect">保存</el-button>
            <el-button  @click="tuWenVisible=false">取消</el-button>
        </span>
    </el-dialog>

    <el-dialog title="选择文字"
        :visible.sync="wordVisible"
        size="large">
        <el-form :inline="true">
          <el-form-item label="文章标题 :">
            <el-input v-model="formInline"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="wordData"
          style="width: 100%">
          <el-table-column
            label="选择"
            width="70">
              <template scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index)">{{scope.row.radio}}</el-radio>
              </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="articalTitle"
            label="标示名称">
          </el-table-column>
          <el-table-column
            prop="text"
            label="正文">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <i class="el-icon-plus"></i><el-button @click="Detail(scope)" type="text" size="small">修改</el-button>
              <i class="el-icon-delete"></i>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, wordData)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="30">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button  @click="cancel">取消</el-button>
        </span>
    </el-dialog>

 <el-dialog title="选择图片"  class="selectImg"
        :visible.sync="imageVisible"
        size="large">
        <el-form :inline="true">
          <el-form-item label="图片名称 :">
            <el-input v-model="formInline"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="imageData"
          style="width: 100%">
         <el-table-column
            label="选择"
            width="70">
              <template scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index)">{{scope.row.radio}}</el-radio>
              </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="imageTitle"
            label="图片名称">
          </el-table-column>
          <el-table-column
            prop="image"
            label="图片">
            <template scope="scope">
              <img :src="scope.row.storageAddress">
            </template>
          </el-table-column>
          <el-table-column
            prop="storageAddress"
            label="存储地址">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <i class="el-icon-plus"></i><el-button @click="Detail(scope)" type="text" size="small">重命名</el-button>
              <i class="el-icon-delete"></i>
              <el-button
                @click="confirmDelete=true"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="30">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="tuWenVisible=false">保存</el-button>
            <el-button  @click="tuWenVisible=false">取消</el-button>
        </span>
</el-dialog>


 <el-dialog title="选择语音"  class="selectAudio"
        :visible.sync="audioVisible"
        size="large">
        <el-form :inline="true">
          <el-form-item label="图片名称 :">
            <el-input v-model="formInline"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="audioData"
          style="width: 100%">
          <el-table-column
            label="选择"
            width="70">
              <template scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index)">{{scope.row.radio}}</el-radio>
              </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="name"
            label="语音名称">
          </el-table-column>
          <el-table-column
            prop="address"
            label="存储地址">
            <template scope="scope">
              <audio :src="scope.row.address" controls="controls"></audio>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <i class="el-icon-plus"></i><el-button @click="Detail(scope)" type="text" size="small">重命名</el-button>
              <i class="el-icon-delete"></i>
              <el-button
                @click="confirmDelete=true"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="30">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="tuWenVisible=false">保存</el-button>
            <el-button  @click="tuWenVisible=false">取消</el-button>
        </span>
</el-dialog>



     <el-dialog
            :visible.sync="videoVisible"
            size="large">
            <el-form :inline="true">
              <el-form-item label="视频名称 :">
                <el-input v-model="formInline"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="videoData"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="videoName"
                label="图片名称">
              </el-table-column>
              <el-table-column
                prop="videoCover"
                label="封面">
              </el-table-column>
              <el-table-column
                prop="videoDescription"
                label="描述">
              </el-table-column>
              <el-table-column
                prop="videoAddress"
                label="视频地址">
              </el-table-column>
              <el-table-column
                label="操作">
                <template scope="scope">
                  <i class="el-icon-plus"></i><el-button @click="Detail(scope)" type="text" size="small">详情</el-button>
                  <i class="el-icon-delete"></i>
                  <el-button
                    @click="confirmDelete=true"
                    type="text"
                    size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="30">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tuWenVisible=false">保存</el-button>
                <el-button  @click="tuWenVisible=false">取消</el-button>
            </span>
    </el-dialog>

    <el-dialog
      title="确认删除？"
      size="tiny"
      :visible.sync="confirmDelete"
    >
      <h3>是否确认删除？</h3>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDelete = false" type="text">取 消</el-button>
        <el-button
          scope="scope"
          @click.native.prevent="deleteRow(scope.$index, imageData)"
          type="primary"
          size="small">
          确定
        </el-button>
      </span>
    </el-dialog>

    <el-popover
      ref="popover1"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="tiny" class="el-icon-plus" @click="tuWenVisible=true">从图文库中选择</el-button>
    </el-popover>
    <el-popover
      ref="popover2"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus" @click="wordVisible=true">从文字库中选择</el-button>
        <el-button size="small" class="el-icon-plus" @click="wordDetail">新建文字</el-button>
    </el-popover>
    <el-popover
      ref="popover3"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus" @click="imageVisible=true">从图片库中选择</el-button>
    </el-popover>
    <el-popover
      ref="popover4"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus" @click="audioVisible=true">从语音库中选择</el-button>
    </el-popover>
    <el-popover
      ref="popover5"
      placement="bottom"
      width="210"
      trigger="click">
        <el-button size="small" class="el-icon-plus" @click="videoVisible=true">从视频库中选择</el-button>
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
              <template  slot="title"><i class="el-icon-menu"></i>{{items.name}}
                    <el-popover
                      placement="right"
                      width="270"
                      v-model="items.visible"
                      trigger="click">
                       <el-form :inline="true"  class="demo-form-inline">
                            <el-form-item label="菜单名称">
                              <el-input v-model="caidanbianji1"  placeholder="请输入修改的菜单名称"></el-input>
                            </el-form-item>
                             <el-form-item>
                                <el-button size="small" type="primary" @click="xiugaicaidan(items,Parentindex)">完成</el-button>
                                <el-button size="small" @click="xiugaicaidan(items,Parentindex)">取消</el-button>
                            </el-form-item>
                        </el-form >
                        <el-button type="text" size="small" v-show="menuShow" slot="reference">编辑</el-button>
                    </el-popover>
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
            <el-button size="small" v-popover:popover3>图片</el-button>
            <el-button size="small" v-popover:popover4>语音</el-button>
            <el-button size="small" v-popover:popover5>视频</el-button>
          </el-form-item>


          <el-dialog
            title="提示"
            :visible.sync="wordDialogVisible"
            size="large">
              <el-form label-position="top" v-show="wordDetails" >
                  <el-form-item label="标识名称">
                      <el-input v-model="title"></el-input>
                  </el-form-item>
                  <el-form-item label="正文">
                      <el-input v-model="content"></el-input>
                  </el-form-item>
              </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="wordDialogVisible = false">保存</el-button>
              <el-button @click="wordDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
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
      wordDetails:false,
      menuShow:false,
      activeIndex: '遥控器',
      Edit:false,
      caidanbianji1:'',
      caidanbianji2:'',
      caidanbianji3:'',
      radio: '',
      popover:false,
      tuWenChosen:'',
      dialogTableVisible:false,
      openLink_url:false,
      hfxx:false,
      formInline:'',
      tuWenVisible:false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      audioVisible:false,
      imageVisible:false,
      wordVisible:false,
      wordDialogVisible:false,
      confirmDelete:false,
      videoVisible:false,
      tuWenThumbnail:false,
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
      audioData:[
        {
          date:"2012-11-02",
          name:"sadasdasasd",
          address:"http://demo.mimvp.com/html5/take_you_fly.ogg"
        },{
          date:"2012-11-02",
          name:"sadasdasasd",
          address:"http://demo.mimvp.com/html5/take_you_fly.ogg"
        },{
          date:"2012-11-02",
          name:"sadasdasasd",
          address:"http://demo.mimvp.com/html5/take_you_fly.ogg"
        },{
          date:"2012-11-02",
          name:"sadasdasasd",
          address:"http://demo.mimvp.com/html5/take_you_fly.ogg"
        },{
          date:"2012-11-02",
          name:"sadasdasasd",
          address:"http://demo.mimvp.com/html5/take_you_fly.ogg"
        }
      ],
      wordData:[
        {
          createTime:"12-031",
          articalTitle:"wenzhangbiaoti",
          text:"我们自定义了一些对象，这些对象有一些包含了不可枚举的属性,另外注意使用 Object.defineProperty 初始化的对象默认是不可枚举的属性。对于可枚举的对象我们可以直接使用Object.keys()获得,或者使用for-in循环遍历出来."
      },{
          createTime:"12-031",
          articalTitle:"wenzhangbiaoti",
          text:"对于不可枚举的属性，使用Object.assign的时候将被自动忽略。"
      },{
          createTime:"12-031",
          articalTitle:"wenzhangbiaoti",
          text:"对于只读的属性，当分配新的对象覆盖他的时候，将抛出异常:"
      },{
          createTime:"12-031",
          articalTitle:"wenzhangbiaoti",
          text:"这里我们简单的看下如何实现es5版本的Object.assign："
      },{
          createTime:"12-031",
          articalTitle:"wenzhangbiaoti",
          text:"判断是否原生支持该函数，如果不存在的话创建一个立即执行函数，该函数将创建一个assign函数绑定到Object上"
      },{
          createTime:"12-031",
          articalTitle:"wenzhangbiaoti",
          text:"欢迎关注家视天下！回复一下【关键词】获取您想要的内容：【菜单】获取功能菜单列表；【红包】领取关注红包；【调研问券】填写用户调研问券"
      }],
      tuWenData:[
        {
          createTime:"12-01",
          articalTitle:"shdjks577777",
          originalLink:"www.xxxx.com/xxx=12312",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-0222",
          articalTitle:"87d897sad",
          originalLink:"www.xxxx.com/xxx545454545=12312",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-01",
          articalTitle:"989gjgh89asd8",
          originalLink:"www.xxxx.com/xxx=rd12345454454512",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-01",
          articalTitle:"wenzhangbiaoti",
          originalLink:"www.xxxx.com/xxx=12sadsad312",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-01",
          articalTitle:"54sasadas",
          originalLink:"www.xxxx.com/xxx=123sdsadds12",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-01",
          articalTitle:"54sasadas",
          originalLink:"www.xxxx.com/xxx=123sdsadds12",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-01",
          articalTitle:"54sasadas",
          originalLink:"www.xxxx.com/xxx=123sdsadds12",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-01",
          articalTitle:"54sasadas",
          originalLink:"www.xxxx.com/xxx=123sdsadds12",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-01",
          articalTitle:"54sasadas",
          originalLink:"www.xxxx.com/xxx=123sdsadds12",
          tuWenOperate:"详情",
          radio:""
        },
        {
          createTime:"12-01",
          articalTitle:"54sasadas",
          originalLink:"www.xxxx.com/xxx=123sdsadds12",
          tuWenOperate:"详情",
          radio:""
        }
      ],
      videoData:[
        {
        createTime:"new Date().getTime().toUTCString()",
        videoName:"不知道不知道",
        videoCover:"shjkdhskahdkasdjj",
        videoDescription:"toUTCString 方法返回一个 String 对象，此对象中包含了 UTC 惯例格式的日期，以一种简便、易读的形式表示。",
        videoAddress:"必需的 dateObj 引用是任何 Date 对象。"
        },
        {
        createTime:"new Date().getTime().toUTCString()",
        videoName:"不知道不知道",
        videoCover:"shjkdhskahdkasdjj",
        videoDescription:"toUTCString 方法返回一个 String 对象，此对象中包含了 UTC 惯例格式的日期，以一种简便、易读的形式表示。",
        videoAddress:"必需的 dateObj 引用是任何 Date 对象。"
        },
        {
        createTime:"new Date().getTime().toUTCString()",
        videoName:"不知道不知道",
        videoCover:"shjkdhskahdkasdjj",
        videoDescription:"toUTCString 方法返回一个 String 对象，此对象中包含了 UTC 惯例格式的日期，以一种简便、易读的形式表示。",
        videoAddress:"必需的 dateObj 引用是任何 Date 对象。"
        },
        {
        createTime:"new Date().getTime().toUTCString()",
        videoName:"不知道不知道",
        videoCover:"shjkdhskahdkasdjj",
        videoDescription:"toUTCString 方法返回一个 String 对象，此对象中包含了 UTC 惯例格式的日期，以一种简便、易读的形式表示。",
        videoAddress:"必需的 dateObj 引用是任何 Date 对象。"
        }
      ],
      imageData:[
        {
          createTime:"2011-11-02",
          imageTitle:"图片标题1111",
          image:"td中input文本输入到达边界时如何自动换行 - ITeye问答",
          storageAddress:"http://www.appllen.com/wp-content/uploads/2017/04/977748.png"
        },
        {
          createTime:"2011-11-02",
          imageTitle:"图片标题1111",
          image:"td中input文本输入到达边界时如何自动换行 - ITeye问答",
          storageAddress:"http://www.appllen.com/wp-content/uploads/2017/04/977748.png"
        },
        {
          createTime:"2011-11-02",
          imageTitle:"图片标题1111",
          image:"td中input文本输入到达边界时如何自动换行 - ITeye问答",
          storageAddress:"http://www.appllen.com/wp-content/uploads/2017/04/977748.png"
        },
        {
          createTime:"2011-11-02",
          imageTitle:"图片标题1111",
          image:"td中input文本输入到达边界时如何自动换行 - ITeye问答",
          storageAddress:"http://www.appllen.com/wp-content/uploads/2017/04/977748.png"
        },
        {
          createTime:"2011-11-02",
          imageTitle:"图片标题1111",
          image:"td中input文本输入到达边界时如何自动换行 - ITeye问答",
          storageAddress:"http://www.appllen.com/wp-content/uploads/2017/04/977748.png"
        },
        {
          createTime:"2011-11-04",
          imageTitle:"图片标题1111",
          image:"youxiehuayijingbuneng色粉色的粉色的xian爱多tg - ITeye问答",
          storageAddress:"http://www.appllen.com/wp-content/uploads/2017/04/977748.png"
        },
        {
          createTime:"2011-11-02",
          imageTitle:"图片标题1111",
          image:"递四方速递方式 - ITeye问答",
          storageAddress:"http://www.appllen.com/wp-content/uploads/2017/04/977748.png"
        },
        {
          createTime:"2011-11-02",
          imageTitle:"图片标题1111",
          image:"dgdg - 合格机构合计",
          storageAddress:"http://www.appllen.com/wp-content/uploads/2017/04/977748.png"
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
      title:"",
      content:"",
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
          visible:false,
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
          visible:false,
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
          visible:false,
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelect(index,indexPath){
        this.form.name =  index
        this.form.regin = indexPath[0]

    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    shuliqi(){
      console.log("ksfjsdkf")
    },
    tuWenSelect(){
      this.tuWenVisible = false
      this.tuWenThumbnail = true
      //this.tuWenChosen=tuWenVisible.o nClose(data,key)
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
    xiugaicaidan(data,index){
      console.log(index)
      console.log(this.caidanbianji1)
      if(this.caidanbianji1 !== ""){
            data.name = this.caidanbianji1

      }
      data.visible = false
      this.menu[index] = data

      this.menu = Object.assign({}, this.menu);
      this.caidanbianji1 = ''
    },
    noEdit(){
        this.menuShow = false
        this.Edit = false
        this.build = false
    },
    wordDetail(){
      this.wordVisible=false
      this.wordDetails=true
      this.wordDialogVisible=true
    },
    Detail(data){
      //console.log(data)
      this.wordVisible = false
      this.wordDetails = true
      this.wordDialogVisible = true
      this.title = data.row.articalTitle
      this.content = data.row.text
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
    .el-form el-form--label-top{
      float: right;
      width: 70%!important;
    }
    .el-popover{
      text-align: center;
    }
    .el-dialog__header{
      text-align: left;
    }
    .el-form--inline{
      text-align: center;
    }
    .el-table .cell{
      margin-left: 20px;
      float: left;
    }
    .el-dialog__footer{
      text-align:left;
    }

.edit{
  .mytuwen{
      .el-radio__label {
          position: absolute;
          margin-left: -35px;
      }
  }
  .selectImg{
    img{
      width:100px;
      height:100px;
    }
  }
  .tuwen{
    .el-dialog__body{
          text-align: left;
    }
    .pagination{
          margin: 17px 0 0 -6px;
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
