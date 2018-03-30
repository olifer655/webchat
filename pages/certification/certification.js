import API from '../../utils/api.js';

Page({
  data: {
    name: '',
    certNo: '',
    phone: ''
  },
  onLoad: function(e) {
    // 获取用户信息
    API.request({
      url: `${API.host}/v2/user/invest/info`,
      method: 'GET'
    }, res => {
      let data = {
        certNo: res.certNo,
        phone: res.phone,
        name: res.name
      }

      this.setData(data)
    }, err => {
      wx.navigateTo({
        url: '../login/login'
      })
    })
  }
})