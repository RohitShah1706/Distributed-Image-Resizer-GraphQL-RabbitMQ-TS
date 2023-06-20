import Redis from "redis"

import { 
    DEFAULT_EXPIRATION,
    REDIS_HOST,
    REDIS_PASSWORD,
    REDIS_PORT
} from "../config"

const redisClient = Redis.createClient({
    password: REDIS_PASSWORD,
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT)
})

/**
 * @dev This function will check if the data is in the cache \
 * If it is, it will return the data from the cache \
 * Else it will fetch the data from the API and store it in the cache
 * @param {String} key - The key to check in the cache 
 * @param {Function} cb - The callback function to fetch the data from the API
 * @returns {Promise} - A promise that resolves to the data from the cache or the API
 *
 */
const getOrSetCache = <T>(key: string, cb: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if(err) {
                reject(err)
            }
            if(data !== null) {
                console.log("Cache Hit");
                resolve(JSON.parse(data || ""))
            }else {
                console.log("Cache Miss");
                cb()
                .then((freshData: T) => {
                    redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
                    resolve(freshData)
                })
            }
        })
    })
}
// ! NOTE: below
/*
freshData: T is a generic type parameter. 
It means that the freshData variable is of type T, where T is a generic type that is defined when the getOrSetCache 
function is called.
For example, if getOrSetCache is called with getOrSetCache<string>("myKey", myCallback), then T will be inferred as 
string, and freshData will be of type string.

This allows the getOrSetCache function to be more flexible and reusable, as it can work with different types of data.
*/

export {
    redisClient,
    getOrSetCache
}