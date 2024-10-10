const inputField = document.getElementById("from");
const inputTo = document.getElementById("to");
const dropdown1 = document.querySelector(".dropdown1-content");
const dropdown2 = document.querySelector(".dropdown2-content");

// Show dropdown on focus
inputField.addEventListener("focus", function() {
    dropdown1.style.display = "block";
});

inputTo.addEventListener("focus", function() {
    dropdown2.style.display = "block";
});

// Hide dropdown on blur with a delay
inputField.addEventListener("blur", function() {
    setTimeout(function() {
        dropdown1.style.display = "none";
    }, 100);
});

inputTo.addEventListener("blur", function() {
    setTimeout(function() {
        dropdown2.style.display = "none";
    }, 100);
});

// Set value function
function setValue(value, field) {
    if (field === 'from') {
        inputField.value = value;
        dropdown1.style.display = "none"; // Hide dropdown1
    } else if (field === 'to') {
        inputTo.value = value;
        dropdown2.style.display = "none"; // Hide dropdown2
    }
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('#from') && !event.target.matches('.dropdown1-option')) {
        dropdown1.style.display = "none";
    }
    if (!event.target.matches('#to') && !event.target.matches('.dropdown2-option')) {
        dropdown2.style.display = "none";
    }
};
