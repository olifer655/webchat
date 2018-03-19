Component({
  properties: {
    coupons: {
      type: Array,
      value: ''
    },
    isSelect: {
      type: Boolean,
      value: ''
    },
    isUseCoupon: {
      type: Boolean,
      value: ''
    }
  },
  methods: {
    closecoupon: function(e) {
      let indexMark = e.currentTarget.dataset.index
      let that = this
      let eventDetail = {}
      if (indexMark === 'undefined') {
        eventDetail = {
          isCancel: true
        }
      } else if(indexMark === 'no') {
        let coupons = this.properties.coupons

        coupons.map(item => {
          item.isSelect = false
        })

        eventDetail = { 
          isCancel: false,
          coupons,
          isUseCoupon: false,
          isSelect: true
        }

      } else {
        let couponMoney = e.currentTarget.dataset.money
        let id = e.currentTarget.dataset.id
        let coupons = this.properties.coupons

        coupons.map((item, index) => {
          if(index == indexMark) {
            item.isSelect = true
          } else {
            item.isSelect = false
          }
        })

        eventDetail = {
          isCancel: false,
          isUseCoupon: true,
          couponId: id,
          couponMoney: couponMoney,
          coupons,
          isSelect: false
        }
      }
      
      let eventOption = {
        composed: true
      }
      console.log(eventDetail)
  
      this.triggerEvent('closecoupon', eventDetail, eventOption)
    },
  },
  ready: function() {
    console.log(this.properties.coupons)
  }
})