var express = require("express");
const {
  Create_movie,
  Upload_movie_photo,
  Get_all_movie,
  Get_movie_by_id,
  Update_movie_by_id,
  Delete_movie_by_id,
  Full_text_search_movie,
  Get_suggest_movies,
} = require("../controllers/movieController/movieController");
var router = express.Router();
var auth = require("../middlewares/auth");
const uploadCloud = require("../middlewares/cloudinary");
const upload = require("../middlewares/multer");
/* create movie */
router.post("/", auth.enhance, Create_movie);
//upload image
router.post("/photo/:id", uploadCloud("movies").single("file"), Upload_movie_photo);
//Get all movie
router.get("/", Get_all_movie);
//Get movie by id
router.get("/:id", Get_movie_by_id);
//update movie by id
router.put("/:id", auth.enhance, Update_movie_by_id);
//delete movie by id
router.delete("/:id", auth.enhance, Delete_movie_by_id);
//full text-search-movie
router.get("/search-full/:q", Full_text_search_movie);

// Movies User modeling (Get Movies Suggestions)
router.get("/usermodeling/:username", Get_suggest_movies);

module.exports = router;
