class Promises {
  constructor(fn) {
    this.value = null
    this.callbacks = [] // callbacks为数组，因为可能同时有很多个回调

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);

    fn(this.resolve, this.reject)
  }

  then(onFulfilled) {
    this.callbacks.push(onFulfilled)

    return this
  }

  resolve(value) {
    this.callbacks.forEach((callback) => {
      callback(value)
    })
  }

  reject() {

  }

}

const http = function() {
  let SESSION_ID = wx.getStorageSync('SESSION_ID')
  let  header = {
    'content-type': 'application/json',
    'userTag': 'invest'
  }

  if (SESSION_ID) {
    header.sgSessionId = SESSION_ID
    header.cookie = `sessionId=${SESSION_ID}`
  }

  return {
    get: function(url) {
      new Promises((resolve, reject) => {
        //异步请求  v2/user/invest/info
        wx.request({
          url: `https://serge.wemeeting.io/api/${url}`,
          header,
          success: response => {
            // res.data为接口返回的内容，结构 {errorCode: xxx, errorMsg: xxx, model: xxx}
            if (response.data.success) {
              resolve && resolve(response.data.model)
            } else {
              reject && reject(response.data)
            }
          },
          fail: () => {
            wx.showToast({
              title: '服务器开小差啦，请稍候再试试。',
              icon: 'none'
            })
          }   
        })
      })
    }

  }
}
Page({
  getUserId: function() {
    // let SESSION_ID = wx.getStorageSync('SESSION_ID')
    // let  header = {
    //   'content-type': 'application/json',
    //   'userTag': 'invest'
    // }

    // if (SESSION_ID) {
    //   header.sgSessionId = SESSION_ID
    //   header.cookie = `sessionId=${SESSION_ID}`
    // }

    // return new Promises((resolve, reject) => {
    //   //异步请求
    //   wx.request({
    //     url: 'https://serge.wemeeting.io/api/v2/user/invest/info',
    //     header,
    //     success: response => {
    //       // res.data为接口返回的内容，结构 {errorCode: xxx, errorMsg: xxx, model: xxx}
    //       if (response.data.success) {
    //         resolve && resolve(response.data.model)
    //       } else {
    //         reject && reject(response.data)
    //       }
    //     },
    //     fail: () => {
    //       wx.showToast({
    //         title: '服务器开小差啦，请稍候再试试。',
    //         icon: 'none'
    //       })
    //     }   
    //   })
    // })

    // http.get('v2/user/invest/info')
  },
  onShow: function() {
    console.log(http)
    let getUserId = http.get('v2/user/invest/info')
    .then(res => {
      this.userInfo = res
    })

    setTimeout(() => {
      getUserId.then(res => {
        console.log(res)
      })
    }, 3000)
    
  }

})