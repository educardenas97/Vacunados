import { VacunadosApi } from "../components/Api.js";
import { predict } from "../model/prediction.js";
import { viewPrediction } from "../view/searchView.js";

import {
    loadIdForm, 
    loadSearchForm, 
    idSection, 
    searchSection
} from './controller.js';    


let api = new VacunadosApi('http://localhost:3000/');
api.wakeUp().then((data) => {
    idSection.submitButton.enable()
    searchSection.submitButton.enable()
    console.log(data);
});

idSection.submitButton.getElement().addEventListener('click', async () => {
    let data = loadIdForm();
    idSection.submitButton.disable();
    let res = await api.getDocument(data.cedula)
    console.log(res);
    idSection.submitButton.enable();
});

searchSection.submitButton.getElement().addEventListener('click', async () => {
    let dataForm = loadSearchForm();
    console.log(dataForm);
    searchSection.submitButton.disable();
    let res = await api.searchDocuments(dataForm);
    res.forEach(element => {
        let prediction = predict(Number(element.cedula));
        prediction.then((data) => {
            let year = 2021 - dataForm.age;
            if((year - data) < 7) console.log(element);
        });
    });

    searchSection.submitButton.enable();
});