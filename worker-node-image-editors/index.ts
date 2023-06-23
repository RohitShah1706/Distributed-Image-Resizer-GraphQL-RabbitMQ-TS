import amqplib from "amqplib"

import {
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_USER,
    RABBITMQ_PASS,
    RABBITMQ_MAIN_QUEUE,
    RABBITMQ_REPLY_QUEUE
} from "./config"
import { TaskMessage } from "./interfaces"
import handleImageEditing from "./ImageEditor"

const connectionURI = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`
var channel: amqplib.Channel

const connectRabbitMQ = async () => {
    const connection = await amqplib.connect(connectionURI)
    channel = await connection.createChannel()
    await channel.assertQueue(RABBITMQ_MAIN_QUEUE, {
        // ! durable - queue will survive when broker restarts
        durable: true
    })
    await channel.assertQueue(RABBITMQ_REPLY_QUEUE, {
        durable: true
    })
    // ! prefetch(n) = no of unacked 
    channel.prefetch(1)
}

const consumeTasks = async () => {
    channel.consume(RABBITMQ_MAIN_QUEUE, async(msg) => {
        if(msg) {
            const {userId, key, operations}: TaskMessage = JSON.parse(msg.content.toString())
            console.log(`[x] Received task: userId:${userId} and key: ${key} and operations: ${operations}`)
            
            // ! edit image
            const responseToClient = await handleImageEditing(userId, key, operations)
            const responseToServer = {
                userId: userId,
                key: responseToClient.key,
            }
            console.log(`[x] Task completed`)

            // ! send the response to replyQueue(express-server)
            channel.sendToQueue(RABBITMQ_REPLY_QUEUE, Buffer.from(JSON.stringify(responseToServer)), {
                persistent: true,
            })

            // ! send response to replyToQueue(client-react)
            const replyToQueue = msg.properties.replyTo
            channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(responseToClient)), {
                persistent: true
            })

            channel.ack(msg)
        } else {
            console.log("No message received")
        }
    }, {
        // ! noAck - automatically ack the msg when received
        noAck: false
    })
}

const run = async () => {
    await connectRabbitMQ();
    console.log("Connected to RabbitMQ");
    await consumeTasks();
}
run();