const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let listings = [
    { id: '1', name: 'Flight to Paris', price: 500 },
    { id: '2', name: 'Hotel in New York', price: 300 },
    { id: '3', name: 'Flight to Tokyo', price: 600 },
];

app.get('/search', (req, res) => {
    const { destination, date } = req.query;
    // Simulate search based on destination (ignoring date for simplicity)
    const results = listings.filter(item => item.name.toLowerCase().includes(destination.toLowerCase()));
    res.json(results);
});

app.post('/book/:id', (req, res) => {
    const id = req.params.id;
    const booking = listings.find(item => item.id === id);
    if (booking) {
        res.json({ message: `Booked: ${booking.name}` });
    } else {
        res.status(404).json({ message: 'Booking not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
