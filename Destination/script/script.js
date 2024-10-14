//See more See less
function toggleReadMore(linkElement) {
    var moreText = linkElement.previousElementSibling;
    var shortText = moreText.previousElementSibling;

    if (moreText.style.display === "none") {
        moreText.style.display = "inline"; // Show the full text
        linkElement.innerHTML = "See Less"; // Change link text to "See Less"
    } else {
        moreText.style.display = "none"; // Hide the full text
        linkElement.innerHTML = "Read More"; // Revert the link text to "Read More"
    }
}

//Slider
const destinationSwiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,

    // Pagination bullets
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Update Swiper after adding new slides
destinationSwiper.update();












