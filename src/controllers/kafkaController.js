import kafka from 'kafka-node';

const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.Client;
const client = new Client('localhost:2181');

const producer = new HighLevelProducer(client);

producer.on('ready', function () {
   console.log('Producer is ready');
});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
});

export const pushData = (req, res) => {
    let sentMessage = JSON.stringify(req.body.message);
    const payloads = [
        {
            topic: req.body.topic,
            messages: req.body.message,
            key: req.body.key,
            timestamp: Date.now(),
            partition: 0
        }
    ];
    producer.send(payloads, function (err, data) {
        res.json(data)
    })
};
