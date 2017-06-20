function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    that.setData({
      second: 60
    })
    wx.request({
      url: 'https://lll5810.top/book/createZxing',
      data: {
        username: that.data.username
      },
      header: {
        'Content-Type': 'application/json'
      },

      success: function (res) {
        console.log(res)
        that.setData({
          url: res.data.image
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

  second = that.data.second
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}

function countdown2(that) {
  var second_2 = that.data.second_2
  if (second_2 == 0) {
    that.setData({
      second_2: 5
    })
    wx.request({
      url: 'https://lll5810.top/book/pay',
      data: {
        username: that.data.username,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        
        if (res.data.msg == true) {
          that.setData({
            flag: '1',
            isbn:res.data.isbn
          })

          console.log(that.data.username)
          console.log(that.data.isbn)
          console.log("显示是否付款")
          wx.showModal({
            title: '是否付款？',
            success: function (res) {
              if (res.confirm) {
                wx.request({
                  url: 'https://lll5810.top/book/borrow',
                  data: {
                    username:that.data.username,
                    isbn:that.data.isbn
                  },
                  header: {
                    'Content-Type': 'application/json'
                  },
                  method: 'get',
                  success: function(res) {
                    if(res.data.msg){
                      console.log(res)
                      wx.showModal({
                        title: '付款成功！请交于管理员查看',
                        showCancel: false,
                      })
                    }

                    else{
                      wx.showModal({
                        title: '付款失败！',
                        showCancel: false,
                      })
                    }
                    
                  },
                  fail: function(res) {},
                  complete: function(res) {},
                })


              }

              else {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            }
          })

          return
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  }

  if (that.data.flag == '1')
    return

  second_2 = that.data.second_2
  var time = setTimeout(function () {
    that.setData({
      second_2: second_2 - 1
    });
    countdown2(that);
  }
    , 1000)
}

Page({
  data: {
    second: 60,
    second_2: 5,        //请求付款的时间
    url: '',
    username: '',
    flag: '0',
    isbn:''
  },
  onLoad: function () {
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })

    var that = this
    that.setData({
      username: wx.getStorageSync('username'),
    })

    wx.request({
      url: 'https://lll5810.top/book/createZxing',
      data: {
        username: that.data.username
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          url: res.data.image,
        })
      },
    })

    countdown(this);       //60秒刷新二维码
    countdown2(this);      //5秒请求一次 看是否可以付款
  }
});