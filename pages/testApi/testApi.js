// pages/testApi/testApi.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cookie = wx.getStorageSync("sessionid");
    let header = { "Content-Type": "application/x-www-form-urlencoded"};//POST请求头
    //GET Content-Type:application/json
    let header2 = {'Contetn-Type':'application/json'};
    header['Cookie'] = cookie;

    //反馈接口
    // wx.request({
    //   url:app.globalData.localUrl + "/feedback/doFeedBack",
    //   header:header,
    //   method:'POST',
    //   data:{
    //     text:"喝了拉水立方杜拉拉生理上的浪费了拉上来",
    //   },
    //   success: function(res){
    //     console.log(res);
    //   }
    // })
    //评价接口
    //如果已评价会返回404，查看response有msg
    // wx.request({
    //   url: app.globalData.localUrl + "/comment/toComment",
    //   method:'POST',
    //   header:header,
    //   data:{
    //     orderid:'1234',
    //     star:4,
    //     text:"小哥哥真棒!"
    //   }
    // })
    //
    //获取评价接口
    // wx.request({
    //   url: app.globalData.localUrl + "/comment/getComment",
    //   method:'GET',
    //   header:header2,
    //   data:{
    //     orderid:'1234',
    //   },
    //   success:function(res){
    //     console.log(res.data);
    //   }
      
    // })
    //接收订单接口
    // header2['Cookie'] = wx.getStorageSync("sessionid");
    // wx.request({
    //   url: app.globalData.localUrl + "/order/receiveOrder",
    //   header:header2,
    //   data:{
    //     orderid:'1234',
    //   },
    //   success:function(res){
    //     console.log(res);
    //   }
    // })
    //需要绑定学号，手机号，前端需要判断，然后重定向页面
    //发送订单
  //   wx.request({

  //     // url: app.globalData.url +'/order/sendOrder/',
  //     url: app.globalData.localUrl + '/order/sendOrder/',
  //     data: {
    
  //       kuaidi:"圆通",
  //       hidden_info: "手机号:17396234,取件号:1234,姓名:田明志",
  //       expireTime: 12,
  //       money: 10.0,
  //       pos: "快递街",

  //       received_pos: "西园七舍",
  //       orderid: "1234567891011",
  //     },
  //     method: 'POST',
  //     header:header,
  //     success(res) {
  //       console.log(res);
  //       wx.showToast({
  //         title: '发单成功',
  //         icon: 'success',
  //         duration: 1000,
  //         mask: true,
  //         success: function(res){
  //           wx.navigateTo({
  //             url: "/pages/order/order"
  //           })
  //         },

  //       })
  //     },
  //     fail:function(res){
  //       console.log(res);
  //     }
  // });
    //
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

  }
})