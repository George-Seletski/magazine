window.onload = function() {
    const container = document.getElementById('thumbnails-items');

    let thumbnailsItemsList = [];

    for (let i = 1; i < 69; i++) {
        thumbnailsItemsList.push(`pages/png/online_portfolio${i}.png`);
    }

    //document.getElementById('myListContainer').innerHTML = ThummbnailsItemsList;

    const unorderedList = document.createElement('ul');

    for (let i = 0; i < thumbnailsItemsList.length; i++) {
        if (i === 0) {
            const listItem = document.createElement('li');
            const image = document.createElement('img');
            const className = 'i';
            image.setAttribute('src', thumbnailsItemsList[0]);
            image.style.width = '200px';
            image.style.height = '250px';
            listItem.classList.add(className);
            image.classList.add(`page-${i+1}`);
            listItem.appendChild(image);
            //console.log(listItem);
            unorderedList.appendChild(listItem);
        } else {
            if (i === thumbnailsItemsList.length - 1) {
                const listItem = document.createElement('li');
                const image = document.createElement('img');
                const classNameI = 'i';
                image.setAttribute('src', thumbnailsItemsList[i]);
                image.style.width = '200px';
                image.style.height = '250px';
                listItem.classList.add(classNameI);
                image.classList.add(`page-${i}`);
                listItem.appendChild(image);
                //console.log(listItem);
                unorderedList.appendChild(listItem);
            } else {
                //console.log(thumbnailsItemsList[i], i);
                const path = thumbnailsItemsList[i];
                const listItem = document.createElement('li');
                const image = document.createElement('img');
                const className = 'd';
                image.setAttribute('src', path);
                image.style.width = '200px';
                image.style.height = '250px';
                listItem.classList.add(className);
                image.classList.add(`page-${i}`);
                listItem.appendChild(image);
                //console.log(listItem);
                unorderedList.appendChild(listItem);
            }
        }
    }
    container.appendChild(unorderedList);
};