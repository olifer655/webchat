import API from '../../utils/api.js';

Page({
  data: {
    userInfo: {},
    isCertification: false
  },
  onLoad: function() {  
    this.init()
  }, 
  init: function() {
    // 判断是否已经认证过
    // API.request({
    //   url: ''
    // }, res => {
      // this.data.isCertification
    // }, err => {

    // })
    wx.login({
      success: function(res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://t-serge.wemeeting.io/api/v1/wechat/small/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: (res) => {
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getUserInfo({
      success: res => {    
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  goTo: function(e) {
    let path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: `../${path}/${path}`
    })
  },
  toJump: function() {
    if(this.data.isCertification) {
      wx.navigateTo({
        url: '../certification/certification'
      })
    } else {
      wx.navigateTo({
        url: '../tocertification/tocertification'
      })
    }
  }
  
})