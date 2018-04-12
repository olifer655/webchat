import API from '../../utils/api.js';

Page({
  data: {
    userInfo: {},
    phone: '',
    isCertification: false,
    name: '',
    certNo: '',
    hasUserInfo: false,
    hasAvatarUrl: true,
    balance: 0
  },
  onShow: function() {  
    this.init()
  }, 
  init: function() {
    let that = this
    // 获取用户信息
    API.request({
      url: `${API.host}/v2/user/invest/info`,
      method: 'GET'
    }, res => {
      let data = {
        isCertification: res.hasCert,
        phone: res.phone,
        hasUserInfo: true
      }
      if (res.hasCert) {
        data.name = res.name;
        data.certNo = res.certNo;
      }
      this.setData(data)
    }, err => {
      wx.redirectTo({
        url: '../login/login'
      })
    })
    
    wx.getUserInfo({
      success: res => {  
        this.setData({
          userInfo: res.userInfo
        })
      },
      fail: res => {
        this.setData({
          hasAvatarUrl: false
        })
      }
    })

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

    })
  },
  goTo: function(e) {
    let path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: `../${path}/${path}`
    })
  },
  toJump: function() {
    let data = this.data
    if(this.data.isCertification) {
      wx.navigateTo({
        url: `../certification/certification?phone=${data.phone}&name=${data.name}&certNo=${data.certNo}`
      })
    } else {
      wx.navigateTo({
        url: `../tocertification/tocertification?phone=${data.phone}`
      })
    }
  }
  
})