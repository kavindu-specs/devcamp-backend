const express = require("express")

const router = express.Router()

const bootcampController = require("../controllers/bootcamps")


router.get('/',bootcampController.getCamps)

router.get('/:id',bootcampController.getCamp)

router.post('/',bootcampController.createCamp)

router.put('/:id',bootcampController.updateCamp)
router.delete('/:id',bootcampController.deleteCamp)

module.exports = router;