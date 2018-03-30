import API from '../../utils/api.js';

Page({
  data: {
    recordId: 0,
    candidate: {},
    orderStatusMap: {
      '2': '待支付',
      '3': '支付完成',
      '-3': '退款中',
      '-4': '已退款'
    }
  },
  onLoad: function(options){  
    this.data.recordId = options.id
    this.getCandidateInfo(this.data.recordId)
  },
  getCandidateInfo: function(id) {
    API.request({
      url: `${API.host}/v2/bill/detail/${this.data.recordId}`,
      method: 'GET'
    }, res => {
      this.data.candidate = res
      
      this.setData({
        candidate: this.data.candidate
      })
    }, err => {
      wx.showToast({
        title: err.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  },

})