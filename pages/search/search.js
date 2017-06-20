Page({
  data: {
    cone: '#27AE60',
    ctwo: '#DDD',
    cthree: '#DDD',
    // cfour:'#DDD',
    searchClass: 1,
    searchString: '',
    history:[]
  },

  submit: function (e) {
    if (this.data.searchString != null && this.data.searchString != '')
      { 
        wx.setStorageSync('searchClass',this.data.searchClass),
        wx.setStorageSync('searchString',this.data.searchString),
        wx.navigateTo({
          url: '/pages/booklists/booklists'
        })
      }
  },

  inputChange: function (e){
    var that = this
    that.setData({
      searchString: e.detail.value
    })
  },

  one: function (e) {
    this.setData({
      cone: '#27AE60',
      ctwo: '#DDD',
      cthree: '#DDD',
      cfour: '#DDD',
      searchClass: 1
    })
  },

  two: function (e) {
    this.setData({
      cone: '#DDD',
      ctwo: '#27AE60',
      cthree: '#DDD',
      cfour: '#DDD',
      searchClass: 2
    })
  },

  three: function (e) {
    this.setData({
      cone: '#DDD',
      ctwo: '#DDD',
      cthree: '#27AE60',
      cfour: '#DDD',
      searchClass: 3
    })
  },

  // four:function(e){
  //   this.setData({
  //     cone:'#DDD',
  //     ctwo:'#DDD',
  //     cthree:'#DDD',
  //     cfour:'deepskyblue'
  //   })
  // },

  onLoad: function (options) {
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })

    var that=this
    that.setData({
      username:wx.getStorageSync('username')
    })

    wx.request({
      url: 'https://lll5810.top/book/search',
      data:{
        username:that.data.username
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          history:res.data.search
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })  
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
   
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
   
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})