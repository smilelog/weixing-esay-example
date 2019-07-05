var stars = require('../../util/util.js');
var data = getApp();
Page({

  data: {
    theaters: {},
    comming: {},
    top: {}, //不加的話。初始化是没有的，下面的函数是异步的
    searchers: {},
    movieGroupout: false,
    movieListOut: true
  },

  onLoad: function(options) {
    var theaters = data.gobalData.douBanBase + "/v2/movie/in_theaters?start=0&count=3";
    var comming = data.gobalData.douBanBase + "/v2/movie/coming_soon?start=0&count=3";
    var top = data.gobalData.douBanBase + "/v2/movie/top250?start=0&count=3";
    this.movieList(theaters, 'theaters', '正在热映');
    this.movieList(comming, 'comming', '即将上映');
    this.movieList(top, 'top', 'Top250');
  },
  onbindfocus: function(event) {
    this.setData({ //想要改变 用this。setdata。 不能用this.data,改变
      movieGroupout: true,
      movieListOut: false
    })
  },
  delImg: function(event) {
    this.setData({
      movieGroupout: false,
      movieListOut: true,
    })
  },
  onbindblur: function(event) {
    var text = event.detail.value;
    var searchfor = data.gobalData.douBanBase + "/v2/movie/search?q=" + text;
    this.movieList(searchfor, 'searchers', '');

  },
  movieList: function(url, key, movieTitle) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        'Content-type': 'json'
      },
      success: function(res) {
        var mes = res.data;
        console.log(mes)
        //数据处理
        that.dealmovie(mes, key, movieTitle);
      },
      fail: function(res) {},
      complete: function() {}
    });
  },
  dealmovie: function(mes, key, movieTitle) {
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
    //好好理解。函数赋值。高级用法
    var readyData = {};
    readyData[key] = {
      movies: movie,
      movieTag: movieTitle
    };
    this.setData(readyData);
  },

  onmoreMovie: function(event) {
    var movietag = event.currentTarget.dataset.movietag;
    console.log(movietag)
    wx.navigateTo({
      url: 'movie-more/movie-more?movietag=' + movietag
    })
  },
  selectmovie: function(event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieid
    })
  }

})