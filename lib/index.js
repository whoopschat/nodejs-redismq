'use strict';

const mq = require('./_mq');
const cache = require('./_cache');
const redis = require('./_redis');

let _redis = null;

function init(conf) {
    _redis = new redis(conf);
}

function getClient() {
    return _redis;
}

module.exports = exports = {
    init,
    mq,
    cache,
    getClient,
}