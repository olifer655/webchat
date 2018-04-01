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
      animationBill: this.animation.rotate(0).step().export(),
      animationStop: this.animation.rotate(0).step().export(),
      animationRefund: this.animation.rotate(0).step().export(),
      animationPC: this.animation.rotate(0).step().export()
    }
    console.log(is)
    date[is] = !this.data[is]
    date[animation] = this.data[is] ? this.animation.rotate(0).step().export() : this.animationNo.rotate(-180).step().export()
    this.setData(date)
  }
  
})