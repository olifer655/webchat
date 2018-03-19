Page({
  data: {
    reportDetails: [
      {
        title: '身份信息',
        lists: [
          {
            key: '姓名',
            value: '张某'
          }, {
            key: '性别',
            value: '男'
          }, {
            key: '年龄',
            value: '24岁'
          }, {
            key: '身份证号',
            value: '330382199611291111'
          }, {
            key: '籍贯',
            value: '浙江省温州市'
          }
        ]
      }, {
        title: '联系信息',
        lists: [
          {
            key: '手机号',
            value: '13944567438'
          }, {
            key: '状态',
            value: '在网'
          }, {
            key: '在网时长',
            value: '2年以上'
          }
        ]
      }, {
        title: '负面信息',
        lists: [
          {
            key: '是否网贷逾期',
            value: '是',
            isBad: true
          }, {
            key: '是否在法院公开被执行人名单',
            value: '否',
            isBad: false
          }, {
            key: '是否在法院公开失信被执行人名单',
            value: '否',
            isBad: false
          }, {
            key: '是否存在犯罪记录',
            value: '否',
            isBad: false
          }, {
            key: '是否是吸毒人员',
            value: '否',
            isBad: false
          }, {
            key: '是否是涉案人员',
            value: '否',
            isBad: false
          }, {
            key: '是否是犯罪嫌疑人',
            value: '是',
            isBad: true
          }
        ]
      }
    ]
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '报告示例'
    })
    wx.showTabBar({})
  }
})
