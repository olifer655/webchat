import API from '../../utils/api.js';

Page({
  data: {
    lists: [],
    orderStatusMap: {
      '2': '待支付',
      '3': '支付完成',
      '-3': '退款中',
      '-4': '退款成功'
    },
    isLoading: false,
    loadedComputed: false,
    winHeight: 0
  },
  params: {
    pageNo: 1,
    pageSize: 20
  },
  onShow: function() {
    this.loadMore()
    this.getSwipeHeight()
  },
  getSwipeHeight: function() {
    let that = this

    wx.getSystemInfo( {  
      success: function( res ) { 
        that.setData( {    
          winHeight: res.windowHeight  
        });  
      }  
    });  
  },
  loadMore: function(e) {
    if (this.data.loadedComputed) return
    
    let that = this
    let pageNo = this.params.pageNo
    let pageSize = this.params.pageSize * pageNo

    this.setData({
      isLoading: true
    })

    API.request({
      url: `${API.host}/v2/bill/mybill/list?pageNo=${pageNo}&pageSize=${pageSize }`,
      method: 'GET'
    }, res => {
      let setdata = {}

      if(res.bills.length < that.params.pageSize) {
        that.data.loadedComputed = true
        setdata.loadedComputed = that.data.loadedComputed
      }
      that.data.lists.push(...res.bills)
      that.params.pageNo ++

      setdata.lists = this.data.lists
      setdata.isLoading = false
      
      that.setData(setdata)
    }, error => {
      that.data.isLoading = false
      that.setData({
        isLoading: false
      })
      wx.showToast({
        title: error.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  toJump: function(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `../billdetail/billdetail?id=${id}`
    })
  }
})