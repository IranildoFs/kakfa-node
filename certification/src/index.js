import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "certification",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({
    topic: "topic-certification",
    fromBeginning: true,
  });

  await consumer.subscribe({
    topic: "topic-pdf",
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
}

run().catch(console.error);
