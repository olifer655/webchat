// mock 
const candidateInfo = {
  name: '占大半',
  mobile: '13116715680',
  status: '1'
}
import API from '../../utils/api.js';

Page({
  data: {
    candidateInfo: candidateInfo,
    statusContent: {
      '0': '等待候选人授权',
      '4': '等待候选人完善信息'
    },
    isRefund: false,
    userId: ''
  },
  onLoad: function(options){
    this.data.userId = options.id
    // this.getCandidateInfo(this.data.userId)
  },
  getCandidateInfo: function(id) {
    API.request({
      url: `${API.host}serge/qiyewx/h5/investigator/listUnreadReport`,
    }, res => {
      
    }, err => {

    })
  },
  toJump: function() {

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