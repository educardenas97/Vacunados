export function viewResult(data){
    if (data.length == 0) {
        drawElement("No se encontró ningún registro");
        return false;
    }else{
        //Draw elements in the document
        data.forEach(async element => {
                drawElement("Fecha: " + extractDate(element.fecha_aplicacion));
                drawElement(titleCase(element.nombre + " " + element.apellido));
                drawElement("Lugar: " + element.establecimiento);
                drawElement("Vacuna: " + element.descripcion_vacuna);
                drawElement("Dosis: " + element.dosis);
                drawElement(" ", "br");
            });
        return true;
    }
    
}


   
//Extract the year, month and day from a date string
function extractDate(dateString) {
    const date = new Date(dateString);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}



//Draw elements in the document
function drawElement(element, tag="li", id="result") {
    let new_element = document.createElement(tag);
    new_element.innerHTML = element;
    document.getElementById(id).appendChild(new_element);
}


//Parse string to title case
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');    
}     
