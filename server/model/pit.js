var mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  html:String,
  css:String,
  name:String,
  url:String
})
