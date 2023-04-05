const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementsByClassName('close')[0];

// Open the modal
openModalBtn.onclick = function() {
    modal.style.display = "block";
}



// Close the modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


const element = document.querySelector('#thumbnails-items');

element.addEventListener('click', function() {
    // hide the element
    modal.style.display = "none";


});