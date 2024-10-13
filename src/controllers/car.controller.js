// backend/src/controllers/car.controller.js
const Car = require('../models/car.model');

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('category');
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new car
exports.createCar = async (req, res) => {
  const { make, model, color, registrationNo, category } = req.body;

  try {
    const car = new Car({ make, model, color, registrationNo, category });
    await car.save();
    await car.populate('category');
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const { make, model, color, registrationNo, category } = req.body;

  try {
    const car = await Car.findByIdAndUpdate(
      id,
      { make, model, color, registrationNo, category },
      { new: true }
    );
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
