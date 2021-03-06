import API from '../../utils/api.js';

Page({
  data: {
    name: '',
    certNo: '',
    phone: '',
    canISubmit: false,
    certNoIsLegal: false,
    nameIsLegal: false,
    isAgree: true
  },
  onLoad: function(e) {
    this.setData({
      phone: e.phone
    })
  },
  checkCertNum: function(e) {
    // 身份证
    this.data.certNo = e.detail.value
    let regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    this.data.certNoIsLegal = regExp.test(this.data.certNo)
    this.checkCanISubmit()
  },
  checkName: function(e) {
    let regExp = /^[\u4e00-\u9fa5]{1,6}$/
    this.data.name = e.detail.value
    this.data.nameIsLegal = regExp.test(this.data.name)
    this.checkCanISubmit()
  },
  checkCanISubmit: function() {
    let data = this.data
    if(data.certNoIsLegal && data.nameIsLegal && data.isAgree) {
      this.setData({
        canISubmit: true
      })
    } else if(data.canISubmit) {
      this.setData({
        canISubmit: false
      })
    } 
  },
  getIsAgree: function(e) {
    this.data.isAgree = e.detail.value[0]
    this.checkCanISubmit()
  },
  formSubmit: function() {
    let that = this
    API.request({
      url: `${API.host}/v2/user/invest/cert`,
      data: {
        certNo: that.data.certNo,
        name: that.data.name,
        phone: that.data.phone
      }
    }, res => {
      wx.showToast({
        title: '发起认证成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
        delta: 1
      })
    }, error => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  toJump() {
    wx.redirectTo({
      url: '../authentication_protocol/authentication_protocol'
    })
  }
})