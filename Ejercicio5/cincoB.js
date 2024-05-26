// Función para validar si una cadena contiene solo letras mayúsculas
function validarMayusculas(str) {
    return /^[A-Z\s]+$/.test(str);
}

// Proxy para validar y transformar los nombres a mayúsculas
const proxy = new Proxy({}, {
    set: function(target, property, value) {
        if (property === 'name') {
            if (validarMayusculas(value)) {
                target[property] = value.toUpperCase();
            } else {
                throw new Error('El nombre solo puede contener letras mayúsculas');
            }
        } else {
            target[property] = value;
        }
        return true;
    }
});

// URL del archivo JSON
const jsonURL = ('/user.json');

// Realizar una solicitud HTTP para cargar el archivo JSON
fetch(jsonURL)
    .then(response => response.json())
    .then(jsonData => {
        // Filtrar solo los usuarios que tienen más de dos nombres
        const usuariosConMasDeDosNombres = jsonData.users.filter(user => user.name.split(' ').length > 2);
        // Procesar los usuarios con más de dos nombres
        const users = usuariosConMasDeDosNombres.map(user => new Proxy(user, proxy));
        console.log(users);
        // Aquí puedes hacer cualquier otra operación con los usuarios transformados
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
