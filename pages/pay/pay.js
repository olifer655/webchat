import API from '../../utils/api.js';
const coupons = [
  {
    couponId: 123,
    couponType: '优惠券',
    couponMoney: '30',
    unit: '¥',
    couponDes: '',
    validateDate: '2018-12-21'
  }, {
    couponId: 124,
    couponType: '优惠券',
    couponMoney: '30',
    unit: '¥',
    couponDes: '',
    validateDate: '2018-12-21'
  }
]
Page({
  data: {
    checks: ['身份证信息认证'],
    totalPrice: '',
    coupons: coupons,
    realTotalPrice: '',
    canISubmit: false,
    isUseCoupon: false,
    isShowCoupon: false,
    couponMoney: 0,
    couponId: 0,
    isSelect: false
  },
  map: {
    isMobile: '手机号实名认证',
    isNegativeInfo: '负面信息认证',
    isEducation: '学历信息认证',
    isHealth: '健康证认证',
    isProfessional: '职业资格证认证',
    isProvidentFund: '公积金信息认证',
    isSocialSecurity: '社保信息认证'
  },
  onLoad: function() {
    this.init()
  },
  init: function(e) {
    let that = this
    wx.getStorage({
      key: 'CHECKS',
      success: function(res) {
        let data = res.data
        data.map((item) => {
          that.data.checks.push(that.map[item])	
        })
        that.setData({
          checks: that.data.checks
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

  },
  selectCoupon: function() {
    this.setData({
      isShowCoupon: true
    })
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

    if (isUseCoupon) {  
      let coupons = eventDetail.detail.coupons
      
      this.data.couponId = eventDetail.detail.couponId
      couponMoney = parseInt(totalPrice) > parseInt(couponMoney)? couponMoney : totalPrice
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
      let coupons = eventDetail.detail.coupons
      let obj = {
        isShowCoupon: false,
        isUseCoupon: false,
        coupons,
        realTotalPrice: totalPrice
      }
      if (isSelect) {
        obj.isSelect = isSelect
      } 
      console.log(obj)
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
})