Component({
  properties: {
    reportLists: {
      type: Array,
      value: ''
    },
    isEg: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusFilter: {
      '0': '待授权',
      '1': '生成中',
      '2': '新报告',
      '3': '',
      '4': '生成中',
      '6': '生成失败',
      '8': '终止背调',
      '9': '生成中',
      '100': '报告范例'
    }
  },
  methods: {
    toJump: function(e) {
      // 0:待授权、1: 已授权 、2:新报告、3:已读、4:生成中、 6、生成失败  8、终止背调 9、完善信息中
      let status = e.currentTarget.dataset.status
      let id = e.currentTarget.dataset.id

      if(this.properties.isEg) {
        wx.navigateTo({
          url: '../../pages/example/example'
        })
      } else if(status == '2' || status === '3') {
        wx.navigateTo({
          url: `../../pages/detail/detail?id=${id}`
        })
      } else {
        wx.navigateTo({
          url: `../../pages/waiting/waiting?id=${id}`
        })
      } 
    }
  }
})