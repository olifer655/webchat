import API from '../../utils/api.js';

Page({
  data: {
    balance: 0
  },
  onShow: function() {  
    this.getBalance()
  }, 
  getBalance: function() {
    API.request({
      url: `${API.host}/v2/acct/balance`,
      method: 'GET'
    }, res => {
      this.setData({
        balance: res.balance
      })
    }, err => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  jump() {
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  }
})