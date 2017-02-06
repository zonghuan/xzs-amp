var mongoose = require('mongoose')
var config = require('../../config.json')

var connection=mongoose.createConnection(config.mongoose, function(err) {
  if (err) {
    console.log('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
})
var pit='Pit'
var page='Page'
module.exports={
  [pit]:connection.model(pit, require('./pit.js')),
  [page]:connection.model(page, require('./page.js'))
}
