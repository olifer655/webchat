import API from '../../utils/api.js';

Page({
  data: {
    checks: [],
    idLists: [],
    totalPrice: '',
    coupons: [],
    realTotalPrice: '',
    canISubmit: false,
    isUseCoupon: false,
    isShowCoupon: false,
    couponMoney: 0,
    couponId: 0,
    isSelect: false
  },
  onLoad: function() {
    this.init()
  },
  init: function(e) {
    let that = this
    wx.getStorage({
      key: 'CHECKS',
      success: function(res) { 
        let length = res.data.length
        let data = res.data
        data.map((item, index) => {
          if(index != length -1) {
            data[index] = item + '、'
          }
        })
        that.setData({
          checks: data
        })
      } 
    })
    wx.getStorage({
      key: 'TOTAL_PRICE',
      success: function(res) {
        that.data.totalPrice = res.data
        that.setData({
          totalPrice: res.data,
          realTotalPrice: res.data
        })
      } 
    })
    wx.getStorage({
      key: 'ID_LISTS',
      success: function(res) {
        that.data.idLists = res.data
      } 
    })

  },
  selectCoupon: function() {
    // 如果已经取过优惠券信息，那么再点击时，不会去请求优惠券接口
    if(!this.data.coupons.length) {
      API.request({
        'url': `${API.host}/v2/coupon/list`,
        method: 'GET'
      }, res => {
        this.data.coupons = res.coupons
       
        this.setData({
          coupons: this.data.coupons,
          isShowCoupon: true
        })
      }, error => {
        wx.showToast({
          title: error.errorMsg,
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      this.setData({
        isShowCoupon: true
      })
    }
    
  },
  closeCouponBlock: function(eventDetail) {
    let isCancel = eventDetail.detail.isCancel
    if(isCancel) {
      this.setData({
        isShowCoupon: false
      })
      return ;
    };
    let isUseCoupon = eventDetail.detail.isUseCoupon
    let isSelect = eventDetail.detail.isSelect
    let realTotalPrice = this.data.realTotalPrice
    let totalPrice = this.data.totalPrice
    let couponMoney = eventDetail.detail.couponMoney
    let coupons = eventDetail.detail.coupons
    this.data.coupons = coupons

    if (isUseCoupon) {  
      this.data.couponId = eventDetail.detail.couponId
      couponMoney = parseInt(totalPrice) > parseInt(couponMoney) ? couponMoney : totalPrice
      realTotalPrice = totalPrice - couponMoney > 0 ? totalPrice - couponMoney : 0
  
      this.setData({
        isUseCoupon: isUseCoupon,
        couponMoney: couponMoney,
        realTotalPrice: realTotalPrice,
        isShowCoupon: false,
        coupons,
        isSelect,
      }) 
    } else {
      this.data.couponId = 0
      let obj = {
        isShowCoupon: false,
        isUseCoupon: false,
        coupons,
        realTotalPrice: totalPrice
      }
      if (isSelect) {
        obj.isSelect = isSelect
      } 
      this.setData(obj)
    }
    
  },
  checkMobile: function(e) {
    // 手机号
    this.data.phone = e.detail.value
    let regExp = /^(0|86|17951)?(13[0-9]|15[0-9]|18[0-9]|14[57]|17[678])[0-9]{8}$/
    this.data.mobileIsLegal = regExp.test(this.data.phone)
    this.checkCanISubmit()
  },
  checkName: function(e) {
    let regExp = /^[\u4e00-\u9fa5]{1,6}$/
    this.data.name = e.detail.value
    this.data.nameIsLegal = regExp.test(this.data.name)
    this.checkCanISubmit()
  },
  checkCanISubmit: function() {
    let data = this.data
    if(data.mobileIsLegal && data.nameIsLegal) {
      this.setData({
        canISubmit: true
      })
    } else if(data.canISubmit) {
      this.setData({
        canISubmit: false
      })
    } 
  },
  formSubmit: function() {
    let that = this
    let data = this.data
    
    let params = {
      respondentName: data.name,
      respondentPhone: data.phone,
      items: data.idLists.toString()
    }
    if (data.couponId) {
      params.couponId = parseInt(data.couponId)
    }
    console.log(params)
    
    API.request({
      'url': `${API.host}/v2/survey/order/request`,
      data: params
    }, res => {
      let wxData = res.wxPayData
      wx.requestPayment({
        timeStamp: wxData.timeStamp,
        nonceStr: wxData.nonceStr,
        package: wxData.packageStr,
        signType: wxData.signType,
        paySign: wxData.paySign,
        fail: err => {
          console.log(err)
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 2000
          })
        }
     })
    }, error => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  }
})