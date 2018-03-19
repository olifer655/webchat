import API from '../../utils/api.js';

Page({
  data: {
    reportDetails: [
      {
        title: '身份信息',
        lists: [
          {
            key: '姓名',
            value: '张某',
            isv: '0'
          }, {
            key: '性别',
            value: '男',
            isv: '0'
          }, {
            key: '年龄',
            value: '24岁',
            isv: '0'
          }, {
            key: '身份证号',
            value: '330382199611291111',
            isv: '0'
          }, {
            key: '籍贯',
            value: '浙江省温州市',
            isv: '0'
          }
        ]
      }, {
        title: '联系信息',
        lists: [
          {
            key: '手机号',
            value: '13944567438',
            isv: '0'
          }, {
            key: '状态',
            value: '在网',
            isv: '0'
          }, {
            key: '在网时长',
            value: '2年以上',
            isv: '0'
          }
        ]
      }, {
        title: '学历信息',
        lists: [
          {
            key: '学历信息',
            value: '未通过',
            isv: '0'
          },{
            key: '毕业院校',
            value: '长江学院',
            isv: '0'
          }, {
            key: '最高学历',
            value: '否',
            isv: '1'
          }, {
            key: '毕业时间',
            value: '2015年',
            isv: '0'
          }, {
            key: '学习形式',
            value: '自考',
            isv: '0'
          }, {
            key: '结论',
            value: '毕业',
            isv: '0'
          }
        ]
      },{
        title: '健康证',
        lists: [
          {
            key: '是否网贷逾期',
            value: '是',
            isv: '1'
          }, {
            key: '是否在法院公开被执行人名单',
            value: '否',
            isv: '0'
          }, {
            key: '是否在法院公开失信被执行人名单',
            value: '否',
            isv: '0'
          }, {
            key: '是否存在犯罪记录',
            value: '否',
            isv: '0'
          }, {
            key: '是否是吸毒人员',
            value: '否',
            isv: '0'
          }, {
            key: '是否是涉案人员',
            value: '否',
            isv: '0'
          }, {
            key: '是否是犯罪嫌疑人',
            value: '是',
            isv: '0'
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
