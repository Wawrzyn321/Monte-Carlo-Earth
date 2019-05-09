const db = require('./services/repository');
const express = require('express');
const cors = require('cors');
const geocodingRoute = require('./routes/geocoding');
const pointsRoute = require('./routes/points');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


const server = express();
server.use(cors());
server.options('*', cors());
server.use(allowCrossDomain);
server.use('/api/geocoding', geocodingRoute);
server.use('/api/points', pointsRoute);

db.connect(
    () => server.listen(3000, () => console.log('server started @' + 3000)), 
    err => console.error(error)
);

