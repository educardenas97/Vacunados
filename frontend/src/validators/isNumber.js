export function isNumber(formName){
    let x = document.forms[formName]["cedula"].value;
    
    if (isNaN(x) || x < 0) {
        alert("Ingresar un número de cedula o documento");
        return false;
    }else{
        return true;
    }
}