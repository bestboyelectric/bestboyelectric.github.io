			var bbe = bbe || {};
			
			bbe.MantraContentController = function(){
				var _this = this;
                
                this.container = $(".bbe-high-velocity > div");
                this.thumnails = $(".bbe-thumbnail");
				
				this.init();
                this.addHandlers();
			};
			
			bbe.MantraContentController.prototype = {
				init: function() {
                    
				},
				addHandlers: function() {
					this.thumnails.on("click", $.proxy(this.mantraContentHandler, this));
			    },
                mantraContentHandler: function(e) {
                    var clickedClass;
                    clickedClass = $(e.target).attr("id");
                    this.container.removeClass();
                    this.container.addClass(clickedClass);
                }
			};

            var m = new bbe.MantraContentController();