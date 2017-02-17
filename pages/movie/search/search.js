// pages/movie/search/search.js
Page({
  data: {
    searchValue: "",
    showDelete: false
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
  bindSearchInput: function (event) {
    var value = event.detail.value;
    var readyData = { showDelete: false };
    if (value.length > 0) {
      readyData = { showDelete: true };
    }
    this.setData(readyData);
  },
  bindSearchDelete: function (event) {
    var readyData = { searchValue: "", showDelete: false };
    this.setData(readyData);
  },
  bindSearchCancel: function (event) {
    wx.navigateBack();
  }

})