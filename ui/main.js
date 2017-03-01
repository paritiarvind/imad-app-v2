//  function init() {
   
//     document.body.style.backgroundImage = "url('http:http://wallpapercave.com/wp/UoQbFHi.jpg')";
//     document.body.style.backgroundRepeat = "repeat-n"; 
//      }
function w3_open() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("mySidenav").style.width = "25%";
  document.getElementById("mySidenav").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidenav").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}
      
@@ -1,43 +1,38 @@
 -/**
 +/*!
   * Particleground
   *
   * @author Jonathan Nicol - @mrjnicol
 - * @version 1.0.1
 + * @version 1.1.0
   * @description Creates a canvas based particle system background
   *
 - * Inspired by:
 - * http://requestlab.fr/
 - * http://disruptivebydesign.com/
 - * 
 - * @license The MIT License (MIT)
 - * 
 - * Copyright (c) 2014 Jonathan Nicol - @mrjnicol
 - * 
 - * Permission is hereby granted, free of charge, to any person obtaining a copy
 - * of this software and associated documentation files (the "Software"), to deal
 - * in the Software without restriction, including without limitation the rights
 - * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 - * copies of the Software, and to permit persons to whom the Software is
 - * furnished to do so, subject to the following conditions:
 - * 
 - * The above copyright notice and this permission notice shall be included in
 - * all copies or substantial portions of the Software.
 - * 
 - * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 - * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 - * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 - * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 - * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 - * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 - * THE SOFTWARE.
 + * Inspired by http://requestlab.fr/ and http://disruptivebydesign.com/
   */
  
 -;(function($) {
 +;(function(window, document) {
 +  "use strict";
    var pluginName = 'particleground';
  
 +  // http://youmightnotneedjquery.com/#deep_extend
 +  function extend(out) {
 +    out = out || {};
 +    for (var i = 1; i < arguments.length; i++) {
 +      var obj = arguments[i];
 +      if (!obj) continue;
 +      for (var key in obj) {
 +        if (obj.hasOwnProperty(key)) {
 +          if (typeof obj[key] === 'object')
 +            deepExtend(out[key], obj[key]);
 +          else
 +            out[key] = obj[key];
 +        }
 +      }
 +    }
 +    return out;
 +  };
 +
 +  var $ = window.jQuery;
 +
    function Plugin(element, options) {
 -    var el = element;
 -    var $el = $(element);
      var canvasSupport = !!document.createElement('canvas').getContext;
      var canvas;
      var ctx;
 @@ -50,10 +45,12 @@
      var desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
      var orientationSupport = !!window.DeviceOrientationEvent;
      var tiltX = 0;
 +    var pointerX;
 +    var pointerY;
      var tiltY = 0;
      var paused = false;
  
 -    options = $.extend({}, $.fn[pluginName].defaults, options);
 +    options = extend({}, window[pluginName].defaults, options);
  
      /**
       * Init
 @@ -62,9 +59,10 @@
        if (!canvasSupport) { return; }
  
        //Create canvas
 -      $canvas = $('<canvas class="pg-canvas" style="display:block;"></canvas>');
 -      $el.prepend($canvas);
 -      canvas = $canvas[0];
 +      canvas = document.createElement('canvas');
 +      canvas.className = 'pg-canvas';
 +      canvas.style.display = 'block';
 +      element.insertBefore(canvas, element.firstChild);
        ctx = canvas.getContext('2d');
        styleCanvas();
  
 @@ -76,14 +74,14 @@
          particles.push(p);
        };
  
 -      $(window).on('resize', function() {
 +      window.addEventListener('resize', function() {
          resizeHandler();
 -      });
 +      }, false);
  
 -      $(document).on('mousemove', function(e) {
 +      document.addEventListener('mousemove', function(e) {
          mouseX = e.pageX;
          mouseY = e.pageY;
 -      });
 +      }, false);
  
        if (orientationSupport && !desktop) {
          window.addEventListener('deviceorientation', function () {
 @@ -101,21 +99,21 @@
       * Style the canvas
       */
      function styleCanvas() {
 -      canvas.width = $el.width();
 -      canvas.height = $el.height();
 +      canvas.width = element.offsetWidth;
 +      canvas.height = element.offsetHeight;
        ctx.fillStyle = options.dotColor;
        ctx.strokeStyle = options.lineColor;
        ctx.lineWidth = options.lineWidth;
      }
  
      /**
 -     * Draw particles 
 +     * Draw particles
       */
      function draw() {
        if (!canvasSupport) { return; }
  
 -      winW = $(window).width();
 -      winH = $(window).height();
 +      winW = window.innerWidth;
 +      winH = window.innerHeight;
  
        // Wipe canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
 @@ -142,9 +140,12 @@
        // Resize the canvas
        styleCanvas();
  
 +      var elWidth = element.offsetWidth;
 +      var elHeight = element.offsetHeight;
 +
        // Remove particles that are outside the canvas
 -      for (i = particles.length - 1; i >= 0; i--) {
 -        if (particles[i].position.x > $el.width() || particles[i].position.y > $el.height()) {
 +      for (var i = particles.length - 1; i >= 0; i--) {
 +        if (particles[i].position.x > elWidth || particles[i].position.y > elHeight) {
            particles.splice(i, 1);
          }
        };
 @@ -167,22 +168,22 @@
      }
  
      /**
 -     * Pause particle system 
 +     * Pause particle system
       */
      function pause() {
        paused = true;
      }
  
      /**
 -     * Start particle system 
 +     * Start particle system
       */
      function start() {
        paused = false;
        draw();
      }
  
      /**
 -     * Particle 
 +     * Particle
       */
      function Particle() {
        this.stackPos;
 @@ -221,15 +222,15 @@
            this.speed.x += this.speed.y > 0 ? options.minSpeedY : -options.minSpeedY;
            break;
        }
 -    } 
 +    }
  
      /**
 -     * Draw particle 
 +     * Draw particle
       */
      Particle.prototype.draw = function() {
        // Draw circle
        ctx.beginPath();
 -      ctx.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, options.particleRadius / 2, 0, Math.PI * 2, true); 
 +      ctx.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, options.particleRadius / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
  
 @@ -259,7 +260,7 @@
      }
  
      /**
 -     * update particle position 
 +     * update particle position
       */
      Particle.prototype.updatePosition = function() {
        if (options.parallax) {
 @@ -281,20 +282,23 @@
          this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10; // Easing equation
        }
  
 +      var elWidth = element.offsetWidth;
 +      var elHeight = element.offsetHeight;
 +
        switch (options.directionX) {
          case 'left':
            if (this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
 -            this.position.x = $el.width() - this.parallaxOffsetX;
 +            this.position.x = elWidth - this.parallaxOffsetX;
            }
            break;
          case 'right':
 -          if (this.position.x + this.speed.x + this.parallaxOffsetX > $el.width()) {
 +          if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth) {
              this.position.x = 0 - this.parallaxOffsetX;
            }
            break;
          default:
            // If particle has reached edge of canvas, reverse its direction
 -          if (this.position.x + this.speed.x + this.parallaxOffsetX > $el.width() || this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
 +          if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth || this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
              this.speed.x = -this.speed.x;
            }
            break;
 @@ -303,17 +307,17 @@
        switch (options.directionY) {
          case 'up':
            if (this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
 -            this.position.y = $el.height() - this.parallaxOffsetY;
 +            this.position.y = elHeight - this.parallaxOffsetY;
            }
            break;
          case 'down':
 -          if (this.position.y + this.speed.y + this.parallaxOffsetY > $el.height()) {
 +          if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight) {
              this.position.y = 0 - this.parallaxOffsetY;
            }
            break;
          default:
            // If particle has reached edge of canvas, reverse its direction
 -          if (this.position.y + this.speed.y + this.parallaxOffsetY > $el.height() || this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
 +          if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight || this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
              this.speed.y = -this.speed.y;
            }
            break;
 @@ -340,14 +344,17 @@
      }
  
      function destroy() {
 -      $el.find('.pg-canvas').remove();
 +      console.log('destroy');
 +      canvas.parentNode.removeChild(canvas);
        hook('onDestroy');
 -      $el.removeData('plugin_' + pluginName);
 +      if ($) {
 +        $(element).removeData('plugin_' + pluginName);
 +      }
      }
  
      function hook(hookName) {
        if (options[hookName] !== undefined) {
 -        options[hookName].call(el);
 +        options[hookName].call(element);
        }
      }
  
 @@ -361,31 +368,11 @@
      };
    }
  
 -  $.fn[pluginName] = function(options) {
 -    if (typeof arguments[0] === 'string') {
 -      var methodName = arguments[0];
 -      var args = Array.prototype.slice.call(arguments, 1);
 -      var returnVal;
 -      this.each(function() {
 -        if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
 -          returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
 -        }
 -      });
 -      if (returnVal !== undefined){
 -        return returnVal;
 -      } else {
 -        return this;
 -      }
 -    } else if (typeof options === "object" || !options) {
 -      return this.each(function() {
 -        if (!$.data(this, 'plugin_' + pluginName)) {
 -          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
 -        }
 -      });
 -    }
 +  window[pluginName] = function(elem, options) {
 +    return new Plugin(elem, options);
    };
  
 -  $.fn[pluginName].defaults = {
 +  window[pluginName].defaults = {
      minSpeedX: 0.1,
      maxSpeedX: 0.7,
      minSpeedY: 0.1,
 @@ -405,7 +392,34 @@
      onDestroy: function() {}
    };
  
 -})(jQuery);
 +  // nothing wrong with hooking into jQuery if it's there...
 +  if ($) {
 +    $.fn[pluginName] = function(options) {
 +      if (typeof arguments[0] === 'string') {
 +        var methodName = arguments[0];
 +        var args = Array.prototype.slice.call(arguments, 1);
 +        var returnVal;
 +        this.each(function() {
 +          if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
 +            returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
 +          }
 +        });
 +        if (returnVal !== undefined){
 +          return returnVal;
 +        } else {
 +          return this;
 +        }
 +      } else if (typeof options === "object" || !options) {
 +        return this.each(function() {
 +          if (!$.data(this, 'plugin_' + pluginName)) {
 +            $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
 +          }
 +        });
 +      }
 +    };
 +  }
 +
 +})(window, document);
  
  /**
   * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 @@ -417,23 +431,23 @@
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
 -        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
 -        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
 -                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
 +      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
 +      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
 +                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
      }
 - 
 +
      if (!window.requestAnimationFrame)
 -        window.requestAnimationFrame = function(callback, element) {
 -            var currTime = new Date().getTime();
 -            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
 -            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
 -              timeToCall);
 -            lastTime = currTime + timeToCall;
 -            return id;
 -        };
 - 
 +      window.requestAnimationFrame = function(callback, element) {
 +        var currTime = new Date().getTime();
 +        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
 +        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
 +          timeToCall);
 +        lastTime = currTime + timeToCall;
 +        return id;
 +      };
 +
      if (!window.cancelAnimationFrame)
 -        window.cancelAnimationFrame = function(id) {
 -            clearTimeout(id);
 -        };
 +      window.cancelAnimationFrame = function(id) {
 +        clearTimeout(id);
 +      };
  }());