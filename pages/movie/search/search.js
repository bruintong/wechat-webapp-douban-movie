// pages/movie/search/search.js
var app = getApp();
Page({
  data: {
    searchValue: "",
    showDelete: false,
    result: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  /** 搜索影视 */
  bindSearchInput: function (event) {
    var value = event.detail.value;
    var readyData = { showDelete: false };
    if (value.length > 0) {
      readyData = { showDelete: true };
      this.handleSearchData(value);
    }
    this.setData(readyData);
  },
  /**清空输入框 */
  bindSearchDelete: function (event) {
    var readyData = { searchValue: "", showDelete: false, result: {} };
    this.setData(readyData);
  },
  /**点击取消 */
  bindSearchCancel: function (event) {
    wx.navigateBack();
  },
  /** 提交搜索请求 */
  handleSearchData: function (value) {
    var that = this;
    var serchURL = app.globalData.doubanBase + app.globalData.search + value + "&&start=0&&count=10";
    wx.request({
      url: serchURL,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        that.processSearchData(data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  /**组装搜索数据 */
  processSearchData: function (data) {
    var movies = [];
    for (let idx in data.subjects) {
      var subject = data.subjects[idx];
      var directors = "";
      var separate = " / ";
      for (let i in subject.directors) {
        directors += subject.directors[i].name + separate;
      }
      directors = directors.substring(0, directors.length - separate.length);
      var summary = subject.rating.average + "分" + separate + subject.year + separate + directors;
      var temp = {
        id: subject.id,
        casts: subject.casts,
        collect_count: subject.collect_count,
        directors: subject.directors,
        title: subject.title,
        images: subject.images,
        rating: subject.rating,
        year: subject.year,
        summary: summary
      };
      movies.push(temp);
    }
    var readyData = {};
    readyData["result"] = {
      subjects: movies
    }

    this.setData(readyData);
  },
  /** 点击进入搜索条目 */
  handletap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    })
  }
})