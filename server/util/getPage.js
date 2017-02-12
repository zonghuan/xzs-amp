
// 生成页面的外壳
var path = require('path')
var fs = require('fs')

var nodeModulesPath=path.join(process.cwd(),'node_modules')
var zeptoPath = path.join(nodeModulesPath,'zepto/dist/zepto.min.js')
var zeptoJs = fs.readFileSync(zeptoPath)
var remPath = path.join(nodeModulesPath,'dwd-rem/rem.js')
var remJs = fs.readFileSync(remPath)

module.exports = (html,globalStyle,name,desc) => {
  return (
    `<html>
      <head>
        <meta charset="UTF-8">
        <title>${name}</title>
        <script type="text/javascript">${remJs}</script>
        <script type="text/javascript">${zeptoJs}</script>
        <script type="text/javascript">
          $(function(){
            $('html').css(${JSON.stringify(globalStyle)})
          })
        </script>
        <style>
          p,body,html{
            margin:0;
            padding:0;
          }
          .client-hidden{
            display:none;
          }
        </style>
      </head>
      <body>${html}</body>
    </html>`
  )
}
