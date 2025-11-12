// --- Lightbox/Modal Functionality ---

// Get the main modal elements from the HTML
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementsByClassName('lightbox-close')[0];

// Get ALL images that have the class 'gallery-image'
const galleryImages = document.querySelectorAll('.gallery-image');

// Add a click listener to every single image in the galleries
galleryImages.forEach(image => {
    image.addEventListener('click', function() {
        // 1. Show the lightbox
        lightbox.style.display = "block";
        
        // 2. Set the modal image source to the full-size version 
        //    (stored in the data-full attribute of the HTML image tag)
        lightboxImg.src = this.getAttribute('data-full');
        
        // 3. Set the caption text using the alt attribute
        lightboxCaption.innerHTML = this.alt;
    });
});

// Close the lightbox when the close button (X) is clicked
closeBtn.onclick = function() {
    lightbox.style.display = "none";
}

// Close the lightbox when the user clicks anywhere outside of the image
window.onclick = function(event) {
    if (event.target == lightbox) {
        lightbox.style.display = "none";
    }
}
