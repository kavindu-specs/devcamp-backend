const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const courseController = require("../controllers/courses")


router.route('/').get(courseController.getCourses)
                


module.exports = router;