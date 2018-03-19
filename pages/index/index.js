const app = getApp()

const waitingReportLists = [
  {
    id: 0,
    respondentsName: '张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '0'
  }, {
    id: 1,
    respondentsName: '张小宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '2'
  }, {
    id: 2,
    respondentsName: '张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '2'
  }
];
const newReportLists = [
  {
    id: 3,
    respondentsName: '张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '3'
  }, {
    id: 4,
    respondentsName: '张大宝张大宝张大宝张大宝张大宝张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '4'
  }, {
    id: 5,
    respondentsName: '张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '6'
  },{
    id: 6,
    respondentsName: '张大宝张大宝张大宝张大宝张大宝张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '2'
  }, {
    id: 7,
    respondentsName: '张大宝张大宝张大宝张大宝张大宝张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '2'
  }

];

const historyLists = [
  {
    id: 3,
    respondentsName: '张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '0'
  }, {
    id: 8,
    respondentsName: '张大宝张大宝张大宝张大宝张大宝张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '1'
  }, {
    id: 4,
    respondentsName: '张大宝张大宝张大宝张大宝张大宝张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '2'
  }, {
    id: 5,
    respondentsName: '张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '3'
  },{
    id: 6,
    respondentsName: '张大宝张大宝张大宝张大宝张大宝张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '4'
  }, {
    id: 7,
    respondentsName: '张大宝张大宝张大宝张大宝张大宝张大宝',
    respondentsPhoneNo: '13116710000',
    createTime: '01-04 13:45',
    status: '6'
  }
]

import API from '../../utils/api.js';

Page({
  data: {
    hasUserInfo: false,
    currentTab: 0,  
    newReportLists: [],
    waitingReportLists: [],
    historyLists: historyLists,
    winHeight: 0
  },
  params: {
    pageNo: 1,
    pageSize: 10
  },
  onLoad: function () {
    let data = this.data;
    let newRLength = data.newReportLists.length
    let waitingRLength = data.waitingReportLists.length
    let historyRLength = data.historyLists.length
    
    this.getSwipeHeight()
    this.init()
    if(!newRLength && waitingRLength && historyRLength) {
      
    }
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
    this.getNewReportLists()
    this.getWaitingReportLists()
    this.getInitHistoryReportLists()
  },
  getNewReportLists: function() {
    API.request({
      url: `${API.host}serge/qiyewx/h5/investigator/listUnreadReport`,
    }, res => {
      this.newReportLists = []
    }, err => {
      this.newReportLists = []
      console.log(err)
    })
  },
  getWaitingReportLists: function() {
    API.request({
      url: `${API.host}serge/qiyewx/h5/investigator/listUnreadReport`,
    }, res => {
      this.waitingReportLists = []
      this.setData({
        waitingReportLists: waitingReportLists
      })
    }, err => {
      this.waitingReportLists = []
      console.log(err)
    })
  },
  getInitHistoryReportLists: function() {
    API.request({
      url: `${API.host}serge/qiyewx/h5/investigator/listUnreadReport`,
    }, res => {
      this.historyLists = []
      this.setData({
        historyLists: historyLists
      })
    }, err => {
      this.historyLists = []
      console.log(err)
    })
  },

  //滑动切换tab  
  bindChange: function( e ) { 
    let that = this
    that.setData({ currentTab: e.detail.current });  
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

  init: function() {    
    // 是否登陆的接口
    let hasUserInfo = true
    if (!hasUserInfo) {
      wx.redirectTo({
        url: '../login/login'
      })
    } else {
      this.getReportLists()
      this.setData({
        hasUserInfo: true
      })
    }
  }
})
