function openSideBar() {
    document.getElementById("sidebar-wrapper").style.display = "block";
    document.getElementById("canvas").style.marginLeft = "15%";
    //document.getElementById("sidebar-wrapper").style.marginLeft = "25%";
}

function closeSideBar() {
    document.getElementById("sidebar-wrapper").style.display = "none";
    document.getElementById("canvas").style.marginLeft = "0";

}

function getPage() {
    // Selecting the number of a page  and get its value 
    var inputVal = document.getElementById("pageInput").value;
    window.location.href = '#page/' + inputVal;

}



function addPage(page, book) {

    var id, pages = book.turn('pages');

    // Create a new element for this page
    var element = $('<div />', {});

    // Add the page to the flipbook
    if (book.turn('addPage', element, page)) {

        // Add the initial HTML
        // It will contain a loader indicator and a gradient
        element.html('<div class="gradient"></div><div class="loader"></div>');

        // Load the page
        loadPage(page, element);
        //loadLargePage(page, element);
    }

}

function loadPage(page, pageElement) {

    // Create an image elementpng

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

    img.attr('src', 'pages/' + page + '.png');

    loadRegions(page, pageElement);

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



// Load regions

function loadRegions(page, element) {

    $.getJSON('pages/' + page + '.png').
    done(function(data) {

        $.each(data, function(key, region) {
            addRegion(region, element);
        });
    });
}

// Add region

function addRegion(region, pageElement) {

    var reg = $('<div />', { 'class': 'region  ' + region['class'] }),
        options = $('.magazine').turn('options'),
        pageWidth = options.width / 2,
        pageHeight = options.height;

    reg.css({
        top: Math.round(region.y / pageHeight * 100) + '%',
        left: Math.round(region.x / pageWidth * 100) + '%',
        width: Math.round(region.width / pageWidth * 100) + '%',
        height: Math.round(region.height / pageHeight * 100) + '%'
    }).attr('region-data', $.param(region.data || ''));


    reg.appendTo(pageElement);
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

// Load large page

/*function loadLargePage(page, pageElement) {

    var img = $('<img />');

    img.load(function() {

        var prevImg = pageElement.find('img');
        $(this).css({ width: '100%', height: '100%' });
        $(this).appendTo(pageElement);
        prevImg.remove();

    });

    // Loadnew page

    img.attr('src', 'pages/' + page + '-large.png');
}*/

// Load small page

function loadSmallPage(page, pageElement) {

    var img = pageElement.find('img');

    img.css({ width: '100%', height: '100%' });

    img.unbind('load');
    // Loadnew page

    img.attr('src', 'pages/' + page + '.png');
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

function largeMagazineWidth() {

    return 2114;

}

// decode URL Parameters

function decodeParams(data) {

    var parts = data.split('&'),
        d, obj = {};

    for (var i = 0; i < parts.length; i++) {
        d = parts[i].split('=');
        obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
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
            //console.log('a)', bound.width, bound.height)

        } else {

            bound.width = d.boundWidth + 250;
            bound.height = Math.round(d.boundWidth / rel) + 200;
            console.log('b)', bound.width, bound.height)


        }
    }

    return bound;
}