import ImageEditor from "../ImageEditor/imageEditor";

const extractParams = (params: string) => {
    var paramsArr: number[] = [];
    params.split(",").forEach((param) => {
        if(param.trim() !== "" && !isNaN(Number(param.trim()))) {
            paramsArr.push(Number(param.trim()));
        };
    })
    return paramsArr;
}

const switchCaseMatcher = (operation: string, args: number[], imageEditor: ImageEditor) => {
    switch (operation) {
        case "resize":
            imageEditor.resize(args[0], args[1]);
            break;
        case "rotate":
            imageEditor.rotate(args[0]);
            break;
        case "grayscale":
            imageEditor.grayscale();
            break;
        case "flip":
            imageEditor.flip();
            break;
        case "flop":
            imageEditor.flop();
            break;
        case "sharpen":
            imageEditor.sharpen(args[0]);
            break;
        case "blur":
            imageEditor.blur(args[0]);
            break;
        case "brightness":
            imageEditor.brightness(args[0]);
            break;
        case "invert":
            imageEditor.invert();
            break;
        default:
            break;
    }
}

/*
    operations array should look like this:
    [ { string: number[] } ]
    const operations = ["resize(100, 100)", "rotate(90)", "grayscale()", "flip()", "flop()", "sharpen(10)", "blur(10)", "brightness(10)", "invert()"]
*/

const extractOperations = (operations: string[]) => {
    var transformedOperations: ({
        [x: string]: (number)[];
    })[] = [];
    operations.forEach((operation) => {
        const match = operation.match(/^(\w+)\((.*)\)$/);
        if (match) {
            const [, name, params] = match;
            const paramsArr = extractParams(params);
            transformedOperations.push({ [name]: paramsArr.filter((param) => param !== null) || [] });
        }
    });
    return transformedOperations;
}

const operationsMatcher = (operations: ({ [x: string]: (number)[] })[], imageEditor: ImageEditor) => {
    operations.forEach((operation) => {
        const [name, args] = Object.entries(operation)[0];
        switchCaseMatcher(name, args, imageEditor);
    })
}

export {
    extractOperations,
    operationsMatcher,
}