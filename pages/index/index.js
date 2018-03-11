//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo:{},
    showList:[
      {
        icon:'success',
        text:'设置目的地，自动建群'
      }, {
        icon: 'search',
        text: '分享给好友'
      }, {
        icon: 'info',
        text: '好友加入群组'
      }, {
        icon: 'warn',
        text: '查看群成员剩余距离'
      }, {
        icon: 'waiting',
        text: '查看群成员剩余时间'
      }, {
        icon: 'circle',
        text: '群组语音聊天'
      }
    ],
    modalHidden: true
  },
  // 模态框
  // 点击输入群号
  modelEvent: function() {
    this.setData({
      modalHidden: false
    })
  },
  // 点击确认
  modalChange: function () {
    this.setData({
      modalHidden: true
    })
  },
  // 点击取消
  modalCancel: function() {
    this.setData({
      modalHidden: true
    })
  },
  //搜索框
  navEvent: function() {
    wx.navigateTo({
      url:'../search/search'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
