//Aqui se define una funcion llamda Repositorios. Esta funcion toma dos parametros username , callback 
function Repositorios(username, callback) {
  //Utiliza la funcion fetch para hacer una solicitud a la API de github para obtener los repositorios 
  //publicos del usuario especificado por username
  fetch(`https://api.github.com/users/${username}/repos`)
  //Despues de obtneerla respuesta de la solicitud, se convierte la respuesta en formato JSON utilizando 
  //el metodo .json(). Esto devuelve una promesa que resuelve con los datos en formato JSON 
    .then(response => response.json())
    //Una vez que se obtienen los datos en formato JSON, se llama a la función callback pasándole
    // esos datos como argumento. La función callback se proporciona como segundo argumento cuando se 
    //llama a Repositorios.
    .then(data => callback(data))
    //Si ocurre algún error durante la solicitud o el procesamiento de los datos, se captura y 
    //se muestra un mensaje de error en la consola.
    .catch(error => console.error('Error:', error));
}

//Aquí se hace otra solicitud utilizando fetch, esta vez para obtener el archivo JSON local llamado user.json
fetch('/user.json')
  // Al igual que antes, se convierte la respuesta en formato JSON.
  .then(response => response.json())
  //Una vez que se obtienen los datos del archivo user.json, se ejecuta el código dentro de esta función. 
  //Aquí se filtran los usuarios que son aprendices y se itera sobre ellos.
  .then(data => {
    let users = data.users.filter(user => user.aprendiz);
    //Para cada usuario aprendiz, se ejecuta el código dentro de esta función. Aquí se llama a la función 
    //Repositorios para obtener los repositorios del usuario.
    users.forEach((user, index) => {
      Repositorios(user.user, (repos) => {
        //Se muestra en la consola el nombre del usuario y su nombre de usuario de GitHub.
        console.log(`Repositorios de ${user.name} (${user.user}):`);
        //Se itera sobre los repositorios obtenidos y se muestra el nombre de cada uno en la consola.
        repos.forEach((repo) => {
          console.log(repo.name);
        });
        // Se muestra una línea separadora en la consola.
        console.log('------------------------');
        //Si se ha procesado el último usuario, se muestra un mensaje indicando que se han resuelto todas 
        //las solicitudes.
        if (index === users.length - 1) {
          console.log('Se han resuelto todas');
        }
      });
    });
  })
  //Si ocurre algún error al cargar los usuarios desde el archivo user.json, se muestra un mensaje de error 
  //en la consola.
  .catch(error => console.error('Error cargando usuarios:', error));
