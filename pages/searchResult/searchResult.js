// pages/searchResult/searchResult.js
import AppService from '../../services/AppService.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    recommandList: []
  },
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