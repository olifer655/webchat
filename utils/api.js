// const host = 'https://www.wemeeting.io/'
const host = 'https://t-serge.wemeeting.io/api'

const header = {
  'content-type': 'application/json'
}

const request = (params, success, error) => {
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
        return
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
