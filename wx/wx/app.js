//app.js
App({
  onLaunch: function() {
    var that = this;

    //登录


    // 获取用户信息
    wx.getSetting({
      success: res => { //调用geSetting成功
        if (res.authSetting['scope.userInfo']) { //授权成功
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({ //每次都会调用getUserInfo，防止Info更新
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo //将getUserInfo设为全局变量
              this.doCheckSession();
              //that.doCheckSession();
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    url: 'http://129.28.140.83:81/matesHelps',
  },
  doLogin() {
    wx.login({
      success: res => {
        console.log("code:" + res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: this.globalData.url + '/account/login',
            data: {
              appid: 'wxc84b45f5439e7c25',
              secret: '8b23fb5594a94e3443ec77ffd2cdf185',
              code: res.code,
              head_img:this.globalData.userInfo.avataUrl
            },
            method: "GET",
            header: {
              'content-type': 'application/json', // 默认值
            },
            success: function(res) {
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
  },
  doCheckSession() {
    var that = this;
    // 检查sessionid
    let loginFlag = wx.getStorageSync('sessionid');
    if (loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(未过期)
        success: function() {
          // 业务逻辑处理
          console.log("sessionid有效")
        },
        // session_key 过期
        fail: function() {
          // session_key过期，重新登录
          that.doLogin();
        }
      });
    } else {
      // 无skey，作为首次登录
      that.doLogin();
    }
  }
})