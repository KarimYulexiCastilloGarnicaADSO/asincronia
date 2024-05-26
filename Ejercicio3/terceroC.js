// Función para obtener los repositorios de un usuario
//Aqui se define una funcion llamada Repositorios. Esta funcion toma dos parametro username y callback 
function Repositorios(username, callback) {
    //Utiliza la funcion fetch para hacer una solicitud a la API de github para obtener los repositorios
    //publicos del usuario especificado por username
  fetch(`https://api.github.com/users/${username}/repos`)
  //Despues de obtener la respuesta de la solictud, se convierte la respuesta en formato JSON utilizando
  //el metodo .json(). Esto devuelve una promesa que resuleve con los datos en formato JSON 
    .then(response => response.json())
    //Una vez que se obtienen los datos en formato JSON, se llama a la funcion callback pasandole esos 
    //datos como argumento. La funcion callback se proporciona  como segundo argumento cuando se llama
    //a Repositorios
    .then(data => callback(data))
    //Si ocurre algun error durante la solicitud o el procesamiento de los datos, captura y se muestran
    //un mensaje de error en la consola
    .catch(error => console.error('Error:', error));
}

// Obtener los datos del archivo user.json
fetch('/user.json')
    // Al igual que antes, se convierte la respuesta en formato JSON.
  .then(response => response.json())
  //Una vez que se obtienen los datos del archivo user.json se ejecuta el codigo dentro de esta funcion. 
  //Aqui se filtran los usuarios que son aprendices y se itera sobre ellos 
  .then(data => {
    // Filtrar solo los aprendices con el rol de "aprendiz"
    let users = data.users.filter(user => user.aprendiz);
    // Matriz para almacenar los nombres de los repositorios
    let allRepos = [];
    // Obtener repositorios de cada aprendiz
    users.forEach((user, index) => {
      Repositorios(user.user, (repos) => {
        //Se muestra en la consola el nombre del usuario y su nombre de usuario de github
        console.log(`Repositorios de ${user.name} (${user.user}):`);
        //Se itera sobre los repositorios obtenidos y se muestran el nombre de cada uno en la consola. 
        //Ademas, se agrega el nombre del repositorio a la amtriz allRepos
        // Agregar el nombre del repositorio a la matriz
        repos.forEach((repo) => {
          console.log(repo.name);
          allRepos.push(repo.name); 
        });
        //Se muestra una linea separadora en la consola
        console.log('------------------------');
        // Mostrar todos los repositorios juntos
        if (index === users.length - 1) {
          console.log('Se han resuelto todas');
          console.log('Todos los repositorios:');
          console.log(allRepos.join(', ')); 
        }
      });
    });
  })
  .catch(error => console.error('Error cargando usuarios:', error));
