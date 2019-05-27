var util = require('../../utils/util.js');
const app = getApp();
var normalPage = 1; //综合排序
var timePage = 1; //时间最新
var pricePage = 1; //价格优先
var resultLength = 10; //每次加载10个数据项
var loadLength; //每次加载list的长度
var bottomFlag = 0; //用于实现底部showToast只触发一次
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    maxlength: 20,
    navbarActiveIndex: 0,
    navbarTitle: [
      "综合排序",
      "最新",
      "完成时间",
      "价格优先"
    ],
    orderList: [],
    navbarActiveIndex: 0 //当前处在的页面
  },
  onLoad: function() {
    var that = this;
    that.computeScrollViewHeight();
    that.loadOrder();
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
    console.log(event.currentTarget.dataset.navbarIndex)
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
    query.select('.news-search').boundingClientRect()
    query.select('.navbar').boundingClientRect()
    query.exec(res => {
      //得到标题的高度
      var searchHeight = res[0].height;
      var navHeight = res[1].height;
      //scroll-view的高度 = 屏幕高度- navHeight
      //获取屏幕可用高度
      var screenHeight = wx.getSystemInfoSync().windowHeight
      //计算 scroll-view 的高度
      var scrollHeight = screenHeight - navHeight - searchHeight;
      that.setData({
        scrollHeight: scrollHeight
      })
    })
  },
  textInput: function(e) {},



  loadOrder( /*search, page, orderByTime, orderByPrice*/ ) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: app.globalData.url + '/order/search',
      data: {
        //search: '',//可有可无
        page: normalPage,
        //orderByTime:'', //1 or - 1 可有可无，1表示最新，- 1表示最久远, 创建日期
        //orderByPrice:'', //同上，1为价格最高排序
      },
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res);
        console.log(res.data.results.length);
        //将第一次加载的results长度赋值给loadLength;用于loadMoreOrder的判断;
        /*if (res.data.results.length>0){
          that.setData({
            have_order: true
          })
        }*/
        loadLength = res.data.results.length;
        var orderList = that.data.orderList;
        for (var i = 0; i < res.data.results.length; i++) {
          orderList.push(res.data.results[i])
          //字符串格式处理
          orderList[i].createTime = util.formatTime(new Date(orderList[i].createTime));
          orderList[i].expireDateTime = util.formatTime(new Date(orderList[i].expireDateTime));
          orderList[i].money = (parseFloat(orderList[i].money)).toFixed(2);
          //console.log(orderList[i].money);
        }
        that.setData({
          orderList
        })
        console.log(orderList);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  loadMoreOrder() {
    var that = this;
    if (loadLength < resultLength) { //上一次加载的数据项小于resultLength=10；表明数据已经加载完全
      if (bottomFlag == 0) {
        wx.showToast({ //如果全部加载完成了也弹一个框
          title: '无更多数据',
          duration: 1000
        });
        bottomFlag = 1;
      } else {}
    } else { //仍然有数据项可以加载
      that.loadOrder();
    }
  },
  /*getOrderInfo(e){//获得某个订单的更多信息，需要登录
    console.log(e.currentTarget.dataset.index);
      var that=this;
    var index = e.currentTarget.dataset.index;
      wx.request({
        url: app.globalData.url +'/order/getOrder',
        data: {
          sessionid: wx.getStorageSync('sessionid'),
          orderid: that.data.orderList[index].orderid
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res){
          console.log(res);
        }
      })
      wx.navigateTo({
        url: '/pages/news/orderInfo/orderInfo?orderList='+that.data.orderList[e.currentTarget.dataset.index],
      })
  },*/
  receiveOrder(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.orderList[index].orderid);
    wx.showModal({
      title: '消息',
      content: '您是否确认接受此订单',
      success(res) {
        if (res.confirm) { //用户确认接单
          wx.request({
            url: app.globalData.url + '/order/receiveOrder',
            data: {
              sessionid: wx.getStorageSync('sessionid'),
              orderid: that.data.orderList[index].orderid
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
            success(res) {
              console.log(res);
              wx.showToast({
                title: '接单成功',
                icon: 'success',
                duration: 1000,
                mask: true,
              })
            },
            fail() {
              wx.showToast({
                title: '接单失败',
                icon: 'fail',
                duration: 1000,
                mask: true,
              })
            }
          })
        } else if (res.cancel) { //用户取消接单
        }
      }
    })
  }

})