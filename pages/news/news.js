var util = require('../../utils/util.js');
const app = getApp();

//page每次加载10个数据项。+1操作push数据项
var normalPage = 1; //综合排序
var timePage = 1; //时间最新
var pricePage = 1; //价格优先

//Flag用于判断页面是否已经完全加载数据项,同时用于实现showToast只触发一次
var normalFlag = 0;
var timeFlag = 0;
var priceFlag = 0;

//length记录每次加载数据项的长度,初始设为10只是为了操作方便
var normalLength = 10;
var timeLength = 10;
var priceLength = 10;

//每次加载10个数据项
const LENGTH = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '', //search输入文本
    maxlength: 20,
    navbarActiveIndex: 0, //初始页面为综合排序页面
    navbarTitle: [
      "综合排序",
      "最新",
      "价格优先"
    ],
    normalList: [],
    timeList: [],
    priceList: [],
    navbarActiveIndex: 0 //当前处在的页面
  },
  onUnload: function () {
    wx.setStorageSync("search","");
  },
  onLoad: function(options) {
    var search = wx.getStorageSync("search");
    // console.log("search:"+search);
    var normalLength = 10;
    var timeLength = 10;
    var priceLength = 10;
    var normalPage = 1; //综合排序
    var timePage = 1; //时间最新
    var pricePage = 1; //价格优先
    var normalFlag = 0;
    var timeFlag = 0;
    var priceFlag = 0;
    var that = this;
    that.computeScrollViewHeight();
    var orderList = that.data.normalList;
    if (search){
      wx.setStorageSync("search",search);
      that.loadOrder([], 0, search, normalPage, '', '');
      that.loadOrder([], 1, search, timePage, 1, '');
      that.loadOrder([], 2, search, pricePage, '', 1);
    }
    else{
      that.loadOrder([], 0, search, normalPage, '', '');
      that.loadOrder([], 1, search, timePage, 1, '');
      that.loadOrder([], 2, search, pricePage, '', 1);
    }
   
  },
  onShow: function() {},

  //下拉刷新
  onPullDownRefresh: function() {
    var that = this;
    wx.showNavigationBarLoading();
    var index = that.data.navbarActiveIndex;

    that.resetOrderList(0);
    that.resetOrderList(1);
    that.resetOrderList(2);
    that.resetFlag_page_length(0);
    that.resetFlag_page_length(1);
    that.resetFlag_page_length(2);
    var orderList = that.getOrderList(index);
    var page = that.getPage(index);
    var search = "";
    if (!search){
      search = "";
    }
    that.loadOrder([], 0, search, normalPage, '', '');
    that.loadOrder([], 1, search, timePage, 1, '');
    that.loadOrder([], 2, search, pricePage, '', 1);
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  /**
   * 点击导航栏
   */
  onHide:function(){
    wx.setStorageSync("search", "");
  },
  onNavBarTap: function(event) {
    var that = this;
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
    //console.log(event.currentTarget.dataset.navbarIndex)

    //判断是否第一次打开时间或者价格页面
    var search = wx.getStorageSync("search");
    if (!search){
      search = "";
    }
    if (timePage == 1 && navbarTapIndex == 1) {
      var orderList = that.data.timeList;
      that.loadOrder(orderList, 1, '', 1, 1, '');
    }
    if (pricePage == 1 && navbarTapIndex == 2) {
      var orderList = that.data.priceList;
      that.resetOrderList(2);
      that.loadOrder(orderList, 2, search, 1, '', 1);
    }
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
      // console.log(scrollHeight);
    })
  },

  textInput: function(e) {
    var that = this;
    console.log(e.detail.value);
    that.setData({
      inputValue: e.detail.value
    })
    console.log(that.data.inputValue.length);
  },


  //参数说明orderList:传入需要push的list,index:操作的页面
  loadOrder(orderList, index, search, page, orderByTime, orderByPrice) {
    // console.log("151");
    // console.log(orderList,index,search,page,orderByTime,orderByPrice);
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: app.globalData.url + '/order/search',
      data: {
        search: search, //可有可无
        page: page,
        orderByTime: String(orderByTime), //1 or - 1 可有可无，1表示最新，- 1表示最久远, 创建日期
        orderByPrice: String(orderByPrice), //同上，1为价格最高排序
      },
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        // console.log("174");
        // console.log(res);
        /*if (res.data.results.length>0){
          that.setData({
            have_order: true
          })
        }*/
        var results = res.data.results;
        for (var i = 0; i < res.data.results.length; i++) {
        
          //字符串格式处理
          results[i].createTime = util.formatTime(new Date(results[i].createTime));
          results[i].expireDateTime = util.formatTime(new Date(results[i].expireDateTime));
          results[i].money = (parseFloat(results[i].money)).toFixed(2);
        }
        // console.log("len(results):");
        // console.log(results.length);
        orderList = results;
        // console.log("orderList");
        // console.log(orderList.length);
        // console.log(orderList);
        if (index == 0) {
          that.setData({
            normalList: orderList
          })
          normalPage = normalPage + 1;
          normalLength = res.data.results.length;
          // console.log(that.data.normalList);
        } else if (index == 1) {
          that.setData({
            timeList: orderList
          })
          // console.log(that.data.timeList);
          timePage = timePage + 1;
          timeLength = res.data.results.length;
        } else if (index == 2) {
          that.setData({
            priceList: orderList
          })
          // console.log(that.data.priceList);
          pricePage = pricePage + 1;
          priceLength = res.data.results.length;
        }
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  loadMoreOrder() {
    var that = this;
    var index = that.data.navbarActiveIndex;
    var search =wx.getStorageSync("search");
    if (!search){
      search = "";
    }
    if (index == 0) {
      var flag = normalFlag;
      var length = normalLength;
    } else if (index == 1) {
      var flag = timeFlag;
      var length = timeLength;
    } else if (index == 2) {
      var flag = priceFlag;
      var length = priceLength;
    }
    if (flag == 1) {
      //do nothing,即表明数据已经加载完全，并且showToast已经触发
    } else if (flag == 0) {
      if (length < LENGTH) { //数据加载完全，但showToast未触发
        wx.showToast({
          title: '无更多数据',
          duration: 1000
        });
        that.setFlag(index);
      } else { //仍有数据加载（也可能是数据项数刚好为10的整数倍）
        var orderList = that.getOrderList(index);
        //var page=that.setPage(index);
        if (index == 1) {
          that.loadOrder(orderList, 1, search, timePage, 1, '');
        } else if (index == 2) {
          that.loadOrder(orderList, 2, search, pricePage, '', 1);
        } else if (index == 0) {
          that.loadOrder(orderList, 0,search, normalPage, '', '');
        }
      }
    }
  },
  setFlag(index) {
    if (index == 0) {
      normalFlag = 1;
    } else if (index == 1) {
      timeFlag = 1;
    } else if (index == 2) {
      priceFlag = 1;
    }
  },
  resetFlag_page_length(index) {
    if (index == 0) {
      normalPage = 1;
      normalLength = 10;
      normalFlag = 0;
    } else if (index == 1) {
      timePage = 1;
      timeLength = 10;
      timeFlag = 0;
    } else if (index == 2) {
      pricePage = 1;
      priceLength = 10;
      priceFlag = 0;
    }
  },
  getOrderList(index) {
    var that = this;
    if (index == 0) {
      return that.data.normalList;
    } else if (index == 1) {
      return that.data.timeList;
    } else if (index == 2) {
      return that.data.priceList;
    }
  },
  resetOrderList(index) {
    var that = this;
    if (index == 0) {
      that.setData({
        normalList: []
      })
    } else if (index == 1) {
      that.setData({
        timeList: []
      })
    } else if (index == 2) {
      that.setData({
        priceList: []
      })
    }
  },
  getPage(index) {
    var that = this;
    if (index == 0) {
      return normalPage;
    } else if (index == 1) {
      return timePage;
    } else if (index == 2) {
      return pricePage;
    }
  },
  getOrderInfo(e) { //获得某个订单的更多信息，需要登录
    var that = this;
    //console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var orderList = that.getOrderList(that.data.navbarActiveIndex);
    var orderInfo=orderList[index];
    var received_pos=orderInfo.received_pos;
    wx.request({
      url: app.globalData.url + '/order/getOrder',
      data: {
        sessionid: wx.getStorageSync('sessionid'),
        orderid: orderList[index].orderid
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res);
        var order=JSON.stringify(res.data.order);
        wx.navigateTo({
          url: 'orderInfo/orderInfo?order=' +order+'&received_pos='+received_pos,
        })
      }
    })
  },
  /*getOrderInfo(e) { //获得某个订单的更多信息，需要登录
    var that = this;
    //console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var orderList = that.getOrderList(that.data.navbarActiveIndex);
    var order=orderList[index];
    order=JSON.stringify(order);
    wx.navigateTo({
      url: '/pages/news/orderInfo/orderInfo?order=' + order,
    })
  },*/
  resetOrderList: function(index) {
    var that = this;
    if (index == 0) {
      that.setData({
        normalList: []
      })
    } else if (index == 1) {
      that.setData({
        timeList: []
      })
    } else if (index == 2) {
      that.setData({
        priceList: []
      })
    }
  },
  submitSearch() { //未对page进行复位操作,PullDownRefresh时进行复位
    var that = this;
    var index = that.data.navbarActiveIndex;
    var orderList = that.getOrderList(index);
    that.resetFlag_page_length(0);
    that.resetFlag_page_length(1);
    that.resetFlag_page_length(2);
    //var page=that.setPage(index);
    var search = that.data.inputValue;
    // console.log("search:"+search);
    if (search.length == 0) {
      //do nothing,搜索框文本内容为空
      wx.setStorageSync("search","");
    } else {
      wx.setStorageSync("search", search);
      that.loadOrder([], 0, search, normalPage, '', '');
      that.loadOrder([], 1, search, timePage, 1, '');
      that.loadOrder([], 2, search, pricePage, '', 1);
    }
    that.setData({
      inputValue:''
    })
  }
  /*receiveOrder(e) {
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
  }*/
})