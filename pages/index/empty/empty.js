const egReportLists = [{
  id: 0,
  respondentName: '张小龙',
  respondentPhone: '18333333333',
  surveyTime: '01-04 13:45',
  status: '100'
}]
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
    egReportLists: egReportLists
  },
  methods: {
    toJump: function(status) {
      wx.navigateTo({
        url: '../../pages/introduce/introduce'
      })
    }
  }
})