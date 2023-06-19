import { Request } from "express"

import { getOrSetCache } from "../../db/connectRedis"
import { Context } from "../../interfaces";


const userResolver = {
    // ! args: (parent: res of prev resolver, args: passed to this resolver, context, info: info about execution state)
    // ! can use "_" for unused args
    // ! can also destructure args to get only what we need
    Mutation: {
        async getOrSetCache(
            _: any,
            { cacheCheck: { key, value } }: { cacheCheck: { key: string, value: string } },
            { req }: Context
        ) {
            const result = await getOrSetCache<string>(key, async() => {
                return value;
            });
            return result;
        }
    }
}

export default userResolver;