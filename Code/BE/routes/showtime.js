var express = require("express");
const {
  Create_a_showtime,
  Get_all_showtimes,
  Update_showtime_by_id,
  Get_showtime_by_id,
  Delete_showtime_by_id,
  Find_showtime_for_booking,
} = require("../controllers/showtimeController/showtimeController");
const auth = require("../middlewares/auth");
var router = express.Router();

/* GET all showtimes. */
router.get("/", Get_all_showtimes);
router.post("/", auth.enhance, Create_a_showtime);
// update show time by id
router.patch("/:id", auth.enhance, Update_showtime_by_id);
// get show time by id
router.get("/:id", auth.enhance, Get_showtime_by_id);

//delete showo time bby id
router.delete("/:id", auth.enhance, Delete_showtime_by_id);
//find show time for booking


module.exports = router;
