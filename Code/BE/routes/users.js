var express = require("express");
const {
  Create_a_user,
  Login,
  Upload_user_photo,
  Logout,
  Delete_user_by_admin,
  Update_user_by_admin,
  Get_user_by_id_for_admin,
  Get_infor_me,
  Get_all_users_by_admin,
  Login_with_fb,
} = require("../controllers/userController/userController");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const uploadCloud = require("../middlewares/cloudinary");
var router = express.Router();

//Register
router.post("/", Create_a_user);
//upload photo follow id user
router.post("/photo/:id", uploadCloud("users").single("file"), Upload_user_photo);
//login
router.post("/login", Login);

//login with fb
router.post("/login/facebook", Login_with_fb);

//logout
router.post("/logout", auth.simple, Logout);
//get infor me
router.get("/me", auth.simple, Get_infor_me);
//Get all user by admin
router.get("/", auth.enhance, Get_all_users_by_admin);

// delete user by admin
router.delete("/:id", auth.enhance, Delete_user_by_admin);
//update user by admin
router.patch("/:id", auth.enhance, Update_user_by_admin);
//get user by admin follow id
router.get("/:id", auth.enhance, Get_user_by_id_for_admin);

module.exports = router;
