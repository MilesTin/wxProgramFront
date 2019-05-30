// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'user':{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      width:200
    });
    var that = this;
    let header = {"Content-Type":"application/json"};
    header['Cookie'] = wx.getStorageSync("sessionid");
    wx.request({
      url:app.globalData.localUrl + "/account/myInfo",
      // url: app.globalData.url + "/account/myInfo',
      header:header,
      success:function(res){
        console.log(typeof(res.data));
        console.log(res.data);
        let data = res.data;
        data = data.split("'").join('"');
        console.log(data)
        data = JSON.parse(data);
        that.setData({"user":data});
      
      }
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
  toJiaoWu:function(){
    wx.navigateTo({
      url: 'jiaowu/jiaowu',
    })
  },
  toFeedBack:function(){
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  toDeveloper:function(){
    wx.navigateTo({
      url: 'developer/developer',
    })
  },
  toSetting:function(){
    wx.navigateTo({
      url: 'setting/setting',
    })
  },
  rateStar(index) {
    var star = document.getElementById('star');
    var items = star.getElementsByTagName("li");
    index = parseInt(index) - 1; //因为一个星星由2个a标签组成的,所以减掉1
    var tem = -1;
    //遍历所有的li标签
    for(var i = 0; i<items.length; i++) {
  if (index > i * 2) { //当index大于i*2的时候,就填充i个数量的满格星星
    items[i].style.background = "url() no-repeat";
    items[i].style.backgroundSize = "100% 100%";
  } else {
    if (tem == -1) {
      tem = i;
    }
    items[i].style.background = "url() no-repeat"; //填充灰色状态的星星
    items[i].style.backgroundSize = "100% 100%";
  }
}
//判断index是否等于偶数
if (index == parseInt(tem) * 2) {
  //当前li元素的背景设置成半格星星状态
  items[tem].style.background = "url() no-repeat";
  items[tem].style.backgroundSize = "100% 100%";
}
document.getElementById('getStarRate').innerHTML = (parseInt(index) + 1) * 0.5;},

})