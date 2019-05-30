// pages/mine/verification/verification.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: 'http://129.28.140.83:81/static/matesHelps/account/img/login.jpg',
    loadImg: false,
    verification: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getVerificationCode();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getVerificationCode() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/account/getIdCaptcha',
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        if (res.data.msg == '获取验证码成功')
          that.setData({
            loadImg: true
          })
      }
    })
  },
  verify() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/account/verifStuId',
      data: {
        stuId: 2017141463024,
        password: 463024,
        captcha: that.data.verification
      },
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        console.log(res);
      }
    })
  },
  textInput: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      verification: e.detail.value
    })
  }
})