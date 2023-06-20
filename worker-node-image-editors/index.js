const ImageEditor = require('./imageEditor');

const editor = new ImageEditor('god-of-war.png');
const run = async () => {
    // editor.resize(800, 600);
    // editor.flip();
    await editor.save("tmp-1.png");
}
run();