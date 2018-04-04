const APP = getApp()

import API from '../../utils/api.js';
import UTIL from '../../utils/util.js';

Page({
  data: {
    hasUserInfo: false,
    hasReport: false,
    currentTab: 0,  
    newReportLists: [],
    unReportLists: [],
    historyLists: [],
    winHeight: 0,
    isLoading: false,
    loadedComputed: false,
    flag: false // 防止页面闪烁
  },
  params: {
    pageNo: 1,
    pageSize: 20,
    loadedComputed: false,
  },
  onShow: function () {
    // 发送code给后端
    this.init()
  },
  switchTab: function(e) {
    this.getSwipeHeight()
    this.setData({
      currentTab: e.detail.current
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
      url: `${API.host}/v2/report/invest/history/list?pageNo=${pageNo}&pageSize=${pageSize }`,
      method: 'GET'
    }, res => {
      let setdata = {}

      if(res.reports.length < that.params.pageSize) {
        that.data.loadedComputed = true
        setdata.loadedComputed = that.data.loadedComputed
      }
      that.data.historyLists.push(...res.reports)
      that.params.pageNo ++

      setdata.historyLists = this.data.historyLists
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

  getPendingReportLists: function() {
    let that = this

    API.request({
      url: `${API.host}/v2/report/invest/do/list`,
      method: 'GET'
    }, res => {
      that.newReportLists = res.newReports || [];
      that.unReportLists = res.unReports || [];
      
      that.setData({
        newReportLists: that.newReportLists,
        unReportLists: that.unReportLists
      })
    }, err => {
      wx.showToast({
        title: err.errorMsg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  //点击tab切换
  swichNav: function( e ) {  
    let that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  },
  isLogin() {
    API.request({
      url: `${API.host}/v2/user/invest/info`,
      method: 'GET'
    }, res => {
      this.data.hasUserInfo = true

      if(res.hasReport) {
        this.data.hasReport = true
      } else {
        this.data.hasReport = false
      }
      this.setData({
        flag: true,
        hasUserInfo: this.data.hasUserInfo,
        hasReport: this.data.hasReport
      })
    }, error => {
      this.setData({
        flag: true,
      })
      this.data.hasReport = false
    })
  },
  init: function() {  
    this.isLogin()
    this.getPendingReportLists()
    this.loadMore()
  }
})
