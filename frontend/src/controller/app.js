import { VacunadosApi } from "../components/Api.js";
import { predict } from "../model/prediction.js";
import { viewPrediction } from "../view/searchView.js";
import { viewResult } from "../view/idView.js";
import { isNumber } from "../validators/isNumber.js";
import {
    loadIdForm, 
    loadSearchForm, 
    idSection, 
    searchSection
} from './controller.js';    


let api = new VacunadosApi('https://api-vacununados.herokuapp.com/');
api.getDocument(4659580).then(() => {
    idSection.submitButton.enable()
    searchSection.submitButton.enable()
}).catch(() => {
    alert('Error al conectar con el servidor');
});

idSection.submitButton.getElement().addEventListener('click', async () => {
    clearResult('result')
    let data = loadIdForm();
    if (isNumber(data.cedula)) {    
        idSection.submitButton.disable();
        let res = await api.getDocument(data.cedula)
        viewResult(res);
        idSection.submitButton.enable();
    }
});

searchSection.submitButton.getElement().addEventListener('click', async () => {
    clearResult('search_result')
    let dataForm = loadSearchForm();
    if (isNumber(dataForm.age)) {   
        searchSection.submitButton.disable();
        let res = await api.searchDocuments(dataForm);
        let filteredData = await filterData(res, dataForm.age);
        viewPrediction(filteredData);
        searchSection.submitButton.enable();
    }
});

async function filterData (data, age) {
    let filteredData = [];
    for (let i = 0; i < data.length; i++) {
        // Call TensorFlow model
        let prediction = await predict(data[i].cedula);
        const year = (new Date().getFullYear()) - age;
        if (year - prediction < 10) filteredData.push(data[i]);
    }
    return filteredData;
}

//Erase all elements in the result space
function clearResult(id) {
    const list = document.getElementById(id);
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    }
}