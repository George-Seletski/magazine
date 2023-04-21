const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
//const closeModalBtn = document.getElementsByClassName('close')[0];

const modalSocial = document.getElementById('modal-social-links');
const openSocialModalBtn = document.getElementById('open-modal-social-links');


// Open the modal
openModalBtn.onclick = function() {
    modal.style.display = "block";
    //$('#canvas').css('position', 'fixed');
    $('.modal').css('position', 'none');
}


//Open the Modal from footer
function openModal() {
    modal.style.display = "block";
    //$('#canvas').css('position', 'fixed');
    $('.modal').css('position', 'none');

}




// Close the modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    //$('.magazine-viewport').show();
}


const element = document.querySelector('#thumbnails-items');

element.addEventListener('click', function() {
    // hide the element
    modal.style.display = "none";


});

/*Social Modal Links Modal*/


// Open the modal
openSocialModalBtn.onclick = function() {
    modalSocial.style.display = "block";
    //$('#canvas').css('position', 'fixed');
    $('.modal-social-links').css('position', 'none');
}


//Close the Modal from footer
function closeModalSocials() {
    modalSocial.style.display = "none";
}




// Close the modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modalSocial) {
        modalSocial.style.display = "none";
    }
    //$('.magazine-viewport').show();
}


const Socialelement = document.querySelector('#socila-items');

element.addEventListener('click', function() {
    // hide the element
    modalSocial.style.display = "none";


});