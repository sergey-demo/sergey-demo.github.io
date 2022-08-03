var volumemeter = require('../') //volume-meter
//var getusermedia = require('getusermedia')

var left = document.querySelector('#left1')
var right = document.querySelector('#right1')
var ch3 = document.querySelector('#ch3_1')
var ch4 = document.querySelector('#ch4_1')
var ch5 = document.querySelector('#ch5_1')
var ch6 = document.querySelector('#ch6_1')
var ch7 = document.querySelector('#ch7_1')
var ch8 = document.querySelector('#ch8_1')

var video1 = document.querySelector('#video1')

//var left2 = document.querySelector('#left2')
//var right2 = document.querySelector('#right2')
//var ch3_2 = document.querySelector('#ch3_2')
//var ch4_2 = document.querySelector('#ch4_2')
//var ch5_2 = document.querySelector('#ch5_2')
//var ch6_2 = document.querySelector('#ch6_2')
//var video2 = document.querySelector('#video2')

var b1 = document.querySelector('#b1')
//var b2 = document.querySelector('#b2')



//const player = videojs('video1', {})
//console.log(player)

var src
var src2

var ctx1
var ctx2

/*b1.addEventListener("click", function() {
  if (typeof src === 'undefined') {
    alert("please press Play first")
    return
  }

//  var gainNode = new GainNode(ctx1, {channelCount: 8} )
//  console.log(gainNode)
//  src.connect(gainNode)
  src.connect(ctx1.destination)
//  gainNode.connect(ctx1.destination)
  document.getElementById("l1").innerText="Connected to a real sound device"

});*/


//getusermedia({ audio: true, video: false }, function (err, stream) {
//  if (err) return console.error(err)
video1.addEventListener("play", () => {

  if (typeof src !== 'undefined') {
    return
  }
    console.log(video1)

  var ctx = new AudioContext
  //ctx.destination.channelCount = 8;
  //ctx.destination.channelCountMode = 'discrete';
  
  ctx1 = ctx

    console.log(ctx)

  
  var leftmeter = volumemeter(ctx, function (volume) {
    left.style.height = volume + '%'
  })

  var rightmeter = volumemeter(ctx, function (volume) {
    right.style.height = volume + '%'
  })

  var ch3meter = volumemeter(ctx, function (volume) {
    ch3.style.height = volume + '%'
  })

  var ch4meter = volumemeter(ctx, function (volume) {
    ch4.style.height = volume + '%'
  })

  var ch5meter = volumemeter(ctx, function (volume) {
    ch5.style.height = volume + '%'
  })

  var ch6meter = volumemeter(ctx, function (volume) {
    ch6.style.height = volume + '%'
  })

  var ch7meter = volumemeter(ctx, function (volume) {
    ch7.style.height = volume + '%'
  })

  var ch8meter = volumemeter(ctx, function (volume) {
    ch8.style.height = volume + '%'
  })


  var split = ctx.createChannelSplitter(16)
  console.log(split)
  split.connect(leftmeter, 0, 0)
  split.connect(rightmeter, 1, 0)
  split.connect(ch3meter, 2, 0)
  split.connect(ch4meter, 3, 0)
  split.connect(ch5meter, 4, 0)
  split.connect(ch6meter, 5, 0)
  split.connect(ch7meter, 6, 0)
  split.connect(ch8meter, 7, 0)

  //var src = ctx.createMediaStreamSource(stream)
  src = new MediaElementAudioSourceNode(ctx, { mediaElement: video1 })
  src.channelInterpretation = "discrete"
  src.channelCount = 16

  console.log(src)
  //video1.audioTracks[0].enabled=false
  //video1.audioTracks[1].enabled=true

  //console.log(video1.audioTracks[1])
  
  console.log(video1.audioTracks)
  
 
  src.connect(split)

  //enable sound in browser
  //var gainNode = new GainNode(ctx)
  //console.log(gainNode)
  //src.connect(gainNode)
  //gainNode.connect(ctx.destination)
  

})


//  stream.onended = function () {
//    leftmeter.stop()
//    rightmeter.stop()
//  }
//})
