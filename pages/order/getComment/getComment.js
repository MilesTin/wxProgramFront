// pages/order/getComment/getComment.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options);
    that.setData({
      orderid: options.orderid
    })
    that.getComment();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getComment() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/comment/getComment',
      data: {
        orderid: that.data.orderid,
      },
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        console.log(res);
      }
    })
  }
})