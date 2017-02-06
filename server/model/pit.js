var mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  // 模块html模版
  html:String,
  // 模块less
  css:String,
  // 模块名称
  name:String,
  // 模块预览图
  url:String
})
