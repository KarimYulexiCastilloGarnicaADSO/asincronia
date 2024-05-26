//Carga el archivo JSON 
//La linea fetch("/user.json") realiza una solicitud para cargar el archivo JSON llamado "user.json"
//La funcion fetch devuelve una promesa que representa la respuesta HTTP
fetch("/user.json")
    //Convertir los datos en formato JSON 
    //La linea then(response => response.json()) se encadena despues de la solicitud
    //Convierte los datos obtenidos en formato JSON y devuelve otra promesa
    .then(response => response.json())
    //El resultado se almacena en la variable data
    .then(data => {
        //La linea const aprendices = data.users.filter(usuario => usuario.aprendiz); filtra los usuarios para 
        //obtener solo aquellos que son aprendices (donde aprendiz es true)
        //Los aprendices filtrados se almacenan en la variable aprendices 
        let aprendices = data.users.filter(usuario => usuario.aprendiz);
        //Mostrar los datos en consola
        //La linea console.log("Datos de los aprendices:"); muestra un mensaje en la consola 
        console.log("Datos de los aprendices:");
        //Luego utilizamos un bucle forEach para recorrer cada aprendiz y mostrar su nombre, usuario y si es 
        //aprendiz o no 
        aprendices.forEach(aprendiz => {
            console.log(`Nombre: ${aprendiz.name}, Usuario: ${aprendiz.user} Aprendiz: ${aprendiz.aprendiz}`);
        });
    })
    //Manejo de errores 
    //Si ocurre algun error durante la carga del archivo o el procesamiento de los datos, se captura en el
    //bloque .catch(error => { } ) 
    .catch(error => {
        //El mensaje de error se muestra en la consola utilizando console.error
        console.error("Error al leer el archivo JSON:", error);
});
