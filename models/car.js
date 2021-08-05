const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    bodyType: String,
    model: String,
    make: String,
    year: Number,
    fuel: String,
    seats: Number,
    odometer: Number,
    image: String,
    saleType: {
        type: String,
        enum : ['flexiRental','driveToOwn'],
    }

})

module.exports = mongoose.model('Car', CarSchema);