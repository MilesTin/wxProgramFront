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
    hasUserInfo:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let whether = app.globalData.hasUserInfo;
    this.setData({"hasUserInfo":whether});
    var that = this;
    var that = this;
    var that = this;
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
  toReceiveOrder:function(){
    // console.log("hello");
    wx.switchTab({
      url: '/pages/news/news',
    })
  },
  search:function(){
    this.setData({"iconUrl":"/img/tabBar/news1.png"});
    let search = this.data.search;
    //重定向，加search
    if (!search){
      search = "";
    }
    wx.setStorageSync('search',search);

    wx.switchTab({
      url: '/pages/news/news',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  
    this.setData({"iconUrl":"/img/tabBar/news.png"})
  },
  searchInput:function(e){
      this.setData({"search":e.detail.value});
      // console.log(e.detail.value);
  },

})