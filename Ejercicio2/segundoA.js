//Cargo el archivo JSON 
//La linea fetch("/user.json") realiza una solicitud para cargar el archivo JSON llamda "user.json"
//La funcion fetch devuelve una promesa que representa la respuesta HTTP
fetch("/user.json")
    //Convertir los datos en formato JSON 
    //La linea .then(response => response.json()) se encadena despues de la solicitud 
    //Convierte los datos obtenidos en formato JSON y devuelve otra promesa 
    .then(response => response.json())
    //El resultado se almacena en la variable data 
    .then(data => {
      //Filtra los aprendices 
      //La linea const aprendices = data.users.filter(usuario => usuario.aprendiz); filtra los usuarios para 
      //obtener solo aquellos que son aprendices (donde aprendiz es true)
      //Los aprendices filtrados se almacenan en la variable aprendices
        let aprendices = data.users.filter(usuario => usuario.aprendiz);
        //Crear un array con los datos de los aprendices 
        //La linea const datosAprendices = aprendices.map(aprendiz => ({Nombre: aprendiz.name,Avatar: 
        //obtenerAvatar(aprendiz.user)})); crea un nuevo array con objetos que contienen el nombre y a URL 
        //del avatar de cada aprendiz 
        let datosAprendices = aprendices.map(aprendiz => ({
            Nombre: aprendiz.name, 
            Avatar: obtenerAvatar(aprendiz.user)
        }));
        //Mostrar los datos en una tabla en la consola 
        //La linea console.table(datosAprendices); muestra los datos de los aprendices en una tabla en
        //la consola 
        console.table(datosAprendices);
    })
    .catch(error => {
        console.error("Error al leer el archivo JSON:", error);
    });
////Usamos la funcion obtenerAvatar  para obtener la URL del avatar
//Funcion para obtener la URL del avatar d un usuario en github
//La funcion obtenerAvatar toma el nombre de usuario y devuelve la URL del avatar correspondiente en github
function obtenerAvatar(usuario) {
    return `https://avatars.githubusercontent.com/u/${usuario}`;
}

