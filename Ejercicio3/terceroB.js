//Aqui se define una funcion llamda Repositorios. Esta funcion toma dos parametros username y callback 
function Repositorios(username, callback) {
    //Utiliza la funcion fetch para hacer una solicitud a la API de github para obtener los repositorios 
    //publcos del usuario especificado por username
    fetch(`https://api.github.com/users/${username}/repos`)
    //Despues de obtener la respuesta a la solicitud, se convierte la respuesta en formato JSON utilizando
    //el metodo .json(). Esto devuelve una promesa que resuelve con los datos en formato JSON 
      .then(response => response.json())
      //Una vez que se obtienen los datos en formato JSON, se llama a la funcion callback pasandole esos
      //datos como argumento. La funcion callback se proporciona como segundo argumento cuando se llama a
      //Repositorios
      .then(data => callback(data))
      //Si ocurre algun error durante la solictud o el procesamiento de los datos, se capturay se muestra 
      //un mensaje de error en la consola
      .catch(error => console.error('Error:', error));
  }
  
  //Aqui se hace otra solcitud utilizando fetch, esta vez para obtener el archivo JSON local llamado 
  //user.json
  fetch('/user.json')
    //Al igual que antes, se convierta la respuesta en formato JSON 
    .then(response => response.json())
    //Una vez que se obtiene los datos del archivo user.json, se ejecuta el codigo dentro de esta funcion
    //aqui se filtran los usuaarios que son aprendices y se itera sobre ellos
    .then(data => {
        //Se filtran los usarios del archivo JSON para incluir solo aquellos que tienen propiedad aprendiz 
        //establecida en true
      let users = data.users.filter(user => user.aprendiz);
     // Matriz para almacenar los nombres de los repositorios
      let allRepos = [];
        //Para cada usuario aprendiz, se ejecuta el codigo dentro de esta funcion. Aqui se llama a la 
        //funcion Repositorios para obtener los repositorios del usuario
      users.forEach((user, index) => {
        Repositorios(user.user, (repos) => {
            //Se muestra en la consola el nombre del uuario y su nombre de usuario de github
          console.log(`Repositorios de ${user.name} (${user.user}):`);
          //Se itera sobre los repositorios obtenidos y se muestra el nombre de cada uno en la consola. 
          //Ademas, se agrega el nombre del repositorio a la matriz allRepos
          repos.forEach((repo) => {
            console.log(repo.name);
            // Agregar el nombre del repositorio a la matriz
            allRepos.push(repo.name); 
          });
          //Se muestra una linea separadora en la consola
          console.log('------------------------');
          // Mostrar todos los repositorios juntos
          //Si se ha procesado el ultimo usuario, se muestra un mensaje indicando que se ha resuelto todas las 
          //solicitudes. Luego, se muestran todos los nombres de los repositorios juntos utilizando 
          //allRepos.join(', ')
          if (index === users.length - 1) {
            console.log('Se han resuelto todas');
            console.log('Todos los repositorios:');
            console.log(allRepos.join(', ')); 
          }
        });
      });
    })
    //Si ocurre algun error al cargar los usuarios desde el archivo user.json se muestra un mensaje de error
    //en la consola
    .catch(error => console.error('Error cargando usuarios:', error));
  