const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactShema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Contact = model("contact", contactShema);

const contactSchemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const favoriteSchemaJoi = Joi.object({
  favorite: Joi.boolean().required().error(new Error("missing field favorite")),
});

module.exports = {
  Contact,
  contactSchemaJoi,
  favoriteSchemaJoi,
};
