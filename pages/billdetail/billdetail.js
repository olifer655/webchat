import API from '../../utils/api.js';

Page({
  data: {
    candidate: {
      name: '张大宝',
      date: '03-07 16:16',
      isUseCoupon: true,
      coupon: '5.00',
      realPay: '15.00',
      refundStatus: '1',
      info: [
        {
          id: 0,
          title: '身份证认证',
          price: '5.00'
        }, {
          id: 1,
          title: '手机号认证',
          price: '10.00'
        }
      ]
    }
  },

})