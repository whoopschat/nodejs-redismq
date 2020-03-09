const { toAny } = require('jsutil-toany');
const schedule = require('node-schedule');

let _redis = null;
let _schedule = null;

function config(redis, schedule) {
    _redis = redis;
    _schedule = schedule;
}

function sub(channel, callback) {
    let loopRuning = false;
    function _loop() {
        if (!_redis) {
            return;
        }
        if (loopRuning) {
            return;
        }
        loopRuning = true;
        return _redis.rpop(channel).then(res => {
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
    schedule.scheduleJob(_schedule || "*/2 * * * * *", function () {
        _loop();
    });
}

function pub(channel, ...events) {
    if (!_redis) {
        return;
    }
    _redis.lpush(channel, ...events.map((event) => {
        return toAny(event, '')
    }));
}

module.exports = exports = {
    config,
    sub,
    pub
}