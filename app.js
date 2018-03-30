//app.js
import API from './utils/api.js';

App({
  flage: false,
  userInfo: {
    hasUserInfo: Boolean,
    hasReport: Boolean
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success:  res => {
        if(res.code) {
          API.request({
            url: `${API.host}/v2/wechat/small/login`,
            data: {
              code: res.code
            }
          }, res => {
            wx.setStorageSync('SESSION_ID', res.sessionId)
            this.flage = true
          })
        }
      }
    })

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo'
          })
        }
      }
    })
  }
})