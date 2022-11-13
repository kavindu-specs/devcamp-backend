const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const bootcampController = require("../controllers/bootcamps")
const {protectRoute,authorize} = require("../middlewares/auth")

router.route('/').get(bootcampController.getCamps)
                 .post(protectRoute,authorize('publisher','admin'),bootcampController.createCamp)

router.route('/:id').get(bootcampController.getCamp)
                    .put(protectRoute,authorize('publisher','admin'),bootcampController.updateCamp)
                    .delete(protectRoute,authorize('publisher','admin'),bootcampController.deleteCamp)

router.route('/radius/:zipcode/:distance').get(bootcampController.getBootcampsInRadius);
module.exports = router;