// pages/story/story.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[],
    totalCount:0,
    pageSize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const db = wx.cloud.database();
    this.getData();
    // db.collection('story').get({
    //   success: res => {
    //     this.setData({
    //       postList:res.data
    //     })
    //   }
    // })
  },

  //get list data
  getData:function(){
    var that=this;
    const db = wx.cloud.database();
    //get the total data
    db.collection('story').count({
      success: res => {
        that.data.totalCount=res.total;
      }
      
    })
    //get the frist ten
    try {
      db.collection('story').limit(that.data.pageSize).get({
        success: res => {
          this.setData({
            postList: res.data
        })
        wx.hideNavigationBarLoading();//hide loading 
        wx.stopPullDownRefresh();
      },
      fail:function(event){
        wx.hideNavigationBarLoading();//hide loading 
        wx.stopPullDownRefresh();
      }
    })
  }catch(e){
      wx.hideNavigationBarLoading();//hide loading 
      wx.stopPullDownRefresh();}
  },

  //pull down and load funciton
  onReachBottom:function(){
    var that=this;
    var temp =[];
    let length=this.data.postList.length
    if (this.data.postList.length<this.data.totalCount){
      try{
        // console.log(this.data.totalCount)
        // console.log(this.data.postList.length)
        const db=wx.cloud.database();
        db.collection('story')
          .skip(length)
          .limit(that.data.pageSize)
          .get({
            success: res => {
              if(res.data.length>0){
                for(let i=0;i<res.data.length;i++){
                  let tempPost = res.data[i];
                  temp.push(tempPost);
                }

              let totalPost={};
              totalPost=that.data.postList.concat(temp);

              console.log(totalPost)
              that.setData({
                postList:totalPost
              })

          }else{
            wx.showToast({
              title:'no more data'
            })
          }
        },
        fail:function(evet){
          console.log(event);
        }
      })
    }catch(e){
      console.error(e);
    }
  }
  else{
      wx.showToast({
        title:"no more data"
      })
    }
  },

  onTapToDetail:function(e){
    let postId=e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url:'../story/detail/detail?id='+postId,
    })
  },

  onTapTo1:function(e) {
    let label ="逃避拥挤";
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo2: function (e) {
    let label="坐地成仙"
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo3: function (e) {
    let label = "完全不怂"
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo4: function (e) {
    let label = "哎哟不错"
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapTo5: function (e) {
    let label = "活捉奇葩"
    wx.navigateTo({
      url: '../story/sort/sort?id=' + label,
    })
  },

  onTapToPop: function (e) {
    let postId = e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../story/detail/detail?id=' + postId,
    })
  },

  onTapToCountry: function (e) {
    let postId = e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../story/detail/detail?id=' + postId,
    })
  },

  onTapToRap: function (e) {
    let postId = e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../story/detail/detail?id=' + postId,
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})