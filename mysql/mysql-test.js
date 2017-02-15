var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '123456',
  database        : 'activity'
});

// pool.query('insert into page set `globalStyle` = ?, `list` = ?, `name` = ?, description = ?,`author`=? ',["{}","[]",'czh','something','huanhuan'], function (error, results, fields) {
//   if (error) throw error;
//   console.log(results)
// });

pool.query('select * from page',(error,results,fields)=>{
  if(error) throw error;
  console.log(results)
})
