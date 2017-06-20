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
    second: 60,
    wechatId: '',
    phoneNumber: '',
    password: '',
    rightPassword: '',
    tip: '',
    email: '',
    msg:'发送验证码',
    email: '',
  },

  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  formBindsubmit: function (e) {
    console.log("提交了"+e)
    var that = this
    
    var email = that.data.email
    var index1 = email.indexOf("@")
    var index2 = email.indexOf(".")

    if (e.detail.value.wechatId.length == 0 || e.detail.value.password.length == 0) {
      wx.showModal({
        title: '用户名和密码不能为空！',
        showCancel: false
      })
    }

    else if(index1<1||index2-index1<2){
      wx.showModal({
        title: '请输入正确的邮箱地址！',
        showCancel: false
      })
    }

    else if (e.detail.value.password != e.detail.value.rightPassword) {
      wx.showModal({
        title: '前后两次密码不一致！',
        showCancel: false
      })
    }

    else if (e.detail.value.code != that.data.rightCode) {
      wx.showModal({
        title: '验证码错误！',
        showCancel: false
      })
    }

    else {
      that.setData({
        wechatId: e.detail.value.wechatId,
        phoneNumber: e.detail.value.phoneNumber,
        password: e.detail.value.password,
        rightPassword: e.detail.value.rightPassword,
      })

      wx.request({
        url: 'https://lll5810.top/book/register',
        data: {
          username: that.data.wechatId,
          phoneNumber: that.data.phoneNumber,
          password: that.data.password,
          email: that.data.email
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log("到注册那儿了"+res)
          if (res.data.msg == true) {
            console.log(res)
            wx.setStorageSync('username', that.data.wechatId)
            wx.setStorageSync('password', that.data.password)
            wx.setStorageSync('email', that.data.email), 
            wx.showModal({
              title: '注册成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              }
            })
          }

          else{
            wx.showModal({
              title: '用户名重复',
              showCancel: false,
            })
          }
        },
        fail: function (res) {
          that.setData({
            tip: '注册失败'
          })
          console.log("is failed");
        },
        complete: function (res) {
          console.log("完毕")
        }
      })
    }

  },

  getCode: function (e) {
    var that = this

    var email = that.data.email
    var index1 = email.indexOf("@")
    var index2 = email.indexOf(".")

    if (that.data.msg == '发送验证码') {
      if (index1 < 1 || index2 - index1 < 2) {
        wx.showModal({
          title: '请输入正确的邮箱地址！',
          showCancel:false
        })
      }

      console.log(that.data.email)
      wx.request({
        url: 'https://lll5810.top/book/getEmailCode',
        data: {
          email: that.data.email
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          that.setData({
            rightCode: res.data.msg
          })
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

  onLoad: function (options) {
    // 生命周期函数--监听页面加载

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