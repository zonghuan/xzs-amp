var {Pit} = require('../model')

module.exports={
  find(){
    return Pit.find(arguments[0]).exec()
  },
  update(param){
    if(!param._id){
      return Promise.reject()
    }
    return Pit.findOneAndUpdate({_id:param._id},param)
  },
  create(){
    return Pit.create(arguments[0])
  }
}
