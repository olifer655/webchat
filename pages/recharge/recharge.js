import API from '../../utils/api.js';

Page({
  data: {
    amt: '',
    canISubmit: false,
    isSubmit: false
  },
  recharge: function(e) {
    let amt = e.detail.value
    let data = {
      amt: e.detail.value
    }
    if (e.detail.value > 0) {
      data.canISubmit = true
    } else {
      data.canISubmit = false
    }

    this.setData(data)
  },
  formSubmit: function(e) {
    let data = this.data
    if (data.isSubmit) {
      return wx.showToast({
        title: '请勿重复提交',
        icon: 'none',
        duration: 2000
      })
    }

    data.isSubmit = true

    API.request({
      url: `${API.host}/v2/acct/recharge`,
      data: {
        amt: data.amt
      }
    }, wxData => {
      wx.requestPayment({
        timeStamp: wxData.timeStamp,
        nonceStr: wxData.nonceStr,
        package: wxData.packageStr,
        signType: wxData.signType,
        paySign: wxData.paySign,
        success: res => {
          data.isSubmit = false;
         
          wx.navigateTo({
            url: '../balance/balance'
          })
          
        },
        fail: err => {
          data.isSubmit = false
          wx.showToast({
            title: '充值失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }, err => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  }
})