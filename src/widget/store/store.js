
const bannerSign='banner';
const banner={
  set(url){
    var list=this.get()
    list.push(url)
    return window.localStorage.setItem(bannerSign,JSON.stringify(list))
  },
  get(){
    return JSON.parse(window.localStorage.getItem(bannerSign)||'[]')
  }
};

export default {
  banner
}
