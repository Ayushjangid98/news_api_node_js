var Joi = require("joi");
const validate = require("../../config/messages");

const authorName = Joi.string()
  .min(4)
  .max(50)
  .required()
  .messages({
    "string.base": `Author name ${validate.messages.validation_errors.field_required}.`,
    "string.empty": `Author name ${validate.messages.validation_errors.field_empty}.`,
    "string.min": `Author name ${validate.messages.validation_errors.string_min} 4.`,
    "string.max": `Author name should have a maximum length of 256`,
    "any.required": `Author name is a required field`,
  });
const name = Joi.string()
  .min(4)
  .max(256)
  .required()
  .messages({
    "string.base": `Name ${validate.messages.validation_errors.field_required}.`,
    "string.empty": `Name ${validate.messages.validation_errors.field_empty}.`,
    "string.min": `Name ${validate.messages.validation_errors.string_min} 4.`,
    "string.max": `Name should have a maximum length of 256`,
    "any.required": `Name is a required field`,
  });

const mobileNo = Joi.string()
  .trim()
  .regex(/^[6-9]\d{9}$/)
  .required()
  .messages({
    "string.base": `Mobile no ${validate.messages.validation_errors.field_required}.`,
    "string.empty": `Mobile no ${validate.messages.validation_errors.field_empty}.`,
    "string.pattern.base": `Mobile no must be 10 digit number`,
    "any.required": `Mobile no is a required field`,
  });
const title = Joi.string()
  .min(4)
  .max(200)
  .required()
  .messages({
    "string.base": `Title ${validate.messages.validation_errors.field_required}.`,
    "string.empty": `Title ${validate.messages.validation_errors.field_empty}.`,
    "string.min": `Title ${validate.messages.validation_errors.string_min} 4.`,
    "string.max": `Title should have a maximum length of 256`,
    "any.required": `Title is a required field`,
  });
const description = Joi.string()
  .min(4)
  .max(450)
  .required()
  .messages({
    "string.base": `Description ${validate.messages.validation_errors.field_required}.`,
    "string.empty": `Description ${validate.messages.validation_errors.field_empty}.`,
    "string.min": `Description ${validate.messages.validation_errors.string_min} 4.`,
    "string.max": `Description should have a maximum length of 256`,
    "any.required": `Description is a required field`,
  });

const url = Joi.string()
  .uri()
  .required()
  .messages({
    "string.base": `Site url should be a type of 'text'`,
    "string.empty": `Site url ${validate.messages.validation_errors.field_empty}.`,
    "any.required": `Site url ${validate.messages.validation_errors.field_required}.`,
    "string.uri": `Site url must be a valid URL.`,
  });

const publishedAt = Joi.date()
  .iso()
  .max(Date.now())
  .required()
  .messages({
    "date.base": `Date should be a type of 'ISO Format'`,
    "date.empty": `Date ${validate.messages.validation_errors.field_empty}.`,
    "date.max": `Date must be equal or lessthen current date time.`,
    "date.format": `Date must be type of ISO format.`,
    "any.required": `Date ${validate.messages.validation_errors.field_required}.`,
  });

const content = Joi.string()
  .min(4)
  .max(550)
  .required()
  .messages({
    "string.base": `Content ${validate.messages.validation_errors.field_required}.`,
    "string.empty": `Content ${validate.messages.validation_errors.field_empty}.`,
    "string.min": `Content ${validate.messages.validation_errors.string_min} 4.`,
    "string.max": `Content should have a maximum length of 256`,
    "any.required": `Content is a required field`,
  });

const email = Joi.string()
  .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  .required()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .messages({
    "string.email": `Email should be a type of 'Email'`,
    "string.empty": `Email ${validate.messages.validation_errors.field_empty}.`,
    "any.required": `Email ${validate.messages.validation_errors.field_required}.`,
    "string.pattern.base": "Emial must be a valid email.",
  });
const objectId = Joi.string()
  .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  .required()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .messages({
    "string.email": `Email should be a type of 'Email'`,
    "string.empty": `Email ${validate.messages.validation_errors.field_empty}.`,
    "any.required": `Email ${validate.messages.validation_errors.field_required}.`,
    "string.pattern.base": "Emial must be a valid email.",
  });

exports.news = Joi.object()
  .keys({
    author: authorName,
    title: title,
    description: description,
    url: url,
    urlToImage: url,
    publishedAt: publishedAt,
    content: content,
    source: Joi.array()
      .items(
        Joi.object({
          name: name,
          email: email,
        })
      )
      .required()
      .min(1),
    category_ids: Joi.array()
      .items(Joi.string().hex().length(24))
      .required()
      .messages({
        "array.base": "Category id is requird.",
        "string.length": "Category id is must be valid id.",
      }),
  })
  .messages({
    "object.base": validate.messages.validation_errors.body,
    "any.required": validate.messages.validation_errors.body,
  });


exports.newsId = Joi.object().keys({
  id: Joi.string().length(24).required().messages({
    "string.email": `News id should be a type of 'id'`,
    "string.empty": `News id ${validate.messages.validation_errors.field_empty}.`,
    "string.length":`News id length must be 24char.`,
    "any.required": `News id ${validate.messages.validation_errors.field_required}.`,
    "string.pattern.base": "News id must be a valid id.",
  }),
});
