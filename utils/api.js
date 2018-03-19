const host = 'https://www.wemeeting.io/'

const header = {
  'content-type': 'application/json'
}

const request = (params, success, error) => {
  wx.request({
    header,
    method: 'POST',
    success: res => {
      if (!res || res.statusCode !== 200) {
        error && error()
        return
      }
      // res.data为接口返回的内容，假定为 {errno: xxx, msg: xxx, data: xxx} 的结构
      if (res.data.success) {
        success && success(res.data.data)
        return
      }
      error && error(res.data.errorMsg)
    },
    fail () {
      error && error()
    },
    ...params    
  })
}

module.exports = {
  request,
  host
}
