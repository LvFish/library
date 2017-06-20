Page({

  data: {
    result:'',
    path:'',
    charSet:'',
    scanType:'',
    isbn:'',
    scanflag:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
     console.log("我进来了")
     if (!wx.getStorageSync('username'))
       wx.redirectTo({
         url: '/pages/login/login',
       })

    var that = this
    if(that.data.scanflag==1){
      that.setData({
        scanflag:0
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }

    wx.scanCode({
      success:function(res){
        that.setData({
          result:res.result,
          scanflag: 1
        })
        wx.setStorageSync('isbn', that.data.result),
        console.log(that.data.result),
          wx.navigateTo({
            url: '/pages/bookInfo/bookInfo',
          })
      }
    })

   },

   returns:function(e){
    wx.switchTab({
      url: '/pages/index/index',
    })
   },

   re:function(e){
     console.log("到函数里了")
    wx.navigateTo({
      url: '/pages/scan/scan',
    })
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  }
})