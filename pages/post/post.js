// pages/post/post.js
var postmes = require('../../data/post-data.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      postLine: postmes.postList
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  onpostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
   
  onbanner:function(event){
    var postId = event.target.dataset.postid;
    // 使用事件冒泡的原理把事件绑定到父元素上
    // target 指的是当前点击组件  currentTarget 指的是当前事件捕获的组件
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }


})