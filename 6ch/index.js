var volumemeter = require('../') //volume-meter
//var getusermedia = require('getusermedia')

var left = document.querySelector('.left')
var right = document.querySelector('.right')
var ch3 = document.querySelector('.ch3')
var ch4 = document.querySelector('.ch4')
var ch5 = document.querySelector('.ch5')
var ch6 = document.querySelector('.ch6')
var video1 = document.querySelector('#video1')


//const player = videojs('video1', {})
//console.log(player)

var src

//getusermedia({ audio: true, video: false }, function (err, stream) {
//  if (err) return console.error(err)
video1.addEventListener("play", () => {

  if (typeof src !== 'undefined') {
    return
  }
    console.log(video1)

  var ctx = new AudioContext

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
  console.log(video1.audioTracks)
 
  src.connect(split)

  //enable sound in browser
  var gainNode = new GainNode(ctx)
  src.connect(gainNode)
  gainNode.connect(ctx.destination)
  

})

//  stream.onended = function () {
//    leftmeter.stop()
//    rightmeter.stop()
//  }
//})
