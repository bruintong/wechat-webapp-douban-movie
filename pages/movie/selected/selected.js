// pages/movie/selected/selected.js
var app = getApp();
Page({
  data: {
    typeTitle: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var typeId = options.typeId;
    var typeTitle = options.typeTitle;
    wx.setNavigationBarTitle({
      title: typeTitle
    });
    var url = app.globalData.doubanBase + app.globalData.top250;
    that.getMovieListData(url, typeId);

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getMovieListData: function (url, typeId) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    if (typeId == "top250") {
      url += "?start=0&&count=50";
    } else if (typeId == "weekly") {
      url += "?start=50&&count=50";
    } else if (typeId == "newMovie") {
      url += "?start=100&&count=50";
    } else {
      url += "?start=150&&count=50";
    }
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var subjects = res.data.subjects;
        var movies = [];
        for (let idx in subjects) {
          var subject = subjects[idx];
          var directors = "";
          for (let i in subject.directors) {
            directors += subject.directors[i].name;
          }
          var casts = "";
          var separate = " / ";
          for (let j in subject.casts) {
            casts += subject.casts[j].name + separate;
          }
          casts = casts.substring(0, casts.length - separate.length);
          var temp = {
            id: subject.id,
            title: subject.title,
            rating: subject.rating,
            collectCount: subject.collect_count,
            images: subject.images,
            subtype: subject.subtype,
            directors: directors,
            casts: casts,
            typeId: typeId,
            year: subject.year
          };
          movies.push(temp);
        }
        var readyData = {
          selectedType: typeId,
          movies: movies
        };
        that.setData(readyData);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    });
  },
  bindMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    });
  }
})