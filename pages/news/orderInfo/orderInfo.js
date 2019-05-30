var util = require('../../../utils/util.js');
const app = getApp();
Page({
  data: {
    order: []
  },
  onLoad: function(options) {
    var that = this;
    console.log(options);
    var order = JSON.parse(options.order);
    order.received_pos = options.received_pos;
    that.handleOrder(order);
    //console.log(order);
  },
  handleOrder(e) {
    var that=this;
    var order=e;
    order.createTime = util.formatTime(new Date(order.createTime));
    order.expireDateTime = util.formatTime(new Date(order.expireDateTime));
    order.money = (parseFloat(order.money)).toFixed(2);
    //var orderOwnerTmp = order.order_owner;
    order.order_owner = order.order_owner.replace(/\'/g, "\"");
    order.order_owner = JSON.parse(order.order_owner);
    order.order_owner.head_img = app.globalData.imgUrl + order.order_owner.head_img;
    //console.log(orderOwnerTmp);
    //var orderOwner = 'order.order_owner';
    that.setData({
      order: order
    })
  },
  receiveOrder(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '是否确认接单',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url +'/order/receiveOrder',
            data:{
              orderid:that.data.order.orderid
            },
            method:'GET',
            header:{
              'Content-Type': 'application/json',
              'Cookie': wx.getStorageSync('sessionid')
            },
            success(res){
              //下单成功
              if(res.statusCode==200){
                wx.showToast({
                  title: '接单成功',
                  icon: 'success',
                  duration: 1500,
                  mask:true
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/order/order',
                  })
                }, 1500) 
              }else{
                wx.showToast({
                  title: '接单失败',
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/news/news',
                  })
                }, 1500) 
              }
            }
          })
        } else if (res.cancel) {
          //do nothing
        }
      }
    })
  }
})