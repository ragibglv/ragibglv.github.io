function openModal(modalId) {
    var modal = document.getElementById(modalId);
    var header = document.querySelector('header'); // Get the header
    var main = document.querySelector('main'); // Get the main content area
    var footer = document.querySelector('.footer-container'); // Get the footer

    if (modal) {
        modal.style.display = "block";
        document.body.classList.add("no-scroll"); // Disable scrolling on the main page
        header.classList.add("blur-background"); // Blur the header
        main.classList.add("blur-background"); // Blur the main content
        footer.classList.add("blur-background"); // Blur the footer
    }
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    var header = document.querySelector('header'); // Get the header
    var main = document.querySelector('main'); // Get the main content area
    var footer = document.querySelector('.footer-container'); // Get the footer

    if (modal) {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll"); // Enable scrolling on the main page
        header.classList.remove("blur-background"); // Remove blur from the header
        main.classList.remove("blur-background"); // Remove blur from the main content
        footer.classList.remove("blur-background"); // Remove blur from the footer
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')){
        event.target.style.display = "none"
        document.body.classList.remove("no-scroll"); // Enable scrolling on the main page
        // Get the header, main content area, and footer
        var header = document.querySelector('header');
        var main = document.querySelector('main');
        var footer = document.querySelector('.footer-container');
        // Remove blur from the header, main content, and footer
        header.classList.remove("blur-background");
        main.classList.remove("blur-background");
        footer.classList.remove("blur-background");
    }
}