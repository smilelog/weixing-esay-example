  function addNum(num) {
    var one = parseInt(num.toString().substring(1));
    var two = parseInt(num.toString().substring(0, 1));
    var array = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= two) {
        array.push(1);
      } else if (one == 5 && i == two + 1) {
        array.push(2);
      } else {
        array.push(0);
      }
    }
    return array;
  }

  function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
      castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
  }

  function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
      var cast = {
        img: casts[idx].avatars ? casts[idx].avatars.large : "",
        name: casts[idx].name
      }
      castsArray.push(cast);
    }
    return castsArray;
  }

  //星星评分组件 

  function http(url, callBack) {
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        'Content-type': 'json'
      },
      success: function(res) {
        callBack(res.data)
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function() {}
    })
  }

  module.exports = ({
    starList: addNum,
    http: http,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
  })