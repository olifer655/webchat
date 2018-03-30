import API from '../../utils/api.js';

Page({
  data: {
    isCheck: false,
    isAgree: true,
    msg: '获取动态码',
    hasUserInfo: false,
    phone: String,
    code: String,
    codeIsLegal: false,
    canISubmit: false,
    isGetingMsg: false
  },
  onShow: function () {
    wx.hideTabBar({})
  },
  getMobile: function(e) {
    // 手机号
    this.data.phone = e.detail.value
    let regExp = /^(0|86|17951)?(13[0-9]|15[0-9]|18[0-9]|14[57]|17[678])[0-9]{8}$/
    this.data.mobileIsLegal = regExp.test(this.data.phone)
    this.checkCanISubmit()
  },
  // 获取验证码
  sendmessg: function(e) {
    let phone = this.data.phone
    let data = {
      phone: phone,
      type: 'LOGIN_VERIFY_CODE'
    }
    let that = this
    if (!phone) {
      // 没有填写手机号
      return wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 2000
      })
    }
    API.request({
      url: `${API.host}/v1/code/create`,
      data
    }, res => {
      that.setData({
        isGetingMsg: true
      })
      that.countdown()
      wx.showToast({
        title: res,
        icon: 'none',
        duration: 800
      })
    }, error => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  countdown: function() {
    let seconds = 60
    let second = 60
    let that = this

    let inter = setInterval(() => {
      that.setData({
        msg: `正在获取${second}秒...`
      })

      seconds --
      second = seconds > 9 ? seconds : `0${seconds}`

      if (seconds < 0) {
        second = 1
        clearInterval(inter) 
        that.setData({ 
          msg: '获取动态码', 
          isGetingMsg: false
        }) 
      }
    }, 1000)  
  },
  // 验证验证码
  getCode: function(e) {
    this.data.code = e.detail.value
    this.data.codeIsLegal = this.data.code
    this.checkCanISubmit()
  },
  getIsAgree: function(e) {
    this.data.isAgree = e.detail.value[0]
    this.checkCanISubmit()
  },
  checkCanISubmit: function() {
    let data = this.data
    if(data.mobileIsLegal && data.codeIsLegal && data.isAgree) {
      this.setData({
        canISubmit: true
      })
    } else if(data.canISubmit) {
      this.setData({
        canISubmit: false
      })
    } 
  },
  formSubmit: function(e) {
    let data = {
      phone: this.data.phone,
      code: this.data.code
    }
    let that = this

    API.request({
      url: `${API.host}/v2/user/invest/login`,
      data
    }, res => {
      this.countdown()
      wx.showToast({
        title: '登录成功',
        icon: 'none',
        duration: 2000,
        success: () => {
          wx.switchTab({
            url: '../index/index'
          })
        }
      })
    }, error => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  toJump: function() {
    wx.navigateTo({
      url: '../service_agreement/service_agreement'
    })
  }
})
