var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    navbarTitle: [
      "已完成",
      "已取消",
      "未完成",
      "已过期"
    ],
    flag:[1,1,1,1],
    list: [
      {completedList:[]},
      { incompletedList: [] },
      { canceledList: [] },
      { expiredList: [] },
    ],
    completedOrder: true,
    incompletedOrder: true,
    canceledOrder: true,
    expiredOrder:true,
    navbarActiveIndex: 2

  },
  onLoad: function() {
    var that = this;
    that.computeScrollViewHeight();
    for(var i=1;i<5;i++){
      that.loadOrder(i);
    }
    //that.loadOrder(that.data.navbarActiveIndex + 1); //status=index+1
    //that.handleList();
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
  loadOrder(status) {
    console.log(status)
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: app.globalData.url + '/account/myOrder',
      // url:app.globalData.localUrl + '/account/myOrder',
      data: {
        status: status
      },
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        var receivedList = res.data.receivedOrder;
        for (var i = 0; i < receivedList.length; i++) {
          //字符串格式处理
          receivedList[i].createTime = util.formatTime(new Date(receivedList[i].createTime));
          receivedList[i].expireDateTime = util.formatTime(new Date(receivedList[i].expireDateTime));
          receivedList[i].money = (parseFloat(receivedList[i].money)).toFixed(2);
          receivedList[i].authority = false;
        }
        var sendList = res.data.sendOrder;
        for (var i = 0; i < sendList.length; i++) {
          //字符串格式处理
          sendList[i].createTime = util.formatTime(new Date(sendList[i].createTime));
          sendList[i].expireDateTime = util.formatTime(new Date(sendList[i].expireDateTime));
          sendList[i].money = (parseFloat(sendList[i].money)).toFixed(2);
          sendList[i].authority = true;
          //合并位同一个数组
          receivedList.push(sendList[i])
        }
        //设置页面
        if(receivedList.length==0){
          status=status-1;
          var flag='flag['+status+']';
          that.setData({
            [flag]:0
          })
          console.log(flag);
        }
        if (status == 1) {
          var str = "list.completedList";
        } else if (status == 2) {
          var str = "list.canceledList";
        } else if (status == 3) {
          var str = "list.incompletedList";
        }else if(status==4){
          var str = "list.expiredList";
        }
        that.setData({
          [str]: receivedList,
        })
        that.handleList(status);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  //将list字符串处理成json格式
  handleList(status) {
    var that = this;
    if (status == 1) {
      var partList = that.data.list.completedList;
      var str = "list.completedList";
    } else if (status == 2) {
      var partList = that.data.list.canceledList;
      var str = "list.canceledList";
    } else if (status == 3) {
      var partList = that.data.list.incompletedList;
      var str = "list.incompletedList";
    } else if (status == 4) {
      var partList = that.data.list.expiredList;
      var str = "list.expiredList";
    }
    console.log(partList);
    for (var i = 0; i < partList.length; i++) {
      //对received中的order_owner进行处理
      console.log(partList);
      var receivedOrderOwnerTmp = partList[i].order_owner;
      if (receivedOrderOwnerTmp){
        console.log("167");
        console.log(receivedOrderOwnerTmp);
        receivedOrderOwnerTmp = receivedOrderOwnerTmp.split("'").join('"');
        receivedOrderOwnerTmp = JSON.parse(receivedOrderOwnerTmp);
      //console.log(receivedOrderOwnerTmp.head_img)
        receivedOrderOwnerTmp.head_img = app.globalData.imgUrl + receivedOrderOwnerTmp.head_img;
      //console.log(receivedOrderOwnerTmp);
      }
      var receivedOrderOwner = str+'[' + i + '].order_owner';
      //对received中的free_lancer进行处理
      var receivedFreeLancerTmp = partList[i].free_lancer;
      if (receivedFreeLancerTmp){
        receivedFreeLancerTmp = receivedFreeLancerTmp.split("'").join('"');
        receivedFreeLancerTmp = JSON.parse(receivedFreeLancerTmp);
        receivedFreeLancerTmp.head_img = app.globalData.imgUrl + receivedFreeLancerTmp.head_img;
      }
      
      var receivedFreeLancer = str+'[' + i + '].free_lancer';
      if (receivedOrderOwnerTmp!=null){
        that.setData({[receivedOrderOwner]:receivedOrderOwnerTmp});
      }
      if (receivedOrderOwnerTmp != null) {
        that.setData({ [receivedFreeLancer]: receivedFreeLancerTmp });
      }
    }
    console.log("line 185");
    console.log(this.data);
    /*for (var i = 0; i < that.data.sendList.length; i++) {
      //对send中的order_owner进行处理
      var sendOrderOwnerTmp = that.data.sendList[i].order_owner;
      sendOrderOwnerTmp = sendOrderOwnerTmp.replace(/\'/g, "\"");
      sendOrderOwnerTmp = JSON.parse(sendOrderOwnerTmp);
      console.log(sendOrderOwnerTmp);
      var sendOrderOwner = 'sendList[' + i + '].order_owner';
      //对send中的free_lancer进行处理
      var sendFreeLancerTmp = that.data.sendList[i].free_lancer;
      sendFreeLancerTmp = sendFreeLancerTmp.replace(/\'/g, "\"");
      sendFreeLancerTmp = JSON.parse(sendFreeLancerTmp);
      var sendFreeLancer = 'sendList[' + i + '].free_lancer';

      that.setData({
        [sendOrderOwner]: sendOrderOwnerTmp,
        [sendFreeLancer]: sendFreeLancerTmp,
      })
    }*/
  },
  cancelOrder(e) {
    var that = this;
    console.log(e.currentTarget.dataset.orderid);
    var orderid = e.currentTarget.dataset.orderid;
    wx.showModal({
      title: '提示',
      content: '是否确认取消订单',
      success(res) {
        if (res.confirm) {
          wx.request({
            // url: app.globalData.url + '/order/cancelOrder',
            url: app.globalData.localUrl + '/order/cancelOrder',
            data: {
              orderid: orderid
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
              'Cookie': wx.getStorageSync('sessionid')
            },
            success(res) {
              console.log(res.data.msg);
              if (res.data.msg == '请联系订单主人协商后由主人取消') {
                wx.showModal({
                  title: '无权取消',
                  content: '请联系订单主人协商后由主人取消',
                  success(res) {
                    if (res.confirm) {
                      //do nothing
                    } else if (res.cancel) {
                      //do nothing
                    }
                  }
                })
              } else if (res.data.msg == '取消成功请重新发起订单') {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
                //同时刷新页面
                that.onLoad();
              }
            },
            fail(res) {}
          })
        } else if (res.cancel) {
          //do nothing
        }
      }
    })
  },
  completeOrder(e) {
    var that = this;
    console.log(e.currentTarget.dataset.orderid);
    var orderid = e.currentTarget.dataset.orderid;
    wx.showModal({
      title: '提示',
      content: '是否确认收货',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/order/orderComplete',
            data: {
              orderid: orderid
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
              'Cookie': wx.getStorageSync('sessionid')
            },
            success(res) {
              console.log(res.data.msg);
              if (res.data.msg == '请联系订单主人后由主人确认') {
                wx.showModal({
                  title: '提示',
                  content: '请联系订单主人后由主人确认',
                  success(res) {
                    if (res.confirm) {
                      //do nothing
                    } else if (res.cancel) {
                      //do nothing
                    }
                  }
                })
              } else if (res.data.msg == '完成订单确认成功') {
                wx.showToast({
                  title: '确认成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
                //同时刷新页面
                that.onLoad();
              }
            },
            fail(res) {}
          })
        } else if (res.cancel) {
          //do nothing
        }
      }
    })
  },
  navigateToDetail(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//列表下标
    //console.log('index:'+index);
    var navbarActiveIndex = that.data.navbarActiveIndex;//当前导航栏下标
    if (navbarActiveIndex==0) {
      var list = JSON.stringify(that.data.list.completedList[index]);
    } else if (navbarActiveIndex==1){
      var list = JSON.stringify(that.data.list.canceledList[index]);
    }else if(navbarActiveIndex==2){
      var list = JSON.stringify(that.data.list.incompletedList[index]);
    }else if(navbarActiveIndex==3){
      var list = JSON.stringify(that.data.list.expiredList[index]);
    }
    //console.log(list);
    wx.navigateTo({
      url: '/pages/order/detail/detail?list=' + list + '&index=' + navbarActiveIndex,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  toComment(e){
    var that=this;
    console.log(e.currentTarget.dataset.orderid);
    var orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url:'/pages/order/comment/comment?orderid='+orderid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getComment(e){
    var that=this;
    console.log(e.currentTarget.dataset.orderid);
    var orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/order/getComment/getComment?orderid=' + orderid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  toReceiveOrder(){
    var that=this;
    wx.switchTab({
      url:'/pages/news/news'
    })
  },
  toSendOrder(){
    var that=this;
    wx.navigateTo({
      url:'/pages/order/send/send'
    })
  }
})