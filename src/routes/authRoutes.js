const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/login',authController.login)
router.get('/create-user',authController.createUser)
router.get('/list-users', authController.listUsers)
router.get('/delete',authController.deleteUser)
router.get('/edit',authController.updateUser)
router.post('/edit-user',authController.handleEditUser)
router.post('/login',authController.handleLogin)
router.post('/create-user',authController.handleCreateUser)

module.exports = router