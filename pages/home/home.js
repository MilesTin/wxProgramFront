// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    marquee:{
      'text':'大王叫我来巡山了，一二三四五',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      width: 200,
    });
    var storedText = this.data.marquee.text;
    var that = this;
    setInterval(function(){
 
      if (that.data.marquee.text.length==1){
        that.setData({"marquee":{"text":storedText}});
      }
      else{
        let prev_text = that.data.marquee.text;
        let length = prev_text.length;
        let new_length = length-1;
        let new_string = prev_text.substr(1,new_length);
        that.setData("marquee",{"text":new_string});
      }
    },1);
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
  toSendOrder:function(){
    wx.navigateTo({
      url: '../order/send/send',
    })
  },
  toReceiveOrdder:function(){
    wx.navigateTo({
      url: '../order/',//搜索后页面
    })
  }

})