var express = require("express");
const {
  Create_promotion,
  Get_all_promotion,
  Delete_promotion_by_id,
  Upload_promotion_photo,
  Search_full_text_promotion,
  Find_promotion,
} = require("../controllers/promotionController/promotionController");
const auth = require("../middlewares/auth");
const uploadCloud = require("../middlewares/cloudinary");
const upload = require("../middlewares/multer");
var router = express.Router();

router.post("/", auth.enhance, Create_promotion);
router.post(
  "/photo/:id",
  uploadCloud("promotions").single("file"),
  Upload_promotion_photo
);
router.get("/", Get_all_promotion);
router.delete("/:id", auth.enhance, Delete_promotion_by_id);
router.get("/search-full/:q", Search_full_text_promotion);
router.post("/find-promotion", Find_promotion);

module.exports = router;
