// pages/search/search.js
import AppService from '../../services/AppService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[],
    inputValue: '',
    newList:[]
  },
  clearHistory: function(){
    this.setData({
      historyList: []
    });
    wx.removeStorageSync('history')
  },
  inputEvent: function(e) {
    var value = e.detail.value;
    var _this = this;
    this.setData({
      inputValue:value
    });

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        //封装的服务
        AppService.searchSuggest(value,latitude,longitude).then((res)=>{
          console.log('服务',res);
          var list = res.data.pois;
          var newList = list.map((item, index) => {
            return item.name
          });
          var recomArray = _this.dealItemString(newList, value);
          _this.setData({
            recommandList: recomArray
          })
        })
        // wx.request({
        //   url: 'https://w.mapbar.com/search2015/search/suggest',
        //   data: {
        //     keywords: value,
        //     city: '110000',
        //     location: latitude + ',' + longitude
        //   },
        //   header: {
        //     'content-type': 'application/json' //默认值
        //   },
        //   success: function (res) {
        //     console.log('搜索结果', res.data)
        //     var list = res.data.pois;
        //     var newList = list.map((item,index) => {
        //       return item.name
        //     });
        //     var recomArray = _this.dealItemString(newList,value);
        //     _this.setData({
        //       recommandList: recomArray
        //     })
        //   }
        // })
      },
    })
  },
  dealItemString: function(list,important){
    var left,mid,right;
    var myList = list.map((item,index) => {
      var obj = new Object();
      var strIndex = item.indexOf(important);
      obj.left = item.substring(0,strIndex);
      obj.mid = important;
      obj.right = item.substring(strIndex+important.length,item.length)
      return obj;
    })
    return myList;
  },
  searchEvent: function() {
    var input = this.data.inputValue;//获取input的值
    var arr = wx.getStorageSync('history');//S得到已经储存在缓存中的数组
    !arr && (arr = []);//如果数组不存在，就给一个新的数组
    // var flag = true;
    // for(var i=0;i < arr.length;i++){
    //   if(arr[i] == input){
    //     flag = false;
    //   }
    // }
    // input && flag && arr.push(input) && deleteArray(arr);
    input && (!arr.includes(input)) && arr.unshift(input) && deleteArray(arr);//在input不为空不重复的情况下，进行push操作

    wx.setStorageSync('history', arr); 
    function deleteArray(arr){
      if(arr.length > 10){
        arr.pop()
      }
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = wx.getStorageSync('history')
    this.setData({
      historyList:list
    })
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
    
  }
})