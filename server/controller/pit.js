var {Pit} = require('../model')

module.exports={
  find(){
    return Pit.find.apply(Pit,arguments).exec()
  },
  create(){
    return Pit.create(arguments[0])
  }
}
