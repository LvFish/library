// login.js
Page({
  data: {
    userN:'',
    passW:'',
    msg : false,
    infoMess:'',
    email:''
  },

  //用户名和密码输入事件
  usernameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
  },

  passwordInput:function(e){
    this.setData({
      passW:e.detail.value
    })
  },

  //登录按钮点击事件，调用参数用:this.data.参数
  loginBtnClik:function(a){
    var that =  this
    if(this.data.userN.length==0||this.data.passW.length==0){
      this.setData({
        infoMess:'温馨提示：用户名或者密码不能为空！',
      }) 
    }
    else{
      console.log(1),
      wx.request({
        url: 'https://lll5810.top/book/login',
        data:{
          username:this.data.userN,
          password:this.data.passW,
          
        },
        header: {
          'Content-Type': 'application/json'
        }, 

        success:function(res){
          console.log(res)
          var email=res.data.email
          if(res.data.msg==true){
           wx.setStorageSync('username',that.data.userN)
           wx.setStorageSync('email',email)   
           wx.setStorageSync('password', that.data.passW)       
            wx.switchTab({
              url: '/pages/index/index',
            })         
            }

          else{
            console.log(res.data.msg)
            that.setData({
              infoMess:'用户名或者密码错误！',
            })
          }
        },
        fail:function(res){
          console.log(3)
          that.setData({
            infoMess:'连接失败，请稍后重试!'
          })
        },
        complete: function (res) {
          // complete
        }

      })
    }
  },

  //加载页面时执行
  onLoad: function (options) {
    if (wx.getStorageSync('username'))
    {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }

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