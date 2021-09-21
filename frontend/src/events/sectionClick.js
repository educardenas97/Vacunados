export function eventSectionClick(idSection, searchSection) {
    searchSection.buttons[0].getElement().addEventListener("click", () => {
        if (!searchSection.buttons[0].isFocus){
            idSection.hide();
            searchSection.show();
        }

    });
    idSection.buttons[0].getElement().addEventListener("click", () => {
        if (!idSection.buttons[0].isFocus){
            idSection.show();
            searchSection.hide();
        }
    });
}

export function eventSubmitButton(button, isConnect) {
    if (isConnect){
        button.enable();
    } else {
        button.disable();
    }
};