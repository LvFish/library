//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    showView:true,
    username:'',
    motto: 'Hello World',
    userInfo: {},
    src:'../../images/小关闭.png',
    testimg:'/img/市中心.png',
    // bookName:[],
    // author:[],
    // price:[],
    // publishInfo:[],
    // borrowNum:[],
    // requestInfo:'',
    bookInfo:[],
    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        link: '/pages/logs/logs',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }, {
        link: '/pages/test/test',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  toast: function(e) {
    console.log(e.currentTarget.id)
    var array = new Array();
    array = e.currentTarget.id.split('@');
    wx.setStorageSync('isbn', array[0])
    wx.setStorageSync('bookNumber', array[1])
    wx.setStorageSync('leftNumber', array[2])
    wx.navigateTo({
      url: '/pages/bookInfo/bookInfo'
    })
  },

  closeShow:function(e){
    var that=this
    that.setData({
      showView:false
    })
  },

  xiaoshuo:function(e){
    wx.setStorageSync('classify', '小说')
    wx.navigateTo({
      url: '/pages/bookListClassify/bookListClassify',
    })
  },

  tiyu: function (e) {
    wx.setStorageSync('classify', '体育/运动')
    wx.navigateTo({
      url: '/pages/bookListClassify/bookListClassify',
    })
  },

  wenhua: function(e) {
    wx.setStorageSync('classify', '文化')
    wx.navigateTo({
      url: '/pages/bookListClassify/bookListClassify',
    })
  },

  meishi: function(e) {
    wx.setStorageSync('classify', '美食')
    wx.navigateTo({
      url: '/pages/bookListClassify/bookListClassify',
    })
  },

  lvyou: function(e) {
    wx.setStorageSync('classify', '旅游')
    wx.navigateTo({
      url: '/pages/bookListClassify/bookListClassify',
    })
  },

  search_jump:function(e){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  more:function(e){
    wx.navigateTo({
      url: '/pages/classify/classify',
    })
  },


  onLoad: function (res) {
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })

    var that=this
    that.setData({
      username:wx.getStorageSync('username')
    })
    console.log('index')
    wx.request({
      url: 'https://lll5810.top/book/recommend',
      data:{
        username:that.data.username
      },
      header: {
        'Content-Type': 'application/json'
      }, 
      success:function(res){
        console.log(res)
        that.setData({
          bookInfo:res.data.msg
        })
      },

      fail:function(res){
        console.log('错误')
      }

    })
  }
})
