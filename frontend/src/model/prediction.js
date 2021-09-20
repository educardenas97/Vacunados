function normalize(value) {
    const value_norm = 23982562.416111004;
    const scaled = value / value_norm
    return scaled;
}

async function loadModel(value) {
    let model = await tf.loadLayersModel('src/model/model.json');
    const normalized = normalize(value);
    let data = tf.tensor([normalized]);
    const pred = await model.predict(data);
    return pred.dataSync()[0];
}    

try {
    loadModel(6100000).then((value) => {console.log(value);})
} catch (error) {
    console.log(error);
}