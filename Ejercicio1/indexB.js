//Declaracion de la funcion obtenerRepositorios este funcion se define sin la palabra clave async. En lugar 
//de usar async/await, utilizaremos promesas para manejar las operaciones asincronicas 
function obtenerRepositorios() {
  //Obtencion de datos desde "index.json" 
  //La linea fetch("index.json") realiza una solicitud para obtener datos del archivo local "index.json"
  //La funcion fetch devuelve una promesa que representa la respuesta HTTP
  fetch("index.json")
      //El metodo .then(response => response.json()) se encadena para procesar la respuesta. Convierte los 
      //datos en formato JSON y devuelve otra promesa 
      //Parseo de datos JSON 
      //La promesa devuelta por then(response => response.json()) se resuelve con los datos en formato JSON 
      .then(response => response.json())
      //La siguiente linea utiliza .then(user => { } ) para procesar los datos del usuario obtenidos de 
      //"index.json"
      //El nombre del usuario se utiliza para constuir la URL de la API de Github
      .then(user => {
        //Obtencion de repositorios de github 
        //La linea return fetch(`https://api.github.com/users/${user.name}/repos`); realiza una solicitud a la
        //API de github para obtener los repositorios del usuario 
        //La URL se construye dinamicamente utilizando el nombre del usuario 
        //La funcion fetch devuelve una promesa
          return fetch(`https://api.github.com/users/${user.name}/repos`);
      })
      //Parseo de datos JSON de github 
      //La promesa devuelta por .then(respuestaGithub => respuestaGithub.json()) se resuelve con los datos de 
      //los repositorios en formato JSON
      .then(respuestaGithub => respuestaGithub.json())
      .then(repositorios => {
          // Filtrar repositorios con la palabra "proyecto" en el nombre
          //La linea const proyectos = repositorios.filter(repo => repo.name.includes("comida")); filtra los
          //repositorios en busca de aquellos cuyo nombre contiene la palabra "comida"
          //Los repositorios filtrados se almacenan en la variable proyectos
          let proyectos = repositorios.filter(repo => repo.name.includes("comida"));
          //Finalmente console.log(proyectos); muestra los repositorios filtrados en la consola 
          console.log(proyectos);
      })
      //Manejo de errores 
      //Si ocurre error en cualquiera de las promesas, se capturan en el bloque .catch(error => { 
      .catch(error => {
        //El mensaje de error se muestra en la consola utilizando console.error
          console.error("Error al obtener los repositorios:", error);
      });
}
//Llamar la funcion obtenerRepositorios
obtenerRepositorios();
