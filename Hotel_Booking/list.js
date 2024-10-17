// Function to get URL parameters
// retrieve and analyze parameters from a URL, returning an object containing the values of specific parameters
const getParams = (url) => {
    const params = new URLSearchParams(url);
    return {
        destination: params.get('destination') || '',
        dateRange: params.get('dateRange') || '', // Default value
        adults: params.get('adults') || 1,
        children: params.get('children') || 0,
        rooms: params.get('rooms') || 1
    };
};

// Display and set search data from URL parameters on the website.
const displaySearchData = () => {
    const searchParams = getParams(window.location.search);   // window.location.search = ?destination=Hanoi&dateRange=2023-01-01&adults=2&children=1&rooms=1

    // Set destination
    document.querySelector("input[type='text']").value = searchParams.destination;

    // Set date range or placeholder if no date is selected
    const dateRangeInput = document.querySelector("#dateRange");
    if (searchParams.dateRange) {
        dateRangeInput.value = `${searchParams.dateRange}`;
    } else {
        dateRangeInput.value = "Select date range";
    }

    // Set number of adults, children, and rooms
    document.querySelectorAll(".lsOptionInput")[0].value = searchParams.minPrice || ''; // Min price
    document.querySelectorAll(".lsOptionInput")[1].value = searchParams.maxPrice || ''; // Max price
    document.querySelectorAll(".lsOptionInput")[2].value = searchParams.adults; // Adults
    document.querySelectorAll(".lsOptionInput")[3].value = searchParams.children; // Children
    document.querySelectorAll(".lsOptionInput")[4].value = searchParams.rooms; // Rooms
};


// Populate the hotel list
// Filter and display a list of hotels based on user input for the destination and price range.
const populateHotelList = (destination = '', dateRange = '') => {   // In the future, we need dateRange
    const listResult = document.getElementById('listResult');
        let filteredHotels = hotels;

        // Get the min and max price from lsOptionInput
        // parseFloat is used to convert the input values to numbers.
        const minPriceInput = parseFloat(document.querySelectorAll(".lsOptionInput")[0].value) || 0;
        const maxPriceInput = parseFloat(document.querySelectorAll(".lsOptionInput")[1].value) || Infinity;

            // Filtering Hotel by Destination
            if (destination) {
                filteredHotels = filteredHotels.filter(hotel => hotel.city.toLowerCase() === destination.toLowerCase());
            }

            // Filtering Hotel by Price
            filteredHotels = filteredHotels.filter(hotel => hotel.price >= minPriceInput && hotel.price <= maxPriceInput);

            listResult.innerHTML = ""; // Clear previous results
            if (filteredHotels.length > 0) {  // If there are results
                filteredHotels.forEach(hotel => {
                    const hotelItem = document.createElement('div');  // div will be used to hold all the information about the hotel, such as its name, image, and details.
                    hotelItem.className = 'searchItem';
                    hotelItem.innerHTML = `
                        <img src="${hotel.img}" alt="" class="siImg" />
                        <div class="siDesc">
                            <h1 class="siTitle">${hotel.name}</h1>
                            <span class="siDistance">${hotel.distance}</span>
                            <span class="siTaxiOp">${hotel.taxi}</span>
                            <span class="siSubtitle">${hotel.subtitle}</span>
                            <span class="siFeatures">${hotel.features}</span>
                            <span class="siCancelOp">${hotel.cancellation}</span>
                            <span class="siCancelOpSubtitle">${hotel.cancellationSubtitle}</span>
                        </div>
                        <div class="siDetails">
                            <div class="siRating">
                                <span>Excellent</span>
                                <button>${hotel.rating}</button>
                            </div>
                            <div class="siDetailTexts">
                                <span class="siPrice">$${hotel.price}</span>
                                <span class="siTaxOp">Includes taxes and fees</span>
                                <a href="${hotel.page}" class="siCheckButton">See availability</a>
                            </div>
                        </div>
                    `;
                    listResult.appendChild(hotelItem);  // Adds the newly created hotelItem div to the listResult element
                });                                     // appendChild method inserts the hotelItem as a child of the listResult element in the DOM.
            } else {
                listResult.innerHTML = `<p>No hotels available in ${destination} within the specified price range.</p>`;
        }
};

// Initialize Flatpickr with custom behavior
const initFlatpickr = () => {
    const dateRangeInput = document.querySelector("#dateRange");  // Selects the input element with the ID dateRange from the DOM and assigns it to the dateRangeInput variable.

    flatpickr(dateRangeInput, {
        mode: "range",          // select a start date and an end date.
        dateFormat: "Y-m-d",      
        minDate: "today",
        allowInput: false, // Disallow manual changes
    });

    // Add click event listener to open calendar
    dateRangeInput.addEventListener('click', function() {
        if (this.value === "Select date range") {
            flatpickr.instances[0].open();
        }
    });
};

// Run function when the page loads
window.onload = () => {
    displaySearchData();
    initFlatpickr();
        
    // Get initial value from input and display hotel immediately
    const destinationInputValue = document.getElementById('destinationInput').value;
    const dateRangeValue = document.getElementById('dateRange').value;
        
    // Show hotels as soon as page loads
    populateHotelList(destinationInputValue, dateRangeValue);
        
    // Add event listener to button search
    document.getElementById('searchButton').addEventListener("click", () => {
        const destinationInputValue = document.getElementById('destinationInput').value;
        const dateRangeValue = document.getElementById('dateRange').value;
        
        populateHotelList(destinationInputValue, dateRangeValue); // Filter results based on input
            });
};