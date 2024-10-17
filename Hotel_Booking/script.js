// script.js

// Initialize date range picker
flatpickr("#datePicker", {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr) {  // selectedDates use in future
        console.log("Selected date range:", dateStr);
    }
});

// JavaScript for managing options
let options = {
    adult: 2,
    children: 2,
    room: 1
};

const updateUserInfo = () => {
    document.getElementById('userInfo').innerText = 
        `${options.adult} adult${options.adult > 1 ? 's' : ''}, ${options.children} child${options.children !== 1 ? 'ren' : ''}, ${options.room} room${options.room > 1 ? 's' : ''}`;
    document.getElementById('adultDecrease').disabled = options.adult <= 1;
    document.getElementById('childrenDecrease').disabled = options.children <= 0;
    document.getElementById('roomDecrease').disabled = options.room <= 1;
    document.getElementById('adultCount').innerText = options.adult;
    document.getElementById('childrenCount').innerText = options.children;
    document.getElementById('roomCount').innerText = options.room;
};

const toggleOptions = () => {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = optionsDiv.style.display === 'block' ? 'none' : 'block';
};

// Event listeners for buttons
document.getElementById('adultIncrease').onclick = () => {
    options.adult++;
    updateUserInfo();
};

document.getElementById('adultDecrease').onclick = () => {
    if (options.adult > 1) {
        options.adult--;
        updateUserInfo();
    }
};

document.getElementById('childrenIncrease').onclick = () => {
    options.children++;
    updateUserInfo();
};

document.getElementById('childrenDecrease').onclick = () => {
    if (options.children > 0) {
        options.children--;
        updateUserInfo();
    }
};

document.getElementById('roomIncrease').onclick = () => {
    options.room++;
    updateUserInfo();
};

document.getElementById('roomDecrease').onclick = () => {
    if (options.room > 1) {
        options.room--;
        updateUserInfo();
    }
};

updateUserInfo(); // Initialize user info display

// Function to handle search and navigate to hotel_list.html
const handleSearch = () => {
    const destination = document.querySelector(".headerSearchInput").value;
    const dateRange = document.getElementById('datePicker').value; // Get date range
    const adults = options.adult;
    const children = options.children;
    const rooms = options.room;

    // Redirect to list.html with query parameters
    window.location.href = `hotel_list.html?destination=${encodeURIComponent(destination)}&dateRange=${encodeURIComponent(dateRange)}&adults=${adults}&children=${children}&rooms=${rooms}`;
};

