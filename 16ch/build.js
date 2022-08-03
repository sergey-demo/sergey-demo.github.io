(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var ch9 = document.querySelector('#ch9_1')
var ch10 = document.querySelector('#ch10_1')
var ch11 = document.querySelector('#ch11_1')
var ch12 = document.querySelector('#ch12_1')
var ch13 = document.querySelector('#ch13_1')
var ch14 = document.querySelector('#ch14_1')
var ch15 = document.querySelector('#ch15_1')
var ch16 = document.querySelector('#ch16_1')

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


  var ch9meter = volumemeter(ctx, function (volume) {
    ch9.style.height = volume + '%'
  })

  var ch10meter = volumemeter(ctx, function (volume) {
    ch10.style.height = volume + '%'
  })

  var ch11meter = volumemeter(ctx, function (volume) {
    ch11.style.height = volume + '%'
  })

  var ch12meter = volumemeter(ctx, function (volume) {
    ch12.style.height = volume + '%'
  })

  var ch13meter = volumemeter(ctx, function (volume) {
    ch13.style.height = volume + '%'
  })

  var ch14meter = volumemeter(ctx, function (volume) {
    ch14.style.height = volume + '%'
  })

  var ch15meter = volumemeter(ctx, function (volume) {
    ch15.style.height = volume + '%'
  })

  var ch16meter = volumemeter(ctx, function (volume) {
    ch16.style.height = volume + '%'
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

  split.connect(ch9meter, 8, 0)
  split.connect(ch10meter, 9, 0)
  split.connect(ch11meter, 10, 0)
  split.connect(ch12meter, 11, 0)
  split.connect(ch13meter, 12, 0)
  split.connect(ch14meter, 13, 0)
  split.connect(ch15meter, 14, 0)
  split.connect(ch16meter, 15, 0)

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

},{"../":2}],2:[function(require,module,exports){
var raf = require('raf');

module.exports = VolumeMeter

function VolumeMeter (context, opts, onenterframe) {
  if (typeof opts === 'function') {
    onenterframe = opts
    opts = null
  }
  opts = opts || {}
  opts.fftSize = opts.fftSize || 32
  opts.tweenIn = opts.tweenIn || 1.618
  opts.tweenOut = opts.tweenOut || opts.tweenIn * 3

  var buffer, self = this
  var range, next, tween, handle, last = 0
  var analyser = context.createAnalyser()

  analyser.stop = function () {
    this.ended = true
    raf.cancel(handle)
  }

  // the fftSize property governs the sample size even
  // when we are not requesting frequency domain data
  analyser.fftSize = opts.fftSize
  buffer = new Uint8Array(opts.fftSize)

  function render () {
    if (analyser.ended) return

    analyser.getByteTimeDomainData(buffer)
    range = getDynamicRange(buffer) * (Math.E - 1)
    next = Math.floor(Math.log1p(range) * 100)
    tween = next > last ? opts.tweenIn : opts.tweenOut
    next = last = last + (next - last) / tween

    onenterframe(next)
    handle = raf(render)
  }

  render()

  return analyser
}

function getDynamicRange(buffer) {
  var len = buffer.length
  var min = 128
  var max = 128

  for (var i = 0; i < len; i++) {
    var sample = buffer[i]
    if (sample < min) min = sample
    else if (sample > max) max = sample
  }

  return (max - min) / 255
}

},{"raf":5}],3:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

}).call(this,require('_process'))
},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":3}]},{},[1]);
