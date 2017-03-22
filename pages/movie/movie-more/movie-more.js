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
    comingsoon: {},
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var typeId = options.typeId;
    var readyData = {};
    if (typeId == "intheaters") {
      readyData = { "showIntheaters": true, "showComingSoon": false, "acquireIntheaters": true };
    } else {
      readyData = { "showIntheaters": false, "showComingSoon": true, "acquireComingsoon": true };
    }
    readyData["windowWidth"] = app.globalData.windowWidth;
    readyData["windowHeight"] = app.globalData.windowHeight;
    this.setData(readyData);
    that.getMovieListData(typeId);
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
  /** 通过typeId获取url */
  getURLByTypeId: function (typeId) {
    var url = app.globalData.doubanBase;
    if (typeId == "intheaters") {
      url += app.globalData.inTheaters;
    } else {
      url += app.globalData.comingSoon;
    }
    return url;
  },
  /** 获取电影数据 */
  getMovieListData: function (typeId) {
    var that = this;
    var offset = that.data[typeId].offset || 0;
    var total = that.data[typeId].total || 999;
    if (offset >= total) {
      return;
    }
    var url = that.getURLByTypeId(typeId);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        start: offset,
        count: 5
      },
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var subjects = res.data.subjects;
        var movies = that.data[typeId].movies || [];
        var offset = that.data[typeId].offset || 0;
        var total = res.data.total;
        offset += subjects.length;
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

          var genres = "";
          for (let k in subject.genres) {
            genres += subject.genres[k] + separate;
          }
          genres = genres.substring(0, genres.length - separate.length);
          var temp = {
            id: subject.id,
            title: subject.title,
            rating: subject.rating,
            collectCount: subject.collect_count,
            images: subject.images,
            subtype: subject.subtype,
            directors: directors,
            genres: genres,
            casts: casts,
            typeId: typeId,
            year: subject.year
          };
          movies.push(temp);
        }
        var readyData = {};
        readyData[typeId] = {
          categoryType: typeId,
          offset: offset,
          total: total,
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
  /** 切换标签页 */
  bindSelected: function (event) {
    var that = this;
    var tabId = event.currentTarget.dataset.tabId;
    var readyData = {};
    if (tabId == "intheaters") {
      console.log("intheaters");
      readyData = { "showIntheaters": true, "showComingSoon": false };
      if (!that.data.acquireIntheaters) {
        readyData["acquireIntheaters"] = true;
        that.getMovieListData(tabId);
      }
      this.setData(readyData);
    } else if (tabId == "comingsoon") {
      console.log("comingsoon");
      readyData = { "showIntheaters": false, "showComingSoon": true };
      if (!that.data.acquireComingsoon) {
        readyData["acquireComingsoon"] = true;
        that.getMovieListData(tabId);
      }
      that.setData(readyData);
    } else {
      console.log("error");
    }
  },
  /** 跳转到电影详情 */
  bindMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    });
  },
  /** 页面滑动到底部 */
  handleLower: function (event) {
    console.log("handleLower");
    var typeId = "";
    if (this.data.showIntheaters) {
      typeId = "intheaters";
    } else {
      typeId = "comingsoon";
    }
    this.getMovieListData(typeId);
  },
  /** 页面滑动到顶部 */
  handleUpper: function (event) {
    console.log("handleUpper");
  },
  /** 点击喜欢按钮 */
  handleWishtap: function (event) {
    wx.showModal({
      title: '提示',
      content: '一起去看吧',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      },
      showCancel: false
    });
  },
  /** 点击购票按钮 */
  handleTickettap: function (event) {
    wx.showModal({
      title: '提示',
      content: '用户点击购票',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }

})