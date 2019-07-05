var stars = require('../../../../util/util.js');
// var data = getApp();
class Movie {  // 类
  constructor(url) {  // 构造函数初始化类，url 绑定到类上
    this.url = url
  }
  getMoviedata(cb) { //异步处理 cb 回调
    this.cb = cb;
    stars.http(this.url, this.moviedetail.bind(this));//this
  }
  moviedetail(data) { //电影详情页面数据处理
    if (!data) {
      return;
    }
    var director = {
      avator: "",
      name: "",
      id: ""
    }
    if (data.director != null) {
      if (data.director[0].avator !== null) {
        director.avator = data.director[0].avator.large;
      }
      director.name = data.director[0].name;
      director.id = data.director[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      withCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: stars.starList(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: stars.convertToCastString(data.casts),
      castsInfo: stars.convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.cb(movie);  //返回数据回调 不能用return 。this在上面函数里已经绑定
  }
}

export { Movie }  //导出模块  。模块封装完毕