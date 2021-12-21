import { HeaderButton, SubmitButton } from "../components/Button.js";
import { Section } from "../components/Section.js";
import { eventSectionClick } from "../events/sectionClick.js";

function removeAccents (str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

function loadElements(sectionName, headerButtonName, submitButtonName) {
    const sectionElement = document.getElementById(sectionName);
    const headerButtonElement = document.getElementById(headerButtonName);
    const submitButtonElement = document.getElementById(submitButtonName);
    
    let section = new Section(sectionElement.id, sectionElement.className);

    let headerButton = new HeaderButton(
        headerButtonElement.id,
        headerButtonElement.innerHTML, 
        headerButtonElement.className,
        headerButtonElement.className.includes("primary") === true
    );

    let submitButton = new SubmitButton(
        submitButtonElement.id,
        submitButtonElement.value,
        submitButtonElement.className,
        submitButtonElement.className.includes("enable") === true
    );
    
    section.submitButton = submitButton;
    section.headButton = headerButton;

    return section;
}


export function loadSearchForm(){
    const searchForm = document.forms["searchForm"];
    let data = {
        "name": removeAccents(searchForm["name"].value),
        "lastName": removeAccents(searchForm["last_name"].value),
        "isFirstName": searchForm["isFirstName"].checked,
        "isLastName": searchForm["isFirstLastName"].checked,
        "age": searchForm["age"].value
    };
    return data;
}

export function loadIdForm(){
    const idForm = document.forms["form"];
    let data = {
        "cedula": idForm["cedula"].value
    };
    
    return data;
}


let idSection = loadElements("id_section", "id_section_button", "id_submit_button");
let searchSection = loadElements("search_section", "search_section_button", "search_submit_button");
eventSectionClick(idSection, searchSection);

export { idSection, searchSection };