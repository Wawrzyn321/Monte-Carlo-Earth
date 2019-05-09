const express = require('express')
const geocodingService = require('./../services/geocodingService');
const router = express.Router()


router.get('/', async function (req, res) {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    if (!lat || !lon) {
        console.warn('no lat or lon specified');
        res.send('none');
        return;
    }

    try {
        const location = await geocodingService.getLocation(lat, lon);
        //res.send({'location': location});
        res.setHeader('content-type', 'application/text; charset=utf-8');
        res.send({location});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router
