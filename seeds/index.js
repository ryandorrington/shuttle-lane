const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const Car = require('../models/car')

mongoose.connect('mongodb://localhost:27017/carpalar', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console,'Connection Error:'));
db.once('open', () => {
    console.log('Database Connected')
})

const seedDB = async () => {
    await Car.deleteMany({})
    await Car.insertMany([
        {make: 'toyota', model:'camry', year: 2013, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'sedan', odometer: 86534},
        {make: 'toyota', model:'corolla', year: 2008, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'sedan', odometer: 186534},
        {make: 'honda', model:'accord', year: 2013, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'sedan', odometer: 89534},
        {make: 'honda', model:'civic', year: 2015, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'sedan', odometer: 66534},
        {make: 'hyundai', model:'getz', year: 2007, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'hatchback', odometer: 156534},
        {make: 'hyundai', model:'i30', year: 2018, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'hatchback', odometer: 20534},
        {make: 'ford', model:'focus', year: 2013, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'hatchback', odometer: 82534},
        {make: 'nissan', model:'ultima', year: 2013, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'sedan', odometer: 83534},
        {make: 'volkswagon', model:'golf', year: 2005, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'hatchback', odometer: 220534},
        {make: 'mazda', model:'cx-5', year: 2013, image: 'https://source.unsplash.com/collection/1158549', bodyType: 'suv', odometer: 64534},
    ])

}

seedDB()