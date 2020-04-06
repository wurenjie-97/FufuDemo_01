<template>
<div class="chart">
    <!-- 头部布局 -->
<header>
    <span class="hd_l">
         <i class="el-icon-s-fold"></i><span>故障处理视图</span>
    </span>
    <span class="hd_r">
      <i class="el-icon-date"></i><span>数据时间:17/10/2019 ~ 31/10/2019</span>
      <el-button>近15天</el-button>
      <el-button>近30天</el-button>
      <el-button>近90天</el-button>
      <el-button>自定义</el-button>
  </span>
</header>
<!-- 头部布局end -->
<!-- 内容块布局 -->
<article>
    <div class="ar_l">
        <div class="ar_l_top">
            <div class="gz">
            <span style="color:red">3</span>
            <p>未处理完成故障数</p>
            </div>
            <div class="gz">
            <span>3</span>
            <p>故障总数</p>
            </div>
            <div class="gz">
            <span>32</span><font> 分钟</font>
            <p>故障平均处理时长</p>
            </div>
        </div>
        <div class="ar_l_middle">
            <!-- 故障数图表容器 -->
            <div id="main" style="width: 100%;height:100%;"></div>
        </div>
        <div class="ar_l_footer">
            <!-- 故障占比容器 -->
            <div id="percent" style="width:30%;height:100%;"></div>
            <div class="border_r"></div>
            <div id="IaaS" style="width:33%;height:50%;position:absolute;top:-25px;right:48px"></div>
            <div id="PaaS" style="width:33%;height:50%;position:absolute;top:80px;right:48px"></div>
            <div id="SaaS" style="width:33%;height:50%;position:absolute;top:185px;right:48px"></div>
        </div>
    </div>
    <div class="ar_r">
        <div id="Level" style="width:100%;height:100%;"></div>
        <div class="ar_r_footer">
            <h3>故障影响的资源TOP 5</h3>
            <table width="100%">
                <th>资源名称</th>
                <th>影响次数</th>
                <tr v-for="item in natural_res" :key="item.id">
                    <td>{{ item.id }} {{ item.name }}</td>
                    <td>{{ item.times }}</td>
                </tr>
            </table>
        </div>
    </div>
</article>
</div>
</template>

<script>
// 1.导入echarts
import echarts from 'echarts'
export default {
data() {
    return {
        // 故障数data
    GzDataList: {
        date: ['17/10', '18/10', '19/10', '20/10', '21/10', '22/10', '23/10', '24/10', '25/10', '26/10', '27/10', '28/10', '29/10', '30/10', '31/10'],
        mount: [5, 8, 3, 4, 3.5, 9.8, 5, 8, 3, 4, 3.5, 9.8, 5, 4.8, 7],
        percent: [{ value: 12, name: 'IaaS' },
                 { value: 12, name: 'PaaS' },
                 { value: 8, name: 'SaaS' }],
        level: [10, 8, 3, 5],
        TDataList: {}
        },
        // IaaS
     TDataList: {
         name: ['交换机', '防火墙', '主机'],
         total: [2, 4, 6]
     },
     // PaaS
     PdataList: {
         name: ['Mysql', 'DBProxy', 'Geteway'],
         total: [6, 4, 2]
     },
     // SaaS
      SdataList: {
         name: ['应用', '场景', '服务'],
         total: [6, 4, 2]
     },
     // 资源TOP5
     natural_res: [{
        id: 1,
        name: '【服务】服开轮训接受接口',
        times: 10
        },
        {
        id: 2,
        name: '【服务】服开轮训接受接口',
        times: 10
        },
        {
        id: 3,
        name: '【服务】服开轮训接受接口',
        times: 10
        },
        {
        id: 4,
        name: '【服务】服开轮训接受接口',
        times: 10
        },
        {
        id: 5,
        name: '【服务】服开轮训接受接口',
        times: 10
        }
        ]
    }
},
created() {
},
mounted() {
    // 展示数据
         this.drawtotal()
},
methods: {
drawtotal() {
    // 初始化echarts实例
     var myChart = echarts.init(document.getElementById('main')) // 故障趋势图
     var myPercent = echarts.init(document.getElementById('percent')) // 故障占比饼图
    var myIaaS = echarts.init(document.getElementById('IaaS')) // IaaS横向柱状图
     var myPaaS = echarts.init(document.getElementById('PaaS')) // PaaS横向柱状图
      var mySaaS = echarts.init(document.getElementById('SaaS')) // SaaS横向柱状图
      var myLevel = echarts.init(document.getElementById('Level')) // 故障等级统计故障数量
    myChart.setOption({
            title: {
                text: '故障趋势图'
            },
            xAxis: {
               type: 'category',
               boundaryGap: false, // 设置日期顶格
               data: this.GzDataList.date,
             // x轴边框线设置
             axisLine: {
              show: true,
              lineStyle: {
                  type: 'dashed',
                  color: '#BBBBBB'
              }
             },
             // x轴中间的格子
             splitLine: {
             show: true,
             lineStyle: {
                type: 'dashed',
                color: ['#E4E7ED']
            }
            }
            },
            yAxis: {
                min: 0,
                max: 10,
                splitNumber: 2,
                type: 'value',
                splitLine: {
                show: true,
                lineStyle: {
                type: 'dashed',
                color: ['#E4E7ED']
                }
                },
                axisTick: {
                show: false
      }
                },
            series: [{
                name: '故障数',
                type: 'line',
                symbol: 'circle', // 设置转折点为实心
                symbolSize: 7, // 设置转折点大小
                data: this.GzDataList.mount,
                smooth: true,
                areaStyle: {
                    normal: { // 区域填充样式
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#D6DFFC' },
                            { offset: 0.5, color: 'skyblue' },
                            { offset: 1, color: 'white' }
                        ])
                    }
                },
                itemStyle: {
                    // 折线的颜色
                    color: '#7192F8'
                }
            }]
    })
                let total = 0
                const target = new Map()
                this.GzDataList.percent.forEach((item) => {
                    // 计算value的和，用来算百分比
                    total += item.value
                    // 组成 map {A:1212} ,用来下面获取 value
                    target.set(item.name, item.value)
                })
    myPercent.setOption({
            title: {
                text: '各资源类型故障占比'
            },
            series: {
             name: '故障比',
             type: 'pie', // 设置图表类型为饼状
             radius: '55%', // 饼图的半径
             data: this.GzDataList.percent,
             itemStyle: {
                 // 强调
                 emphasis: {
                    shadowBlur: 10, // 模糊级数
                    shadowOffsetX: 0, // 右偏移
                    shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
                 },
                 normal: {
                     color: function(params) {
                         // 自定义颜色
                         var colorList = ['#94B3F9', '#E8BE90', '#FCE69F']
                         return colorList[params.dataIndex]
                     }
                 }
             }
            },
            // legend设置
            legend: {
            icon: 'circle', // 形状
            orient: 'vertical',
            align: 'left', // 文本向右
            x: '100px', // x轴位置
            y: 'bottom', // y轴位置
            data: this.GzDataList.percent.name,
            // padding: [2, 0, 0, 300],
            formatter: function(name) {
                            const lists = []
                            const index = 0
                            var clientLabels = lists
                            var clientCounts = [12, 12, 8]
                            const inum = target.get(name) / total * 100
                            // 保留inum小数点后２位
                            const vnum = parseFloat(inum).toFixed(2)
                            lists.push(name + '    ' + vnum + '%')
                            return lists
                        }
            }
    })
    myIaaS.setOption({
        title: {
            text: 'IaaS',
            x: 'left',
            padding: [35, 0, 0, 5],
            textStyle: {
                color: '#5D5F6A',
                fontFamily: '微软雅黑',
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        // 设置柱状图颜色
        color: ['#94B3F9'],
        grid: {
            left: 70
        },
        xAxis: {
        type: 'value',
        show: false
        },
        yAxis: {
            type: 'category',
            axisTick: {
                show: false // 是否显示坐标轴刻度
            },
            axisLine: {
                show: false // 是否显示坐标轴轴线
            },
            splitLine: {
                show: false // 是否显示分隔线
            },
            axisLabel: {
                show: true, // 是否显示刻度标签
                fontSize: 12
            },
            data: this.TDataList.name
        },
        series: [
            {
                type: 'bar',
                data: this.TDataList.total,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, // 开启显示
                            position: 'right', // 在右边显示
                            textStyle: {
                                color: '#A9ABB0',
                                fontSize: 14
                            }
                        }
                    }
                }
            },
            {
                // 背景颜色设置
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.05)' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: [6, 6, 6]
            }
        ]
    })
    myPaaS.setOption({
        title: {
            text: 'PaaS',
            x: 'left',
            padding: [35, 0, 0, 5],
            textStyle: {
                color: '#5D5F6A',
                fontFamily: '微软雅黑',
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        // 设置柱状图颜色
        color: ['#E8BE90'],
        // 设置X轴文字
        grid: {
            left: 70
        },
        xAxis: {
         type: 'value',
        show: false
        },
        yAxis: {
            type: 'category',
            axisTick: {
                show: false // 是否显示坐标轴刻度
            },
            axisLine: {
                show: false // 是否显示坐标轴轴线
            },
            splitLine: {
                show: false // 是否显示分隔线
            },
            axisLabel: {
                show: true, // 是否显示刻度标签
                fontSize: 12
            },
            data: this.PdataList.name
        },
        series: [
            {
                type: 'bar',
                data: this.PdataList.total,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, // 开启显示
                            position: 'right', // 在右边显示
                            textStyle: {
                                color: '#A9ABB0',
                                fontSize: 14
                            }
                        }
                    }
                }
            },
            {
                // 背景颜色设置
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.05)' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: [6, 6, 6]
            }
        ]
    })
    mySaaS.setOption({
        title: {
            text: 'SaaS',
            x: 'left',
            padding: [35, 0, 0, 5],
            // 标题样式
            textStyle: {
                color: '#5D5F6A',
                fontFamily: '微软雅黑',
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        // 设置柱状图颜色
        color: ['#FCE69F'],
        // 设置X轴文字
        grid: {
            left: 70
        },
        xAxis: {
         type: 'value',
        show: false
        },
        yAxis: {
            type: 'category',
            axisTick: {
                show: false // 是否显示坐标轴刻度
            },
            axisLine: {
                show: false // 是否显示坐标轴轴线
            },
            splitLine: {
                show: false // 是否显示分隔线
            },
            axisLabel: {
                show: true, // 是否显示刻度标签
                fontSize: 12
            },
            data: this.SdataList.name
        },
        series: [
            {
                type: 'bar',
                data: this.SdataList.total,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, // 开启显示
                            position: 'right', // 在右边显示
                            textStyle: {
                                color: '#A9ABB0',
                                fontSize: 14
                            }
                        }
                    }
                }
            },
            {
                // 背景颜色设置
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.05)' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: [6, 6, 6]
            }
        ]
    })
    myLevel.setOption({
        color: ['#6E90F8'], // 柱状图颜色
        title: {
            text: '按故障等级统计故障数量'
        },
        xAxis: {
            type: 'category',
            data: ['一级故障', '二级故障', '三级故障', '四级故障'],
            // axisLine: {
            //     show: false
            // },
            axisTick: {
            show: false // 是否显示坐标轴刻度
            },
            axisLabel: {
                show: true // 是否显示标签
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 10,
            splitNumber: 2,
            axisTick: {
                show: false // 坐标轴刻度是否显示
            }
        },
        series: [{
            data: this.GzDataList.level,
            type: 'bar',
            barWidth: '20%', // 柱状图宽度
            itemStyle: {
            normal: {
                label: {
                    show: true, // 开启显示
                    position: 'top',
                    textStyle: {
                        color: '#AFC1FA',
                        fontSize: 16
                    }
                }
            }
            }
        }]
    })
    // 设置echarts随页面变化而变化
      window.addEventListener('resize', () => {
            myIaaS.resize()
            myPaaS.resize()
            mySaaS.resize()
            myLevel.resize()
            myChart.resize()
            myPercent.resize()
        })
}
}
}
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height:890px;
    background-color: #EBECF1;
    margin: 0;
    padding: 0;
}
header {
    background-color: #FFFFFF;
    height: 50px;
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    color:#9C9EA6;
    .hd_l {
        float: left;
        width:50%;
        line-height: 50px;
    }
    .hd_r {
        width: 100%;
        line-height: 50px;
        span {
            margin-right: 10px;
        }
    }
i {
    margin-right: 10px;
    font-size: 20px;
    color:#C9C9CE;
}
}
article {
    .ar_l {
        width: 60%;
        height: 65px;
        background-color: #fff;
        margin-top: 10px;
        .ar_l_top {
          display: flex;
          justify-content: space-between;
          .gz {
              text-align: center;
              span {
                  line-height: 2.5rem;
                  font-size:20px;
                  font-weight:700
              }
              font {
                  color:#D9D9DC;
                  font-size:14px
              }
              p {
                  margin-top: -8px;
                  font-size:14px;
                  color:#757781;
                  font-family: 'SimHei ';
              }
          }
        }
        .ar_l_middle {
            height: 170px;
            background-color: #fff;
            margin: 10px 0;
        }
        .ar_l_footer {
        height: 350px;
        background-color: #fff;
        position: relative;
        // overflow: scroll;
        .border_r {
            width: 1px;
            height: 180px;
            background-color: #ccc;
            position: absolute;
            top: 75px;
            right: 500px;
        }
        }
    }
    .ar_r {
        width: 39%;
        height: 245px;
        background-color: #fff;
        float: right;
        margin-top: -65px;
        .ar_r_footer{
        width: 100%;
        height: 350px;
        background-color: #fff;
        margin-top:-10px;
        table {
             th {
                width: 100%;
                height: 30px;
                line-height: 30px;
                background-color:#EBECF1;
                white-space: nowrap;
            }
            tr {
                width: 100%;
                height: 50px;
                td {
           border-bottom: 3px solid #EBECF1;
           white-space: nowrap;
                }
            }
        }
        }
    }
}
</style>
