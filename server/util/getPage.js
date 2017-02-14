
// 生成页面的外壳
var path = require('path')
var fs = require('fs')

var nodeModulesPath=path.join(process.cwd(),'node_modules')

var zeptoJs = fs.readFileSync(require.resolve('zepto'))
var remJs = fs.readFileSync(require.resolve('dwd-rem'))
var hybirdJs = fs.readFileSync(require.resolve('xzs-hybird'))

module.exports = (html,globalStyle,title) => {
  var styleStr = `
    background-color:${globalStyle.backgroundColor};
    background-image:${globalStyle.backgroundImage||'none'};
  `
  var pageScript = `
    $(function(){
      var hybird = window["xzs-hybird"].default;
      var content = $('body');
      content.on('click','a[detail]',function(e){
        var element=$(e.target);
        hybird.openDetail(element.attr('detail'));
      });

      content.on('click','a[data-sku]',function(e){
        var element=$(e.target);
        hybird.addItemToCart(element.attr('data-item'),element.attr('data-sku'));
      });
      content.on('click','.backToTop',function(e){
        $(window).scrollTop(0);
      });
    })
  `
  return (
    `<html style="${styleStr}">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <script type="text/javascript">${remJs}</script>
        <script type="text/javascript">${zeptoJs}</script>
        <script type="text/javascript">${hybirdJs}</script>
        <script type="text/javascript">${pageScript}</script>
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
