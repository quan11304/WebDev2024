// Get modal elements
const modal = document.getElementById('flight-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalAirline = document.getElementById('modal-airline');
const modalPrice = document.getElementById('modal-price');

// Get all flight cards
const flightCards = document.querySelectorAll('.flight-card');

// Loop through flight cards to attach click events
flightCards.forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.querySelector('.flight-image').src;
        const title = card.querySelector('h3').textContent;
        const date = card.querySelector('p:nth-child(2)').textContent;
        const airline = card.querySelector('p:nth-child(3)').textContent;
        const price = card.querySelector('.price').textContent;

        // Populate modal with clicked flight card's details
        modalImage.src = imgSrc;
        modalTitle.textContent = title;
        modalDate.textContent = date;
        modalAirline.textContent = airline;
        modalPrice.textContent = price;

        // Show the modal
        modal.style.display = 'block';
    });
});

// Close the modal when the user clicks on the close button
document.querySelector('.close-btn').addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when the user clicks outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
