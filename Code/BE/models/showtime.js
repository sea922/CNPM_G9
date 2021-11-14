const mongoose = require("mongoose");

const { Schema } = mongoose;
const showtimeSchema = new Schema({
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "movies",
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: "cinemas",
    required: true,
  },
});

const Showtime = mongoose.model("showtimes", showtimeSchema);

module.exports = Showtime;
