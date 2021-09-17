//Function to wake up server in Heroku and MongoDB Atlas
async function wakeUpServer(){
    return await getDataOfAPI('wakeUp');
}

wakeUpServer().then(
    result => {
        console.log('Server is awake');
        drawElement("Última actualización: " + extractDate(result.actualizado_al), "sub", "last_update");
        changeButtonStatus(true)
    }
).catch(
    error => console.error(error)
);


// Form validation
async function validateForm() {
    let x = document.forms["form"]["cedula"].value;
    
    if (isNaN(x) || x < 0) {
        alert("Ingresar un número de cedula o documento");
        return false;
    }else{
        clearResult();
        changeButtonStatus(false);
        await setData();
        changeButtonStatus(true);
    }
}

// Implement a function to set the data in API
async function setData() {
    data = await getDataOfAPI('cedula', document.forms["form"]["cedula"].value);
    
    if (data.length == 0) {
        drawElement("No se encontró ningún registro");
        return true;
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


//Get data from API
async function getDataOfAPI(request, cedula=null) {
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
        let res = await fetch('http://localhost:3000/'+ request + '?' + new URLSearchParams({
            cedula: cedula
        }, requestOptions));
        json = await res.json();
        return json;
    } catch (error) {
        console.error(error);
    }    
}    

//Erase all elements in the result space
function clearResult() {
    const list = document.getElementById("result");
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    }
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

// Implement a function to change the button status
// Argument : boolean
// true : Enable the button
// false : Disable the button
function changeButtonStatus(status) {
    if (status) {
        document.getElementById("submit").className = "primary";
    } else {
        document.getElementById("submit").className = "primary disabled";
    }    
}    
