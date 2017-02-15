var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '123456',
  database        : 'activity'
});
var thunkify = require('thunkify')

module.exports = {
  query:thunkify(pool.query).bind(pool)
}
