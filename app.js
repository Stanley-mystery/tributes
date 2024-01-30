const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./Routes/usersRoute');
const articlesRouter = require('./Routes/articlesRoute')
const app = express();



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })) 
app.use(express.static('./public'));
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/logout', usersRouter);



app.all('*', (req, res, next) => {
 
    const err = new Error(`Cant find ${req.originalUrl} on the server`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
  });
  app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status =  error.status || 'error';
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message
    })
  })

module.exports = app;


