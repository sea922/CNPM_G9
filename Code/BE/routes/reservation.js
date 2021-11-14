var express = require("express");
const {
  Find_showtime_for_booking,
  Find_cinema,
  Find_reservations_for_booking,
  Create_reservation,

  Change_status_reservation,
  Checkin_reservation,
  Delete_reservation,
  Get_my_reservations,
  Get_all_reservation_checkin,
} = require("../controllers/reservationController/reservationController");
const auth = require("../middlewares/auth");
var router = express.Router();

router.post("/find-showtime", Find_showtime_for_booking);
router.get("/find-cinema/:id", Find_cinema);
router.post("/find-reservations", Find_reservations_for_booking);
router.post("/create", Create_reservation);

router.post("/me", auth.simple, Get_my_reservations);
router.get("/checkin/:checkin", Get_all_reservation_checkin);
router.put("/change-status/:reservationId", Change_status_reservation);
router.put("/checkin-reservation/:reservationId", Checkin_reservation);
router.delete("/delete/:reservationId", Delete_reservation);

module.exports = router;
