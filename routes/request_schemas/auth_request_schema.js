var Joi = require("joi");
const validate = require("../../config/messages")

const email = Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
  'string.base': `Email should be a type of 'text'`,
  'string.empty': `Email ${validate.messages.validation_errors.field_empty}.`,
  'any.required': `Email ${validate.messages.validation_errors.field_required}.`,
  "string.pattern.base": "Emial must be a valid email."
});

const password = Joi.string().min(8).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/).required().messages({
  'string.base': `Password ${validate.messages.validation_errors.field_empty}.`,
  'string.empty': `Password ${validate.messages.validation_errors.field_required}.`,
  "string.min": `Password ${validate.messages.validation_errors.string_min} 8.`,
  "string.pattern.base": "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"

});

const confirmPassword = Joi.any().valid(Joi.ref('password')).required().messages({ 'any.only': 'Confirm password does not match' })


const name = Joi.string().min(4).max(256).required().messages({
  'string.base': `Name ${validate.messages.validation_errors.field_required}.`,
  'string.empty': `Name ${validate.messages.validation_errors.field_empty}.`,
  "string.min": `Name ${validate.messages.validation_errors.string_min} 4.`,
  "string.max": `Name should have a maximum length of 256`,
  "any.required": `Name is a required field`
});

const mobileNo = Joi.string().trim().regex(/^[6-9]\d{9}$/).required().messages({
  'string.base': `Mobile no ${validate.messages.validation_errors.field_required}.`,
  'string.empty': `Mobile no ${validate.messages.validation_errors.field_empty}.`,
  "string.pattern.base": `Mobile no must be 10 digit number`,
  "any.required": `Mobile no is a required field`
});

exports.login = Joi.object()
  .keys({
    email,
    password,
  })
  .messages({
    "object.base": validate.messages.validation_errors.body,
    "any.required": validate.messages.validation_errors.body,
  });

exports.register = Joi.object().keys({
  name: name,
  email: email,
  mobile_no: mobileNo,
  password: password,
  confirm_password: confirmPassword
})
  .messages({
    "object.base": validate.messages.validation_errors.body,
    "any.required": validate.messages.validation_errors.body,
  });

  
  exports.headers = Joi.object().keys({
    authorization:Joi.string().required().messages({
      'string.base': `Token ${validate.messages.validation_errors.field_required}.`,
      'string.empty': `Token ${validate.messages.validation_errors.field_empty}.`,
    }),
    accept:Joi.string(),
    host:Joi.string(),
    connection:Joi.string(),
    "cache-control":Joi.string(),
    "postman-token":Joi.string(),
    "user-agent":Joi.string(),
    "accept-encoding":Joi.string()
  })
    .messages({
      "object.base": validate.messages.validation_errors.headers,
      "any.required": validate.messages.validation_errors.headers,
    });

