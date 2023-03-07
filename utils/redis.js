from redis import 'redis';
from { promisify } import 'utils';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(err);
    });
  }

  async get(key) {
    const asyncGet = promisify(this.client.get).bind(this.client);
    const data = await asyncGet(key);
    return data;
  }

  async set(key, value, duration) {
    const asyncSet = promisify(this.client.setex).bind(this.client);
    await asyncSet(key, duration, value);
  }

  async del(key) {
    const asyncDel = promisify(this.client.del).bind(this.client);
    await asyncDel(key);
  }
}
