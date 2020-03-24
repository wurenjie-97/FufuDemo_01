import Mock from 'mockjs' // 引入mockjs
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据
const data = [] // 用于接受生成数据的数组
// const size = [
// '300x250', '250x250', '240x400', '336x280',
// '180x150', '720x300', '468x60', '234x60',
// '88x31', '120x90', '120x60', '120x240',
//  '125x125', '728x90', '160x600', '120x600',
// '300x600'
// ] // 定义随机值
for (let i = 0; i < 10; i++) { // 可自定义生成的个数
const template = {
jktarget: Random.paragraph(2, 5), // 生成2至5个句子的文本
jktime: '全天',
edittime: Random.date(), // 生成一个随机日期,可加参数定义日期格式据
jkpeople: Random.name() // 生成姓名
}
data.push(template)
}
Mock.mock('/data/index', 'post', data) // 根据数据模板生成模拟数据
