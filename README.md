# nodejs-redistool
> modejs redis tool

## Install
```
> npm install nodejs-redistool --save-dev
```

## Usage

### app.js
```js
// app.js
const { init, mq } = require('nodejs-redistool');
const topic = "mq:key";
// config redis mq
init({
    host: "127.0.0.1",
    password: "pass",
    port: 6379,
    db: 2
});
// sub message
mq.sub(topic, (msg) => {
    // handle msg
}, "*/2 * * * * *");
// pub message
mq.pub(topic, ...msgs);
```