const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    phone: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Phone is invalid");
        }
      },
    },
    image: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { autoIndex: true }
);

contactSchema.index({ "$**": "text" });
const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
