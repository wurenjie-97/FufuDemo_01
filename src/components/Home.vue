<template>
<div>
<!-- 面包屑导航 -->
<div class="top">
<el-breadcrumb separator-class="el-icon-arrow-right" class="center">
  <el-breadcrumb-item :to="{ path: '/' }">监控资源</el-breadcrumb-item>
  <el-breadcrumb-item>4G新装详情</el-breadcrumb-item>
</el-breadcrumb>
</div>
<!-- 导航部分 -->
<el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
    <el-tab-pane label="指标看板" name="first">指标看板</el-tab-pane>
    <el-tab-pane label="告警信息" name="second">告警信息</el-tab-pane>
    <el-tab-pane label="监控列表" name="third">
      <div class="jklist">
   <el-button type="primary" style="margin-left:30px" @click="addJk">新增监控</el-button> <span class="iconfont icon-setting-1-copy" style="margin-left:10px"></span>
    <!-- 分页begin -->
    <el-pagination
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
      class="pagesize">
    </el-pagination>
    <!-- 分页end -->
    <!-- 表格区域 -->
    <el-table
    :data="tableData"
    row-key="id"
    border
    style="width: 100%"
    :default-expand-all=false
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    :span-method="objectSpanMethod"
    height="250"
    >
    <el-table-column
      prop="jktarget"
      label="监控指标"
      width="180">
    </el-table-column>
    <el-table-column
      prop="jkmethod"
      label="监控方法"
      width="180
      ">
       <template slot-scope="">
          <i class="iconfont icon-jinggao" style="color:#EBAD54"></i>
           <span> 周期不确定性预测</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="jktime"
      label="监控时段">
    </el-table-column>
    <el-table-column
      prop="jkpeople"
      label="修改人">
    </el-table-column>
    <el-table-column
      prop="edittime"
      label="修改时间">
       <!-- <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template> -->
    </el-table-column>
    <el-table-column
      prop="handle"
      label="操作" >
       <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click='editJk(scope.row.id)'>修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click='deleteJk(scope.row.id)'>删除</el-button>
          <el-button type="info" icon="el-icon-user" size="mini">查看告警接收人</el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>
  </el-tab-pane>
    <el-tab-pane label="告警接收规则" name="fourth">告警接收规则</el-tab-pane>
  </el-tabs>
  <!-- 导航部分结束 -->
  <!-- 添加监控对话框 -->
  <el-dialog
  title="添加监控"
  :visible.sync="addJkDialogVisible"
  width="50%">
 <el-form ref="addJkForm" :model="addJkForm" label-width="80px">
  <el-form-item label="监控指标">
    <el-input v-model="addJkForm.jktarget"></el-input>
    </el-form-item>
     <el-form-item label="监控时段">
    <el-input v-model="addJkForm.jktime"></el-input>
    </el-form-item>
     <el-form-item label="修改人">
    <el-input v-model="addJkForm.jkpeople"></el-input>
    </el-form-item>
     <el-form-item label="修改时间">
    <el-input v-model="addJkForm.edittime"></el-input>
    </el-form-item>
     </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addJkDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addJkInfo">确 定</el-button>
  </span>
</el-dialog>
<!-- 添加监控对话框结束 -->
<!-- 修改监控对话框 -->
<el-dialog
  title="修改监控"
  :visible.sync="editJkDialogVisible"
  width="50%">
 <el-form ref="editJkForm" :model="editJkForm" label-width="80px">
  <el-form-item label="监控指标">
    <el-input v-model="editJkForm.jktarget"></el-input>
    </el-form-item>
    <!-- <el-form-item label="监控方法">
    <el-input v-model="editJkForm.method"></el-input>
    </el-form-item> -->
     <el-form-item label="监控时段">
    <el-input v-model="editJkForm.jktime"></el-input>
    </el-form-item>
     <el-form-item label="修改人" disabled>
    <el-input v-model="editJkForm.jkpeople"></el-input>
    </el-form-item>
     <el-form-item label="修改时间">
    <el-input v-model="editJkForm.edittime"></el-input>
    </el-form-item>
     </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editJkDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editJkDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改按钮对话框结束 -->
   </div>
</template>

<script>
import api from '../axios/api.js'
export default {
    data() {
      return {
        // 默认选中
        activeName: 'third',
        queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      // 表格数据
        tableData: [{
         id: 1,
         jktarget: '内存使用率',
         jktime: '全天',
         jkpeople: '张三',
         edittime: '2020-03-18 14:00:00'
        },
        {
          id: 2,
         jktarget: '文件系统使用率',
         jktime: '全天',
         jkpeople: '张三',
         edittime: '2020-03-18 14:00:00',
         children: [{
              id: 31,
              jktarget: '/opt root',
              jktime: '全天',
              jkpeople: '张三',
              edittime: '2020-03-18 14:00:00'
            }, {
              id: 32,
              jktarget: '/tmp root',
              jktime: '全天',
              jkpeople: '张三',
              edittime: '2020-03-18 14:00:00'
          }]
        },
        {
          id: 3,
          jktarget: '内存使用率',
          jktime: '全天',
         jkpeople: '张三',
         edittime: '2020-03-18 14:00:00'
        },
         {
          id: 4,
          // jktarget: '文件系统使用率',
          jktime: '节假日',
         jkpeople: '张三',
         edittime: '2020-03-18 14:00:00'
        }
        ],
        // 控制添加监控对话框显示和隐藏
        addJkDialogVisible: false,
          addJkForm: {},
          // 控制修改监控对话框显示和隐藏
          editJkDialogVisible: false,
           editJkForm: {},
           // mask数据
           dataShow: []
      }
    },
    created() {
         this.getdata()
    },
     methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      // 合并行
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 && rowIndex >= 4) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      // 添加监控
      addJk() {
      this.addJkDialogVisible = true
      },
      // 点击按钮，添加新的监控
      addJkInfo() {
        if (!this.addJkForm.jktarget || !this.addJkForm.jktime || !this.addJkForm.jkpeople || !this.addJkForm.edittime) {
                return this.$message.error('内容不能为空')
            }
          this.tableData.push({
                     id: this.addJkForm.id,
                    jktarget: this.addJkForm.jktarget,
                    jktime: this.addJkForm.jktime,
                    jkpeople: this.addJkForm.jkpeople,
                    edittime: this.addJkForm.edittime
            })
            this.$message({
                message: '创建成功',
                type: 'success'
            })
        //  localStorage.setItem('tableData', JSON.stringify(this.tableData))
        this.addJkDialogVisible = false
      },
      // 修改监控
      editJk(id) {
              console.log(id)
      // this.editJkForm = this.tableData()
       this.editJkDialogVisible = true
      },
      // 删除按钮点击事件
      deleteJk(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.tableData.splice(id, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // mask数据
      getdata: function() {
      api.mockdata('/data/index').then(res => {
        console.log(res)
        this.dataShow = res.data
      })
      }
    }
}
</script>

<style lang="less">
.top {
    height: 35px;
    width: 100%;
    background-color:#F0F2F9;
    position: absolute;
    top:0px;
    left: 0px;
}
.tabs {
    margin-top: 35px;
}
.center {
    transform: translateY(10px);
}
.el-tabs__item {
    padding-left: 35px!important;
    font-size:14px!important;
    font-weight: 600!important;
}
.pagesize {
    display: inline-block;
    margin-left: 800px;
}
</style>
