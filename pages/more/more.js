import API from '../../utils/api.js';

Page({
  outLogin: function() {
    API.request({
      url: `${API.host}/v2/user/invest/logout`
    }, res => {
      wx.navigateTo({
        url: '../login/login'
      })
    }, error => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    })
  }
})