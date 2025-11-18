function enviarFormulario() {
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let comentario = document.getElementById("comentario").value.trim();

    if(nombre === ""){
        console.log("Input nombre vacío");
        alert("Campo nombre vacío");
        return;
    } else if(nombre.length > 100){
        console.log("El nombre no puede tener más de 100 caracteres");
        alert("No puedes ingresar más de 100 caracteres en el nombre");
        return;
    }
    if(correo === ""){
        console.log("Input correo vacío");
        alert("Campo correo vacío");
        return;
    } else if(correo.length > 100){
        console.log("El texto no puede tener más de 100 caracteres");
        alert("No puedes ingresar más de 100 caracteres en el correo");
        return;
    } else if(!correo.includes("@duoc.cl") && !correo.includes("@profesor.duoc.cl") && !correo.includes("@gmail.com")){
        alert("El correo solo permite: @duoc.cl / @profesor.duoc.cl / @gmail.com");
        console.log("Formato de correo incorrecto");
        return;
    }
    if(comentario === ""){
        console.log("Input comentario vacío");
        alert("Campo comentario vacío");
        return;
    } else if(comentario.length > 500){
        console.log("El comentario no puede tener más de 500 caracteres");
        alert("No puedes ingresar más de 500 caracteres en el comentario");
        return;
    }

    alert("Formulario enviado correctamente");
    

    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("comentario").value = "";
}
export { enviarFormulario };