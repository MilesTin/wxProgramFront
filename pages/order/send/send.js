// pages/order/send/send.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0', value: '低' },
      { name: '1', value: '中', checked: 'true' },
      { name: '2', value: '高' }
    ],
    express: ['中通快递','圆通快递', '申通快递', '天天快递','东峻快递','韵达快递','百世快递','顺丰快递','京东物流','EMS'],
    index:0
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
      scrollHeight: screenHeight - 60//减去底部button高度
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  formSubmit: function (e) {
    console.log(e);
    let header = app.globalData.header;
    header['Cookie'] = wx.getStorageSync("sessionid");
    let data = {
        orderid:e.detail.value.orderid,
        hidden_info: e.detail.value.hidden_info,
          expireTime: e.detail.value.expireTime,
            money: e.detail.value.money,
              pos: e.detail.value.pos,
                received_pos: e.detail.value.received_pos,
                  kuaidi: e.detail.value.received_pos
    };
    console.log(data);
    // data = {

    //     kuaidi:"圆通",
    //     hidden_info: "手机号:17396234,取件号:1234,姓名:田明志",
    //     expireTime: 12,
    //     money: 10.0,
    //     pos: "快递街",

    //     received_pos: "西园七舍",
    //     orderid: "12345678910223122344211",
    //   },
    // console.log(data);
    wx.request({
      url: app.globalData.url + '/order/sendOrder/',
      data: data,
      method: 'POST',
      header: header,
        success: function(res) {
          if (res.statusCode==200) {
            wx.showToast({
              title: "发单成功",
              icon: 'success',
              duration: 1000,
              mask: true,
            });
            setTimeout(function(){
              wx.navigateBack({
                
              })},1000);
            
            
          }
          else{
            wx.showToast({
              title: res.data.msg,
              icon:'loading',
              duration:1000,
            })
          }
      }
    })
  
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  }
})