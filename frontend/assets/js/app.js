function validateForm() {
    let x = document.forms["form"]["cedula"].value;
    try {
        x = parseInt(x)
    } catch (error) {
        alert("Ingresar un número de cedula o documento");
    }

    if (x == "") {
        alert("Ingresar un número de cedula o documento");
        return false;
    }else{
        setData();
    }
}

async function setData() {
    // select the target element
    data = await getDataOfAPI(document.forms["form"]["cedula"].value);
    console.log(data);

    const list = document.getElementById("result");
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    }


    data.forEach(async element => {
        //Parse iso date string to a javascript date object
        const date = new Date(element.fecha_aplicacion);
        drawElement("Fecha: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
        drawElement(
            titleCase(element.nombre + " " + element.apellido)
        );
        drawElement("Lugar: " + element.establecimiento);
        drawElement("Vacuna: " + element.descripcion_vacuna);
        drawElement("Dosis: " + element.dosis);
        drawElement(" ", "br");
    });

}



//Draw elements in the document
function drawElement(element, tag="li") {
    let new_element = document.createElement(tag);
    new_element.innerHTML = element;
    document.getElementById("result").appendChild(new_element);
}


//Parse string to title case
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
} 


//Get data from API
async function getDataOfAPI(cedula) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Request options for the API
    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    //Request the data from the API
    try {
        let res = await fetch('https://api-vacununados.herokuapp.com/cedula?' + new URLSearchParams({
            cedula: cedula
        }, requestOptions));
        json = await res.json();
        return json;
    } catch (error) {
        console.log(error);
    }

}
