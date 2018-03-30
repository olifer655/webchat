import API from '../../utils/api.js';

Page({
  data: {
    details: []
  },
  onLoad: function (e) {
    let id = e.id
    let that = this
    API.request({
      url: `${API.host}/v2/report/detail/${id}`,
      method: 'GET'
    }, res => {
      that.data.details = res.report
      that.setData({
        details: that.data.details
      })
    }, error => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  }
})
