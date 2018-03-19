Page({
  data:{
    animation: '',
    animationNo: '',
    isLanch: false,
    isCoupon: false,
    isStop: false
  },
  onShow: function() {
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    let animationNo = wx.createAnimation({
      duration: 0
    })
    this.animationNo = animationNo
    this.animation = animation
  },
  lanch: function(e) {
    this.setData({
      isLanch: true,
      isCoupon: false,
      isStop: false,
      animationLanch: this.animation.rotate(-180).step().export(),
      animationCoupon: this.animationNo.rotate(0).step().export(),
      animationStop: this.animationNo.rotate(0).step().export()
    })
  },
  coupon: function(e) {
    this.setData({
      isLanch: false,
      isCoupon: true,
      isStop: false,
      animationLanch: this.animationNo.rotate(0).step().export(),
      animationCoupon: this.animation.rotate(-180).step().export(),
      animationStop: this.animationNo.rotate(0).step().export()
    })
  },
  stop: function(e) {
    this.setData({
      isLanch: false,
      isCoupon: false,
      isStop: true,
      animationLanch: this.animationNo.rotate(0).step().export(),
      animationCoupon: this.animationNo.rotate(0).step().export(),
      animationStop: this.animation.rotate(-180).step().export()
    })
  }
  
})