const express = require('express');
const usersController = require('../Contriollers/usersController');
const router = express.Router();








// login users
router.route('/login').get(usersController.loginPage);
router.route('/login').post(usersController.login);
// LOgout ROUTER
router.route('/').post(usersController.logout);
// create users
router.route('/signup').get(usersController.signup);
router.route('/signup').post(usersController.createUser);
// FORGOT PASSWORD
router.route('/forgotPass').get(usersController.GetForgotPass)
router.route('/forgotPass').post(usersController.forgotPass)






module.exports = router;