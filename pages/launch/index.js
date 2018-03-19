import API from '../../utils/api.js';

Page({
  data: {
    checks: {
      isMobile: false,
      isNegativeInfo: false,
      isEducation: false,
      isHealth: false,
      isProfessional: false,
      isProvidentFund: false,
      isSocialSecurity: false
    }
  },
  toJump: function(e) {
    let path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: `../${path}/${path}`
    })
  },
  toChoice: function(e) {
    let block = e.currentTarget.dataset.block
    this.data.checks[block] = !this.data.checks[block]

    this.setData({
      checks: this.data.checks
    })
  },
  toNext: function() {
    let totalPrice = 5;
    let checks = []
    let that = this
    for (let item in this.data.checks) {
      if (that.data.checks[item]) {
        checks.push(item);
        if (item === 'isProfessional' || item === 'isProvidentFund' || item === 'isSocialSecurity') {
          totalPrice = totalPrice + 10
        } else {
          totalPrice = totalPrice + 5
        }
      }
    }
    wx.setStorage({
      key: 'CHECKS',
      data: checks
    })
    wx.setStorage({
      key: 'TOTAL_PRICE',
      data: totalPrice
    })
    wx.navigateTo({
      url: '../pay/pay'
    })
  }
})