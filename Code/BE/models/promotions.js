const mongoose = require("mongoose");

const { Schema } = mongoose;
const promotionSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  imageurl: {
    type: String,
    require: true,
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    trim: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: "cinemas",
    required: true,
  },
});
promotionSchema.index({ "$**": "text" });
const Promotion = mongoose.model("promotions", promotionSchema);

module.exports = Promotion;
