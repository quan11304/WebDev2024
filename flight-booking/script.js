document.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.getElementById('flight-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let fromCity = document.getElementById('from').value;
    let toCity = document.getElementById('to').value;
    let departureDate = document.getElementById('departure').value;
    let returnDate = document.getElementById('return').value;

    if (!fromCity || !toCity || !departureDate) {
        alert('Please fill out all required fields.');
        return;
    }

    alert(`Searching flights from ${fromCity} to ${toCity}. Departure: ${departureDate}, Return: ${returnDate}`);
});

// JavaScript to handle random destination suggestion


document.getElementById("return-toggle").addEventListener("change", function() {
    const returnDateInput = document.getElementById("return");
    returnDateInput.disabled = !this.checked;
});

// JavaScript for carousel scroll functionality
const flightCarousel = document.getElementById('flight-carousel');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

rightArrow.addEventListener('click', () => {
    flightCarousel.scrollBy({ left: 300, behavior: 'smooth' });
});

leftArrow.addEventListener('click', () => {
    flightCarousel.scrollBy({ left: -300, behavior: 'smooth' });
});



// Add this script to your existing JavaScript file or within a <script> tag

document.getElementById('search-flights-btn').addEventListener('click', function () {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure = document.getElementById('departure').value;
    const returnDate = document.getElementById('return').value;
    const passengers = document.getElementById('passenger-selection').value;
    const flightClass = document.getElementById('class').value;

    // Save data to localStorage
    localStorage.setItem('from', from);
    localStorage.setItem('to', to);
    localStorage.setItem('departure', departure);
    localStorage.setItem('returnDate', returnDate);
    localStorage.setItem('passengers', passengers);
    localStorage.setItem('flightClass', flightClass);

    // Redirect to select.html
    window.location.href = 'select.html';
});



