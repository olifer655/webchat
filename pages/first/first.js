const APP = getApp()

Page({
  onLoad: function() {
    if(APP.flage) {
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      setTimeout(() => {
        wx.switchTab({
          url: '../index/index'
        })
      }, 500)
    }
  }
})