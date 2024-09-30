document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    fetch('/search?destination=' + destination + '&date=' + date)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.length === 0) {
                resultsDiv.innerHTML = '<p>No results found.</p>';
                return;
            }

            data.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${item.name}</h3><p>Price: $${item.price}</p><button onclick="book('${item.id}')">Book Now</button>`;
                resultsDiv.appendChild(div);
            });
        });
});

function book(id) {
    fetch('/book/' + id, { method: 'POST' })
        .then(response => response.json())
        .then(data => alert(data.message));
}
