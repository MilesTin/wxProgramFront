const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    navbarTitle: [
      "已完成",
      "待完成",
      "已取消"
    ],
    completedOrderList: [
      /*["orderid", "value", "createTime", "expireDateTime", "order_owner", "free_lancer", "money", "pos", "kuaidi", "recieved_pos", "hidden_info"]*/
      {
        orderid: 2017141463024,
        value:2,
        pos:'中通快递',
        head_img:'/img/order/feedback.png',
        wx_name:'超级大只小肥猪',
        count:1,
        money:'5.00'

      }
    ],
    completedOrder: true,
    incompletedOrder: true,
    canceledOrder: true

  },
  onLoad: function() {
    var that = this;
    that.computeScrollViewHeight();
    //that.loadOrder();
  },
  onShow: function() {},

  /**
   * 点击导航栏
   */
  onNavBarTap: function(event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },

  /**
   * 
   */
  onBindAnimationFinish: function({
    detail
  }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })
  },
  computeScrollViewHeight() {
    var that = this;
    var query = wx.createSelectorQuery().in(this)
    query.select('.navbar').boundingClientRect(function(res) {
      //得到标题的高度
      var navHeight = res.height
      //scroll-view的高度 = 屏幕高度- navHeight
      //获取屏幕可用高度
      var screenHeight = wx.getSystemInfoSync().windowHeight
      //计算 scroll-view 的高度
      var scrollHeight = screenHeight - navHeight
      that.setData({
        scrollHeight: scrollHeight
      })
    }).exec()
  },
  loadOrder(){
    wx.request({
      url: app.globalData.url+'/account/myOrder',
      data:{
        sessionid:wx.getStorageSync('sessionid'),
        status:1
      },
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res){
        console.log(res);
      }
    })
  }
})