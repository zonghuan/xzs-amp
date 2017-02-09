var {Page} = require('../model')

module.exports={
  find(){
    return Page.find.apply(Page,arguments).exec()
  },
  update(param){
    if(!param._id){
      return Promise.reject('请填写id')
    }
    var _id = param._id
    delete param._id
    return Page.findOneAndUpdate({_id},param)
  },
  create(){
    return Page.create(arguments[0])
  }
}
