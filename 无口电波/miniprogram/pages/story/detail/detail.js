const db=wx.cloud.database();
const backgroundAudioManager=wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false,
    postId:'',
    url:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    var postId=options.id
    db.collection('story').doc(postId).get({
      success: res => {
        let data=res.data
        this.setData({
          img:data.img,
          title:data.title,
          content:data.content,
          date:data.date,
          url:data.url,  
          abstract:data.abstract
        })
        that.onInit(postId)
      }
    })           
  },

  onInit:function(postId){
    backgroundAudioManager.src = this.data.url
    backgroundAudioManager.title = this.data.abstract
    backgroundAudioManager.epname = this.data.abstract
    backgroundAudioManager.singer = this.data.abstract
    backgroundAudioManager.onTimeUpdate(function () {
      backgroundAudioManager.onEnd(function () {
        backgroundAudioManager.stop()
        this.setData({
          isPlaying: true
        })
      })
        
      backgroundAudioManager.onPlay(function () {
        that.setData({
          isPlaying: true
        })
      })

      backgroundAudioManager.onStop(function () {
        that.setData({
          isPlaying: true
        })
      })
    })
  },

  onPlay:function(){
    backgroundAudioManager.play()
    this.setData({
      isPlaying:false
    })
  },

  onPause: function () {
    backgroundAudioManager.pause()
    this.setData({
      isPlaying: true
    })
  },



    // this.setMusicMonitor();
    // this.initMusicStatus();


  // setMusicMonitor: function () {
  //   let that=this;
  //   wx.onBackgroundAudioStop(function(){
  //     that.setData({
  //       isPlayingMusic:false
  //     })
  //     app.globalData.g_isPlayingMusic = false;
  //   })
  // },

  // onMusicTap: function (e) {
  //   const backgroundAudioManager = wx.getBackgroundAudioManager()
  //   if(this.data.isPlayingMusic){
  //     wx.pauseBackgroundAudio();
  //     this.setData({
  //       isPlayingMusic: false
  //     })
  //     app.globalData.g_isPlayingMusic=false;
  //   }
  //   else{
  //     wx.playBackgroundAudio({
  //       dataUrl:this.data.url,
  //     })
  //     this.setData({
  //       isPlayingMusic:true
  //     })
  //     app.globalData.g_isPlayingMusic = true;
  //     app.globalData.g_currentMusicPostId=this.data.postId;
  //   }
  // },

  // initMusicStatus() {
  //   let currentPostId=this.data.postId;
  //   if (app.globalData.g_isPlayingMusic&&app.globalData.g_currentMusicPostId===currentPostId)
  //      {
  //     this.setData({
  //       isPlayingMusic: true
  //     })
  //   }
  //   else {
  //     this.setData({
  //       isPlayingMusic: false
  //     })
  //   }
  // },
  
 
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
  // onUnload: function () {
  //   wx.stopBackgroundAudio()
  //   this.setData({
  //     isPlayingMusic:false
  //   })
  // },

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