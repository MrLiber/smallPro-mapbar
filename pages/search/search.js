// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[],
    inputValue: '',
  },
  clearHistory: function(){
    this.setData({
      historyList: []
    });
    wx.removeStorageSync('history')
  },
  inputEvent: function(e) {
    var value = e.detail.value;
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

        wx.request({
          url: 'https://w.mapbar.com/search2015/search/suggest',
          data: {
            keywords: '北京',
            city: '110000',
            location: latitude + ',' + longitude
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log('搜索结果', res.data)
          }
        })
      },
    })
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