// pages/welcome/welcome.js
var app = getApp();
Page({
  data: {
    userInfo: {},
    motto: '开始体验'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
      console.log("userInfo: " + userInfo);
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
  },
  //事件处理函数
  bindViewTap: function () {
    wx.redirectTo({
      url: '/pages/movie/movie'
    });
  },
})