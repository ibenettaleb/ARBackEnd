let kafka = require('kafka-node');
let HighLevelConsumer = kafka.HighLevelConsumer;
let Client = kafka.Client;
let client = new Client('localhost:2181');
let options = { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

export const pullData = (req, res) => {
    let consumer = new HighLevelConsumer(client, [{ topic: req.body.topic, offset: req.body.offset }], options);
    consumer.on('message', (err, message) => {
        if (err) {
            res.send(err)
        }
        res.json(message)
    });
    consumer.on('final-message-received', function () {
        consumer.close(function () {
           console.log('close consumer')
        });
    });
};
