'use strict';

const { sub, pub } = require('./_mq');
const { clear, cache } = require('./_cache');
const redis = require('./_redis');
let _client = null;

function init(conf) {
    _client = new redis(conf);
}

module.exports = exports = {
    init: (conf) => {
        init(conf)
    },
    client: () => {
        return _client;
    },
    mq: {
        sub: (topic, callback) => {
            sub(topic, callback)
        },
        pub: (topic, ...events) => {
            pub(topic, ...events)
        }
    },
    cache: {
        clear: (key) => {
            clear(key)
        },
        cache: (key, expires_in, handle) => {
            cache(key, expires_in, handle)
        }
    },
}