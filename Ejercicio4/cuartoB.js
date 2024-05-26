//Aquí se define una función llamada cargarDatos. Esta función utiliza la palabra clave async para indicar 
//que contiene operaciones asincrónicas.
async function cargarDatos() {
    //Comienza un bloque try, que se utiliza para manejar errores en el código.
    try {
        // Hace una solicitud para obtener el archivo JSON local llamado user.json utilizando la función 
        //fetch. La palabra clave await se utiliza para esperar a que se complete la solicitud antes de 
        //continuar.
        let response = await fetch("/user.json");
        //Verifica si la respuesta de la solicitud fue exitosa (código de estado 200). Si no es exitosa, 
        //lanza un error con el mensaje “Error al cargar user.json”.
        if (!response.ok) {
            throw new Error('Error al cargar user.json');
        }
        //Convierte la respuesta en formato JSON utilizando el método .json(). Esto devuelve una promesa 
        //que resuelve con los datos en formato JSON.
        let data = await response.json();
        //Verifica si el objeto JSON tiene una propiedad llamada “users”. Si no la tiene, lanza un error con 
        //el mensaje “El archivo JSON no contiene la propiedad ‘users’”.
        if (!data.users) {
            throw new Error('El archivo JSON no contiene la propiedad "users"');
        }
        //Filtra los usuarios del archivo JSON para incluir solo aquellos que son aprendices (tienen la 
        //propiedad aprendiz establecida en true).
        let aprendices = data.users.filter(user => user.aprendiz);
        //Utiliza Promise.all para realizar múltiples solicitudes asincrónicas a la API de GitHub para 
        //obtener los repositorios de cada aprendiz. Crea un arreglo de objetos llamado resultados con los 
        //nombres de los aprendices y sus repositorios públicos.
        let resultados = await Promise.all(aprendices.map(async user => {
            try {
                let response = await fetch(`https://api.github.com/users/${user.user}/repos`);
                if (!response.ok) {
                    throw new Error(`Error al cargar los repositorios de ${user.user}`);
                }
                let repositorios = await response.json();
                let repositoriosFiltrados = repositorios.filter(repo => !repo.private && repo.name.includes("JavaScript"));

                return {
                    name: user.name,
                    repositories: repositoriosFiltrados.map(repo => repo.name)
                };
            } catch (error) {
                console.error(error);
                throw error;
            }
        }));
        //Devuelve los resultados obtenidos.
        return resultados;
    } 
    //Maneja cualquier error que ocurra dentro del bloque try. Muestra el error en la consola y lo lanza 
    //nuevamente para que pueda ser manejado en el código que llama a cargarDatos.
    catch (error) {
        console.error(error);
        throw error;
    }
}
//Llama a la función cargarDatos, espera a que se resuelva la promesa y luego maneja los resultados o 
//errores utilizando then y catch.
cargarDatos()
    .then(resultado => {
        //Filtra los resultados para incluir solo aquellos aprendices que tienen menos de 5 repositorios públicos.
        let filtrado = resultado.filter(user => user.repositories.length <= 5 );
        //Crea un arreglo de objetos llamado tableData para almacenar los nombres de los aprendices y la 
        //cantidad de repositorios. Utiliza flatMap para transformar los datos en un formato adecuado para 
        //mostrar en una tabla.
        let tableData = filtrado.flatMap(user => 
            user.repositories.map(repo => ({ user: user.name, repository: repo }))
        );
        //Muestra los resultados en una tabla por consola utilizando console.table.
        console.table(tableData);
    })
    .catch(error => {
        console.error("Se produjo un error:", error);
    });
