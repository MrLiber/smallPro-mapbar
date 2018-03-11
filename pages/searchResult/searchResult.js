// pages/searchResult/searchResult.js
import AppService from '../../services/AppService.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    recommandList: []
  },
  // 看地图
  watchMapEvent: function (e) {
    var value = e.currentTarget.dataset.item;
    if (value) {
      wx.navigateTo({
        url: '/pages/watchMap/watchMap?value='+value,
      })
    }
  },
  // 设终点
  setDesEvent: function (e) {
    var value = e.currentTarget.dataset.item;
    if(value){
      wx.navigateTo({
        url: '/pages/setEnd/setEnd?value='+value,
      })
    }
  },
  reLaunch: function() {
    wx.reLaunch({
      url: '/pages/chat/chat',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 监听页面加载
  onLoad: function(option) {
    var value = option.des;
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        //封装的服务
        AppService.searchSuggest(value, latitude, longitude).then((res) => {
          console.log('结果', res);
          var list = res.data.pois;

          _this.setData({
            recommandList: list
          })
        })
      },
    })
  }
  
})