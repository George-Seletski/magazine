function openSideBar() {
    $('.sidebar').addClass('show');
    if (window.innerWidth < 768) {
        document.getElementById("sidebar-wrapper").style.display = "block";
        $("sidebar-wrapper").css('width', '100%');


        //document.getElementById("canvas").style.marginLeft = "50%";

    } else {
        document.getElementById("sidebar-wrapper").style.display = "block";

        document.getElementById("canvas").style.marginLeft = "10%";
    }

    $(".footer").css('z-index', '-1');
    $(".line-footer").css('z-index', '-1');
    //document.getElementById("sidebar-wrapper").style.marginLeft = "25%";
}

function closeSideBar() {
    $(".footer").css('z-index', '0');
    $(".line-footer").css('z-index', '0');
    document.getElementById("sidebar-wrapper").style.display = "none";
    document.getElementById("canvas").style.marginLeft = "0";
    document.getElementById("canvas").style.display = "block";

}

function addPage(page, book, path) {

    var id, pages = book.turn('pages');

    // Create a new element for this page
    var element = $('<div />', {});

    // Add the page to the flipbook
    if (book.turn('addPage', element, page)) {

        // Add the initial HTML
        // It will contain a loader indicator and a gradient
        element.html('<div class="gradient"></div><div class="loader"></div>');

        // Load the page

        //loadLargePage(page, element);

        loadPage(page, element, path);

    }
    console.log(path)
}

function addPageMobile(page, book, path) {

    var id, pages = book.turn('pages');

    // Create a new element for this page
    var element = $('<div />', {});

    // Add the page to the flipbook
    if (book.turn('addPage', element, page)) {

        // Add the initial HTML
        // It will contain a loader indicator and a gradient
        if (page % 2 != 0) {
            element.html('<div class="gradient"></div><div class="loader"></div>');

            // Load the page

            //loadLargePage(page, element);

            loadPageMoile(page, element, path);
        }


    }
    console.log(path);
}




function loadPage(page, pageElement, path) {

    // Create an image elementpng
    var Path = path;
    var img = $('<img />');

    img.mousedown(function(e) {
        e.preventDefault();
    });

    img.load(function() {

        // Set the size
        $(this).css({ width: '100%', height: '100%' });

        // Add the image to the page after loaded
        $(this).appendTo(pageElement);

        // Remove the loader indicator

        pageElement.find('.loader').remove();
    });

    // Load the page

    //img.attr('src', 'pages/desktop/png/611x800px_online_portfolio' + page + '.png');
    img.attr('src', Path + page + '.png');
    //img.attr('loading', 'lazy');

}

// Zoom in / Zoom out

function zoomTo(event) {

    setTimeout(function() {
        if ($('.magazine-viewport').data().regionClicked) {
            $('.magazine-viewport').data().regionClicked = false;
        } else {
            if ($('.magazine-viewport').zoom('value') == 1) {
                $('.magazine-viewport').zoom('zoomIn', event);
            } else {
                $('.magazine-viewport').zoom('zoomOut');
            }
        }
    }, 1);

}

// Process click on a region

function regionClick(event) {

    var region = $(event.target);

    if (region.hasClass('region')) {

        $('.magazine-viewport').data().regionClicked = true;

        setTimeout(function() {
            $('.magazine-viewport').data().regionClicked = false;
        }, 10);

        var regionType = $.trim(region.attr('class').replace('region', ''));

        return processRegion(region, regionType);

    }

}

// Process the data of every region

function processRegion(region, regionType) {

    data = decodeParams(region.attr('region-data'));

    switch (regionType) {
        case 'link':

            window.open(data.url);

            break;
        case 'zoom':

            var regionOffset = region.offset(),
                viewportOffset = $('.magazine-viewport').offset(),
                pos = {
                    x: regionOffset.left - viewportOffset.left,
                    y: regionOffset.top - viewportOffset.top
                };

            $('.magazine-viewport').zoom('zoomIn', pos);

            break;
        case 'to-page':

            $('.magazine').turn('page', data.page);

            break;
    }

}

function loadPageMoile(page, pageElement, path) {

    // Create an image elementpng
    var Path = path;
    var img = $('<img />');

    img.mousedown(function(e) {
        e.preventDefault();
    });

    img.load(function() {

        // Set the size
        img.css({ width: '100%', height: '100%' });

        // Add the image to the page after loaded

        $(this).appendTo(pageElement);

        // Remove the loader indicator

        pageElement.find('.loader').remove();
    });

    // Load the page

    //img.attr('src', 'pages/desktop/png/611x800px_online_portfolio' + page + '.png');
    img.attr('src', Path + page + '.jpg');
    //img.attr('loading', 'lazy');
    console.log(Path + page + '.jpg', 'loadPageMobile');

}

function loadSmallPageMobile(page, pageElement, path) {

    var img = pageElement.find('img');

    img.css({ width: '100%', height: '100%' });

    img.unbind('load');
    // Loadnew page

    img.attr('src', 'pages/mobile/png/611x800px_online_portfolio' + page + '.jpg');
    //img.attr('src', path + page + '.png');
    console.log('pages/mobile/png/611x800px_online_portfolio' + page + '.jpg', 'loadSmallPageMobile');

}


// Load large page

function loadLargePage(page, pageElement) {

    var img = $('<img />');

    img.load(function() {

        var prevImg = pageElement.find('img');
        $(this).css({ width: '100%', height: '100%' });
        $(this).appendTo(pageElement);
        prevImg.remove();

    });

    // Loadnew page

    img.attr('src', 'pages/desktop/png/611x800px_online_portfolio' + page + '.png');
    console.log('src', 'pages/desktop/png/611x800px_online_portfolio' + page + '.png', 'loadLargePage');

}

// Load small page

function loadSmallPage(page, pageElement, path) {

    var img = pageElement.find('img');

    img.css({ width: '100%', height: '100%' });

    img.unbind('load');
    // Loadnew page

    //img.attr('src', 'pages/desktop/png/611x800px_online_portfolio' + page + '.png');
    img.attr('src', path + page + '.png');
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

    return navigator.userAgent.indexOf('Chrome') != -1;

}

function disableControls(page) {
    if (page == 1)
        $('.previous-button').hide();
    else
        $('.previous-button').show();

    if (page == $('.magazine').turn('pages'))
        $('.next-button').hide();
    else
        $('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {

    var width = $(window).width(),
        height = $(window).height(),
        options = $('.magazine').turn('options');

    $('.magazine').removeClass('animated');
    /*if (width < 1000) {
        $('.instacard').addClass('odd');
    }*/

    $('.magazine-viewport').css({
        width: width,
        height: height
    }).
    zoom('resize');


    if ($('.magazine').turn('zoom') == 1) {
        var bound = calculateBound({
            width: options.width,
            height: options.height,
            boundWidth: Math.min(options.width, width),
            boundHeight: Math.min(options.height, height)
        });

        if (bound.width % 2 !== 0) {
            bound.width -= 1;
            /*console.log(bound.width);*/
        }

        if (bound.width != $('.magazine').width() || bound.height != $('.magazine').height()) {

            $('.magazine').turn('size', bound.width, bound.height);

            if ($('.magazine').turn('page') == 1)
                $('.magazine').turn('peel', 'br');

            $('.next-button').css({ height: 100, backgroundPosition: '-37px ' + '50%', top: '40%' });
            $('.previous-button').css({ height: 100, backgroundPosition: '-4px ' + '50%' });
        }

        $('.magazine').css({ top: -bound.height / 2, left: -(bound.width - 15) / 2 });
        /*console.log(-bound.height / 2, -bound.width / 2);*/

    }

    var magazineOffset = $('.magazine'),
        boundH = height - magazineOffset.top - $('.magazine').height(),
        marginTop = (boundH - $('.thumbnails > div').height()) / 2;
    //console.log(marginTop);


    if (marginTop < 0) {
        $('.thumbnails').css({ height: 1 });
    } else {
        $('.thumbnails').css({ height: boundH });
        $('.thumbnails > div').css({ marginTop: marginTop });
    }

    if (magazineOffset.top < $('.made').height())
        $('.made').hide();
    else
        $('.made').show();

    $('.magazine').addClass('animated');

}


// Number of views in a flipbook

function numberOfViews(book) {
    return book.turn('pages') / 2 + 1;
}

// Current view in a flipbook

function getViewNumber(book, page) {
    return parseInt((page || book.turn('page')) / 2 + 1, 10);
}



// Width of the flipbook when zoomed in

function largeMagazineWidth(width) {
    if (width < 1024) {
        return 1440;
    } else {
        return width;
    }


}

// decode URL Parameters

function decodeParams(data) {

    var parts = data.split('&'),
        d, obj = {};

    for (var i = 0; i < parts.length; i++) {
        d = parts[i].split('=');
        obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
        //console.log(decodeURIComponent(d[1]));
    }

    return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {

    var bound = { width: d.width, height: d.height };

    if (bound.width > d.boundWidth || bound.height > d.boundHeight) {

        var rel = bound.width / bound.height;

        if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {

            bound.width = Math.round(d.boundHeight * rel) + 100;

            bound.height = d.boundHeight;


        } else {

            bound.width = d.boundWidth + 250;
            bound.height = Math.round(d.boundWidth / rel) + 200;


        }
    }

    return bound;
}