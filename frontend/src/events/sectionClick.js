export function eventSectionClick(idSection, searchSection) {
    searchSection.headButton.getElement().addEventListener("click", () => {
        if (!searchSection.headButton.isFocus){
            idSection.hide();
            searchSection.show();
        }

    });
    
    idSection.headButton.getElement().addEventListener("click", () => {
        if (!idSection.headButton.isFocus){
            idSection.show();
            searchSection.hide();
        }
    });
}