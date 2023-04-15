const container = document.querySelector('.sidebar-items');

for (let i = 1; i < 133; i++) {
    const listItem = document.createElement('li');
    const linkToPage = document.createElement('a');
    const spanTag = document.createElement('span');
    spanTag.innerHTML = `PAGE......................${i}`;

    linkToPage.href = `#page/${i}`;
    linkToPage.appendChild(spanTag);
    listItem.appendChild(linkToPage);
    container.appendChild(listItem);
}