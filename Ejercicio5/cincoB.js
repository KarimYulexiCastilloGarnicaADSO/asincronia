// Función para validar si una cadena contiene solo letras mayúsculas
//Aquí se define la función validarMayusculas. Toma un parámetro str (que es la cadena que se va a validar).
function validarMayusculas(str) {
    //La función utiliza una expresión regular para verificar si la cadena str contiene solo letras 
    //mayúsculas o espacios en blanco (\s). Devuelve true si la cadena cumple con este criterio, y false 
    //en caso contrario.
    return /^[A-Z\s]+$/.test(str);
}

// Proxy para validar y transformar los nombres a mayúsculas
let proxy = new Proxy({}, {
    //El manejador set se ejecuta cuando se asigna un valor a una propiedad del objeto proxy. En este 
    //caso, se verifica si la propiedad es 'name'.
    set: function(target, property, value) {
        //Si la propiedad es 'name', se realiza la validación.
        if (property === 'name') {
            //Si el valor asignado a la propiedad 'name' pasa la validación (es decir, contiene solo 
            //letras mayúsculas), se asigna el valor transformado a mayúsculas al objeto proxy. Si no pasa 
            //la validación, se lanza un error.
            if (validarMayusculas(value)) {
                target[property] = value.toUpperCase();
            } 
            else {
                throw new Error('El nombre solo puede contener letras mayúsculas');
            }
        } 
        //Si la propiedad no es 'name', se asigna el valor original al objeto proxy.
        else {
            target[property] = value;
        }
        // Se devuelve true para indicar que la asignación se realizó correctamente.
        return true;
    }
});

// URL del archivo JSON
let jsonURL = ('/user.json');

// Realizar una solicitud HTTP para cargar el archivo JSON
fetch(jsonURL)
    //Después de obtener la respuesta, se convierte la respuesta en formato JSON utilizando el método .json().
    .then(response => response.json())
    //Una vez que se obtienen los datos en formato JSON, se ejecuta el código dentro de esta función. Aquí se procesan los usuarios.
    .then(jsonData => {
        // Filtrar solo los usuarios que tienen más de dos nombres
        let usuariosConMasDeDosNombres = jsonData.users.filter(user => user.name.split(' ').length > 2);
        // Procesar los usuarios con más de dos nombres
        let users = usuariosConMasDeDosNombres.map(user => new Proxy(user, proxy));
        console.log(users);
        // Aquí puedes hacer cualquier otra operación con los usuarios transformados
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
