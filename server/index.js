const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const webApp = express();

const { API_PORT } = process.env;
const PORT = API_PORT || 5000;

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use(cors({ origin: true }));
webApp.use((req, res, next) => {
    console.log(`Path ${req.path} with Method ${req.method}`);
    next();
});

const homeRoute = require('./routes/homeRoute');
const machineRoute = require('./routes/machineRoute');
const tagRoute = require('./routes/tagsRoute');
const clientRoute = require('./routes/clientRoute');
const endUserRoute = require('./routes/endUserRoute');
const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');

webApp.use('/', homeRoute.router);
webApp.use('/machine', machineRoute.router);
webApp.use('/tag', tagRoute.router);
webApp.use('/client', clientRoute.router);
webApp.use('/endUser', endUserRoute.router);
webApp.use('/user', userRoute.router);
webApp.use('/login', loginRoute.router);

const { MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL)
    .then(() => {
        webApp.listen(PORT, () => {
            console.log(`Mongodb connected and Server is running at ${PORT}.`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error.',err);
    });
    