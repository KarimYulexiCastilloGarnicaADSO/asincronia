const filtrar = x => x.name === "comida" //Esta línea define una función de devolución de llamada filtrar que toma un objeto x como argumento. La función devuelve un valor booleano que indica si la propiedad nombre de x es igual a "comida".

(async (hola) => {
    console.log("hiola")
    let response = await fetch('index.json') //el await lo tenemos espereando que se cumpla la promesa 
    let user = await response.json() //aqui lo parseamos para que el archivo json sea respuesto de manera facil para nosotros
    let respuestGit = await fetch(`https://api.github.com/users/${user.name}/Repos`) //aqui buscamos enlace api para revisar los repositorios publicos de 
    //ese usuario
    let usuariosGit = await respuestGit.json() //aqui lo parseamos para que el archivo json sea respuesto de manera facil para nosotros
    console.log(usuariosGit)

    usuariosGit.forEach(element => { //aqui en vez de hacer un filter lo hacemos con un forEach 
        if(element.name === "comida") { //y si el lemento nombre es igual a Evaluacion 
            console.log(element) //entonces mostramos los elementos que que si son asi 
        }
    });
    hola()
// let data = usuariosGit.filter(filtrar)
// console.log(data)
})

