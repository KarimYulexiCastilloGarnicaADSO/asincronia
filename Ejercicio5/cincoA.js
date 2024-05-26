


// Función para validar si una cadena contiene solo letras mayúsculas
function validarMayusculas(str) {
    return /^[A-Z\s]+$/.test(str);
}

// Proxy para validar y transformar los nombres a mayúsculas
const proxyHandler = {
    set: function(target, property, value) {
        if (property === 'name') {
            if (validarMayusculas(value)) {
                target[property] = value.toUpperCase();
            } else {
                throw new Error('El nombre solo puede contener letras mayúsculas');
            }
        } else if (property === 'user') {
            target[property] = value.toUpperCase();
        } else {
            target[property] = value;
        }
        return true;
    }
};

// URL del archivo JSON
const jsonURL = "/user.json";

// Realizar una solicitud HTTP para cargar el archivo JSON
fetch(jsonURL)
    .then(response => response.json())
    .then(jsonData => {
        const users = jsonData.users.map(user => {
            const proxyUser = new Proxy({}, proxyHandler);
            proxyUser.user = user.user;  // Transformar el nombre de usuario a mayúsculas
            return proxyUser;
        });
        console.log(users);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });