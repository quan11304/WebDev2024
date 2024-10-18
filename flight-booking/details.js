window.addEventListener('load', function () {
    // Get data from localStorage
    const from = localStorage.getItem('from');
    const to = localStorage.getItem('to');
    const departure = localStorage.getItem('departure');
    const returnDate = localStorage.getItem('returnDate');
    const passengers = localStorage.getItem('passengers');
    const flightClass = localStorage.getItem('flightClass');

    // Display the data in the order summary
    document.getElementById('summary-from').textContent = from || 'N/A';
    document.getElementById('summary-to').textContent = to || 'N/A';
    document.getElementById('summary-departure').textContent = departure || 'N/A';
    document.getElementById('summary-return').textContent = returnDate || 'N/A';
    document.getElementById('summary-passengers').textContent = passengers || 'N/A';
    document.getElementById('summary-class').textContent = flightClass || 'N/A';
});