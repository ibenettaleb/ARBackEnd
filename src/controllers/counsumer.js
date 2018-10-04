/**
 * Created by USER_29 on 4/5/2018.
 */
var kafka = require('kafka-node'),
    HighLevelConsumer = kafka.HighLevelConsumer,
    client = kafka.Client('10.13.25.6:2181'),
    options = { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 },
    consumer = new HighLevelConsumer(
        client, [{ topic: 'iotHub' }], options
    );

consumer.on('ready', function () {
    console.log('Ready !');
});

consumer.on('message', function (message) {
    console.log('> ', message);
});

consumer.on('error', function (err) {
    console.log(err)
});