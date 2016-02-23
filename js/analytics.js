if (document.location.hostname === "test.bestboyelectric.io") {
          /* We're running in test */
} else if (document.location.hostname.indexOf("bestboyelectric.io") !=-1) { // caters for bestboyelectric.io and www.bestboyelectric.io
          /* Production  */
  	
	// Google Analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 	 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  	ga('create', 'UA-62691119-2', 'auto');
  	ga('send', 'pageview');

	// HelloBar

	
     $.getScript('//my.hellobar.com/e1350f9c6ae7ec156405b2eff4d477f9bf52da64.js', function(){
	console.log('loaded Hellobar);
     });

}
