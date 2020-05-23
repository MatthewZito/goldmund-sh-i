const redis = require("redis");
const { promisify } = require('util');
const redisClient = redis.createClient(process.env.REDIS_URI);
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

module.exports = {
    redisClient,
    getAsync,
    setAsync
}


