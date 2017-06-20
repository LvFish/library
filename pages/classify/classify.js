Page({
  data:{
    src: '/img/left_crow.png',
    classify:['文学','小说','青春文学','少儿','科普读物','动漫/幽默','社会科学','历史','传记','文化','艺术','收藏/鉴赏','古籍','地图/地理','家庭教育','旅游','美丽装扮','美食','管理','成功/励志','保健/心理健康','外语','法律','政治军事','自然科学','计算机/网络','建筑','医学','农业/林业','体育/运动','考试']
  },

  
  toast:function(e){
    wx.setStorageSync('classify',e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/bookListClassify/bookListClassify',
    })
  },

  onLoad:function(options){
    console.log(123);
    if (!wx.getStorageSync('username'))
      wx.redirectTo({
        url: '/pages/login/login',
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