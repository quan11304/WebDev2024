// Function to get URL parameters
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


const displaySearchData = () => {
    const searchParams = getParams(window.location.search);

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
        const populateHotelList = (destination = '', dateRange = '') => {
            const listResult = document.getElementById('listResult');
            let filteredHotels = hotels;

            // Lấy giá trị từ các input
            const minPriceInput = parseFloat(document.querySelectorAll(".lsOptionInput")[0].value) || 0;
            const maxPriceInput = parseFloat(document.querySelectorAll(".lsOptionInput")[1].value) || Infinity;

            // Lọc khách sạn dựa trên địa điểm
            if (destination) {
                filteredHotels = filteredHotels.filter(hotel => hotel.city.toLowerCase() === destination.toLowerCase());
            }

            // Lọc khách sạn dựa trên giá
            filteredHotels = filteredHotels.filter(hotel => hotel.price >= minPriceInput && hotel.price <= maxPriceInput);

            listResult.innerHTML = ""; // Clear previous results
            if (filteredHotels.length > 0) {
                filteredHotels.forEach(hotel => {
                    const hotelItem = document.createElement('div');
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
                    listResult.appendChild(hotelItem);
                });
            } else {
                listResult.innerHTML = `<p>No hotels available in ${destination} within the specified price range.</p>`;
            }
        };

// Initialize Flatpickr with custom behavior
const initFlatpickr = () => {
    const dateRangeInput = document.querySelector("#dateRange");

    flatpickr(dateRangeInput, {
        mode: "range",
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
        
            // Lấy giá trị ban đầu từ input và hiển thị khách sạn ngay lập tức
            const destinationInputValue = document.getElementById('destinationInput').value;
            const dateRangeValue = document.getElementById('dateRange').value;
        
            // Hiển thị khách sạn ngay khi tải trang
            populateHotelList(destinationInputValue, dateRangeValue);
        
            // Add event listener cho nút search
            document.getElementById('searchButton').addEventListener("click", () => {
                const destinationInputValue = document.getElementById('destinationInput').value;
                const dateRangeValue = document.getElementById('dateRange').value;
        
                populateHotelList(destinationInputValue, dateRangeValue); // Lọc kết quả dựa trên input
            });
        };