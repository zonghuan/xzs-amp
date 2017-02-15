var page = {
  toDb(body){
    body = Object.assign({},body)
    body.list = JSON.stringify(body.list)
    body.globalStyle = JSON.stringify(body.globalStyle)
    return body
  },
  toFront(list){
    for(var i=0;i<list.length;i++){
      list[i].list = JSON.parse(list[i].list)
      list[i].globalStyle = JSON.parse(list[i].globalStyle)
    }
    return list
  }
}
module.exports = {
  page
}
