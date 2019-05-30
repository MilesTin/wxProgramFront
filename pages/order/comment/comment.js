// pages/feedback/feedback.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxlength: 140,
    cursor: -1,
    current_words: 0,
    commentText: "",
    disabled: true,
    orderid:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    that.setData({
      orderid:options.orderid
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
  textInput: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    this.setData({
      commentText: value
    })
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    this.setData({
      current_words: len //当前字数  
    });
    if (len >= 10) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
    //最多字数限制
    if (len > this.data.maxlength) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
  },
  comment: function (e) {
    console.log(e);
    var that = this;
    that.setData({
      disabled: true
    })
    wx.request({
      url: app.globalData.url+'/comment/toComment',
      data:{
        orderid:that.data.orderid,
        star:5,
        text:e.detail.value.comment
      },
      method:'POST',
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        that.setData({
          feedback_text: ''
        })
        console.log(res)
        if(res.data.msg=="评价成功"){
          wx.showToast({
            title: '评价成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }else if(res.data.msg=="你已评价"){
          wx.showToast({
            title: '请勿重复评价',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
          setTimeout(function () {
            wx.navigateBack({
              url: '/pages/order/order',
            })
          }, 1500)
      }
    })
  }
})