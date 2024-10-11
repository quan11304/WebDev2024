// Get references to input fields and the finish button
const nameInput = document.getElementById('nameCus'); // Input for customer's name
const phoneInput = document.getElementById('phoneNum'); // Input for customer's phone number
const idInput = document.getElementById('idCardNum'); // Input for customer's ID card number
const checkbox = document.getElementById('acceptPolicies'); // Checkbox for policy acceptance
const finishButton = document.getElementById('finishButton'); // Finish button

// Function to validate the inputs and enable/disable the finish button
function validateInputs() {
    // Check if each input is valid (not empty for text fields and checked for checkbox)
    const nameValid = nameInput.value.trim() !== ''; // Name should not be empty
    const phoneValid = phoneInput.value.trim() !== ''; // Phone number should not be empty
    const idValid = idInput.value.trim() !== ''; // ID card number should not be empty
    const checkboxValid = checkbox.checked; // Checkbox must be checked

    // If all inputs are valid, enable the finish button
    if (nameValid && phoneValid && idValid && checkboxValid) {
        finishButton.classList.add('enabled'); // Add 'enabled' class to the button
        finishButton.onclick = function() {
            // Redirect to the successful page when button is clicked
            window.location.href = "../Transportation/car_index4.html";
        };
    } else {
        // If any input is invalid, disable the finish button
        finishButton.classList.remove('enabled'); // Remove 'enabled' class from the button
        finishButton.onclick = null; // Clear the onclick function to prevent action
    }
}

// Add event listeners to inputs and checkbox to trigger validation on change
nameInput.addEventListener('input', validateInputs); // Validate on name input
phoneInput.addEventListener('input', validateInputs); // Validate on phone input
idInput.addEventListener('input', validateInputs); // Validate on ID input
checkbox.addEventListener('change', validateInputs); // Validate on checkbox change

// Function to retrieve URL parameters for rental information
function getUrlParameters() {
    const params = new URLSearchParams(window.location.search); // Parse URL parameters
    return {
        carImage: params.get('carImage'), // Get car image URL
        carName: params.get('carName'), // Get car name
        totalDays: params.get('totalDays'), // Get total rental days
        totalPrice: params.get('totalPrice'), // Get total rental price
        driverType: params.get('driverType'), // Get driver type
        seat: params.get('seat'), // Get number of seats
        city: params.get('city'), // Get city name
        rentalLocation: params.get('rentalLocation'), // Get rental location
    };
}

// Function to populate the summary page with rental information
function populateSummary() {
    const params = getUrlParameters(); // Retrieve URL parameters

    // Set the innerHTML or src of elements with rental information
    document.getElementById('carImage').src = params.carImage; // Set car image
    document.getElementById('carName').innerText = params.carName; // Set car name
    document.getElementById('days').innerText = `${params.totalDays} days`; // Set rental duration
    document.getElementById('totalCost').innerText = `${params.totalPrice} USD`; // Set total cost
    document.getElementById('nbOfSeat').innerHTML = params.seat; // Set number of seats
    document.getElementById('cityCf').innerHTML = params.city; // Set city name
    document.getElementById('driverOpt').innerHTML = params.driverType; // Set driver type
}

// Call the function to populate the summary when the page loads
window.onload = populateSummary;
