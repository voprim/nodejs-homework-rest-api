const { Schema, model, SchemaTypes } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "This fill is required, please fill it"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "This fill is required, please fill it"],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "This fill is required, please fill it"],
      unique: true,
      minlength: 10,
      maxlength: 13,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
