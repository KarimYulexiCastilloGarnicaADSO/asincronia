// const filtrar = x => x.name === "comida" //Esta línea define una función de devolución de llamada filtrar que toma un objeto x como argumento. La función devuelve un valor booleano que indica si la propiedad nombre de x es igual a "comida".

// (async () => {
//     //console.log("hiola")
//     let response = await fetch('index.json') //el await lo tenemos espereando que se cumpla la promesa 
//     let user = await response.json() //aqui lo parseamos para que el archivo json sea respuesto de manera facil para nosotros
//     let respuestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`) //aqui buscamos enlace api para revisar los repositorios publicos de 
//     //ese usuario
//     let usuariosGithub = await respuestGithub.json() //aqui lo parseamos para que el archivo json sea respuesto de manera facil para nosotros
//     console.log(usuariosGithub)

//     usuariosGithub.forEach(element => { //aqui en vez de hacer un filter lo hacemos con un forEach 
//         if(element.name === "comida") { //y si el lemento nombre es igual a Evaluacion 
//             console.log(element) //entonces mostramos los elementos que que si son asi 
//         }
//     });
//     //hola()
// // let data = usuariosGit.filter(filtrar)
// // console.log(data)
// })

// const filtrar = x => x.name === "proyecto"

// async () => {
//     let response = await fetch("index.json")
//     let user = await response.json()
//     let respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`)
//     let usuariosGithub = await respuestaGithub.json()
//     console.log(usuariosGithub)

//     usuariosGithub.forEach(element => {
//         if (element.name === "proyecto") {
//             console.log(element)
//         }
//     });
// }

//La declaracion de la funcion obtenerRepositorios se define utilizando la palabra clave async 
//esta funcion no toma ningun argumento y no devuelve ningun valor explicito 
async function obtenerRepositorios() {
    //Bloque try y manejo de errores 
    //La linea try { marca el incio del bloque de codigo donde se intentaran las operaciones 
    //Cualquier eror que ocurra dentro de este bloque se manejara en el bloque catch 
    try {
        //Obtencion de datos desde index.json 
        //La linea const response = await fetch("index.json"); utiliza la funcion fetch para obetener datos
        //del archivo local "index.json"
        //Await se utiliza para esperar a que se cumpla la solicitud antes de continuar 
        const response = await fetch("index.json");
        //El resultado se almacena en la variable response
        //Parseo de datos json
        //La linea const user = await response.json(); convierte los datos obtenidos en formato json y los 
        //alamacena en la variable user
        const user = await response.json();
        //Obtencion de repositorios de github 
        //La linea const respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`); 
        //realiza una solicitud a la API de github para obtener los repositorios del usuario cuyo nombre esta
        //en user.name
        //El resultado se almacena en respuestaGithub
        const respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`);
        //Parseo de datos json de github 
        //La linea const repositorios = await respuestaGithub.json(); convierte los datos obtenidos de github
        //en formato json y los almacena en la variable repositorios
        const repositorios = await respuestaGithub.json();
        // Filtrar repositorios con la palabra "proyecto" en el nombre
        //La linea const proyectos = repositorios.filter(repo => repo.name.includes("comida")); filtra los 
        //repositorios en busca de aquellos cuyo nombre contiene la palabra "comida"
        //Los repositorios filtrados se almacenan en la variable proyectos  
        const proyectos = repositorios.filter(repo => repo.name.includes("comida"));
        //Mostrar resultados en la consola 
        //La linea console.log(proyectos); muestra los repositorios filtrados en la consola 
        console.log(proyectos);
    } 
    //Manejo de errores 
    //Si ocurre algun error en el bloque try, se captura y se maneja en el bloque catch 
    //La linea console.error("Error al obtener los repositorios:", error); muestra un mensaje de error junto 
    //Con el detalle del error
    catch (error) {
        console.error("Error al obtener los repositorios:", error);
    }
}

obtenerRepositorios();
