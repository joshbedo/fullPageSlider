(function($){
	$.fn.extend({
		fullPageSlider: function(opts){
			var defaults = {
				nav: true,
				interval: 8000,
				rarrow: $("#right-arrow"),
				larrow: $("#left-arrow")
			}
			var opts = $.extend(defaults, opts);
			//var interval = opts.interval;
			var currPanel = 0;

				var o = opts;
				var obj = $(this);
				var panels = obj.children(".slide-panel");
				var interval = o.interval;
				
				function slidePanel( newPanel, direction, nav ) {
					// define the offset of the slider obj, vis a vis the document
					var offsetLeft = obj.offset().left;

					// offset required to hide the content off to the left / right
					var hideLeft = -1 * ( offsetLeft + obj.width() );
					var hideRight = $(window).width() - offsetLeft;

					// change the current / next positions based on the direction of the animation
					if ( direction == 'left' ) {
						currPos = hideLeft;
						nextPos = hideRight;
					}
					else {
						currPos = hideRight;
						nextPos = hideLeft;
					}
					
					// slide out the current panel, then remove the active class
					obj.children('.slide-panel.active').animate({
						left: currPos,
						opacity: 0
					}, 500, function() {
						$(this).removeClass('active');
					});

					// slide in the next panel after adding the active class
					$( panels[newPanel] ).css('left', nextPos).addClass('active').animate({
						left: 0,
						opacity: 1
					}, 500 );
				};
				
				if(o.nav == true){
					var $navWrap = $('<div id="full-slider-nav"></div>').appendTo( obj );
					var $navLeft = $('<div id="full-slider-nav-left"></div>').appendTo( $navWrap );
					var $navRight = $('<div id="full-slider-nav-right"></div>').appendTo( $navWrap );
				}else{
					var $navWrap = $('#full-slider-nav');
					var $navLeft = $('#full-slider-nav-left');
					var $navRight = $('#full-slider-nav-right');
				}
				$navLeft.click(function() {
					currPanel--;
					
					clearInterval(interval);
					// check if the new panel value is too small
					if ( currPanel < 0 ) currPanel = panels.length - 1;
					slidePanel(currPanel, 'right', false);
					interval = setInterval(function() {
						currPanel++;
						console.log(interval);
						// check if the new panel value is too big
						if ( currPanel >= panels.length ) currPanel = 0;
						slidePanel(currPanel, 'left', false);
					}, o.interval);
				});
				$navRight.click(function() {
					currPanel++;
					
					clearInterval(interval);
					
					// check if the new panel value is too big
					if ( currPanel >= panels.length ) currPanel = 0;
					slidePanel(currPanel, 'left', false);
					interval = setInterval(function() {
						currPanel++;
						console.log(interval);
						// check if the new panel value is too big
						if ( currPanel >= panels.length ) currPanel = 0;
						slidePanel(currPanel, 'left', false);
					}, o.interval);
				});
			}
	});
})(jQuery);