const redis = require("redis");
const { promisify } = require('util');
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

module.exports = {
    redisClient,
    getAsync,
    setAsync
}