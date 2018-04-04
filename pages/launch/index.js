import API from '../../utils/api.js';

Page({
  data: {
    lists: [],
    hasUserInfo: false,
    phone: '',
    isCertification: false
  },
  flag: false,
  onLoad: function() {
    this.init()
    this.isLogin()
  },
  onShow: function() {
    /** 
     * 本页流程：
     * flag,来判断是否是首次进入,首次进入，如果执行那么会报错
     * 如果用户未实名认证，那么先进行实名，然后在进行下一步
     * 当时进行实名认证后，回到这里， onLoad不会再进行，
     * 所以这里才又添了 onShow 这一步。
    **/
    if (this.flag) {
      this.isLogin()
    }
  },
  init: function(e) {
    let that = this

    API.request({
      url: `${API.host}/v2/itm/list`,
      method: 'GET'
    }, res => {
      that.setData({
        lists: res.items
      })
    }, error => {
      wx.showToast({
        title: error.errorMsg,
        icon: 'none'
      })
    })
  },
  isLogin: function() {
    // 获取用户信息
    API.request({
      url: `${API.host}/v2/user/invest/info`,
      method: 'GET'
    }, res => {
      this.flag = true
      let data = {
        isCertification: res.hasCert,
        phone: res.phone,
        hasUserInfo: true
      }

      this.setData(data)
    }, err => {
      this.flag = true
      wx.redirectTo({
        url: '../login/login'
      })
    })
  },
  toJump: function(e) {
    let path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: `../${path}/${path}`
    })
  },
  toChoice: function(e) {
    let index = e.currentTarget.dataset.index

    this.data.lists[index].isClick = !this.data.lists[index].isClick
    this.setData({
      lists: this.data.lists
    })
  },
  gotoCert: function() {
    wx.navigateTo({
      url: `../tocertification/tocertification?phone=${this.data.phone}`
    })
  },
  toNext: function() {
    if (!this.data.isCertification) {
      return this.gotoCert()
    }
    
    let totalPrice = 0;
    let idLists = [];
    let checks = [];
    let that = this;
    let lists = this.data.lists;
    let length = lists.length;
    let flag = false; // 是否选中了某一项
    let name = null;
    for(let i = 0; i < length; i++ ) {
      if (lists[i].required && !lists[i].isClick) {
        name = lists[i].name
        break; 
      } else if(lists[i].isClick) {
        flag = true
        idLists.push(lists[i].id);
        checks.push(lists[i].name);
        totalPrice = parseInt(totalPrice) + parseInt(lists[i].price)
      } 
    } 
    if(name) {
      wx.showToast({
        title: `${name}为必选产品`,
        icon: 'none',
        duration: 2000
      })
    } else if(!flag) {
      wx.showToast({
        title: '请选择需要认证的信息',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.setStorage({
        key: 'CHECKS',
        data: checks
      })
      wx.setStorage({
        key: 'TOTAL_PRICE',
        data: totalPrice
      })
      wx.setStorage({
        key: 'ID_LISTS',
        data: idLists
      })
      wx.navigateTo({
        url: '/pages/pay/pay'
      })
    }
  }
})