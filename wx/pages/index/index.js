//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
<<<<<<< HEAD
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
=======
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {//如果全局变量有Info，就赋值给该页面的userInfo
>>>>>>> 提交
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
<<<<<<< HEAD
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
=======
    }

    var orderList = [{
      express: "西园七舍中通快递",
      deadline: '2019/05/15',
      charge: 3,
      date: '2019/05/15',
      day: '23:34'
    },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      }, {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      }, {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      }, {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },
      {
        express: "西园七舍中通快递",
        deadline: '2019/05/15',
        charge: 3,
        date: '2019/05/15',
        day: '23:34'
      },];
      wx.setStorageSync('orderList', orderList)
  },
  getUserInfo: function(e) {
    console.log(e)
    if(e.detail.userInfo){}
>>>>>>> 提交
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
