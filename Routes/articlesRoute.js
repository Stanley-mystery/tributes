const express = require('express');
const articlesController = require('./../Contriollers/articlesControllers');
const usersController = require('../Contriollers/usersController');

const router = express.Router();


router.route('/').get(usersController.cookieJwtAuth,articlesController.getAllArticles)

// router.route('/tributePage').get(usersController.cookieJwtAuth, articlesController.getTributePage);

module.exports = router;