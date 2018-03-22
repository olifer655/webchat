// mock 
const candidateInfo = {
  resources: ['身份信息认证', '学历认证'],
  respondentName: '张三',
  respondentPhone: '13116715680',
  status: '8'
}

// 0:待授权 、4:生成中、 6、生成失败  8、终止背调 9、完善信息中
import API from '../../utils/api.js';

Page({
  data: {
    candidateInfo: [],
    statusFilter: {
      '0': '等待候选人授权',
      '4': '报告生成中，请耐心等待',
      '6': '报告生成失败',
      '8': '背调已终止',
      '9': '等待候选人完善信息',
      '100': '报告范例'
    },
    isRefund: false,
    userId: ''
  },

  onLoad: function(options){  
    // test start
    options.id = 7644087005442048
    // test end  
    this.data.userId = options.id
    this.getCandidateInfo(this.data.userId)
  },
  getCandidateInfo: function(id) {
    API.request({
      url: `${API.host}/v2/survey/info/${this.data.userId}`,
      method: 'GET'
    }, res => {
      // test start
      res = candidateInfo
      // test end

      this.data.candidateInfo = res
      console.log(this.data.candidateInfo)
      this.setData({
        candidateInfo: this.data.candidateInfo
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
      url: `../../pages/billdetail/billdetail?id=${this.data.userId}`
    })
  },
  onUnload: function(){
    console.log('xie')
  },
  cancel: function() {
    wx.showModal({
      title: '确定终止？',
      confirmText: '终止',
      content: '平台将收取背调金额的*%作为技术服务费，剩余背调金额',
      success: function(res) {
        if (res.confirm) {
          API.request({
            url: `${API.host}serge/qiyewx/h5/investigator/listUnreadReport`,
          }, res => {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }, err => {
    
          })
        } 
      }
    })
  }
})