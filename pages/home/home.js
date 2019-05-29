// pages/mine/mine.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    marquee:{
      'text':'',
    },
    storedText:'',
    iconUrl:"/img/tabBar/news.png",
    search:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    wx.request({
      url: app.globalData.url + "/announce",
      method:'GET',
      'Content-Type':'application/json',
      success:function(res){
        console.log(res.data);
        let announce = res.data[0];
        that.setData({"marquee":{"text":announce.content}});
        that.setData({"storedText":announce.content});
        storedText = that.data.marquee.text;
      }
    });
    this.setData({
      width: 200,
    });
    var storedText = that.data.storedText;
    console.log(storedText);
    setInterval(function(){
      // console.log(that.data.marquee.text.length);
      if (that.data.marquee.text.length==1){
        that.setData({"marquee":{"text":storedText}});
      }
      else{
        let prev_text = that.data.marquee.text;
        let length = prev_text.length;
        let new_length = length-1;
        let new_string = prev_text.substr(1,new_length);
        // console.log(new_string);
        that.setData({"marquee":{"text":new_string}});
      }
  },1000);
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
  },

  search:function(){
    this.setData({"iconUrl":"/img/tabBar/news1.png"});
    let search = this.data.search;
    //重定向，加search
  },
  searchInput:function(e){
      this.setData({"search":e.detail.value});
      // console.log(e.detail.value);
  },
})