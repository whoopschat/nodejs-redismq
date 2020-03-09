'use strict';

const { sub, pub } = require('./_mq');
const { clear, cache } = require('./_cache');
const redis = require('./_redis');

let _redis = null;

function init(conf) {
    _redis = new redis(conf);
}

function client() {
    return _redis;
}

module.exports = exports = {
    init,
    client,
    mq: {
        sub,
        pub
    },
    cache: {
        clear,
        cache
    },
}