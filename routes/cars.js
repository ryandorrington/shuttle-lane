const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { carSchema } = require('../schemas.js');
const {isLoggedIn} = require('../middleware')

const ExpressError = require('../utils/ExpressError');
const Car = require('../models/car');

const validateCar = (req, res, next) => {
    const { error } = carSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const cars = await Car.find({});
    res.render('cars/index', { cars })
}));

router.get('/new', isLoggedIn, (req, res) => {
    
    res.render('cars/new');

})


router.post('/', isLoggedIn, validateCar, catchAsync(async (req, res, next) => {
    // if (!req.body.car) throw new ExpressError('Invalid Car Data', 400);
    const car = new Car(req.body.car);
    await car.save();
    req.flash('success', 'Successfully made a new car!');
    res.redirect(`/cars/${car._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        req.flash('error', 'Cannot find that car!');
        return res.redirect('/cars');
    }
    res.render('cars/show', { car });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const car = await Car.findById(req.params.id)
    if (!car) {
        req.flash('error', 'Cannot find that car!');
        return res.redirect('/cars');
    }
    res.render('cars/edit', { car });
}))

router.put('/:id', isLoggedIn, validateCar, catchAsync(async (req, res) => {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, { ...req.body.car });
    req.flash('success', 'Successfully updated car!');
    res.redirect(`/cars/${car._id}`)
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted car')
    res.redirect('/cars');
}));

module.exports = router;