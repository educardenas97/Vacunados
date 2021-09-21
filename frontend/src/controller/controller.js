import { HeaderButton, SubmitButton } from "../components/Button.js";
import { Section } from "../components/Section.js";
import { eventSectionClick } from "../events/sectionClick.js";



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
        headerButtonElement.value,
        submitButtonElement.className,
        submitButtonElement.className.includes("enable") === true
        );
            
    section.addButton(headerButton);
    section.addButton(submitButton);
            
    return section;
}
        
        
let idSection = loadElements(
    "id_section", 
    "id_section_button", 
    "id_submit_button"
    );

let searchSection = loadElements(
    "search_section", 
    "search_section_button", 
    "search_submit_button"
    );


eventSectionClick(idSection, searchSection);

export { idSection, searchSection };