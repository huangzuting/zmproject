var productsData = require('../../data/products-data.js')

Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
    array: ['直播+面授', '面授', '直播', '直播+录播'],
    objectArray: [
      {
        id: 0,
        name: '直播+面授'
      },
      {
        id: 1,
        name: '面授'
      },
      {
        id: 2,
        name: '直播'
      },
      {
        id: 3,
        name: '直播+录播'
      }
    ],
    index: 0,
    region: ['广东省', '广州市', '海珠区']
  },
  onLoad: function () {

    // this.data.productList = productsData.productList
    this.setData({
       productList:productsData.productList
      });
  },

  onproductTap: function (event) {
    var productId = event.currentTarget.dataset.productid;
    // console.log("on product id is" + productId);
    wx.navigateTo({
      url: "product-detail/product-detail?id=" + productId
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  

  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var productId = event.target.dataset.productid;
    wx.navigateTo({
      url: "product-detail/product-detail?id=" + productId
    })
  }
})