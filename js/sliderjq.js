			//http://ariya.ofilabs.com/2013/11/javascript-kinetic-scrolling-part-2.html
			
			var bbe = bbe || {};
			
			bbe.Slider = function(){
				var _this = this;
				
				this.view = document.getElementById('slider');
				this.container = $('.item');
				this.overlay = document.getElementById('overlay');

				this.screenWidth;
				this.screenHeight;
				this.max;
				
				// Add event listener for onresize that adds a class of disabled whilst the window is being resized
				$(window).on('resize', $.proxy(this.resize, this));

				this.screenSize();
				
				if(this.screenWidth > this.container.width()) {
					this.container.width('100%');
					return false;
				}
				
				this.imgCount = $('.item').length;
				this.offset = this.min = 0;
				this.pressed = false;
				this.timeConstant = 325; // ms	
				this.velocity;
				this.amplitude;
				this.ticker;			
				
				this.init();

				this.addHandlers();
				
				this.indicator = document.getElementById('indicator');
				this.relative = (innerWidth - 30) / this.max;

				this.xform = 'transform';
				['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
					var e = prefix + 'Transform';
					if (typeof _this.view.style[e] !== 'undefined') {
						xform = e;
						return false;
					}
					return true;
				});
			};
			
			bbe.Slider.prototype = {
				init: function() {
					// get device dimentions, calculate width and height of each image as a percentage.
					// 
					this.container.width(parseInt(getComputedStyle(document.getElementById('item1')).width, 10) * this.imgCount);
					this.snap = parseInt(getComputedStyle(document.getElementById('item1')).width, 10);
					this.overlay.style.left = (2 * this.snap) + 'px';
				},
				addHandlers: function() {
					var $view = $(this.view)
					var supportsTouch = 'ontouchstart' in document;
					if (supportsTouch) {
						this.view.addEventListener("touchstart", $.proxy(this.tap, this), false);
						this.view.addEventListener("touchmove", $.proxy(this.drag, this), false);
						this.view.addEventListener("touchend", $.proxy(this.release, this), false);
					}
					else {
						$view.on('mousedown', $.proxy(this.tap, this));
						$view.on('mousemove', $.proxy(this.drag, this));
						$view.on('mouseup', $.proxy(this.release, this));
					}

					
				},
				removeHandlers: function() {
					var $view = $(this.view)
				
					var supportsTouch = 'ontouchstart' in document;
					if (supportsTouch) {
						this.view.removeventListener("touchstart", $.proxy(this.tap, this), false);
						this.view.removeventListener("touchmove", $.proxy(this.drag, this), false);
						this.view.removeventListener("touchend", $.proxy(this.release, this), false);
					}
					else {
						$view.off('mousedown', $.proxy(this.tap, this));
						$view.off('mousemove', $.proxy(this.drag, this));
						$view.off('mouseup', $.proxy(this.release, this));
					}
				},
				xpos: function(e) {
					// touch event
					if (e.targetTouches && (e.targetTouches.length >= 1)) {
						return e.targetTouches[0].clientX;
					 }

					 // mouse event
					 return e.clientX;
				 },
				 screenSize: function() {
					var doc = $("#slider");
					this.screenWidth = doc.width();
					this.screenHeight = doc.height();
					this.max = parseInt(getComputedStyle(document.getElementById('slider')).width, 10) - window.innerWidth;
					this.relative = (window.innerWidth - 30) / this.max;
				 },
				
				scroll: function(x) {
					this.offset = (x > this.max) ? this.max : (x < this.min) ? this.min : x;
					this.view.style[xform] = 'translateX(' + (-this.offset) + 'px)';
					this.indicator.style[xform] = 'translateX(' + (this.offset * this.relative) + 'px)';
				},

				track: function() {
					var now, elapsed, delta, v;

					now = Date.now();
					elapsed = now - this.timestamp;
					this.timestamp = now;
					delta = this.offset - this.frame;
					this.frame = this.offset;

					v = 1000 * delta / (1 + elapsed);
					this.velocity = 0.5 * v + 0.2 * this.velocity;
				},

				autoScroll: function() {
					var elapsed, delta;
					
					if (this.amplitude) {
						elapsed = Date.now() - this.timestamp;
						delta = -this.amplitude * Math.exp(-elapsed / this.timeConstant);

						if (delta > 0.5 || delta < -0.5) {
							this.scroll(this.target + delta);
							requestAnimationFrame($.proxy(this.autoScroll, this));
						} else {
							this.scroll(this.target);
						}
					}
				},

				tap: function(e) {
					this.pressed = true;
					this.reference = this.xpos(e);
					this.velocity = this.amplitude = 0;
					this.frame = this.offset;
					this.timestamp = Date.now();
					clearInterval(this.ticker);
					this.ticker = setInterval($.proxy(this.track, this), 100);

					e.preventDefault();
					e.stopPropagation();
					return false;
				},

				drag: function(e) {
					var x, delta;
					if (this.pressed) {
						x = this.xpos(e);
						delta = this.reference - x;
						if (delta > 2 || delta < -2) {
							this.reference = x;
							this.scroll(this.offset + delta);
						}
					}
					e.preventDefault();
					e.stopPropagation();
					return false;
				},

				release: function(e) {
					this.pressed = false;

					clearInterval(this.ticker);
					this.target = this.offset;
					if (this.velocity > 10 || this.velocity < -10) {
						this.amplitude = 0.8 * this.velocity;
						this.target = this.offset + this.amplitude;
					}
					this.target = Math.round(this.target / this.snap) * this.snap;
					this.amplitude = this.target - this.offset;
					this.timestamp = Date.now();
					requestAnimationFrame($.proxy(this.autoScroll,this));
					
					e.preventDefault();
					e.stopPropagation();
					return false;
				},
				
				resized: function() {
					var that = this;
					this.init();
					this.autoScroll();
					this.offset = 0;
					this.view.style[xform] = 'translateX(0px)';
					this.indicator.style[xform] = 'translateX(0px)';
					this.screenSize();
					
					if(this.screenWidth > this.container.width()) {
						this.container.width('100%');
						this.removeHandlers();
					}
					else
					{
						this.addHandlers();
					}
					
					if(this.view.classList.contains("disabled")) {
						this.view.classList.remove("disabled");
					}
				},
				
				resize: function(e) {
					var that = this;
					clearTimeout(this.resizeFinished);
					this.resizeFinished = setTimeout($.proxy(this.resized, that), 2000);

					if(!this.view.classList.contains("disabled")) {
						this.view.classList.add("disabled");
					}
				}
			};
            
            //var s = new bbe.Slider();