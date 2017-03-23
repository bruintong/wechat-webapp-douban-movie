// pages/movie/movie-detail/movie-poster/movie-poster.js
var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var posterUrl = options.posterUrl;
    var readyData = { "posters": [posterUrl] };
    this.setData(readyData);
    // 使用设备可视宽高
    that.setData({
      "windowWidth": app.globalData.windowWidth,
      "windowHeight": app.globalData.windowHeight
    });
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
  }
})