        const cities = [
            "Hà Nội", "Đà Nẵng", "Nha Trang", "TP HCM", 
            "Đà Lạt", "Vinh", "Quy Nhơn", "Phú Quốc", "Huế", "Cần Thơ"
        ];

        const airlines = [
            "Vietnam Airlines", "VietJet Air", "Bamboo Airways", 
            "Vietravel Airlines", "Pacific Airlines"
        ];

        const images = [
            "image/danang.jpg",
            "image/nhatrang.jpg",
            "image/tphcm.jpg",
            "image/dalat.jpg",
            "image/1.jpg",
            "image/mui=ne.jpg",
            "image/singapore.jpg",
            "image/trang-an.jpg",
            "image/sapa.jpg",
            "image/hang-tien-endeavor.jpg",
            "image/halong.jpg",
        ];

        function getRandomDate() {
            const start = new Date();
            const end = new Date(start);
            end.setDate(start.getDate() + 30);
            const randomDate = new Date(start.getTime() + Math.random() * (end - start));
            return randomDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
        }

        function getRandomTime() {
            const hours = Math.floor(Math.random() * 24);
            const minutes = Math.floor(Math.random() * 60);
            const duration = Math.floor(Math.random() * 3) + 1;
            const arrivalHours = (hours + duration) % 24;
            return {
                departure: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
                arrival: `${arrivalHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
                duration: `${duration}h ${Math.floor(Math.random() * 60)}m`
            };
        }

        function generateRandomPrice() {
            const basePrice = Math.floor(Math.random() * (3000000 - 1000000 + 1) + 1000000);
            const discountPrice = basePrice * 0.9;
            return { basePrice, discountPrice };
        }

        function getUniqueCityPairs() {
            const uniquePairs = [];
            const usedPairs = new Set();

            while (uniquePairs.length < 1000 && usedPairs.size < (cities.length * (cities.length - 1))) {
                const shuffledCities = cities.sort(() => 0.5 - Math.random());
                const fromCity = shuffledCities[0];
                const toCity = shuffledCities[1];
                const routeKey = `${fromCity}-${toCity}`;
                if (!usedPairs.has(routeKey) && fromCity !== toCity) {
                    usedPairs.add(routeKey);
                    uniquePairs.push({ from: fromCity, to: toCity });
                }
            }
            return uniquePairs;
        }

        function generateFlights() {
            const flightCarousel = document.getElementById('flight-carousel');
            flightCarousel.innerHTML = ''; // Clear previous flights

            const cityPairs = getUniqueCityPairs();

            cityPairs.forEach(pair => {
                const airline = airlines[Math.floor(Math.random() * airlines.length)];
                const date = getRandomDate();
                const price = generateRandomPrice();
                const time = getRandomTime();
                const image = images[Math.floor(Math.random() * images.length)];

                const flightCard = document.createElement('div');
                flightCard.className = 'flight-card';
                flightCard.innerHTML = `
                    <img src="${image}" alt="${airline}" class="flight-logo">
                    <div class="flight-details">
                        <h3>${airline}</h3>
                        <div class="flight-time">
                            <span>${time.departure} - ${time.arrival}</span>
                            <span>${time.duration}</span>
                        </div>
                        <p>${pair.from} (${pair.from.slice(0, 3).toUpperCase()}) - ${pair.to} (${pair.to.slice(0, 3).toUpperCase()})</p>
                        <p>${date}</p>
                    </div>
                    <div class="price-details">
                        <p class="old-price">₫${price.basePrice.toLocaleString()}</p>
                        <p class="price">₫${price.discountPrice.toLocaleString()}</p>
                    </div>
                    <button class="select-button">Book</button>
                `;
                flightCarousel.appendChild(flightCard);
            });
        }

        window.onload = generateFlights;

// Get the modal and close button elements
const modal = document.getElementById('booking-modal');
const closeButton = document.querySelector('.close-button');

// Function to open the modal with flight details
function openModal(flightDetails) {
    const modalFlightDetails = document.getElementById('modal-flight-details');
    modalFlightDetails.innerHTML = flightDetails; // Set flight details in the modal
    modal.style.display = 'block'; // Show the modal
}

// Function to close the modal
closeButton.onclick = function() {
    modal.style.display = 'none'; // Hide the modal
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal
    }
}

// Add event listeners to the "Book" buttons
const bookButtons = document.querySelectorAll('.select-button');
bookButtons.forEach((button) => {
    button.addEventListener('click', function() {
        const flightCard = button.closest('.flight-card');
        const airline = flightCard.querySelector('.flight-details h3').textContent;
        const details = flightCard.querySelector('.flight-details').innerHTML;
        const price = flightCard.querySelector('.price-details .price').textContent;

        // Create flight detail string for the modal
        const flightDetails = `
            <h3>${airline}</h3>
            <p>${details}</p>
            <p>Price: ${price}</p>
        `;
        openModal(flightDetails); // Open modal with flight details
    });
});

