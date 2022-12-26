const express = require('express')
const router = express.Router()
const inviationController = require('../controllers/inviationController')

router.get('/',inviationController.home)
router.get('/inviation',inviationController.inviation)

module.exports = router