import sharp from "sharp"
import { v4 as uuidGen } from "uuid"

import ImageEditor from "./imageEditor"
import { getFileFromS3, uploadFileToS3 } from "../utils/S3FileHandler"
import { extractOperations, operationsMatcher } from "../utils/operationExtractorAndMatcher"
import { TaskMessageResponse } from "../interfaces"

const handleImageEditing = async (userId: string, key: string, operations:string[]): Promise<TaskMessageResponse>  => {
    // download image from S3
    const fullKey = `${userId}/${key}`
    const image = await getFileFromS3(fullKey)
    
    // get buffer from image
    const buffer = image.Body as Buffer
    const imageEditor = new ImageEditor(sharp(buffer))
    
    // extract the operations
    const operationsArr = extractOperations(operations)
    operationsMatcher(operationsArr, imageEditor)
    
    // save the image to S3
    const newKey = uuidGen()
    const newFullKey = `${userId}/${newKey}.png`

    // convert sharp object to buffer
    const newBuffer = await imageEditor.image.toBuffer()

    // upload buffer to S3
    await uploadFileToS3(newFullKey, newBuffer)

    // return new index of the image
    const response = {
        key: newFullKey,
        message: "Image processed successfully",
        status: "SUCCESS"
    }
    return response
}

export default handleImageEditing