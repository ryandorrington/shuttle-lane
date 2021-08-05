const Joi = require('joi');

module.exports.carSchema = Joi.object({
    car: Joi.object({
        bodyType: Joi.string().required(),
        make: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.number().required().min(1900),
         seats: Joi.number()/*.required()*/.min(1),
        fuel: Joi.string()/*.required()*/,
        image: Joi.string().required(),
        odometer: Joi.number().required().min(0),
        saleType: Joi.string()/*.required()*/
    }).required()
});