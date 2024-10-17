// Set default filter to "without" on page load
filterSelection("without");

// Select the "Without Driver" button by default and add a "clicked" class to it
document.querySelector('button[onclick="filterSelection(\'without\')"]').classList.add('clicked');

function filterSelection(c) {
    var x = document.getElementsByClassName('filterDiv'); // Get all elements with class 'filterDiv'
    // Loop through each element and only show those that match the selected filter
    for (let i = 0; i < x.length; i++) {
        RemoveClass(x[i], 'show'); // Remove "show" class from all elements first
        if (x[i].classList.contains(c)) {
            AddClass(x[i], 'show'); // Add "show" class to elements that match the filter
        }
    }
}

// Function to add a class to an element if it doesn't already have it
function AddClass(element, name) {
    if (!element.classList.contains(name)) {
        element.classList.add(name);
    }
}

// Function to remove a class from an element
function RemoveClass(element, name) {
    element.classList.remove(name);
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById('mySelection'); // Get the button container
var btns = btnContainer.getElementsByClassName('btn'); // Get all buttons inside the container
for (var i = 0; i < btns.length; i++) {
    // Add click event listener to each button
    btns[i].addEventListener('click', function () {
        var current = document.getElementsByClassName('clicked'); // Get currently clicked button
        if (current.length > 0) {
            current[0].classList.remove('clicked'); // Remove 'clicked' class from the current button
        }
        this.classList.add('clicked'); // Add 'clicked' class to the button that was just clicked
    });
}

// Function to set the default start and end dates
function setDefaultDates() {
    const today = new Date(); // Get today's date
    const startDateFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    // Set end date to today + 3 days
    today.setDate(today.getDate() + 3); // Add 3 days
    const endDateFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Set the default values for the date inputs
    document.getElementById('startDate1').value = startDateFormatted;
    document.getElementById('startDate2').value = startDateFormatted;

    document.getElementById('endDate1').value = endDateFormatted;
    document.getElementById('endDate2').value = endDateFormatted;
}

// Set the default dates when the page loads
window.onload = setDefaultDates;

// Generic function to handle both "without driver" and "with driver" forms
function filterResults(driverType) {
    let isValid = true; // Flag for form validation

    // Shared form elements
    const seat = document.getElementById("seat"); // Get seat input element
    seat.style.borderColor = ''; // Reset border color
    document.getElementById("seat_e").style.display = 'none'; // Hide seat error message

    // Check if seat input is empty
    if (!seat.value.trim()) {
        seat.style.borderColor = 'red'; // Highlight border in red if empty
        document.getElementById("seat_e").style.display = 'inline'; // Show error message
        isValid = false; // Set validation flag to false
    }

    // For "Without Driver" selection
    if (driverType === 'without') {
        const city = document.getElementById("city1"); // Get city input
        const rentalLocation = document.getElementById("rentalLocation1"); // Get rental location input
        const startDate = document.getElementById("startDate1"); // Get start date input
        const startTime = document.getElementById("startTime"); // Get start time input
        const endDate = document.getElementById("endDate1"); // Get end date input
        const endTime = document.getElementById("endTime"); // Get end time input

        // Reset error styles and hide error messages
        city.style.borderColor = '';
        rentalLocation.style.borderColor = '';
        document.getElementById("city_e1").style.display = 'none'; // Hide city error message
        document.getElementById("rent_e1").style.display = 'none'; // Hide rental location error message

        // Validation and query building for "without driver" form
        if (!city.value.trim()) {
            city.style.borderColor = 'red'; // Highlight border in red if empty
            document.getElementById("city_e1").style.display = 'inline'; // Show error message
            isValid = false; // Set validation flag to false
        }
        if (!rentalLocation.value.trim()) {
            rentalLocation.style.borderColor = 'red'; // Highlight border in red if empty
            document.getElementById("rent_e1").style.display = 'inline'; // Show error message
            isValid = false; // Set validation flag to false
        }

        // If form is valid, proceed with query string and redirect
        if (isValid) {
            const params = new URLSearchParams(); // Create URLSearchParams object
            params.append("seat", seat.value); // Add seat value
            params.append("city", city.value); // Add city value
            params.append("rentalLocation", rentalLocation.value); // Add rental location value
            params.append("startDate", startDate.value); // Add start date
            params.append("startTime", startTime.value); // Add start time
            params.append("endDate", endDate.value); // Add end date
            params.append("endTime", endTime.value); // Add end time
            params.append("driverType", driverType);  // Pass driver type as a parameter

            // Redirect to results page
            window.location.href = `../Transportation/car_index2.html?${params.toString()}`;
        }
    }

    // For "With Driver" selection
    else if (driverType === 'with') {
        const city = document.getElementById("city2"); // Get city input
        const rentalLocation = document.getElementById("rentalLocation2"); // Get rental location input
        const startDate = document.getElementById("startDate2"); // Get start date input
        const endDate = document.getElementById("endDate2"); // Get end date input
        const pickupTime = document.getElementById("pickupTime"); // Get pickup time input

        // Reset error styles and hide error messages
        city.style.borderColor = '';
        rentalLocation.style.borderColor = '';
        document.getElementById("city_e2").style.display = 'none'; // Hide city error message
        document.getElementById("rent_e2").style.display = 'none'; // Hide rental location error message

        // Validation and query building for "with driver" form
        if (!city.value.trim()) {
            city.style.borderColor = 'red'; // Highlight border in red if empty
            document.getElementById("city_e2").style.display = 'inline'; // Show error message
            isValid = false; // Set validation flag to false
        }
        if (!rentalLocation.value.trim()) {
            rentalLocation.style.borderColor = 'red'; // Highlight border in red if empty
            document.getElementById("rent_e2").style.display = 'inline'; // Show error message
            isValid = false; // Set validation flag to false
        }

        // If form is valid, proceed with query string and redirect
        if (isValid) {
            const params = new URLSearchParams(); // Create URLSearchParams object
            params.append("seat", seat.value); // Add seat value
            params.append("city", city.value); // Add city value
            params.append("rentalLocation", rentalLocation.value); // Add rental location value
            params.append("startDate", startDate.value); // Add start date
            params.append("endDate", endDate.value); // Add end date
            params.append("pickupTime", pickupTime.value); // Add pickup time
            params.append("driverType", driverType);  // Pass driver type as a parameter

            // Redirect to results page
            window.location.href = `../Transportation/car_index2.html?${params.toString()}`;
        }
    }
}
