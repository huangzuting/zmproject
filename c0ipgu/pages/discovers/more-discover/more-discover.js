// pages/discovers/more-discover/more-discover.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
    discovers: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
  },
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/discover/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/discover/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/discover/top250";
        break;
    }
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },

  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.discovers = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function (discoversDouban) {
    var discovers = [];
    for (var idx in discoversDouban.subjects) {
      var subject = discoversDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        discoverId: subject.id
      }
      discovers.push(temp)
    }
    var totaldiscovers = {}

    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totaldiscovers = this.data.discovers.concat(discovers);
    }
    else {
      totaldiscovers = discovers;
      this.data.isEmpty = false;
    }
    this.setData({
      discovers: totaldiscovers
    });

    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },

  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  ondiscoverTap: function (event) {
    var discoverId = event.currentTarget.dataset.discoverid;
    wx.navigateTo({
      url: '../discover-detail/discover-detail?id=' + discoverId
    })
  },
})