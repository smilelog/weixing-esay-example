Page({
  onTab:function(){
    // wx.redirectTo({
    //   url: '../post/post',
    // })
    // wx.navigateTo 为一个对象 有子和父的关系 5 页面隐藏   wx.redictedTo 为一个对象 无子和父的关系 。页面卸载
    // 当页面有tab 栏是 只能用wx.swithtab ；
    wx.switchTab({
      url: '../post/post',
    })
  }
})