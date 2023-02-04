import { Redis } from 'ioredis'

const url = process.env['REDIS_CONNECTION_URL']
if (!url) throw new Error('Redis URL not set')
const redisClient = new Redis(url);

export default redisClient;
