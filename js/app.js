
console.log("hola mundo");

function tablaJson() {
   
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'datos.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let datosCanciones = datos.canciones;
            datosCanciones.sort((a, b) => b.reproducciones - a.reproducciones);

            let contenido = document.querySelector("#contenido");
            contenido.innerHTML = '';

            for (let item of datosCanciones.slice(0, 3)) {
                contenido.innerHTML += `
                <tr>
                    <td class="d-none d-md-block text-center text-info"><strong>${item.nombre}</strong></td>
                    <td ><div class="text-center"><audio controls>
                        <source src="./canciones/${item.ruta}" type="audio/mpeg">
                        Your browser does not support the audio element.</div>
                        </audio></td>
                </tr>
                
                `
                
            
            }


        }
    }
    
    
}
function limpiarErrores(){
  var errores = document.getElementsByClassName("error");
  for(var i = 0; i < errores.length; i++){
    errores[i].innerHTML = "";
  }
}
function validar(formulario) {

    limpiarErrores();

    if (formulario.correo.value.trim().length == 0) {
        document.getElementById("errorCorreo").innerText = "Campo obligatorio";
        formulario.correo.focus();
        return false;
    }
    var re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!re.test(formulario.correo.value)) {
        document.getElementById("errorCorreo").innerText = "Correo inválido";
        formulario.correo.focus();
        return false;
    }

    if (formulario.contrasena.value.trim().length == 0) {
        document.getElementById("errorContrasena").innerText = "Campo obligatorio";
        formulario.correo.focus();
        return false;
    }

    if (formulario.contrasena.value.length < 8) {
        document.getElementById("errorContrasena").innerText = "La contraseña debe tener más de 8 caracteres";
        formulario.correo.focus();
        return false;
    }

    return true;
}
