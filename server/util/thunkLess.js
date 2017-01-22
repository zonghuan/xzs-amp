module.exports = (less) => (callback) =>{
  return require('less').render(
    less,
    {
      globalVars:{
        base:750/10+"rem"
      }
    },
    callback)
}
