const Joi = require('@hapi/joi');

//joi validation for registration of a user
const registerValidation = data =>{
    const schema = {
        nid: Joi.number()
                .min(6)
                .required(),
        fortunes_business_id: Joi.string()
                .min(6)
                .required(),
        password: Joi.string()
                .min(8)
                .required()
    };
    return Joi.validate(data,schema);
};

//joi validation for sign in
const loginValidation = data =>{
        const schema = {
            email: Joi.string()
                .min(6)
                .required()
                .email(),
            password: Joi.string()
                .min(8)
                .required()
        };
        return Joi.validate(data,schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;