// pages/mine/feedback/feedback.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "feedback":"",
  },
  feedbackInput:function(e){
    this.setData({"feedback":e.detail.value});
    // console.log(e.detail.value);
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  submit:function(){
    let feedback = this.data.feedback;
    console.log(feedback);
    let header = { "Content-Type": "application/x-www-form-urlencoded"};
    header['Cookie'] = wx.getStorageSync('sessionid');
    wx.request({
      url: app.globalData.url + "/feedback/doFeedBack",
      method:'POST',
      header:header,
      data:{
        'text':feedback,
      },
      success:function(res){
        console.log(res.data);
        if (res.statusCode==200){
          wx.showToast({
            title: '反馈成功',
            duration:1000,
            icon:'success',
            success:function(){
              setTimeout(function (){
                wx.navigateBack({
                  
                })
              }, 1000);
              
            }
          })
        }
        else{
          let msg = res.data.msg;
          if (msg.length==0){
            msg = "未知原因";
          }
          wx.showToast(
            {
              'title':msg,
              'duration':1000,
              'icon':'loading',
            }
          );
        }
      }
    })
  }
})