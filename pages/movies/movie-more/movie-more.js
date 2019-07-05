var stars = require('../../../util/util.js');
var data = getApp();
Page({

  data: {
    movies: [],
    navigateTitle: "",
    requestUrl: '',
    totalCount: 0,
    isEmpty: false //控制累加数据到movies对象里
  },

  onLoad: function(options) {
    var movieTag = options.movietag;
    this.data.navigateTitle = movieTag;
    var dataurl = '';
    switch (movieTag) {
      case "正在热映":
        dataurl = data.gobalData.douBanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataurl = data.gobalData.douBanBase + "/v2/movie/coming_soon";
        break;
      case "Top250":
        dataurl = data.gobalData.douBanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataurl;
    stars.http(dataurl, this.dealmovie); //这里的this,callback不要加（data）.要和知己封装的一字；
  },
  //实现屏幕上拉加载更多
  onReachBottom: function(event) {
    var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    stars.http(nextUrl, this.dealmovie);
    //下次加载的url totalCopunt每次加20 ；
    wx.showNavigationBarLoading(); //加载数据导航栏有个loading；
  },
  onPullDownRefresh: function(event) { //下拉刷新  不兼容
    var refreshUrl = this.data.requestUrl + '?start=0&count=20';
    stars.http(refreshUrl, this.dealmovie);
    this.data.movies = [];
    this.data.totalCount = 0;
    this.data.isEmpty = true;
    wx.showNavigationBarLoading(); //加载数据导航栏有个loading；
  },
  dealmovie: function(mes) {
    var movie = [];
    var sub = mes.subjects;
    for (var i = 0; i < sub.length; i++) {
      var step = sub[i].rating.stars;
      var title = sub[i].original_title;
      var average = sub[i].rating.average;
      var coverImg = sub[i].images.large;
      var movieid = sub[i].id;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var need = {
        star: stars.starList(step),
        title: title,
        average: average,
        coverImg: coverImg,
        movieid: movieid
      }
      movie.push(need);
    }
    var motalMovies = {};
    if (this.data.isEmpty) { //不是第一次加载了;就把数据添加到之前数据的后面
      motalMovies = this.data.movies.concat(movie); //数组拼接 。检查下data 上绑定的是不是数组
    } else {
      motalMovies = movie;
      this.data.isEmpty = true;
    }
    //好好理解。函数赋值。高级用法
    //  1.var readyData = {};
    //   readyData=movie;
    //   this.setData(readyData);  
    this.setData({
      movies: motalMovies
    }); //异步this.setData movies 在data 上要绑定
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading(); //加载成功隐藏导航栏loading
    wx.stopPullDownRefresh(); //
  },
  onReady: function() {
    wx.setNavigationBarTitle({ //导航栏标题变化  只能在onready 页面渲染完成的时候用 onload 不能执行ui操作
      title: this.data.navigateTitle
    })
  },
  selectmovie: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieid
    })
  }
})