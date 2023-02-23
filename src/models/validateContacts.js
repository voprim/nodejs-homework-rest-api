const Joi = require("joi");

const bodySchemaCreate = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
});

const bodySchemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
});

const bodySchemaByFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  bodySchemaCreate,
  bodySchemaUpdate,
  bodySchemaByFavorite,
};
