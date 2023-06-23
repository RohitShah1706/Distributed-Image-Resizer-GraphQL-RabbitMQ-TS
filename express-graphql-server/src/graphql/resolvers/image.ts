import { IContext, IImageTask } from "../../types"
import { checkAuthCookie } from "../../utils/checkAuth";
import { getChannel } from "../../connection/connectRabbitMQ"
import { getAllFilesAfterUserKey } from "../../utils/S3FileHandler"
import {
    RABBITMQ_MAIN_QUEUE
} from "../../config"

const imageResolver = {
    Query: {
        async getUserImages(
            _: any,
            args: any,
            { req }: IContext
        ) {
            const user = checkAuthCookie({ req });
            const _id = user._id;
            const files = await getAllFilesAfterUserKey(_id);
            return files;
        }
    },
    Mutation: {
        async editImages(
            _: any,
            { editImagesInput: { keys, operations } }: { editImagesInput: { keys: string[], operations: string[] } },
            { req }: IContext
        ) {
            const user = checkAuthCookie({ req });
            const userId = user._id;
            var imageTasks: IImageTask[] = [];
            for (let i = 0; i < keys.length; i++) {
                imageTasks.push({ userId: userId, key: keys[i], operations: operations });
            }
            // ! create replyToQueue in case the user is not logged in & worker needs to send a response
            await getChannel().assertQueue(userId, {
                durable: true, // durable - RabbitMQ will never lose the queue if a crash occurs
                autoDelete: true // autoDelete - queue is deleted when consumer disconnects
            })
            // ! pass the multiple requests to the rabbitmq queue - to be processed by the worker nodes
            imageTasks.forEach((imageTask) => {
                getChannel().sendToQueue(RABBITMQ_MAIN_QUEUE, Buffer.from(JSON.stringify(imageTask)), {
                    persistent: true, // persistent - msg will survive broker restarts
                    replyTo: userId // replyTo - queue name to send the response back to
                })
            })
            return {
                message: "Images are being processed"
            };
        }
    }
}

export default imageResolver;