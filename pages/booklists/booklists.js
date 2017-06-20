Page({
  data: {
    searchClass:'',
    searchString:'',
    bookNum: '',
    bookInfo: [],
    showV:1,
    username:'',
    history:[],
    hide:false
  },

  toast: function (e) {
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })

    var that=this
    setTimeout(function(){
      that.setData({
        hide:true
      })
    },800),


    that.setData({
      searchClass:wx.getStorageSync('searchClass'),
      searchString:wx.getStorageSync('searchString'),
      username:wx.getStorageSync('username')
    })

    wx.request({
      url: 'https://lll5810.top/book/searchBook',
      data: {
        name:that.data.searchString,
        classify:that.data.searchClass,
        username:that.data.username
      },
      header: {
        'Content-Type': 'application/json'
      }, 
      
      success: function(res){
        that.setData({
          bookInfo: res.data.books,
          bookNum: res.data.book_cont
        })

        console.log(res)

        if(that.data.bookNum=='0')
        {
          that.setData({
            showV:0
          })
        }
      },

      fail: function(res) {},


      complete: function(res) {},
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
    
  }
})