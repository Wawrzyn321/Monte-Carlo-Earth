const apiKeys = require('./../config/api-keys');
const repository = require('./../services/repository');
const fetch = require('node-fetch');

function buildOnWaterRequestUrl(point) {
    const apiKey = apiKeys.onWaterApiKey;
    const lat = point.latitude;
    const lon = point.longitude;
    return `https://api.onwater.io/api/v1/results/${lat},${lon}?access_token=${apiKey}`;
}

function map(value, min, max)
{
    const range = max - min;
    return value * range + min;
}

async function getSummary() {
    const waterCount = await repository.getCollection().countDocuments({ isWater: true });
    const allCount = await repository.getCollection().countDocuments({});
    return {
        waterCount,
        allCount
    };
}

async function addPoint() {
    const latitude = map(Math.random(), -90, 90);
    const longitude = map(Math.random(), -180, 180);

    const point = {
        latitude,
        longitude
    };

    const url = buildOnWaterRequestUrl(point);
    const response = await fetch(url);
    const json = await response.json();
    if (json.error != null) {
        throw Error(json.error);
    }
    
    point.isWater = json.water;
    if (point.isWater === null) {
        point.isWater = await createIsWater();
    }

    await repository.getCollection().insertOne(point);

    return point;
}

async function createIsWater() {
    const { waterCount, allCount } = await getSummary();
    const ratio = waterCount / allCount;
    return ratio < 70.8;
}


module.exports = {
    getSummary,
    addPoint
};
