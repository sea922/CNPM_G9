var express = require("express");
const {
  Create_contact,
  Get_all_contact,
  Upload_contact_photo,
} = require("../controllers/contactController/contactControler");
var router = express.Router();
var auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");
router.post("/", Create_contact);
router.post(
  "/photo/:id",
  upload("contact").single("file"),
  Upload_contact_photo
);
router.get("/", auth.enhance, Get_all_contact);

module.exports = router;
