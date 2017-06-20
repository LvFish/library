Page({
  data:{
    isbn:'',
    date:'2017-06-05',
    start_date:'2016-01-01',
    end_date:'2018-12-31',
    hidden:false,
    nocancel:false,
    username:'',
    msg:false,
  },

  formBindsubmit:function(e){
    // console.log(this.data.date),
    // console.log(this.data.time)
   var that=this
    //判断能否预约
    wx.request({
      url: 'https://lll5810.top/book/appoint',
      data:{
        username:this.data.username,
        data:this.data.date,
        isbn:this.data.isbn
      },
      

      header: {
        'Content-Type': 'application/json'
      },
      method:'GET', 

      success:function(res){
        console.log(res.data)
        if (res.data.msg =='用户预约成功'){ //可以借阅
          wx.showModal({
            title: '预约成功',
            showCancel: false,
            success:function(res){
              if(res.confirm){
                wx.navigateBack({
                  delta:1
                })
              }
            }
          })
        }

        else if (res.data.msg =='用户已达到最大借阅数量'){
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
                    if (res.data.msg) {
                      wx.showModal({
                        title: '成功',
                        content: '当书籍有库存时会第一时间发邮件提醒您',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            wx.navigateBack({
                              delta: 1,
                            })
                          }
                        }
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

        else if(res.data.msg=='用户押金不足'){
          wx.showModal({
            title: '用户押金不足',
            showCancel: false
          })
        }

        else{
          wx.showModal({
            title: '预约失败',
            showCancel: false
          })
        }
      }
    }) 
  },

  cancel:function(){
    this.setData({
      hidden:true
    })
  },

  confirm:function(){
    this.setData({
      nocancel:!this.data.nocancel
    })
    console.log("clicked confirm");
  },

  bindDateChange:function(e){
      this.setData({
          date:e.detail.value
      })
  },

  bindTimeChange:function(e){
    this.setData({
        time: e.detail.value
    })
  },
  onLoad:function(options){
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
      })

    this.setData({
      username:wx.getStorageSync('username'),
      isbn:wx.getStorageSync('isbn')
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