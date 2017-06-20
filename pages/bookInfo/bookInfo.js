  Page({
  data: {
    bookInfo: '',
    isbn: '',
    recommend:[],
    bookNumber:'',
    leftNumber:'',
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0, 
    username:''
  },

  borrowf: function (e) {
    wx.request({
      url: 'https://lll5810.top/book/appoint',
      data: {
        username: wx.getStorageSync('username'),
        data:'null',
        isbn: wx.getStorageSync('isbn')
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.msg=='用户预约成功') { //可以借阅
          wx.showModal({
            title: '添加到借书栏成功',
            showCancel: false,
          })
        }

        else if (res.data.msg == '用户已达到最大借阅数量') {
          wx.showModal({
            title: '您的借阅数量已达上限',
            showCancel: false
          })
        }
        
        else if (res.data.msg == '当前存书数量为0') {
          wx.showModal({
            title: '对不起，该书现存为0',
            content: '请选择当有归还书籍是是否提醒？',
            success: function (res) {
              if (res.confirm) {
                wx.request({
                  url: 'https://lll5810.top/book/appoint2',
                  data: {
                    username: that.data.username,
                    isbn: that.data.isbn
                  },
                  header: {
                    'Content-Type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data.msg) {
                      wx.showModal({
                        title: '成功',
                        content: '当书籍有库存时会第一时间发邮件提醒您',
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
        }

        else if (res.data.msg == '用户押金不足') {
          wx.showModal({
            title: '用户押金不足',
            showCancel: false
          })
        }

        else {
          wx.showModal({
            title: '添加到借书栏失败',
            showCancel: false
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  reservef: function (e) {
    wx.navigateTo({
      url: '/pages/reserve/reserve',
    })
  },

  onLoad: function (options) {
    //生命周期函数--监听页面加载
    var that = this

    setTimeout(function () {
      that.setData({
        hide: true
      })
    }, 1000),

    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });  


    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })

    var isb = wx.getStorageSync('isbn')
    var booN = wx.getStorageSync('bookNumber')
    var lefN = wx.getStorageSync('leftNumber')
    var userN = wx.getStorageSync('username')

    that.setData({
      isbn: isb,
      bookNumber:booN,
      leftNumber:lefN,
      username:userN
    })

    console.log(that.data.isbn + " " + that.data.bookNumber+" " + that.data.leftNumber);
    wx.request({
      url: 'https://lll5810.top/book/bookdetail',
      data: {
        isbn: this.data.isbn
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        console.log(res.data)
        that.setData({
          bookInfo: res.data.book
        })
      }

    })

    wx.request({
      url: 'https://lll5810.top/book/recommendbook',
      data: {
        isbn:that.data.isbn
      },
      success: function (res) { 
        console.log(res)
        that.setData({
          recommend:res.data.msg
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  toast:function(e){
    var array = new Array();
    array = e.currentTarget.id.split('@');
    wx.setStorageSync('isbn', array[0])
    wx.setStorageSync('bookNumber', array[1])
    wx.setStorageSync('leftNumber', array[2])
    wx.navigateTo({
      url: '/pages/bookInfo/bookInfo',
    })
  },



  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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