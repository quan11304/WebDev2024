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

// Retrieve and display search information
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
    initFlatpickr(); // Initialize Flatpickr after displaying data
};
