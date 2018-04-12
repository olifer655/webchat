const host = 'https://t-serge.wemeeting.io/api'
// const host = 'https://serge.wemeeting.io/api'

const request = (params, success, error) => {
  let SESSION_ID = wx.getStorageSync('SESSION_ID')
  let  header = {
    'content-type': 'application/json',
    'userTag': 'invest',
    'clientChannel': 'WECHATAPP'
  }

  if (SESSION_ID) {
    header.sgSessionId = SESSION_ID
    header.cookie = `sessionId=${SESSION_ID}`
  }

  wx.request({
    header,
    method: 'POST',
    success: response => {
      if (response.status < 200 && response.status > 300) {
        error && error(response.data.errorMsg)
        return
      }
      // res.data为接口返回的内容，结构 {errorCode: xxx, errorMsg: xxx, model: xxx}
      if (response.data.success) {
        success && success(response.data.model)
      } else {
        error && error(response.data)
      }
    },
    fail: () => {
      wx.showToast({
        title: '服务器开小差啦，请稍候再试试。',
        icon: 'none'
      })
    },
    ...params    
  })
}

module.exports = {
  request,
  host
}
