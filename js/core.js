			var bbe = bbe || {};
			
			bbe.MantraContentController = function(){
				var _this = this;
                
                this.container = $(".bbe-high-velocity > div");
                this.thumbnails = $(".bbe-thumbnail");
				
				this.init();
                this.addHandlers();
			};
			
			bbe.MantraContentController.prototype = {
				init: function() {
                    
				},
				addHandlers: function() {
					this.thumbnails.on("click", $.proxy(this.mantraContentHandler, this));
			    },
                mantraContentHandler: function(e) {
                    var clickedClass;
                    clickedClass = $(e.target).attr("id");
                    this.container.removeClass();
                    this.container.addClass(clickedClass);
                }
			};
            
            bbe.FormSubmission = function(){
				var _this = this, form;
                
                form = $(".bbe-form-popup");
                this.formItems = form.find(".required");
                this.required = form.find("span.text-info");
				this.submit = form.find(".btn-success")
                
				this.init();
                this.addHandlers();
			};
			
			bbe.FormSubmission.prototype = {
				init: function() {
                    
				},
				addHandlers: function() {
					this.submit.on("click", $.proxy(this.submitHandler, this));
			    },
                submitHandler: function(e) {
                    var isValid = true;
                    
                    this.formItems.each(function(index) {
                       if($(this).val().length === 0) {
                           isValid = false;
                           $(this).next().removeClass("hidden");
                       } 
                       else {
                           $(this).next().addClass("hidden");
                       }
                    });
                    
                    if(!isValid) {
                        e.preventDefault();
                    }
                }
			};
            
            $(document).ready(function() {

                var m = new bbe.MantraContentController();
                var f = new bbe.FormSubmission();
            });