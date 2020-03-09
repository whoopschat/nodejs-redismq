const redis = require('redis');

class Redis {

    constructor(opts) {
        this.promise = new Promise((ready) => {
            this._ready = ready;
        });
        this.client = redis.createClient(opts);
        this.client.on("connect", function () {
            this._ready && this._ready();
            console.log("redistool ready");
        });
        this.client.on("error", function (err) {
            console.error("redistool error", err);
        });
    }

    ready() {
        return this.promise;
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

}

module.exports = Redis;