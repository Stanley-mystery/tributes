// const express = require('express')
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.DB_CONNECTION_STR).then((conn) => {
    console.log('DB has been connected')
}).catch((err) => {
    console.log('Db could not connect')
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server has started!')
})