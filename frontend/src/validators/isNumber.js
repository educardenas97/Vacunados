export function isNumber(x){
    if (isNaN(x) || x < 0) {
        alert("Ingresar un número de cedula o documento");
        return false;
    }else{
        return true;
    }
}