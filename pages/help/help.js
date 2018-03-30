Page({
  data:{
    animation: '',
    animationNo: '',
    isLanch: false,
    isBill: false,
    isStop: false,
    isRefund: false,
    isPc: false
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
  toggle: function(e) {
    let is = e.currentTarget.dataset.is
    let animation = e.currentTarget.dataset.animation
    let date = {
      isLanch: false,
      isBill: false,
      isStop: false,
      isRefund: false,
      isPc: false,
      animationLanch: this.animation.rotate(0).step().export(),
      animationBill: this.animationNo.rotate(0).step().export(),
      animationStop: this.animationNo.rotate(0).step().export(),
      animationRefund: this.animationNo.rotate(0).step().export(),
      animationPC: this.animationNo.rotate(0).step().export()
    }
    date[is] = true
    date[animation] = this.animationNo.rotate(-180).step().export()
    this.setData(date)
  }
  
})