var express = require("express");
const {
  Create_a_cinema,
  Upload_cinema_photo,
  Get_all_cinemas,
  Get_cinema_by_id,
  Update_cinema_by_id,
  Delete_cinema_by_id,
  Search_full_text,
  Find_cinema,
} = require("../controllers/cinemaController/cinemaController");
const auth = require("../middlewares/auth");
const uploadCloud = require("../middlewares/cloudinary");

var router = express.Router();
const upload = require("../middlewares/multer");
/* GET all cinemas. */
router.get("/", Get_all_cinemas);
// Create a cinema
router.post("/", auth.enhance, Create_a_cinema);
//Up load photo cinemas
router.post(
  "/photo/:id",
  uploadCloud("cinemas").single("file"),
  Upload_cinema_photo
);
//Get_cinema_by_id
router.get("/:id", auth.enhance, Get_cinema_by_id);
//Up date cinemas by id
router.patch("/:id", auth.enhance, Update_cinema_by_id);
//delete cinema by id
router.delete("/:id", auth.enhance, Delete_cinema_by_id);
//search full
router.get("/search-full/:q", Search_full_text);

module.exports = router;
