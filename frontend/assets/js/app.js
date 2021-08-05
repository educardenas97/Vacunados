function validateForm() {
  let x = document.forms["form"]["cedula"].value;
  if (x == "") {
    alert("Ingresar un número de identifiación");
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
        drawElement(
            titleCase(element.nombre + " " + element.apellido)
        );
        drawElement("Dosis: " + element.dosis);
        //Parse iso date string to a javascript date object
        const date = new Date(element.fecha_aplicacion);
        drawElement("Fecha: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
        drawElement("Lugar: " + element.establecimiento);
        drawElement("Vacuna: " + element.descripcion_vacuna);
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
        let res = await fetch('http://localhost:3000/cedula?' + new URLSearchParams({
            cedula: cedula
        }, requestOptions));
        json = await res.json();
        return json;
    } catch (error) {
        console.log(error);
    }

}

