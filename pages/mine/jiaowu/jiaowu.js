// pages/mine/jiaowu/jiaowu.js
var app = getApp();
//页面重新加载有问题，验证码未重新加载
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
function getImg2(that) {
  that.setData({ "verifCodeUrl": "" });
  wx.downloadFile({
    url: "http://129.28.140.83:81/static/matesHelps/account/img/login.jpg",

    success: function (res) {
      console.log(res);
      if (res.statusCode == 200) {

        that.setData({ "verifCodeUrl": res.tempFilePath });
        // console.log(that.data.verifCodeUrl);
      }
      else {
        getImg2(that);
      }
    },

  });
};
function getImg(thisObj) {
  var that = thisObj;
  that.setData({ "verifCodeUrl": "" });
  let header = { 'Content-Type': 'application/json' };
  header['Cookie'] = wx.getStorageSync('sessionid');
  var localImgUrl = ""
  wx.request({
    // url: app.globalData.localUrl + "/account/getIdCaptcha",
    url: app.globalData.url + "/account/getIdCaptcha",
    header: header,
    success: function (res) {
      if (res.statusCode==200){
        console.log(res);
        // wx.setStorageSync("sessionid", res.header['Set-Cookie']);
        // sleep(3000);
        getImg2(that);
      }
      else{
        console.log(res);
      }
      
    }
  });
};



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
      getImg(this);
      setTimeout(function(){wx.stopPullDownRefresh();},1000);
      // setInterval(function(){refresh(this)},100);
    
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
    //test


    let data = {"stuId":stuId,"passwd":passwd,"captcha":captcha};
    console.log(data);
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
            icon:"success",
            duration:1000,
            success:function(res){
              setTimeout(
                function(){
                  wx.navigateBack({
                    
                  })
                },1000
              )
            }
          })
          
        }
        else{
          let msg = res.data.msg;
          if (msg.length==0){
            msg="未知原因";
          }
          wx.showToast({
            title: msg,
            duration:1000,
            icon:'loading',
            success:function(){
              // setTimeout(function(){getImg(that)},2000);
              getImg(that);
              // setInterval(function(){refresh(that)}, 100);
            }
          })
        }
      },
      
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