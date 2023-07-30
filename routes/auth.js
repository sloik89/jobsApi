const express = require("express");
const router = express.Router();
const { login, register, updateUser } = require("../controllers/auth");
const authenticationMiddleware = require("../middleware/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/updateUser").patch(authenticationMiddleware, updateUser);
module.exports = router;
