const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer({
    createPartitioner: () => {
        return (partitionsCount, key) => {
            return 0; // Sempre escolher a partição 0
        };
    },
});

const run = async () => {
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'TESTANDO O KAFKA' },
        ],
    });
    await producer.disconnect();
};

run().catch(console.error);
