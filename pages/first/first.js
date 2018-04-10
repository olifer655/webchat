const APP = getApp()

Page({
  onLoad: function() {
    if(APP.flage) {
      wx.reLaunch({
        url: '../index/index'
      })
    } else {
      setTimeout(() => {
        wx.reLaunch({
          url: '../index/index'
        })
      }, 500)
    }
  }
})