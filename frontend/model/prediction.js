import * as tf from '@tensorflow/tfjs';


const min = 843994;
const max = 5799052;

const model = await tf.loadLayersModel('model.json');

async function normalize(value) {
    const scaled = (value - min) / (max - min);
    return scaled;
}

async function predict(value) {
    const normalized = await normalize(value);
    const pred = await model.predict(tf.tensor2d([normalized]));
    return pred.dataSync()[0];
}

console.log(predict(4659580));