'use strict';

const { sub, pub } = require('./_mq');
const { clear, cache } = require('./_cache');
const redis = require('./_redis');

let _client = null;

module.exports = {
    init: (conf) => {
        _client = new redis(conf);
    },
    client() {
        return _client;
    },
    mq: {
        sub: (topic, callback, schedule) => {
            if (!_client) {
                return Promise.reject("redistool not init");
            }
            return _client.ready().then(() => {
                return sub(_client, topic, callback, schedule)
            })
        },
        pub: (topic, ...events) => {
            if (!_client) {
                return Promise.reject("redistool not init");
            }
            return _client.ready().then(() => {
                return pub(_client, topic, ...events)
            });
        }
    },
    cache: {
        clear: (key) => {
            if (!_client) {
                return Promise.reject("redistool not init");
            }
            return _client.ready().then(() => {
                return clear(_client, key)
            });
        },
        cache: (key, expires_in, handle) => {
            if (!_client) {
                return Promise.reject("redistool not init");
            }
            return _client.ready().then(() => {
                return cache(_client, key, expires_in, handle)
            });
        }
    },
}