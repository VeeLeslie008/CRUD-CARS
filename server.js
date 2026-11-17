const express = require('express');
const app = express();
const PORT = 3000;

//Middleware to receive JSON data
app.use(express.json());

// Hardcoded car data

let cars = [
    {
        id: 1,
        name: 'Toyota Camry',
        location: 'Akwa Ibom',
        colour: 'Red'
    },
    {
        id: 2,
        name: 'Honda Civic',
        location: 'Lagos',
        colour: 'Blue'
    },
    {
        id: 3,
        name: 'Ford Mustang',
        location: 'Abuja',
        colour: 'Black'
    }
];

// Get all cars
app.get('/api/cars', (req, res) => {
    res.status(200).json(cars)
});

app.get('/api/car', (req, res) => {
    res.status(200).json({
        available: true,
        message: 'List of Cars',
        data: cars
    });
});

// Get a car by ID

app.get('/api/car/:id', (req, res) => {
    const carId = cars.find(c => c.id === parseInt(req.params.id));

    res.json(carId);
})

// Add a new car

app.post('/api/car', (req, res) => {
    const carId = req.body;
        cars.push(carId);
        res.json(carId);
});

// Update the colour of a car

app.put('/api/car/:id', (req, res) => {
    const carId = cars.find(c => c.id === parseInt(req.params.id));

    carId.colour = req.body.colour;
    res.json(carId);
});

// Update all the values in the Array

app.patch('/api/car/:id', (req, res) => {
    const carId = cars.find(c => c.id === Number(req.params.id));

    Object.assign(carId, req.body, { id: car.id });
    res.json(car);
});

// Delete a car

app.delete('/api/car/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const carIndex = cars.findIndex( c => c.id === carId);

    if (carIndex !== -1){
        cars.splice(carIndex, 1);
        res.status(200).json({
            success: true,
            message: `Car with ID ${carId} deleted successfully`,
            data: cars
        });
    } else{
        res.status(404).json({
            success: false,
            message: `Car with ID ${carId} not found`
        });
    }
})

//Start server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});