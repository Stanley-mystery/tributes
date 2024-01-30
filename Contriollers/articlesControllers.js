const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
// const User = require('../Models/usersmodel')



exports.getAllArticles = asyncErrorHandler( async (req, res, next) => {
res.render('articles/tributePage')

})
// exports.getTributePage = asyncErrorHandler( async (req, res, next) => {
//   res.render('articles/tributePage')
// })