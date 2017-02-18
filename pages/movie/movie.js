// /pages/movie/movie.js
var app = getApp();

Page({
  data: {
    acquiredSelected: false,
    inTheaters: {},
    comingSoon: {},
    top250: {},
    weekly: {},
    newMovie: {},
    usBox: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var inTheatersURL = app.globalData.doubanBase + app.globalData.inTheaters + "?start=0&&count=10";
    var comingSoonURL = app.globalData.doubanBase + app.globalData.comingSoon + "?start=0&&count=10";

    this.getMovieListData(inTheatersURL, "inTheaters", "影院热映");
    this.getMovieListData(comingSoonURL, "comingSoon", "即将上映");
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
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        that.processMovieListData(data, settedKey, categoryTitle);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  },
  processMovieListData: function (data, settedKey, categoryTitle) {
    var movies = [];
    for (let idx in data.subjects) {
      var subject = data.subjects[idx];
      var temp = {
        id: subject.id,
        title: subject.title,
        rating: subject.rating,
        collectCount: subject.collect_count,
        images: subject.images,
        subtype: subject.subtype,
        directors: subject.directors,
        casts: subject.casts,
        year: subject.year
      };
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
  },
  handleTouchMove: function (event) {
    var offsetTop = event.target.offsetTop;
    console.log("handleTouchMove offsetTop: " + offsetTop);
    if (offsetTop > 10 && !this.data.acquiredSelected) {
      var top250URL = app.globalData.doubanBase + app.globalData.top250 + "?start=0&&count=12";
      console.log("handleTouchMove top250URL: " + top250URL);
      if (!this.data.acquiredSelected) {
        var that = this;
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
        });
        wx.request({
          url: top250URL,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: { 'content-type': "json" }, // 设置请求的 header
          success: function (res) {
            // success
            var data = res.data;
            that.processSelectedListData(data);
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
            wx.hideToast();
          }
        });
        var readyData = {};
        readyData["acquiredSelected"] = {
          "acquiredSelected": true
        }
        this.setData(readyData);
      }
    }
  },
  processSelectedListData: function (data) {
    var top250 = [];
    var weekly = [];
    var newMovie = [];
    var usBox = [];
    for (let idx in data.subjects) {
      var subject = data.subjects[idx];
      var temp = {
        id: subject.id,
        title: subject.title,
        rating: subject.rating,
        collectCount: subject.collect_count,
        images: subject.images,
        subtype: subject.subtype,
        directors: subject.directors,
        casts: subject.casts,
        year: subject.year
      };
      if (idx < 3) {
        top250.push(temp);

      } else if (idx < 6) {
        weekly.push(temp);
      } else if (idx < 9) {
        newMovie.push(temp);
      } else {
        usBox.push(temp);
      }
    }
    var readyData = {};
    readyData["top250"] = {
      categoryType: "top250",
      categoryTitle: "豆瓣Top250",
      desc: "8分以上好电影",
      movies: top250
    };
    readyData["weekly"] = {
      categoryType: "weekly",
      categoryTitle: "口碑榜",
      desc: "8分以上好电影",
      movies: weekly
    };
    readyData["newMovie"] = {
      categoryType: "newMovie",
      categoryTitle: "新片榜",
      desc: "8分以上好电影",
      movies: newMovie
    };
    readyData["usBox"] = {
      categoryType: "usBox",
      categoryTitle: "票房榜",
      desc: "8分以上好电影",
      movies: usBox
    };

    this.setData(readyData);
  },
  bindSearchNavigate: function (event) {
    wx.navigateTo({
      url: '/pages/movie/search/search'
    })
  },
  bindMore: function (event) {
    var typeId = event.currentTarget.dataset.typeId;
    wx.navigateTo({
      url: '/pages/movie/movie-more/movie-more?typeId=' + typeId
    });
  },
  bindSelected: function (event) {
    var typeId = event.currentTarget.dataset.typeId;
    var typeTitle = event.currentTarget.dataset.typeTitle;
    wx.navigateTo({
      url: '/pages/movie/selected/selected?typeId=' + typeId + "&&typeTitle=" + typeTitle
    });
  },
  bindMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    });
  }
})