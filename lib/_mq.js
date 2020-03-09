const { getClient } = require('./index');
const { toAny } = require('jsutil-toany');
const schedule = require('node-schedule');

function sub(topic, callback) {
    let loopRuning = false;
    function _loop() {
        let redis = getClient();
        if (!redis) {
            return;
        }
        if (loopRuning) {
            return;
        }
        loopRuning = true;
        return redis.rpop(`redistool_mq_${topic}`).then(res => {
            loopRuning = false;
            if (res) {
                callback && callback(toAny(res));
                return "go next";
            }
            throw "msg empty";
        }).then(() => {
            _loop();
        }).catch(() => {
            // nothing
        });
    }
    // schedule job check mq
    schedule.scheduleJob("*/2 * * * * *", function () {
        _loop();
    });
}

function pub(topic, ...events) {
    let redis = getClient();
    if (!redis) {
        return;
    }
    redis.lpush(`redistool_mq_${topic}`, ...events.map((event) => {
        return toAny(event, '')
    }));
}

module.exports = exports = {
    sub,
    pub
}