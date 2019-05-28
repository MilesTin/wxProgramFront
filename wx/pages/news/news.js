var util = require('../../utils/util.js');
const app = getApp();
var normalPage = 0; //综合排序
var timePage = 0; //时间最新
var pricePage = 0; //价格优先
var resultLength = 10; //每次加载10个数据项
var normalLoadLength,timeLoadLength,priceLoadLength; //每次加载list的长度
var narmalBottomFlag = 0; //用于实现底部showToast只触发一次
var timeBottomFlag = 0;
var priceBottomFlag = 0;
var timeFlag=0;//记录第一次打开最新页面
var priceFlag=0;//记录第一次打开价格页面
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
      //"完成时间",
      "价格优先"
    ],
    normalList: [],
    timeList:[],
    priceList:[],
    navbarActiveIndex: 0 //当前处在的页面
  },
  onLoad: function() {
    var that = this;
    that.computeScrollViewHeight();
    var orderList=that.data.normalList;
    normalPage=normalPage+1;
    that.loadOrder(orderList,0,'',normalPage,'','');
    that.loadOrder(orderList, 0, '', 2, '', '');
  },
  onShow: function() {

  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function(event) {
    var that=this;
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })

    //判断是否第一次打开最新或者价格页面
    if (timeFlag == 0 && navbarTapIndex==1){
      var orderList = that.data.timeList;
      timePage=timePage+1;
      that.loadOrder(orderList, 1,'', timePage, '', '');
      timeFlag=1;
    }
    if (priceFlag == 0 && navbarTapIndex == 2) {
      var orderList = that.data.priceList;
      pricePage = pricePage + 1;
      that.loadOrder(orderList, 2, '', pricePage, '', '');
      priceFlag=1;
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
    })
  },
  textInput: function(e) {
    var that=this;
    console.log(e.detail.value)
    that.setData({
      inputValue:e.detail.value
    })
  },


  //参数说明：列表（即对不同的列表push），index(判断赋值给哪个列表)
  loadOrder(orderList,index,search, page, orderByTime, orderByPrice) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: app.globalData.url + '/order/search',
      data: {
        search: search,//可有可无
        page: page,
        orderByTime:orderByTime, //1 or - 1 可有可无，1表示最新，- 1表示最久远, 创建日期
        orderByPrice:orderByPrice, //同上，1为价格最高排序
      },
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res);
        //将第一次加载的results长度赋值给loadLength;用于loadMoreOrder的判断;
        /*if (res.data.results.length>0 ){
          that.setData({
            have_order: true
          })
        }*/
        //loadLength = res.data.results.length;
        for (var i = 0; i < res.data.results.length; i++) {
          orderList.push(res.data.results[i])
          //字符串格式处理
          orderList[i].createTime = util.formatTime(new Date(orderList[i].createTime));
          orderList[i].expireDateTime = util.formatTime(new Date(orderList[i].expireDateTime));
          orderList[i].money = (parseFloat(orderList[i].money)).toFixed(2);
        }
        if(index==0){
          that.setData({
            normalList: orderList
          })
        }
        else if(index==1){
          that.setData({
            timeList: orderList
          })
        }
        else if (index == 1) {
          that.setData({
            priceList: orderList
          })
        }
 
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
    } else { //仍然有数据项可以加载,要进行页面的判断
      //that.loadOrder(inputValue,page,orderByTime,orderByPrice);
      that.judgePage();
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
  },
  //调用loadMore的页面判断
  judgePage(){
    var that=this;
    console.log(that.data.navbarActiveIndex)
    var index=that.data.navbarActiveIndex;
    var search=that.data.inputValue;
    switch (index) {
      //综合排序
      case 0:
        normalPage++;
        that.loadOrder(search,normalPage,'','');
        break;
      //时间优先
      case 1:
        timePage++;
        that.loadOrder(search,timePage,1,'');
        break;
      //价格优先
        case 3:
        pricePage++;
        that.loadOrder(search,pricePage,'',1);
        break;
      default:
        //
        break;
    }
  }

})