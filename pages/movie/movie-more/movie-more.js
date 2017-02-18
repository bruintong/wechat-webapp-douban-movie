// pages/movie/movie-more/movie-more.js
var app = getApp();
Page({
  data: {
    tabIntheaters: "intheaters",
    showIntheaters: true,
    showComingSoon: false,
    tabComingsoon: "comingsoon",
    acquireIntheaters: false,
    acquireComingsoon: false,
    intheaters: {},
    comingsoon: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var typeId = options.typeId;
    var readyData = {};
    var url = app.globalData.doubanBase;
    if (typeId == "intheaters") {
      readyData = { "showIntheaters": true, "showComingSoon": false, "acquireIntheaters": true };
      url += app.globalData.inTheaters;
    } else {
      readyData = { "showIntheaters": false, "showComingSoon": true, "acquireComingsoon": true };
      url += app.globalData.comingSoon;
    }
    this.setData(readyData);
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
        var readyData = {};
        readyData[typeId] = {
          categoryType: typeId,
          movies: movies
        }
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
  bindSelected: function (event) {
    var that = this;
    var tabId = event.currentTarget.dataset.tabId;
    var url = app.globalData.doubanBase;
    var readyData = {};
    if (tabId == "intheaters") {
      console.log("intheaters");
      readyData = { "showIntheaters": true, "showComingSoon": false };
      if (!that.data.acquireIntheaters) {
        url += app.globalData.inTheaters;
        readyData["acquireIntheaters"] = true;
        that.getMovieListData(url, tabId);
      }
      this.setData(readyData);
    } else if (tabId == "comingsoon") {
      console.log("comingsoon");
      readyData = { "showIntheaters": false, "showComingSoon": true };
      if (!that.data.acquireComingsoon) {
        url += app.globalData.comingSoon;
        readyData["acquireComingsoon"] = true;
        that.getMovieListData(url, tabId);
      }
      that.setData(readyData);
    } else {
      console.log("error");
    }
  },
  bindMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    });
  }

})