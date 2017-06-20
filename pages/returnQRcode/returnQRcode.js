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

Page({
  data: {
    second: 60,
    url: '',
    username: '',
    
  },
  onLoad: function () {
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })

    wx.showModal({
      title: '提示',
      content: '请于管理员扫码，管理员确认后即可实现自动换书和押金退还',
      showCancel:false

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
  }
});