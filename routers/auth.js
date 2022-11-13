const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const  authController = require("../controllers/auth")
const {protectRoute} = require("../middlewares/auth")

router.route('/register').post(authController.register);
router.route('/login').post(authController.login)
router.route('/me').get(protectRoute,authController.getMe)
module.exports = router;
