export function viewPrediction(data){
    let documents = [];
    data.forEach(element => {
        let prediction = predict(Number(element.cedula));
        prediction.then((data) => {
            let year = 2021 - dataForm.age;
            if((year - data) < 12) console.log(element);
        });
        
        if(!documents.includes(element.cedula)){
            documents.push(element);
        }
    });
    return documents;
}