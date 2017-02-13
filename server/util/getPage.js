
// 生成页面的外壳
var path = require('path')
var fs = require('fs')

var nodeModulesPath=path.join(process.cwd(),'node_modules')
var zeptoPath = path.join(nodeModulesPath,'zepto/dist/zepto.min.js')
var zeptoJs = fs.readFileSync(zeptoPath)
var remPath = path.join(nodeModulesPath,'dwd-rem/rem.js')
var remJs = fs.readFileSync(remPath)

module.exports = (html,globalStyle,name,desc) => {
  var styleStr = `
    background-color:${globalStyle.backgroundColor};
    background-image:${globalStyle.backgroundImage||'none'};
  `
  return (
    `<html style="${styleStr}">
      <head>
        <meta charset="UTF-8">
        <title>${name}</title>
        <script type="text/javascript">${remJs}</script>
        <script type="text/javascript">${zeptoJs}</script>
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
