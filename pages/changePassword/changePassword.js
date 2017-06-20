Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    newPassword: '',
    newPassword2: ''

  },

  formBindsubmit: function (e) {
    console.log(e)

    var that = this
    that.setData({
      username: e.detail.value.username,
      password: e.detail.value.password,
      newPassword: e.detail.value.newPassword,
      newPassword2: e.detail.value.newPassword2,
    })

    wx.setStorageSync('username',that.data.username)

    if(wx.getStorageSync('password')!=that.data.password){
      wx.showModal({
        title: '原始密码错误',
        showCancel:false
      })
    }

    else if(that.data.newPassword!=that.data.newPassword2){
      wx.showModal({
        title: '新密码不一致',
        showCancel:false
      })
    }

    else{
      wx.request({
        url: 'https://lll5810.top/book/changePassword',
        data: {
          username:wx.getStorageSync('username'),
          password:that.data.newPassword
        },
        header: {
          'Content-Type': 'application/json'
        }, 
        success: function(res) {
          console.log(res.data)
          if(res.data){
            wx.setStorageSync('password', that.data.newPassword)
            wx.showModal({
              title: '修改密码成功',
              showCancel:false,
              success:function(res){
                if(res.confirm){
                  wx.switchTab({
                    url: '/pages/index/index',
                  })

                }
              }
            })
          }

          
        },
        fail: function(res) {},
        complete: function(res) {},
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