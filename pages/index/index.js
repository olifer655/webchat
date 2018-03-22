const app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']

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
    winHeight: 0
  },
  params: {
    pageNo: 1,
    pageSize: 10
  },
  onLoad: function () {
    // 发送code给后端
    wx.login({
      success: function(res) {
        if(res.code) {
          API.request({
            url: `${API.host}/v1/wechat/small/login`,
            data: {
              code: res.code
            }
          })
        }
      }
    })
    this.init()
    this.getSwipeHeight()
  },
  switchTab: function(e) {
    this.setData({
      currentTab:e.detail.current
    });
  },
  loaderMore: function(e) {
    console.log(e)
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
  getReportLists: function() {
    this.getPendingReportLists()
    this.getInitHistoryReportLists()
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
  getInitHistoryReportLists: function() {
    API.request({
      url: `${API.host}/v2/report/invest/history/list?pageNo=${this.params.pageNo}&pageSize=${this.params.pageSize}`,
      method: 'GET'
    }, res => {
      this.data.historyLists = res.reports || []
      this.setData({
        historyLists: this.data.historyLists
      })
    }, error => {
      wx.showToast({
        title: error.errorMsg,
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
        hasUserInfo: this.data.hasUserInfo,
        hasReport: this.data.hasReport
      })
    }, error => {
      wx.redirectTo({
        url: '../login/login'
      })
    })
  },
  init: function() {  
    wx.login({})  
    this.isLogin()
    this.getReportLists()
  }
})
