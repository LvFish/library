Page({
  data:{
    bookNum: '',
    bookInfo: [],
    username:'',
    // array: [{
    //     src:'/img/jsp.jpg',
    // },{
    //     src:'/img/j2.jpg',
    // }],
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

  delete_book: function (e) {
    var that = this
    wx.showModal({
      title: '取消预约/借阅该书籍？',
      success: function (res) {
        if (res.confirm) {
          console.log(e.currentTarget.id)
          var array = new Array();
          array = e.currentTarget.id.split('@');
          that.setData({
            isbn: array[0]
          })

          console.log(that.data.username + " " + that.data.isbn)

          wx.request({
            url: 'https://lll5810.top/book/delete_appoint',
            data: {
              username: that.data.username,
              isbn: that.data.isbn
            },

            success: function (res) {
              console.log(res)
              if (res.data) {
                wx.showModal({
                  title: '已取消预约/借阅',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.request({
                        url: 'https://lll5810.top/book/myborrow',
                        data: {
                          username: that.data.username
                        },
                        header: {
                          'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        success: function (res) {
                          console.log(that.data.username)
                          that.setData({
                            bookInfo: res.data.book,
                            bookNum: res.data.myborrow_cont
                          })
                          console.log(res)
                        }
                      })
                    }
                  }
                })
              } else {
                wx.showModal({
                  title: '取消失败',
                  showCancel: false,
                })
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      }
    })


  },

  onLoad:function(options){
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })
    
    var that=this
    that.setData({
      username:wx.getStorageSync('username')
    })

    wx.request({
      url: 'https://lll5810.top/book/myborrow',
      data:{
        username:this.data.username
      },
      header: {
        'Content-Type': 'application/json'
      }, 
      method:'GET',
      success:function(res){
        console.log(that.data.username)
        that.setData({
          bookInfo:res.data.book,
          bookNum: res.data.myborrow_cont
        })
        console.log(res)
      }
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
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