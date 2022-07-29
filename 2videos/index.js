var volumemeter = require('../') //volume-meter
//var getusermedia = require('getusermedia')

var left = document.querySelector('#left1')
var right = document.querySelector('#right1')
var ch3 = document.querySelector('#ch3_1')
var ch4 = document.querySelector('#ch4_1')
var ch5 = document.querySelector('#ch5_1')
var ch6 = document.querySelector('#ch6_1')
var video1 = document.querySelector('#video1')

var left2 = document.querySelector('#left2')
var right2 = document.querySelector('#right2')
var ch3_2 = document.querySelector('#ch3_2')
var ch4_2 = document.querySelector('#ch4_2')
var ch5_2 = document.querySelector('#ch5_2')
var ch6_2 = document.querySelector('#ch6_2')
var video2 = document.querySelector('#video2')

var b1 = document.querySelector('#b1')
var b2 = document.querySelector('#b2')



//const player = videojs('video1', {})
//console.log(player)

var src
var src2

var ctx1
var ctx2

b1.addEventListener("click", function() {
  if (typeof src === 'undefined') {
    alert("please press Play first")
    return
  }

  var gainNode = new GainNode(ctx1)
  src.connect(gainNode)
  gainNode.connect(ctx1.destination)
  document.getElementById("l1").innerText="Connected to a real sound device"

});

b2.addEventListener("click", function() {
  if (typeof src2 === 'undefined') {
    alert("please press Play first")
    return
  }

  var gainNode = new GainNode(ctx2)
  src2.connect(gainNode)
  gainNode.connect(ctx2.destination)
  document.getElementById("l2").innerText="Connected to a real sound device"
});

//getusermedia({ audio: true, video: false }, function (err, stream) {
//  if (err) return console.error(err)
video1.addEventListener("play", () => {

  if (typeof src !== 'undefined') {
    return
  }
    console.log(video1)

  var ctx = new AudioContext
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


  var split = ctx.createChannelSplitter()
  console.log(split)
  split.connect(leftmeter, 0, 0)
  split.connect(rightmeter, 1, 0)
  split.connect(ch3meter, 2, 0)
  split.connect(ch4meter, 3, 0)
  split.connect(ch5meter, 4, 0)
  split.connect(ch6meter, 5, 0)
  
  //var src = ctx.createMediaStreamSource(stream)
  src = new MediaElementAudioSourceNode(ctx, { mediaElement: video1 })
  console.log(src)
  //video1.audioTracks[0].enabled=false
  //video1.audioTracks[1].enabled=true

  //console.log(video1.audioTracks[1])
  
  console.log(video1.audioTracks)
  
 
  src.connect(split)

  //enable sound in browser
  //var gainNode = new GainNode(ctx)
  //src.connect(gainNode)
  //gainNode.connect(ctx.destination)
  

})

video2.addEventListener("play", () => {

  if (typeof src2 !== 'undefined') {
    return
  }
    console.log(video1)

  var ctx = new AudioContext
  ctx2=ctx

    console.log(ctx)

  
  var leftmeter2 = volumemeter(ctx, function (volume) {
    left2.style.height = volume + '%'
  })

  var rightmeter2 = volumemeter(ctx, function (volume) {
    right2.style.height = volume + '%'
  })

  var ch32meter = volumemeter(ctx, function (volume) {
    ch3_2.style.height = volume + '%'
  })

  var ch42meter = volumemeter(ctx, function (volume) {
    ch4_2.style.height = volume + '%'
  })

  var ch52meter = volumemeter(ctx, function (volume) {
    ch5_2.style.height = volume + '%'
  })

  var ch62meter = volumemeter(ctx, function (volume) {
    ch6_2.style.height = volume + '%'
  })


  var split = ctx.createChannelSplitter()
  console.log(split)
  split.connect(leftmeter2, 0, 0)
  split.connect(rightmeter2, 1, 0)
  split.connect(ch32meter, 2, 0)
  split.connect(ch42meter, 3, 0)
  split.connect(ch52meter, 4, 0)
  split.connect(ch62meter, 5, 0)
  
  //var src = ctx.createMediaStreamSource(stream)
  src2 = new MediaElementAudioSourceNode(ctx, { mediaElement: video2 })
  console.log(src2)
  //video1.audioTracks[0].enabled=false
  //video1.audioTracks[1].enabled=true

  //console.log(video1.audioTracks[1])
  
  console.log(video2.audioTracks)
  
 
  src2.connect(split)

  //enable sound in browser
  //var gainNode = new GainNode(ctx)
  //src2.connect(gainNode)
  //gainNode.connect(ctx.destination)
  

})


//  stream.onended = function () {
//    leftmeter.stop()
//    rightmeter.stop()
//  }
//})
