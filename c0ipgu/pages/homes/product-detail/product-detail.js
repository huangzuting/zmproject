var productsData = require('../../../data/products-data.js')
var app = getApp();
Page({
    data: {
        isPlayingMusic: false
    },
    onLoad: function (option) {
        var productId = option.id;
        this.data.currentproductId = productId;
        var productData = productsData.productList[productId];
        this.setData({
            productData: productData
        })

        var productsCollected = wx.getStorageSync('products_collected')
        if (productsCollected) {
            var productCollected = productsCollected[productId]
            this.setData({
                collected: productCollected
            })
        }
        else {
            var productsCollected = {};
            productsCollected[productId] = false;
            wx.setStorageSync('products_collected', productsCollected);
        }

        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicproductId
            === productId) {
            this.setData({
                isPlayingMusic: true
            })
        }
        this.setMusicMonitor();
    },

    setMusicMonitor: function () {
        //点击播放图标和总控开关都会触发这个函数
        var that = this;
        wx.onBackgroundAudioPlay(function (event) {
            var pages = getCurrentPages();
            var currentPage = pages[pages.length - 1];
            if (currentPage.data.currentproductId === that.data.currentproductId) {
                // 打开多个product-detail页面后，每个页面不会关闭，只会隐藏。通过页面栈拿到到
                // 当前页面的productid，只处理当前页面的音乐播放。
                if (app.globalData.g_currentMusicproductId == that.data.currentproductId) {
                    // 播放当前页面音乐才改变图标
                    that.setData({
                        isPlayingMusic: true
                    })
                }
                // if(app.globalData.g_currentMusicproductId == that.data.currentproductId )
                // app.globalData.g_currentMusicproductId = that.data.currentproductId;
            }
            app.globalData.g_isPlayingMusic = true;

        });
        wx.onBackgroundAudioPause(function () {
            var pages = getCurrentPages();
            var currentPage = pages[pages.length - 1];
            if (currentPage.data.currentproductId === that.data.currentproductId) {
                if (app.globalData.g_currentMusicproductId == that.data.currentproductId) {
                    that.setData({
                        isPlayingMusic: false
                    })
                }
            }
            app.globalData.g_isPlayingMusic = false;
            // app.globalData.g_currentMusicproductId = null;
        });
        wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            // app.globalData.g_currentMusicproductId = null;
        });
    },

    onColletionTap: function (event) {
        // this.getproductsCollectedSyc();
        this.getproductsCollectedAsy();
    },

    getproductsCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: "products_collected",
            success: function (res) {
                var productsCollected = res.data;
                var productCollected = productsCollected[that.data.currentproductId];
                // 收藏变成未收藏，未收藏变成收藏
                productCollected = !productCollected;
                productsCollected[that.data.currentproductId] = productCollected;
                that.showToast(productsCollected, productCollected);
            }
        })
    },

    getproductsCollectedSyc: function () {
        var productsCollected = wx.getStorageSync('products_collected');
        var productCollected = productsCollected[this.data.currentproductId];
        // 收藏变成未收藏，未收藏变成收藏
        productCollected = !productCollected;
        productsCollected[this.data.currentproductId] = productCollected;
        this.showToast(productsCollected, productCollected);
    },

    showModal: function (productsCollected, productCollected) {
        var that = this;
        wx.showModal({
            title: "收藏",
            content: productCollected ? "收藏该文章？" : "取消收藏该文章？",
            showCancel: "true",
            cancelText: "取消",
            cancelColor: "#333",
            confirmText: "确认",
            confirmColor: "#405f80",
            success: function (res) {
                if (res.confirm) {
                    wx.setStorageSync('products_collected', productsCollected);
                    // 更新数据绑定变量，从而实现切换图片
                    that.setData({
                        collected: productCollected
                    })
                }
            }
        })
    },

    showToast: function (productsCollected, productCollected) {
        // 更新文章是否的缓存值
        wx.setStorageSync('products_collected', productsCollected);
        // 更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: productCollected
        })
        wx.showToast({
            title: productCollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success"
        })
    },

    onShareTap: function (event) {
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                // res.cancel 用户是不是点击了取消按钮
                // res.tapIndex 数组元素的序号，从0开始
                wx.showModal({
                    title: "用户 " + itemList[res.tapIndex],
                    content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
                })
            }
        })
    },

    onMusicTap: function (event) {
        var currentproductId = this.data.currentproductId;
        var productData = productsData.productList[currentproductId];
        var isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
            // app.globalData.g_currentMusicproductId = null;
            app.globalData.g_isPlayingMusic = false;
        }
        else {
            wx.playBackgroundAudio({
                dataUrl: productData.music.url,
                title: productData.music.title,
                coverImgUrl: productData.music.coverImg,
            })
            this.setData({
                isPlayingMusic: true
            })
            app.globalData.g_currentMusicproductId = this.data.currentproductId;
            app.globalData.g_isPlayingMusic = true;
        }
    },

    /*
    * 定义页面分享函数
    */
    onShareAppMessage: function (event) {
        return {
            title: '离思五首·其四',
            desc: '曾经沧海难为水，除却巫山不是云',
            path: '/pages/products/product-detail/product-detail?id=0'
        }
    }

})