import ImageEditor from "./imageEditor"
import { TaskMessageResponse } from "../interfaces"

const handleImageEditing = async (key: string, operations:string[]): Promise<TaskMessageResponse>  => {
    // download image from S3
    // match the operations with the methods of ImageEditor 
    // call those methods
    // save the image to S3
    // return new index of the image
    const response = {
        message: "message",
        status: "status"
    }
    return response
}

export default handleImageEditing