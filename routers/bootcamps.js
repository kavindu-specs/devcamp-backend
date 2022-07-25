const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const bootcampController = require("../controllers/bootcamps")


router.route('/').get(bootcampController.getCamps)
                 .post(bootcampController.createCamp)

router.route('/:id').get(bootcampController.getCamp)
                    .put(bootcampController.updateCamp)
                    .delete(bootcampController.deleteCamp)


module.exports = router;