//Script used in https://www.onboard.com/destination/caribbean

/* Secondary header features:
 * 
 * 1. Hightlights sections when scrolling
 * 2. Anchor to specific section in page  
 * 
 */

$(document).ready(function() {
  
    var $main_header = $('header.navbar'),
        $second_header = $('.nav-subheader'),
        $second_header_height = $second_header.outerHeight(),
        $border_element = $('.nav-subheader-wrapper'),
        offsetting_mobile = 17,
        targetShift = 15;

    //Set slick button position
    function setSlickArrow(){

      if ( $(".slider-destination .slick-slide").length){
        var s = Math.round($('.slider-destination img').height() + 6);
        $( '.slider-destination .slick-prev, .slider-destination .slick-next').css('top', s);

      } 
    }
    $(window).resize(function(){setSlickArrow();});

    /* Helper functions
    *  ----------------
    *  Element offset position
    *  Check viewport size
    *  Is mobile viewport
    */
   
    //Get element's offset position
    function elemtPos(el){
      return parseInt(el.length?($(el).offset().top):0);
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


      

   

    /* Links to sections within the page
     * ---------------------------------
     * Scroll to anchors
     */ 

    $('.nav-subheader a').click(function (e) {
      
      e.preventDefault();
      e.stopPropagation();

      var hash = $(this)[0].getAttribute("href"),
          $target = $(".sections[name='" + hash + "']"),
          offset = $target.offset().top - $second_header_height - targetShift ;
      $('html, body').stop(true, true).animate({scrollTop: offset}, 'fast');

    });


    /* Scroll Behaviours
     * -------------------------
     * Underline links at scroll
     * Set primary and secondary navigation position
     */ 

      $(window).scroll(function() {
    
        var st = $(window).scrollTop(),
            nav_height = $main_header.outerHeight(),
            divisor_point = elemtPos($border_element);


        // Underline links at scroll position 
        $('.sections[name]').each(function (index) {
          // var for offsetting (remove 150 fixed val)
          var offsetTop = ($(this).offset().top)-offsetting_mobile,
              elem_height = $(this).outerHeight(),
              border_color = ( (st + $second_header_height ) >= offsetTop && (st + $second_header_height) <= (elem_height + offsetTop) )?'#47afd2':'#fff';

        
          //Set underline style
          //Clear styles and set style to current active link
          $('.nav-subheader li').eq(index).css({'border-bottom-color': border_color});
        });

        
        //Bottom of primary navbar is touching the top of secondary navbar
        if ( (st + nav_height) >= divisor_point ){



          //begin mainnavbar top position shifting
          var rest_top = st - divisor_point + nav_height;
          $main_header.css('top', -rest_top);

          //when second navbar gets top 0 make it fixed
          $second_header.toggleClass( 'navbar-fixed-top', Math.abs(rest_top) >= nav_height );

        }
        else{
          $main_header.css('top', 0);
          $second_header.removeClass('navbar-fixed-top');
        }

        //Fix slick arrow position
        setSlickArrow();

      }).trigger('scroll');

});