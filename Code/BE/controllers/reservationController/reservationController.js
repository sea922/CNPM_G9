const Cinema = require("../../models/cinemas");
const Showtime = require("../../models/showtime");
const Reservation = require("../../models/reservation");
const mongoose = require("mongoose");
exports.Find_cinema = async (req, res, next) => {
  const id_movie = req.params.id;
  try {
    const result = await Cinema.aggregate([
      {
        $lookup: {
          from: "showtimes",
          localField: "_id",
          foreignField: "cinemaId",
          as: "showtimes",
        },
      },
      {
        $match: {
          showtimes: {
            $elemMatch: {
              movieId: mongoose.Types.ObjectId(id_movie),
            },
          },
        },
      },
      // {
      //   $unwind: "$showtimes",
      // },
      // {
      //   $match: {
      //     "showtimes.movieId": mongoose.Types.ObjectId("5fa5b9a69151032dab0aa01b"),
      //   },
      // },
    ]).exec();
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error 5000");
  }
};
exports.Find_showtime_for_booking = async (req, res, next) => {
  const conditions = req.body;
  const ObjectFind = {
    cinemaId: conditions.cinemaId,
    movieId: conditions.movieId,
    startDate: { $lte: conditions.selectedDate }, // startDate <= dieu kien client
    endDate: { $gte: conditions.selectedDate }, // endDate >= dieu kien client
  };
  console.log(ObjectFind);
  try {
    const showtime = await Showtime.find(ObjectFind)
      .populate("movieId")
      .populate("cinemaId")
      .exec();
    return res.send(showtime);
  } catch (error) {
    return res.status(400).send("ERROR 500");
  }
};
exports.Find_reservations_for_booking = async (req, res) => {
  const conditions = req.body;
  const ObjectFind = {
    cinemaId: conditions.cinemaId,
    movieId: conditions.movieId,
    date: conditions.date,
    startAt: conditions.startAt,
    checkin: false,
  };
  console.log(ObjectFind);
  try {
    const reservations = await Reservation.find(ObjectFind);
    return res.send(reservations);
  } catch (error) {
    return res.status(500).send("error 500");
  }
};
exports.Create_reservation = async (req, res) => {
  const data = req.body;
  try {
    const reservation = new Reservation(data);
    const result = await reservation.save();
    const finalResult = await Reservation.findById(result._id)
      .populate("userId")
      .populate("cinemaId")
      .populate("movieId")
      .exec();
    return res.send(finalResult);
  } catch (error) {
    return res.status(500).send("error 500");
  }
};

exports.Get_my_reservations = async (req, res) => {
  const id = req.body.userId;
  try {
    const reservations = await Reservation.find({ userId: id })
      .sort({ date: -1 })
      .populate("movieId")
      .populate("cinemaId")
      .populate("userId")
      .exec();
    return res.send(reservations);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error 500");
  }
};
exports.Get_all_reservation_checkin = async (req, res) => {
  const checkin = req.params.checkin;
  try {
    const reservations = await Reservation.find({
      checkin: checkin,
    })
      .populate("movieId")
      .populate("cinemaId")
      .populate("userId")
      .sort({ date: -1 })
      .exec();
    return res.send(reservations);
  } catch (error) {
    return res.status(500).send("error 500");
  }
};
exports.Change_status_reservation = async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    const reservation = await Reservation.findById(reservationId);
    reservation.status = "paid";
    const result = await reservation.save();
    return res.send(result);
  } catch (error) {
    return res.status(500).send("error 500");
  }
};
exports.Checkin_reservation = async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    const reservation = await Reservation.findById(reservationId);
    reservation.checkin = !reservation.checkin;
    const result = await reservation.save();
    return res.send(result);
  } catch (error) {
    return res.status(500).send("error 500");
  }
};
exports.Delete_reservation = async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    const result = await Reservation.findOneAndDelete({
      _id: reservationId,
    }).exec();
    return res.send(result);
  } catch (error) {
    return res.status(500).send("error 500");
  }
};
