//Esta linea define una funcion asincronica llamada obtenerDatosAprendices. La palabra clave async indica
//que esta funcion devolvera una promesa. Es un patron comun para controlar operaciones asincronicas en js 
async function obtenerDatosAprendices() {
  //el bloque try se usa para envolver el codigo que podria generar una excepcion. Si se produce algun error
  //dentro de este bloque, sera detectado por le bloque catch correspondiente 
  try {
    //Aqui usamos la funcion fetch para realizar una solicitud HTTP al punto final /user.json. La palabra 
    //clave await garantiza que la ejcucion de la funcion espere hasta que se resuelva la promesa devuelta 
    //por fetch (es decir, se recuperen los datos)
      const response = await fetch("/user.json"); 
      //Despues de obtener los datos , usamos el metodo json() en el objeto de respuesta para anlizar 
      //los datos JSON. De nuevo la palabra clave await garantiza que esperemos a que se analicen los datos 
      //antes de continuar 
      const data = await response.json();
      //SUponiendo que los datos obtenidos tiene una propiedad llamda users, esta linea filtra los usuarios
      //para incluir  solo a aquellos que tiene la propiedad aprendiz establecida en true
      const aprendices = data.users.filter(usuario => usuario.aprendiz);
      //Creamos un nuevo array llamado datosAprendices mapeando sobre los usarios filtrados. Para cada 
      //usuario (Aprendiz) extraemos su nombre y generamos  una URL de Avatar utilizando la funcion obtenerAvatar
      const datosAprendices = aprendices.map(aprendiz => ({
          Nombre: aprendiz.name,
          Avatar: obtenerAvatar(aprendiz.user)
      }));
      //Por ultimo mostramos el array datosAprendices en formato tabular usando console.table
      console.table(datosAprendices);
  } 
  //Si se produce algun error durante la ejecucion del bloque try (por ejemplo, problemas de red, JSON invalido, 
  // etc) se detectara aqui El mensaje de error se mostrara en la consola 
  catch (error) {
      console.error("Error al leer el archivo JSON:", error);
  }
}
//Esfta funcion toma un usuario probablemente un ID de usuario y construye  una URL de avatar añadiendola 
//a la URL base https://avatars.githubusercontent.com/u/'. 
function obtenerAvatar(usuario) {
  return `https://avatars.githubusercontent.com/u/${usuario}`;
}
//Llamamos la funcion
obtenerDatosAprendices();
