/*

	Simple lazy load script
	Images will be lazy-loaded

	Use: In your HTML set a data-lz-source attribute for each image you want to lazy-load

	e.g: 

	<body>
		
		<!-- This image will be lazy-loaded -->
		<img data-lz-source="img/logo.png" src="">

		<!-- This image won't be lazy loaded
		<img src="img/not-lazy-image.jpg">
		....

	</body> 

*/

$(window).load(function loadImages(){
	$('body img[data-lz-source]').each(function(){
    	$(this).attr('src', $(this).data('lz-source'));
    });
});
        