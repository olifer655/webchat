import API from '../../utils/api.js';

Page({
  data: {
    isCheck: false,
    isAgree: false,
    isGetingMsg: false,
    msg: '获取动态码',
    hasUserInfo: false,
    phone: String,
    code: String,
    codeIsLegal: false,
    canISubmit: false
  },
  onLoad: function () {
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
    // API.request()
  },
  countdown: function() {
    let seconds = 10
    let second = 10
    let that = this
    this.setData({
      isGetingMsg: !this.data.isGetingMsg
    })
    this.sendmessg()

    let inter = setInterval(() => {
      that.setData({
        msg: `正在获取${second}秒...`
      })

      seconds --
      second = seconds > 10 ? seconds : `0${seconds}`

      if (seconds < 0) {
        second = 1
        clearInterval(inter) 
        that.setData({ 
          msg: '获取动态码', 
          isGetingMsg: !this.data.isGetingMsg
         }) 
      }
    }, 1000)  
  },
  // 验证验证码
  getCode: function(e) {
    let regExp = /^\d{4}$/
    this.data.code = e.detail.value
    
    // 实际
    // if (regExp.test(this.data.code)) {
    //   let data = {
    //     code: this.data.code
    //   }
    //   API.request({
    //     url: `${API.host}`,
    //     data
    //   }, res => {
    //     this.data.codeIsLegal = true
    //   }, err => {
    //     wx.showToast({
    //       title: '验证码错误',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   })
    // } else {
    //   wx.showToast({
    //     title: '验证码错误',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // mock
    this.data.codeIsLegal = regExp.test(this.data.code)
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
    console.log(e)
    if (!this.mobileIsLegal) {
      return wx.showModal({
        content: '请填写正确的手机号',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 提交
    }
  }
})
