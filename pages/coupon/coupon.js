import API from '../../utils/api.js';

Page({
  data: {
    coupons: [],
    isDue: true
  },
  onLoad: function() {  
    this.init()
  }, 
  toJump: function() {
    wx.switchTab({
      url: '../launch/index'
    })
  },
  init: function() {
    API.request({
      'url': `${API.host}/v2/coupon/list`,
      method: 'GET'
    }, res => {
      this.data.coupons = res.coupons
     
      this.setData({
        coupons: this.data.coupons,
      })
    }, error => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  }
})