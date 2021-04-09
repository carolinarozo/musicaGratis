//Funcion para realizar una tabla con los datos de JSON
function tablaJson() {
    // Extraer los datos del archivo datos.json
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'datos.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let datosCanciones = datos.canciones;
            //ordenar las canciones de mayor a menor en reproducciones
            datosCanciones.sort((a, b) => b.reproducciones - a.reproducciones);
            
            //Construir la tabla con los datos de JSON solo con los tres primeros elementos de datosCanciones
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

//Funcion para limpiar los comentarios que salen en la validacion de formulario

function limpiarErrores(){
  var errores = document.getElementsByClassName("error");
  for(var i = 0; i < errores.length; i++){
    errores[i].innerHTML = "";
  }
}

//funcion para validar los formularios de la página 
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
    if (formulario.ConfContrasena.value.trim().length == 0) {
        document.getElementById("errorConfContrasena").innerText = "Campo obligatorio";
        formulario.correo.focus();
        return false;
    }
    if (formulario.ConfContrasena.value != formulario.contrasena.value) {
        document.getElementById("errorConfContrasena").innerText = "La confirmación no coincide con la contraseña";
        formulario.correo.focus();
        return false;
    }

    if (formulario.opciones.value =="") {
        document.getElementById("errorGenero").innerText = "Debe seleccionar un genero Músical";
        formulario.correo.focus();
        return false;
    }
    if (formulario.edad.value ==0) {
        document.getElementById("errorEdad").innerText = "Debe seleccionar un rando de edad";
        formulario.correo.focus();
        return false;
    }

     if (!formulario.terminos.checked) {
        document.getElementById("errorTerminos").innerText = "Debe aceptar los términos de uso";
        formulario.correo.focus();
        return false;
    }


    alert("Datos enviados.")    

    return true;
}


//Funcion para buscar una cancion con una herramienta de búsqueda
function buscar() {
    //Extraer los datos de un archivo JSON
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", '../datos.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let datosCanciones = datos.canciones;
        

            let contenido = document.querySelector("#contenido");
            contenido.innerHTML = '';

        //valor del espacio de buscar

            let busqueda = document.getElementById("busqueda").value;
            
           
            
    // El valor del espacio de buscar se convierte en una expresión regular
            var regexp = new RegExp(busqueda, "i");

            

            
            
    //para construir el contenido de la lista de canciones en la pagina de canciones según la búsqueda     
            for (let item of datosCanciones) {         
                
                

                
                if (regexp.test(item.nombre)) {// se comprueba que el item tenga las letras del valor de la herramienta de busqueda
                    contenido.innerHTML += `

                    <div class="card col-12 col-md-6 col-lg-4 p-1 bg-secondary border-0">
                        <div class=" p-5 mt-1 mx-1 border border-bottom-0 shadow">

                            <img class="card-img-top img-fluid" src="../images/icon_${item.icono}.svg" alt="Card image cap">
                        </div>
                        <div class="card-body bg-white px-5 mx-1 shadow">
                            <h5 class="card-title text-center">${item.nombre}</h5>

                            <div class="d-flex justify-content-center">

                            <audio controls class="w-100" src="../canciones/${item.ruta}"></audio>

                            </div>

                        </div>
                    </div>
                                    
                                    `
                    

                    
                }
                
                
                


                

                
                
            
            }


        }
    }



}

