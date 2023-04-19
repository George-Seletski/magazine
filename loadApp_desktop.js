 $(window).on('load', function() {
     //the preloader
     $(".preloader").fadeOut(1000, function() {
         $('.navbar-items').fadeIn(500);
         $(".navbar-items").css('display', 'flex');

         var href_val = '#page/' + 132;
         $("#footer-link-last").attr("href", href_val);

         // adding icons while loading
         $('#overview-icon').attr('src', './pics/gallery-grid-view-icon.svg');
         $('#download-icon').attr('src', './pics/move-down-icon.svg');
         $('#contents-icon').attr('src', './pics/list-round-bullet-outline-icon.svg');

         if (window.innerWidth < 425) {
             $('.navbar-items').css('display', 'block ');
             $('.navbar-items').css('padding-top', '2px');
             $('.modal-content').css('overflow-y', 'scroll !important');
             $('.container').css('top', '44%');

         } else {
             $('.navbar-items').css('display', 'flex');
         }
         $('#footer').fadeIn(500);
         $(".footer-items").fadeIn(500);
         $(".footer-items").css('display', 'flex');


     });
 });


 // wide screen behaivour
 if (window.innerWidth < 1440) {
     $('.youtube').hide();
     $('.instacard').hide();
     $('.container').css('left', 0);
     $('.magazine').css('left', 0);

 }


 function loadApp() {
     $("#canvas").fadeIn(100);
     $('.instacard').hide();
     $('.youtube').show();

     var flipbook = $(".magazine");

     // Check if the CSS was already loaded

     if (flipbook.width() == 0 || flipbook.height() == 0) {
         setTimeout(loadApp, 1000);
         return;
     }

     // Create the flipbook

     flipbook.turn({
         // Magazine width

         width: 1222,

         // Magazine height

         height: 800,

         // Duration in millisecond
         duration: 1000,

         // Hardware acceleration
         acceleration: !isChrome(),
         //acceleration: true,

         // Enables gradients
         gradients: true,

         // Auto center this flipbook

         autoCenter: true,

         // Elevation from the edge of the flipbook when turning a page

         elevation: 50,

         // The number of pages

         pages: 132,

         // Events

         when: {
             turning: function(event, page, view) {
                 $(".instacard").css('display', 'none');
                 $(".youtube").hide();
                 document.getElementById("youtube").style.zIndex = 0;
                 document.getElementById("instacard").style.zIndex = 0;
                 var book = $(this),
                     currentPage = book.turn("page"),
                     pages = book.turn("pages");

                 //add amount of pages in footer    
                 $("#amount-of-pages").text(pages.toString());

                 //set href to last page
                 var href_val = '#page/' + 132;
                 $("#footer-link-last").attr("href", href_val);

                 // Update the current URI
                 Hash.go("page/" + page).update();

                 if (page === 1 || page === 132) {
                     document.getElementById("current-pages").innerHTML = page;
                     console.log('** ', page);
                     if (page === 132) {
                         $('.instagram').show();
                     }

                 } else {
                     if (page > 1 && page < 132) {
                         if (page % 2 === 0) {
                             document.getElementById("current-pages").innerHTML = (page).toString() + '-' + (page + 1).toString();
                         } else {
                             document.getElementById("current-pages").innerHTML = (page - 1).toString() + '-' + (page).toString();
                         }
                     }
                 }
                 // Show and hide navigation buttons
                 disableControls(page);

                 $(".thumbnails .page-" + currentPage)
                     .parent()
                     .removeClass("current");

                 $(".thumbnails .page-" + page)
                     .parent()
                     .addClass("current");
             },

             turned: function(event, page, view) {
                 $(".instacard").css('display', 'none');
                 document.getElementById("instacard").style.zIndex = 0;
                 document.getElementById("youtube").style.zIndex = 0;

                 disableControls(page);

                 $(this).turn("center");

                 if (page == 1) {
                     $(this).turn('peel', 'br');
                     document.getElementById("youtube").style.zIndex = 1;

                     if (!mobile) {
                         $(".youtube").show();
                     }

                 } else {
                     if (page > 1) {
                         if (page === 132) {
                             $('.instacard').show();
                         } else {

                         }
                         $(".youtube").hide();



                     }

                 }
             },

             missing: function(event, pages) {
                 // Add pages that aren't in the magazine
                 for (var i = 0; i < pages.length; i++) addPage(pages[i], $(this));
             },
         },
     });


     // Zoom.js

     $(".magazine-viewport").zoom({
         flipbook: $(".magazine"),

         max: function() {
             return largeMagazineWidth(window.innerWidth) / $(".magazine").width();
             //console.log('**', largeMagazineWidth(), largeMagazineWidth() / $(".magazine").width());
         },

         when: {
             swipeLeft: function() {
                 $(this).zoom("flipbook").turn("next");
             },

             swipeRight: function() {
                 $(this).zoom("flipbook").turn("previous");
             },

             resize: function(event, scale, page, pageElement) {
                 if (scale == 1) loadSmallPage(page, pageElement);
                 //else loadLargePage(page, pageElement);
             },

             zoomIn: function() {
                 $(".thumbnails").hide();
                 $(".made").hide();
                 $(".magazine").removeClass("animated").addClass("zoom-in");
                 $(".instacard").css('display', 'none');


                 document.getElementById("youtube").style.zIndex = 0;

                 if (!window.escTip && !$.isTouch) {
                     escTip = true;

                     $("<div />", {
                         class: "exit-message"
                     }).html("<div>Press ESC to exit</div>").appendTo($("body")).delay(2000).animate({
                             opacity: 0,
                         },
                         500,
                         function() {
                             $(this).remove();
                         });
                 }
             },

             zoomOut: function() {
                 $(".instacard").css('display', 'block');
                 document.getElementById("instacard").style.zIndex = -1;

                 $(".exit-message").hide();
                 $(".thumbnails").fadeIn(100);
                 $(".made").fadeIn();


                 setTimeout(function() {
                     $(".magazine").addClass("animated").removeClass("zoom-in");

                     resizeViewport();

                     //get current page 
                     var currentLocation = window.location;
                     var currentPage = currentLocation.href.slice(-2);

                     if (!mobile) {

                         $(".youtube").show();
                     } else {
                         if (currentPage != 132) {
                             $(".instacard").css('display', 'none');
                         }
                     }

                     document.getElementById("youtube").style.zIndex = 0;

                 }, 0);
             },
         },
     });

     // Zoom event

     if ($.isTouch) $(".magazine-viewport").bind("zoom.doubleTap", zoomTo);
     else $(".magazine-viewport").bind("zoom.tap", zoomTo);

     // Using arrow keys to turn the page

     $(document).keydown(function(e) {
         var previous = 37,
             next = 39,
             esc = 27;

         switch (e.keyCode) {
             case previous:
                 // left arrow
                 $(".magazine").turn("previous");
                 e.preventDefault();

                 break;
             case next:
                 // right arrow
                 $(".magazine").turn("next");
                 e.preventDefault();

                 break;
             case esc:
                 $(".magazine-viewport").zoom("zoomOut");
                 e.preventDefault();

                 break;
         }
     });

     // URIs - Format #/page/1

     Hash.on("^page\/([0-9]*)$", {
         yep: function(path, parts) {
             var page = parts[1];

             if (page !== undefined) {
                 if ($(".magazine").turn("is"))
                     $(".magazine").turn("page", page);
             }
         },
         nop: function(path) {
             if ($(".magazine").turn("is"))
                 $(".magazine").turn("page", 1);

         },
     });

     $(window)
         .resize(function() {
             resizeViewport();
         })
         .bind("orientationchange", function() {
             resizeViewport();
         });

     // Events for thumbnails

     $(".thumbnails").click(function(event) {
         var page;

         if (event.target && (page = /page-([0-9]+)/.exec($(event.target).attr("class")))) {
             $(".magazine").turn("page", page[1]);
         }
     });

     $(".thumbnails li")
         .bind($.mouseEvents.over, function() {
             $(this).addClass("thumb-hover");
         })
         .bind($.mouseEvents.out, function() {
             $(this).removeClass("thumb-hover");
         });

     if ($.isTouch) {
         //$(".magazine-viewport").css("overflow-x", "auto");
         //$(".container").css("overflow-x", "visible");
         //$(".container").css("overflow-x", "visible");
         //$(".magazine").css("scroll-x", "auto");

         $(".thumbnails")
             .addClass("thumbanils-touch")
             .bind($.mouseEvents.move, function(event) {
                 event.preventDefault();
             });
     } else {
         $(".thumbnails ul").mouseover(function() {
             $(".thumbnails").addClass("thumbnails-hover");
         }).mousedown(function() {
             return false;
         }).mouseout(function() {
             $(".thumbnails").removeClass("thumbnails-hover");
         });
     }

     // Regions
     if ($.isTouch) {
         $(".magazine").bind("touchstart", regionClick);
     } else {
         $(".magazine").click(regionClick);
     }

     // Events for the next button
     //big button
     $(".next-button")
         .bind($.mouseEvents.over, function() {
             $(this).addClass("next-button-hover");
         })
         .bind($.mouseEvents.out, function() {
             $(this).removeClass("next-button-hover");
         })
         .bind($.mouseEvents.down, function() {
             $(this).addClass("next-button-down");
         })
         .bind($.mouseEvents.up, function() {
             $(this).removeClass("next-button-down");
         })
         .click(function() {
             $(".magazine").turn("next");
         });

     //footer button
     $("#footer-icon-next-page").click(function() {
         $(".magazine").turn("next");
     });
     // Events for the previus button
     $("#footer-icon-previous-page").click(function() {
         $(".magazine").turn("previous");
     });
     $(".previous-button")
         .bind($.mouseEvents.over, function() {
             $(this).addClass("previous-button-hover");
         })
         .bind($.mouseEvents.out, function() {
             $(this).removeClass("previous-button-hover");
         })
         .bind($.mouseEvents.down, function() {
             $(this).addClass("previous-button-down");
         })
         .bind($.mouseEvents.up, function() {
             $(this).removeClass("previous-button-down");
         })
         .click(function() {
             $(".magazine").turn("previous");
         });

     resizeViewport();

     $(".magazine").addClass("animated");
 }
 $("#canvas").hide();

 // Load the HTML4 version if there's not CSS transform
 yepnope({
     test: Modernizr.csstransforms,
     yep: ["js/turn.min.js"],
     nope: ["js/turn.html4.min.js"],
     both: [
         "js/zoom.min.js",
         "js/magazine.js",
         "js/sidebar.js",
         "js/modal.js",
         "js/generating_contents.js",
         "//www.instagram.com/embed.js",
         //"js/generate_overview.js",

         "css/magazine.css",
         "css/sidebar.css",
         "css/youtube_card.css",
         "css/modal.css",
         "css/preloader.css",
         "css/style-instagram.css",
     ],
     complete: loadApp,
 });