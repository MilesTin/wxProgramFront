// pages/order/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[
      "已完成",
      "已取消",
      "未完成",
      "已过期"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.index);
    var list=JSON.parse(options.list);
    //console.log(list);
    that.setData({
      list:list,
      index:options.index
    })
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
  watch(){
    var that=this;
    wx.showModal({
      title: '取件信息',
      content: that.data.list.hidden_info,
      success(res) {
        if (res.confirm) {
          //do nothing
        } else if (res.cancel) {
          //do nothing
        }
      }
    })
  }
})