// pages/order/send/send.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0', value: '低' },
      { name: '1', value: '中', checked: 'true' },
      { name: '2', value: '高' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.computeScrollViewHeight();
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
  computeScrollViewHeight() {
    var that = this;
      //获取屏幕可用高度
      var screenHeight = wx.getSystemInfoSync().windowHeight
      that.setData({
        scrollHeight: screenHeight-60//减去底部button高度
      })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  formSubmit:function(e){
    console.log(e);
    wx.request({
      url: app.globalData.url +'/order/sendOrder',
      data: {
        sessionid:wx.getStorageSync('sessionid'),
        value: e.detail.value.value,
        hidden_info: e.detail.value.hidden_info,
        expireTime: e.detail.value.expireTime,
        money: e.detail.value.money,
        pos: e.detail.value.pos,
        received_pos: e.detail.value.received_pos
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success(res){
        console.log(res);
        wx.showToast({
          title: '发单成功',
          icon: 'success',
          duration: 1000,
          mask:true,
          success(){
            wx.navigateTo({
              url: "/pages/order/order"
            })
          }
        })
      }
    })
    wx.navigateTo({
      url: '/pages/order/order',
    })
  }
})