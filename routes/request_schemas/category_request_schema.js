const validate = require("../../config/messages");
var Joi = require("joi");

const categoryName = Joi.string()
  .regex(/^([a-zA-Z ])/)
  .min(4)
  .max(100)
  .required()
  .messages({
    "string.base": `Category name ${validate.messages.validation_errors.field_required}.`,
    "string.empty": `Category name ${validate.messages.validation_errors.field_empty}.`,
    "string.min": `Category name ${validate.messages.validation_errors.string_min} 4.`,
    "string.max": `Category name should have a maximum length of 256`,
    "any.required": `Category name is a required field`,
    "string.pattern.base": "Category name not contains numbers.",
  });

exports.category = Joi.object()
  .keys({
    category_name: categoryName,
  })
  .messages({
    "object.base": validate.messages.validation_errors.body,
    "any.required": validate.messages.validation_errors.body,
  });
