import {
  Movie
} from 'class/Movie.js'; //class 导入 好像不能用相对路径 。文件近点不带。。
var data = getApp();
Page({
  data: {
    movie: {},
  },
  onLoad: function(options) {
    var movieid = options.id;
    var movieurl = data.gobalData.douBanBase + "/v2/movie/subject/" + movieid;
    // stars.http(movieurl, this.moviedetail);
    var movie = new Movie(movieurl);
    //1.常规 var that = this;
    // movie.getMoviedata(function (movie) {
    //   that.setData({
    //     movie: movie
    //   })
    // })
    // 2.箭头函数
    movie.getMoviedata((movie) => { //this.指向未变
      this.setData({
        movie: movie
      })
    })
  },
  /*查看图片*/
  viewMoviePostImg: function(e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
})