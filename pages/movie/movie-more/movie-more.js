// pages/movie/movie-more/movie-more.js
Page({
  data: {
    tab1: "intheaters",
    showIntheaters: true,
    showComingSoon: false,
    tab2: "comingsoon"
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
  bindSelected: function (event) {
    var tabId = event.currentTarget.dataset.tabId;

    var readyData = {};
    if (tabId == "intheaters") {
      console.log("intheaters");
      readyData = { showIntheaters: true, showComingSoon: false };
      this.setData(readyData);
    } else if (tabId == "comingsoon") {
      console.log("comingsoon");
      readyData = { showIntheaters: false, showComingSoon: true };
      this.setData(readyData);
    } else {
      console.log("error");
    }
  }
})