var {Pit} = require('../model')

module.exports={
  find(){
    return Pit.find.apply(Pit,arguments).exec()
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
