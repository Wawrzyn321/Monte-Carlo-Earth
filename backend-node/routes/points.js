const express = require('express');
const pointService = require('./../services/pointService');
const router = express.Router();

router.get('/', async function (req, res) {
    try {
        const summary = await pointService.getSummary();
        res.send(summary);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/', async function (req, res) {
    try {
        const newPoint = await pointService.addPoint();
        res.send(newPoint);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router
