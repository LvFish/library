Page({
  data:{
    bookNum:'',
    classify: '',
    bookInfo:[],
    // array: [{
    //     src:'/img/java.png',
    // },{
    //     src:'/img/java.png',
    // },{
    //    src:'/img/java.png',
    // },{
    //    src:'/img/java.png',
    // },{
    //    src:'/img/java.png',
    // },{
    //    src:'/img/java.png',
    // }],
  },

  failimg:function(e){
    console.log("图片加载错误")
    e.src = 'img/notFound.jpg' 
  },

  onLoad: function (options) {
    console.log('bookListClassify')
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })


    var that =  this

    setTimeout(function () {
      that.setData({
        hide: true
      })
    }, 800),

    // 生命周期函数--监听页面加载
    that.setData({
      classify:wx.getStorageSync('classify')
    })

    wx.request({   
      url: 'https://lll5810.top/book/classify',
      data: {
        classify: this.data.classify
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }, 
      success: function(res) {
        console.log(res.data);
        that.setData({
          bookInfo:res.data.books,
          bookNum:res.data.book_cont
        })
      },
      fail: function(res) {
        console.log('失败')
      },
      complete: function(res) {},
    })

  },

  toast:function(e){
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

  
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})