
$(document).ready(function() {
 
	$.fn.scrolled = function(callback, delay){
		var timer = null;
                var delay = delay || 1000;
		this.scroll(function(){
			if (timer){ clearTimeout(timer);}
			timer = setTimeout(function(){
      		          callback.call()}, delay);
		});
	} 
  
  function doSomething(){
  	alert('scrolled');
  }
  
  $(window).scrolled(doSomething);
 
});
