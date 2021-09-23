function normalize(value) {
    const value_norm = 23982562.416111004;
    const scaled = value / value_norm
    return scaled;
}


async function predict(value) {
    let model = await tf.loadLayersModel('frontend/src/model/model.json');
    const normalized = normalize(value);
    let data = tf.tensor([normalized]);
    const pred = await model.predict(data);
    return await pred.dataSync()[0];
}

export { predict };