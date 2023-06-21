import sharp from "sharp";

class ImageEditor {
    imagePath: string;
    image: sharp.Sharp;
    constructor(imagePath: string) {
        this.imagePath = imagePath;
        this.image = sharp(imagePath);
    }

    resize(width: number, height: number) {
        this.image.resize(width, height);
    }

    rotate(degrees: number) {
        this.image.rotate(degrees);
    }

    grayscale() {
        this.image.grayscale();
    }

    flip() {
        this.image.flip();
    }

    flop() {
        this.image.flop();
    }

    sharpen(sigma: number) {
        this.image.sharpen({ sigma });
    }

    blur(sigma: number) {
        this.image.blur(sigma);
    }

    brightness(brightness: number) {
        this.image.modulate({ brightness: brightness });
    }

    invert() {
        this.image.negate();
    }

    async save(outputPath: string) {
        await this.image.toFile(outputPath);
    }
}

export default ImageEditor;