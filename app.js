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
        doubanBase: "https://api.douban.com",
        inTheaters: "/v2/movie/in_theaters",
        comingSoon: "/v2/movie/coming_soon",
        top250: "/v2/movie/top250",
        weekly: "/v2/movie/weekly",
        usBox: "/v2/movie/us_box",
        newMovies: "/v2/movie/new_movies",
        subject: "/v2/movie/subject/",
        celebrity: "/v2/movie/celebrity/",
        search: "/v2/movie/search?q="
    }
})