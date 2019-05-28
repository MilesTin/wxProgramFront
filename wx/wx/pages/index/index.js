//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {//如果全局变量有Info，就赋值给该页面的userInfo
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
