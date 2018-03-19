import API from '../../utils/api.js';

Page({
  data: {
    lists: [
      {
        id: '0',
        name: '张大宝',
        date: '03-07 16:16',
        price: '￥35.00',
        refundStatus: '0'
      }, {
        id: '1',
        name: '张大宝',
        date: '03-07 16:16',
        price: '￥35.00',
        refundStatus: '1'
      }, {
        id: '2',
        name: '张大宝',
        date: '03-07 16:16',
        price: '￥35.00',
        refundStatus: '2'
      }, {
        id: '3',
        name: '张大宝',
        date: '03-07 16:16',
        price: '￥35.00',
        refundStatus: '1'
      }
    ]
  },
  toJump: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../billdetail/billdetail?id=${id}`
    })
  }
})