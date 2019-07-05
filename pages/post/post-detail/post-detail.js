var postmes = require('../../../data/post-data.js')
var app = getApp();
Page({

  
  data:{
    playMusic:false
  },

  onLoad: function(options) {
    var aaa = app.gobalData;
    var id = options.id;
    var mes= postmes.postList[id];
    this.data.currentNow = id;
    this.setData({
      postData: mes,
    })

    var postcollectId = wx.getStorageSync('sit_tion');
    console.log(postcollectId)
    if(postcollectId){
      var postc = postcollectId[id];
      if (postc){
        this.setData({
          collected: postc
        })
      }
    }
    else{
      var postcollectId = {};
      postcollectId[id]=false;
      wx.setStorageSync('sit_tion', postcollectId);
    }
    // 全局音乐播放变量控制。图标状态改变
    if (app.gobalData.g_gobalPlayMusic && app.gobalData.g_gobalPlayMusicId === id){
      this.setData({
        playMusic: true
      })
    }
    this.listenMusic();

  },
  listenMusic:function(){
    //总控开关的监听
    var that = this;
    wx.onBackgroundAudioPlay(function () {//callback this 指向已不再Page里面
      //监听数据改变
      that.setData({
        playMusic: true
      })
      app.gobalData.g_gobalPlayMusic = true;
      app.gobalData.g_gobalPlayMusicId = that.data.currentNow;
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        playMusic: false
      })
      app.gobalData.g_gobalPlayMusic = false;
      app.gobalData.g_gobalPlayMusicId = null;
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        playMusic: false
      })
      app.gobalData.g_gobalPlayMusic = false;
      app.gobalData.g_gobalPlayMusicId = null;
    })
  },

  postcoll:function(event){
    this.postAsync();
  },
  //使用异步缓存更改（慎用）
  postAsync:function(){
    var that = this;
    wx.getStorage({
      key:'sit_tion',
      success(res){
        var postcollectId = res.data;
        var postcollect = postcollectId[that.data.currentNow];
        postcollect = !postcollect;
        postcollectId[that.data.currentNow] = postcollect;
        that.showToast(postcollectId, postcollect);
      }
    });
  },

//同步
  postasync: function () {
    var postcollectId = wx.getStorageSync('sit_tion');
    var postcollect = postcollectId[this.data.currentNow];
    postcollect = !postcollect;
    postcollectId[this.data.currentNow] = postcollect;
    this.showToast(postcollectId, postcollect);
  },

  shareTap:function(){
    var shareMes=[
      "分享到朋友圈",
      "分享到微博",
      "分享到QQ",
      "分享到知乎",
      "分享到头条"
    ];
    wx.showActionSheet({
      itemList: shareMes,
      itemColor:"#405bf8",
      success:function(res){
        wx.showModal({
          title: shareMes[res.tapIndex] + res.cancel,
          content: shareMes[res.tapIndex] + '功能目前不能执行，什么时候可以实现该分享功能？' + res.cancel,
        })
      }
    })
  },

  showModal: function (postcollectId, postcollect){
    var that = this;
    wx.showModal({
      title: postcollect ? '收藏' : '取消收藏',
      content: postcollect ? '收藏该文章？' : '取消收藏该文章？',
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          // 更新缓存
          wx.setStorageSync('sit_tion', postcollectId);
          // 更新本地数据
          that.setData({
            collected: postcollect
          })
        }
      }
    })
  },

  showToast: function (postcollectId, postcollect) {
    var that = this;
    wx.showToast({
      title: postcollect ? '收藏' : '取消收藏',
      mask: true,
      duration:1000,
      success: function () {
        // 更新缓存
        wx.setStorageSync('sit_tion', postcollectId);
        // 更新本地数据
        that.setData({
          collected: postcollect
        })
      }
    })
  },

  musicPlay:function(event){
      this.playMusic = !this.playMusic;
      var num = this.data.currentNow;
      var post = postmes.postList[num].music;
      console.log(post);
      if (this.playMusic){
        wx.playBackgroundAudio({
          title: post.title,
          dataUrl: post.url,
          coverImgUrl: post.coverImg,
        })
      }
      else{
        wx.stopBackgroundAudio();
      }
      this.setData({
        playMusic: this.playMusic
      })
   
  }


})