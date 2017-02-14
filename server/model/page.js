var mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  // 全局样式,挂在页面的html上
  globalStyle:{ type: Object, required: true},
  // 各个模块的配置信息
  list:{ type: Array, required: true},
  // 页面的名称
  name:{ type: String, trim: true, required: true },
  // 页面的描述
  desc:String,
  author:String,
  // 创建时的时间戳
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})
