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
        let response = await fetch("index.json");
        //El resultado se almacena en la variable response
        //Parseo de datos json
        //La linea const user = await response.json(); convierte los datos obtenidos en formato json y los 
        //alamacena en la variable user
        let user = await response.json();
        //Obtencion de repositorios de github 
        //La linea const respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`); 
        //realiza una solicitud a la API de github para obtener los repositorios del usuario cuyo nombre esta
        //en user.name
        //El resultado se almacena en respuestaGithub
        let respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`);
        //Parseo de datos json de github 
        //La linea const repositorios = await respuestaGithub.json(); convierte los datos obtenidos de github
        //en formato json y los almacena en la variable repositorios
        let repositorios = await respuestaGithub.json();
        // Filtrar repositorios con la palabra "proyecto" en el nombre
        //La linea const proyectos = repositorios.filter(repo => repo.name.includes("comida")); filtra los 
        //repositorios en busca de aquellos cuyo nombre contiene la palabra "comida"
        //Los repositorios filtrados se almacenan en la variable proyectos  
        let proyectos = repositorios.filter(repo => repo.name.includes("comida"));
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
//Llamar la funcion obtenerRepositorios
obtenerRepositorios();
