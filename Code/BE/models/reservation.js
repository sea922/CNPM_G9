const mongoose = require("mongoose");

const { Schema } = mongoose;
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  total: {
    type: Number,
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkin: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "pending",
  },
  paymentMethod: {
    type: String,
    default: "counter",
  },
});

reservationSchema.pre("save", function (next) {
  const reservation = this;
  if (reservation.paymentMethod != "counter") {
    reservation.status = "paid";
  }
  next();
});
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
