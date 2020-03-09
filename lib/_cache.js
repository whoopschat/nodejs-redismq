const { getClient } = require('./index');
const { toAny } = require('jsutil-toany');

function clear(key) {
    let redis = getClient();
    if (!redis) {
        return Promise.reject();
    }
    return redis.del(`redistool_cache_${key}`);
}

function cache(key, expires_in, handle) {
    let realKey = `redistool_cache_${key}`
    let redis = getClient();
    if (!redis) {
        return Promise.resolve();
    }
    return redis.get(realKey).then(res => {
        let _data = toAny(res, {});
        if (_data && _data.data && _data.time + expires_in * 1000 > Date.now()) {
            return _data.data;
        } else {
            throw res;
        }
    }).catch(() => {
        return new Promise((resolve) => {
            if (handle && typeof handle == 'function') {
                try {
                    handle((data) => {
                        if (data != null && data != undefined) {
                            redis.set(realKey, toAny({ time: Date.now(), data }, ''));
                            redis.expire(realKey, expires_in);
                            resolve(data);
                        } else {
                            resolve();
                        }
                    }, () => resolve());
                } catch (error) {
                    resolve();
                }
            } else {
                resolve();
            }
        });
    });
}

module.exports = exports = {
    clear,
    cache
}