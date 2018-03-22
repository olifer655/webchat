import API from '../../utils/api.js';

Page({
  data: {
    userInfo: {},
    phone: '',
    isCertification: false,
    name: '',
    certNo: ''
  },
  onLoad: function() {  
    this.init()
  }, 
  init: function() {
    // 获取用户信息
    API.request({
      url: `${API.host}/v2/user/invest/info`,
      method: 'GET'
    }, res => {
      let data = {
        isCertification: res.hasCert,
        phone: res.phone
      }
      if (res.hasCert) {
        data.name = res.name;
        data.certNo = res.certNo;
      }
      this.setData(data)
    }, err => {
      wx.showToast({
        title: err.errorMsg,
        icon: 'none',
        duration: 2000
      })
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