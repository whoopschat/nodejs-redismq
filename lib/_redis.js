const redis = require('redis');

class Redis {

    constructor(opts) {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.client = redis.createClient(opts);
        this.client.on("connect", () => {
            this.resolve && this.resolve();
            console.log("redistool ready: ", JSON.stringify(opts));
        });
        this.client.on("error", (err) => {
            this.reject && this.reject(err);
            console.error("redistool error", err);
        });
    }

    ready() {
        return this.promise;
    }

    lrange(key, start, stop) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.lrange(key, start, stop, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    lpush(key, ...value) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.lpush(`${key}`, ...value, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    rpop(key) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.rpop(`${key}`, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    expire(key, expire) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.expire(`${key}`, expire, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.get(`${key}`, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    set(key, value) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.set(`${key}`, value, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    del(key) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.del(`${key}`, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }


    hset(key, field, value) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.hset(key, field, value, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    hget(key, field) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.hget(key, field, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    hexists(key, field) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.hexists(key, field, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    hgetall(key) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.hgetall(key, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

    hdel(key, field) {
        return new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.hdel(key, field, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reply);
                    }
                });
            } else {
                reject("redis connect fail");
            }
        });
    }

}


module.exports = Redis;