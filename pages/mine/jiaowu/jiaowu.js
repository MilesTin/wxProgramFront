// pages/mine/jiaowu/jiaowu.js
var app = getApp();
//页面重新加载有问题，验证码未重新加载

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifCodeUrl:"",
    captcha:"",
    stuId:"",
    passwd:"",
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求加载验证码
    function getImg(thisObj) {
      var that = thisObj;
      let header = { 'Content-Type': 'application/json' };
      header['Cookie'] = wx.getStorageSync('sessionid');
      var localImgUrl = ""
      wx.request({
        // url: app.globalData.localUrl + "/account/getIdCaptcha",
        url: app.globalData.url + "/account/getIdCaptcha",
        header: header,
        success: function (res) {
          sleep(100);
          that.setData({ "verifCodeUrl": "http://129.28.140.83:81/static/matesHelps/account/img/login.jpg" });
          wx.setStorageSync("sessionid", res.header['Set-Cookie']);
        }
      })
    };
    function sleep(n) {
      var start = new Date().getTime();
      //  console.log('休眠前：' + start);
      while (true) {
        if (new Date().getTime() - start > n) {
          break;
        }
      }
      // console.log('休眠后：' + new Date().getTime());
    };
    
    getImg(this);
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
    function sleep(n) {
      var start = new Date().getTime();
      //  console.log('休眠前：' + start);
      while (true) {
        if (new Date().getTime() - start > n) {
          break;
        }
      }
      // console.log('休眠后：' + new Date().getTime());
    };
    function getImg(thisObj) {
      var that = thisObj;
      let header = { 'Content-Type': 'application/json' };
      header['Cookie'] = wx.getStorageSync('sessionid');
      var localImgUrl = ""
      wx.request({
        // url: app.globalData.localUrl + "/account/getIdCaptcha",
        url: app.globalData.url + "/account/getIdCaptcha",
        header: header,
        success: function (res) {
          sleep(100);
          that.setData({ "verifCodeUrl": "http://129.28.140.83:81/static/matesHelps/account/img/login.jpg" });
          wx.setStorageSync("sessionid", res.header['Set-Cookie']);
        }
      })};
      getImg(this);
      setTimeout(function(){wx.stopPullDownRefresh();},1000);
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
    let captcha = this.data.captcha;
    let stuId = this.data.stuId;
    let passwd = this.data.passwd;
    var that = this;
    let header = { "Content-Type": "application/x-www-form-urlencoded" };
    let data = {"stuId":stuId,"passwd":passwd,"captcha":captcha};
    console.log(data);
    header['Cookie'] = wx.getStorageSync("sessionid");
    wx.request({
      // url: app.globalData.localUrl + "/account/verifStuId",
      url:app.globalData.url + "/account/verifStuId",
      header:header,
      data:data,
      method:'POST',
      success:function(res){
        console.log(res);
        if (res.statusCode==200){
          wx.showToast({
            title: '绑定成功',
            success:function(res){
              wx.navigateTo({
                url: '../../mine/mine',
              })
            }
          })
          
        }
        else{
          that.onPullDownRefresh();
          that.onLoad();
        }
      },
      fail:function(){
        that.onPullDownRefresh();
        that.onLoad();
      }
    })
  },
  passwdInput:function(e){
    this.setData({"passwd":e.detail.value});
  },
  captchaInput: function (e) {
    this.setData({ "captcha": e.detail.value });
  },
  stuIdInput:function(e){
    this.setData({ "stuId": e.detail.value });
  },
 
})