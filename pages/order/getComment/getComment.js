// pages/order/getComment/getComment.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ownerImg:'',
    lancerImg:'',
    orderid:'',
    comment:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options);
    that.setData({
      orderid: options.orderid,
      ownerImg: options.ownerImg,
      lancerImg: options.lancerImg
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
  getComment(e) {
    console.log(e);
    var that = this;
    wx.request({
      url: app.globalData.url + '/comment/getComment',
      data: {
        orderid: that.data.orderid
      },
      method: 'GET',
      header: {
        'Contetn-Type': 'application/json',
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        console.log(res.data);
        var comment = res.data.comment.replace(/\'/g, "\"");
        console.log(comment);
        comment = JSON.parse(comment);
        console.log(comment);
        if(comment.owner_text.length==0){
          comment.owner_text="我还没有评价哦~";
        }
        if (comment.lancer_text.length == 0) {
          comment.lancer_text = "我还没有评价哦~";
        }
        that.setData({
          comment
        })
      }
    })
  }
})