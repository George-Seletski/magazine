const instaFeed = document.querySelector('#instafeed');
$(document).ready(function() {
    var feed = new Instafeed({
        get: 'user',
        userId: '582146218',
        resolution: 'standard_resolution',
        accessToken: 'IGQVJXNkE1ZAkpBSXBPN2NqdkM3Q1dJOERXZAk5yT1NWb1JpNUJQRndUdnFaMWk5Mjh3R1dkUHItN3kxaWlZAaXR5VkpTa3ktQ2NkM2JkSnQ3UUI0S200M1VXUVIwWlNaMU55WDJlWVQ5aVk0eWI4NkxoTAZDZD',
        limit: 1,
        template: "<a href='{{ link }}'><img class='instacard-image' width = '100%' src = '{{image}}' alt='{{caption}}' ></a> ",
    });
    feed.run();
    console.log('feed running!');
});