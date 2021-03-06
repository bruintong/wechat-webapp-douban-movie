App({
    onLaunch: function () {
        var that = this;
        // 使用设备可视宽高
        wx.getSystemInfo({
            success: function (res) {
                that.globalData.windowWidth = res.windowWidth;
                that.globalData.windowHeight = res.windowHeight;
            }
        });
    },
    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo);
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                        }
                    })
                }
            });
        }
    },
    globalData: {
        userInfo: null,
        windowWidth: 0,
        windowHeight: 0,
        doubanBase: "https://www.easy-mock.com/mock/5cd0faf6e1fe52746e062d07/weapp/douban/",
        inTheaters: "movie/in_theaters",
        comingSoon: "movie/coming_soon",
        top250: "movie/top250",
        subject: "movie/subject/",
        celebrity: "movie/celebrity/",
        search: "movie/search"
    }
})