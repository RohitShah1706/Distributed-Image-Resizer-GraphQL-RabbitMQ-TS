import amqplib from "amqplib"

import {
    RABBITMQ_HOST,
    RABBITMQ_PASS,
    RABBITMQ_PORT,
    RABBITMQ_USER,
    RABBITMQ_MAIN_QUEUE,
    RABBITMQ_REPLY_QUEUE
} from '../config'

const connectionURI = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`
var channel:amqplib.Channel;

const connectToRabbitMQ = async () => {
    const connection = await amqplib.connect(connectionURI)
    channel = await connection.createChannel()
    await channel.assertQueue(RABBITMQ_MAIN_QUEUE, {
        // ! durable - queue will survive when broker restarts
        durable: true
    })
    await channel.assertQueue(RABBITMQ_REPLY_QUEUE, {
        durable: true
    })
}

const getChannel = () => {
    if(!channel) {
        throw new Error("Channel is not initialized")
    }
    return channel
}

export {
    connectToRabbitMQ,
    getChannel
}