const redis = require("redis");
const { promisify } = require('util');

/**
 * @summary Instantiate new Redis Client.
 * @description Instantiates Redis Client on internal host/port with admin credentials.
 *     Promisifies all heretofore utilized Redis Client methods and exports their newly-bound
 *     asynchronous counterparts.
 */

// instantiate client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

// async/await bindings
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

module.exports = {
    redisClient,
    getAsync,
    setAsync,
    delAsync
}