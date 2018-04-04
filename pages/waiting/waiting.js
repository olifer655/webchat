// 0:待授权 、4:生成中、 6、生成失败  8、终止背调 9、完善信息中
import API from '../../utils/api.js';

Page({
  data: {
    recordInfo: {},
    statusFilter: {
      '0': '等待候选人授权',
      '4': '报告生成中，请耐心等待',
      '6': '报告生成失败',
      '8': '背调已终止',
      '9': '等待候选人完善信息',
      '100': '报告范例'
    },
    isRefund: false,
    recordId: ''
  },

  onLoad: function(options){  
    this.data.recordId = options.id
    this.getCandidateInfo(this.data.recordId)
  },
  getCandidateInfo: function(id) {
    API.request({
      url: `${API.host}/v2/survey/info/${this.data.recordId}`,
      method: 'GET'
    }, res => {
      this.data.recordInfo = res.recordInfo

      let length = this.data.recordInfo.resources.length
      
      this.data.recordInfo.resources.map((item, index) => {
        if(index != length -1) {
          this.data.recordInfo.resources[index] = item + '、'
        }
      })
      this.setData({
        recordInfo: this.data.recordInfo
      })
    }, err => {
      wx.showToast({
        title: err.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  toJump: function() {
    wx.navigateTo({
      url: `../../pages/billdetail/billdetail?id=${this.data.recordId}`
    })
  },
  cancel: function() {
    let that = this
    wx.showModal({
      title: '确定终止？',
      confirmText: '终止',
      content: '终止背调后，平台将收取背调金额的6%作为技术服务费，剩余背调金额将在3个工作日内退回支付账户。',
      success: function(res) {
        if (res.confirm) {
          API.request({
            url: `${API.host}/v2/survey/suspend/${that.data.recordId}`,
            method: 'GET'
          }, res => {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.reLaunch({
              url: '../index/index'
            })
          }, error => {
            wx.showToast({
              title: error.errorMsg,
              icon: 'none',
              duration: 2000
            })
          })
        } 
      }
    })
  }
})