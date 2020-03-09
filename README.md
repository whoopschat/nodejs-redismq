# nodejs-redismq
> modejs redis mq

## Install
```
> npm install nodejs-redismq --save-dev
```

## Usage

### app.js
```js
// app.js
const redismq = require('nodejs-redismq');
const channel = "mq:key";
// config redis mq
redismq.config(redis);
// sub message
redismq.sub(channel, (msg) => {
    // handle msg
});
// pub message
redismq.pub(channel, ...msgs);
```