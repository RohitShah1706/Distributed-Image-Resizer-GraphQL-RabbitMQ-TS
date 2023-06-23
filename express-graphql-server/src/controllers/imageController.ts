import Image from "../models/Image"

const saveImage = async(userId: string, key: string, name?: string) =>  {
    const image = new Image({
        userId,
        key,
        name: name || "",
    })
    await image.save();
}

export {
    saveImage,
}
