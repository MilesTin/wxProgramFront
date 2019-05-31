const app = getApp()

Page({
  data: {
    hasUserInfo: false,
  },
  onLoad: function() {
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.switchTab({
            url: '/pages/index/index',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      }
    })
  },
  getUserInfo: function(e) {//第一次授权成功，即第一次登录
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.doLogin();
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
    else{}
  },
  doLogin() {
    wx.login({
      success: res => {
        console.log("code:" + res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: app.globalData.url + '/account/login',
            data: {
              appid: 'wxc84b45f5439e7c25',
              secret: '8b23fb5594a94e3443ec77ffd2cdf185',
              code: res.code,
              head_img: app.globalData.userInfo.avatarUrl,
              wx_name: app.globalData.userInfo.nickName
            },
            method: "GET",
            header: {
              'content-type': 'application/json', // 默认值
            },
            success: function (res) {
              console.log(res);
              try {
                wx.setStorageSync('sessionid', res.cookies[0])
              } catch (e) {
                //do something when catch error
                console.log("设置sessionid缓存失败")
              }
            },
            fail() {
              console.log("登录失败!");
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})