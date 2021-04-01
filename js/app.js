
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
function buscar() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", '../datos.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let datosCanciones = datos.canciones;
            

            let contenido = document.querySelector("#contenido");
            contenido.innerHTML = '';

            


            for (let item of datosCanciones) {

                let busqueda = document.getElementById("busqueda").value;

                busqueda = busqueda.toUpperCase();               
                
                if (busqueda=="") {
                    
                    contenido.innerHTML += `

                    
                                    

                    <div class="card col-12 col-md-6 col-lg-4 mx-0 px-0 bg-secondary">
                        <div class="m-4 ">

                            <img class="card-img-top" src="../images/icon_${item.icono}.svg" alt="Card image cap">
                        </div>
                        <div class="card-body bg-white px-0">
                            <h5 class="card-title text-center">${item.nombre}</h5>
                            <div class="d-flex justify.content-center">

                            <audio controls class="w-75 p-auto" src="../canciones/cinco.mp3"></audio>

                            </div>

                        </div>
                    </div>

                    
                                    
                                    
                                    `
                    

                }

                if (item.nombre.toUpperCase() == busqueda) {
                    
                                    contenido.innerHTML += `
                                    <div class="card col-12 col-md-4 mx-0 px-0 bg-secondary">
                        <div class="m-4 ">

                            <img class="card-img-top" src="../images/icon_${item.icono}.svg" alt="Card image cap">
                        </div>
                        <div class="card-body bg-white px-0">
                            <h5 class="card-title text-center">${item.nombre}</h5>

                            <audio controls class="w-100" src="../canciones/cinco.mp3"></audio>

                        </div>
                    </div>
                                    
                                    `
                    

                    
                }
                
                
                


                

                
                
            
            }


        }
    }



}
