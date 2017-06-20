function cutdown(that) {
  console.log("进来了")
  var second = that.data.second
  if (second == 0) {
    that.setData({
      second: 60,
      msg: '发送验证码'
    })
    return
  }

  second = that.data.second
  var time = setTimeout(function () {
    that.setData({
      second: second - 1,
      msg: '重试(' + that.data.second + ')'
    });
    cutdown(that);
  }, 1000)
}


Page({

  data: {
    username: '',
    email: '',
    code: '',
    rightCode: '',
    password: '',
    password2: '',

    msg: '发送验证码',
    flag: 0,
    second: 60

  },

  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  getCode: function (e) {
    var that = this
    if (that.data.msg == '发送验证码') {
      console.log(that.data.username + "  " + that.data.email)
      wx.request({
        url: 'https://lll5810.top/book/reset',
        data: {
          username: that.data.username,
          email: that.data.email
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (!res.data.msg) {
            wx.showModal({
              title: '用户名或者邮箱错误！',
              showCancel: false
            })
          }

          else {
            that.setData({
              rightCode: res.data.msg
            })
          }
        },
        fail: function (res) {
          console.log("失败")
        },
        complete: function (res) {
          console.log("完毕")
        },
      })

      cutdown(that)
    }

  },

  formBindsubmit: function (e) {
    var that = this
    if (that.data.code == that.data.rightCode) {
      wx.setStorageSync('username', that.data.username)
      that.setData({
        flag: 1
      })
    }

    else {
      wx.showModal({
        title: '验证码错误！',
        showCancel: false
      })
    }

  },

  formBindsubmit2: function (e) {
    var that = this
    that.setData({
      password: e.detail.value.password,
      password2: e.detail.value.password2,
    })

    if (that.data.password != that.data.password2) {
      wx.showModal({
        title: '密码不一致',
        showCancel: false
      })
    }

    else {
      wx.setStorageSync('password', that.data.password)
      wx.request({
        url: 'https://lll5810.top/book/changePassword',
        data: {
          username: wx.getStorageSync('username'),
          password: wx.getStorageSync('password')
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.setStorageSync('email', that.data.email)
          if (res.data) {
            wx.showModal({
              title: '修改密码成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                }
              }
            })
          }

          else {
            wx.showModal({
              title: '修改密码失败',
              showCancel: false
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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