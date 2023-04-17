function loadImages(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target;
            const src = image.dataset.src;
            image.src = src;
            yall(image);
        }
    });
}

const imageObserver = new IntersectionObserver(loadImages, {
    rootMargin: '0px 0px 500px 0px',
    threshold: 0
});

function createImageElement(src, i) {
    const listItem = document.createElement('li');
    const image = document.createElement('img');
    const className = 'd';
    image.setAttribute('data-src', src);
    image.classList.add(`page-${i + 1}`);
    listItem.classList.add(className);
    listItem.appendChild(image);

    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.innerHTML = '<div></div><div></div><div></div>';
    listItem.appendChild(loader);

    imageObserver.observe(image);
    return listItem;
}

window.onload = function() {
    const container = document.getElementById('thumbnails-items');
    let thumbnailsItemsList = [];
    for (let i = 1; i < 133; i++) {
        if (mobile) {
            thumbnailsItemsList.push(`pages/mobile/png/611x800px_online_portfolio${i}.png`);
        } else {
            thumbnailsItemsList.push(`pages/desktop/png/611x800px_online_portfolio${i}.png`);
        }

    }
    const unorderedList = document.createElement('ul');
    unorderedList.appendChild(createImageElement(thumbnailsItemsList[0], 0));
    for (let i = 1; i < thumbnailsItemsList.length - 1; i++) {
        const listItem = createImageElement(thumbnailsItemsList[i], i);
        unorderedList.appendChild(listItem);
    }
    unorderedList.appendChild(createImageElement(thumbnailsItemsList[thumbnailsItemsList.length - 1], thumbnailsItemsList.length - 1));
    container.appendChild(unorderedList);

    yall();
};