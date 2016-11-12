Drupal.behaviors.map = {
    attach: function(context, settings) {

        var allports = settings.allports;
        var center = settings.center;
        var zoom = settings.zoom;
        var infowindow = null;
        var map;
        var markers = [];
        var prev_infowindow = null;

        google.maps.event.addDomListener(window, 'load', initMap);

        function initMap() {

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: zoom,
                center: { lat: center[0], lng: center[1] },
                scrollwheel: false,
                mapTypeControl: false,
                draggable: true
            });

            var ports = allports[0];

            if (typeof ports[0] != 'undefined') {
                var bounds = new google.maps.LatLngBounds();
                setPorts(map, bounds, ports);
                map.fitBounds(bounds);
            }

            /*
             * Attach click on destination tabs or dropdown to reload map
             * ----------------------------------------------------------
             */

            $('.cruise-section li a').on('click', reloadMarkers);
            //Options (click event not woorking properly in chrome)
            $('.cruise-section select').on('change', reloadMarkers).on('change', changeTabs);

            /*
             * Only allow scroll at click on map
             * ---------------------------------
             */

            map.addListener('click', function() {
                map.set('scrollwheel', true);
            });

            /*
             * Disable scroll on mouseout
             * --------------------------
             */

            map.addListener('mouseout', function() {
                map.set('scrollwheel', false);
            });

            /*
             * Disable scroll on body tap
             * --------------------------
             */

            $('html,body').on('tap', function() {
                map.set('scrollwheel', true);
            });
        }

        function setPorts(map, bounds, ports) {

            var image = {url: 'http://www.onboard.com/sites/all/themes/ob/img/anchor-pin.png'};

            for (var i = 0; i < ports.length; i++) {
                var port = ports[i];
                var marker = new google.maps.Marker({
                    position: { lat: port[0], lng: port[1] },
                    map: map,
                    icon: image,
                    title: port[2],
                });

                markers.push(marker);
                bounds.extend(marker.position);

                if (typeof port[3] != 'undefined') {
                    attachInfo(marker, port[3]);
                }
            }

        }

        function attachInfo(marker, contentinfo) {
            var infowindow = new google.maps.InfoWindow({
                content: contentinfo,
                maxWidth: 800
            });

            marker.addListener('click', function() {

            //Overlay full width for mobile
            if (isMobile()) {
                
                //load content
                $('#ob-content-loader').html(contentinfo);

                //Show the Full screen modal by CSS
                $('.ob-overlay').addClass('is-visible');

                $('.close-btn').on('click', function(e) {
                    e.preventDefault();
                    $('.ob-overlay').removeClass('is-visible');
                });

                } else {
                    if (prev_infowindow) {
                        prev_infowindow.close();
                    }
                    prev_infowindow = infowindow;
                    infowindow.open(map, this);
                }

            });
        }


        function reloadMarkers() {

            var tab = parseInt($('option:selected', this).attr('data-id') || $(this).attr('data-id'));

            //Loop through markers and set map to null for each
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            // Reset the markers array
            markers = [];

            // Call set markers to re-add markers
            var ports = allports[tab];

            if (typeof ports != 'undefined') {
                var bounds = new google.maps.LatLngBounds();
                setPorts(map, bounds, ports);
                map.fitBounds(bounds);

                if (ports.length == 1) {
                    map.setZoom(5);
                }
            }
        }

        //Check viewport size
	    function vPortSize(sz){
	      return window.matchMedia("(max-width: " + sz + "px)").matches;
	    }

	    //Is mobile viewport?
	    function isMobile(){
	      return vPortSize('767');
	    }

	    //Change tabs on selected options
	    function changeTabs(){
	       $('.cruise-section li a').eq($(this).val()).tab('show');
	    }
    }
};
