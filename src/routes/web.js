const express = require("express");
const {
  getHomepage,
  postUser,
  getCreatePage,
  getUpdatePage,
  updateUser,
  postDeleteUser,
  postHandleDeleteUser,
} = require("../controllers/homeController");
const router = express.Router();
router.get("/", getHomepage);

router.post("/create-user", postUser);
router.get("/create", getCreatePage);
router.get("/update/:id", getUpdatePage);
router.post("/edit/:id", updateUser);
router.get("/delete-user/:id", postDeleteUser);
router.post("/delete-user", postHandleDeleteUser);
module.exports = router;
