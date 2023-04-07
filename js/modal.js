const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementsByClassName('close')[0];


// Open the modal
openModalBtn.onclick = function() {
    modal.style.display = "block";
    $('.magazine-viewport').hide();
}

//Open the Modal from footer
function openModalfooter() {
    modal.style.display = "block";
    $('.magazine-viewport').hide();
}




// Close the modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    $('.magazine-viewport').show();
}


const element = document.querySelector('#thumbnails-items');

element.addEventListener('click', function() {
    // hide the element
    modal.style.display = "none";


});