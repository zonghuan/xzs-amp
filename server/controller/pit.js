var {Pit} = require('../model')

module.exports={
  find(){
    return Pit.find(arguments[0]).exec()
  },
  create(){
    return Pit.create(arguments[0])
  }
}
