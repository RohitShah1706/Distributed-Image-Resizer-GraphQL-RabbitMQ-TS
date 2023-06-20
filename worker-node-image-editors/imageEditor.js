const sharp = require("sharp");

class ImageEditor {
    constructor(imagePath) {
        this.imagePath = imagePath;
        this.image = sharp(imagePath);
    }

    resize(width, height) {
        this.image.resize(width, height);
    }

    crop(left, top, width, height) {
        this.image.crop(left, top, width, height);
    }

    rotate(degrees) {
        this.image.rotate(degrees);
    }

    grayscale() {
        this.image.grayscale();
    }

    flip(direction) {
        if (direction === "horizontal") {
            this.image.flip(true, false);
        } else if (direction === "vertical") {
            this.image.flip(false, true);
        }
    }

    flop() {
        this.image.flop();
    }

    sharpen(sigma) {
        this.image.sharpen(sigma);
    }

    blur(sigma) {
        this.image.blur(sigma);
    }

    brightness(brightness) {
        this.image.modulate({ brightness: brightness });
    }

    contrast(level) {
        this.image.modulate({ contrast: level });
    }

    invert() {
        this.image.negate();
    }

    async save(outputPath) {
        await this.image.toFile(outputPath);
    }
}

module.exports = ImageEditor;