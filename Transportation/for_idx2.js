// Sample car data with prices depending on driver type
const carData = {
    4: [ // Cars with 4 seats
        { name: 'Hyundai i10', priceWithDriver: '30 USD', priceWithoutDriver: '24 USD ', image: src='../Transportation/car4seats/hyndaii104.webp' },
        { name: 'Toyota Raize', priceWithDriver: '30 USD', priceWithoutDriver: '24 USD ', image: src='../Transportation/car4seats/toyotaRaize4.jpg' },
        { name: 'Hyundai Wigo', priceWithDriver: '33 USD ', priceWithoutDriver: '24 USD ', image: src='../Transportation/car4seats/toyotaWigo4.jpg' },
        { name: 'VinFast VF8', priceWithDriver: '30 USD ', priceWithoutDriver: '24 USD ', image: src='../Transportation/car4seats/vinfastVf84.jpg' },
    ],
    7: [ // Cars with 7 seats
        { name: 'CRV', priceWithDriver: '35 USD ', priceWithoutDriver: '30 USD ', image: src='../Transportation/car7seats/crv7.webp' },
        { name: 'Sedona', priceWithDriver: '35 USD ', priceWithoutDriver: '30 USD ', image: src='../Transportation/car7seats/sedona7.jpg' },
        { name: 'XL7', priceWithDriver: '35 USD ', priceWithoutDriver: '30 USD ', image: src='../Transportation/car7seats/xl77.png' },
        { name: 'Xpander Cross 7', priceWithDriver: '35 USD ', priceWithoutDriver: '30 USD ', image: src='../Transportation/car7seats/xpander-cross-7.jpg' }
    ],
    16: [ // Cars with 16 seats
        { name: 'Ford Transit', priceWithDriver: '40 USD ', priceWithoutDriver: '35 USD ', image: src='../Transportation/car16seats/fordsit16.png' },
        { name: 'Iveco Daily', priceWithDriver: '40 USD ', priceWithoutDriver: '35 USD ', image: src='../Transportation/car16seats/ivcoDaily16.jpg' },
        { name: 'Limousine', priceWithDriver: '40 USD ', priceWithoutDriver: '35 USD ', image: src='../Transportation/car16seats/limousin.jpg' },
    ],
    camping: [ // Camping cars
        { name: 'GAZElle', priceWithDriver: '55 USD ', priceWithoutDriver: '50 USD ', image: src='../Transportation/campingCar/GAZelle1.jpg' },
    ]
};

// Function to get URL parameters and decode them
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.slice(1); // Get query string after '?'
    const pairs = queryString.split('&'); // Split into key-value pairs
    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        if (key && value) {
            // Decode URI components and handle spaces
            params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
        }
    }
    return params; // Return the parameters as an object
}

// Function to format date from yyyy-mm-dd to dd/mm/yyyy
function formatDate(dateString) {
    const dateParts = dateString.split("-"); // Split the date into parts
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Rearrange to dd/mm/yyyy
}

// Function to display filtered results based on URL parameters
function displayResults() {
    const params = getQueryParams(); // Get the query parameters

    // Display rental details on the left side
    const rentalDetailsContainer = document.getElementById("rental-details");
    const formattedStartDate = params.startDate ? formatDate(params.startDate) : 'N/A'; // Format start date
    const formattedEndDate = params.endDate ? formatDate(params.endDate) : 'N/A'; // Format end date
    const driverType = params.driverType === 'with' ? 'With Driver' : 'Without Driver'; // Determine driver type
    
    // Set inner HTML to display rental details
    rentalDetailsContainer.innerHTML = `
        <h3><i class="fa-regular fa-circle-check"></i> Rental Details</h3>
        <p style="margin-bottom:0"><strong>Driver Option:</strong> ${driverType}</p>
        <p style="margin-bottom:0"><strong>Seat:</strong> ${params.seat || 'N/A'}</p>
        <p style="margin-bottom:0"><strong>City:</strong> ${params.city || 'N/A'}</p>
        <p style="margin-bottom:0"><strong>Rental Location:</strong> ${params.rentalLocation || 'N/A'}</p>
        <p style="margin-bottom:0"><strong>Start:</strong> ${formattedStartDate} ${params.startTime || ''}</p>
        <p style="margin-bottom:0"><strong>End:</strong> ${formattedEndDate} ${params.endTime || ''}</p>
        ${driverType === 'With Driver' ? `<p><strong>Pickup Time:</strong> ${params.pickupTime || 'N/A'}</p>` : ''}
    `;

    // Display car list on the right side
    const carListContainer = document.getElementById("car-list");
    carListContainer.innerHTML = ""; // Clear previous content

    const seatType = params.seat; // Get the seat type from parameters
    const driver = params.driverType; // Get the driver option from parameters

    // Check if there are cars available for the selected seat type
    if (carData[seatType]) {
        carData[seatType].forEach(car => {
            const price = driver === 'with' ? car.priceWithDriver : car.priceWithoutDriver; // Get price based on driver type
            const numericPrice = parseFloat(price); // Convert price to numeric for calculations
            const carItem = document.createElement('div'); // Create a new div for each car item
            carItem.classList.add('car-item');
            carItem.innerHTML = `
                <img src="${car.image}"> <!-- Display car image -->
                <div class="mainPartColumn" style="flex:5; ">
                    <h3 style="color:blue">${car.name}</h3> <!-- Display car name -->
                    <p style="margin: 5px; ">
                        <i class="fa-solid fa-user" style="margin-right: 5px; font-size: 14px;"></i><span style="margin-right: 25px;"> 4 seats</span>
                        <i class="fa-solid fa-suitcase-rolling" style="margin-right: 5px; font-size: 14px;"></i><span> 1 luggage</span>
                    </p>
                </div>
                <div class="mainPartColumn" style="justify-content: space-between">
                    <div class="mainPartRow" style=" column-gap: 5px; width:auto; ">
                        <h3 style="margin: 0; color:Red">${price}<p></p></h3> <!-- Display price -->
                        <p>/day</p>
                    </div>
                    <a href="javascript:void(0);" style="text-decoration:none; text-align:right">
                        <button class="rent" onclick="rentCar('${car.image}','${car.name}', ${numericPrice}, '${params.startDate}', '${params.endDate}')">Rent</button> 
                    </a>
                </div>
            `;
            carListContainer.appendChild(carItem); // Add the car item to the list
        });
        
    } else {
        // If no cars are available for the selected seat type, show a message
        carListContainer.innerHTML = "<p>No cars available for the selected seat type.</p>";
    }
}

// Function to handle car rental process
function rentCar(carImage, carName, price, startDate, endDate) {
    // Parse the start and end dates to calculate the number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the time difference in milliseconds
    const timeDifference = end - start;

    // Calculate the difference in days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert time difference to days

    // Calculate total cost
    const totalCost = daysDifference * price; // Use numeric price directly

    // Display total cost to the user in the designated area
    const totalPriceContainer = document.getElementById("total-price");
    
    if (daysDifference < 0) {
        // If end date is before start date
        totalPriceContainer.innerHTML = "Please select a valid rental period.";
    } else if (daysDifference === 0) {
        // If no days are selected
        totalPriceContainer.innerHTML = "Please select at least one day.";
    } else {
        // Display rental summary with total cost
        totalPriceContainer.innerHTML = 
        `
        <div class="mainPartColumn" style="border: 1px solid grey; background-color: lightyellow; padding: 20px;">
            <img src="${carImage}" style="width:100%; box-sizing: contain"> <!-- Display car image -->
            <h3 style="text-align: center; margin-bottom: 10">${carName}</h3> <!-- Display car name -->
            <p style="text-align: center; margin-bottom: 0"><strong><i class="fa-regular fa-calendar-check"></i></strong> ${daysDifference} days</p>
            <div class="mainPartRow">
                <p style="margin-bottom: 0"><strong>Total cost:</strong></p>
                <p style="color:red; font-size:20px; font-weight:bold; margin-left:auto; margin-bottom:0">${totalCost.toFixed(2)} USD</p> <!-- Display total cost -->
            </div>
            <button class="rent" id="payButton" style="background-color: lightgreen; margin-top:20px; padding:0">
                <h3 style="text-align: center; margin:10px">Pay</h3> <!-- Payment button -->
            </button>
        </div>
        `;

        // Add event listener to the Pay button
        const payButton = document.getElementById("payButton");
        payButton.addEventListener("click", () => {
            // Redirect to the payment page with parameters
            const params = new URLSearchParams({
                carImage: carImage,
                carName: carName,
                totalDays: daysDifference,
                totalPrice: totalCost.toFixed(2), // Format total cost to 2 decimal places
                driverType: document.getElementById("rental-details").querySelector('p').innerText.split(': ')[1], // Retrieve driver option
                seat: document.getElementById("rental-details").querySelectorAll('p')[1].innerText.split(': ')[1], // Retrieve seat type
                city: document.getElementById("rental-details").querySelectorAll('p')[2].innerText.split(': ')[1], // Retrieve city
                rentalLocation: document.getElementById("rental-details").querySelectorAll('p')[3].innerText.split(': ')[1], // Retrieve rental location
                startDate: startDate,
                endDate: endDate,
                startTime: document.getElementById("rental-details").querySelector('p').innerText.split(': ')[1], // Retrieve start time
                endTime: document.getElementById("rental-details").querySelector('p').innerText.split(': ')[1], // Retrieve end time
            });

            // Navigate to the new payment page with parameters
            window.location.href = `../Transportation/car_index3.html?${params.toString()}`;
        });
    }
}

// Function to toggle the visibility of rental details
function toggleNav() {
    var rentalDetails = document.getElementById("rental-details");

    // Check if rental details are currently displayed
    if (rentalDetails.style.display === "flex") {
        // If displayed, close the nav
        rentalDetails.style.display = "none";
    } else {
        // If not displayed, open the nav
        rentalDetails.style.display = "flex";
    }
}

// Function to adjust the position of an icon while scrolling
window.onscroll = function() {
    var icon = document.getElementById("scrollingIcon");
    icon.style.top = (window.pageYOffset + 50) + "px"; // Adjust position based on scroll
};

// Call the function to display results on page load
window.onload = displayResults;
