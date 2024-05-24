// (async () => {

//     let response = await fetch('index.json');

//     let NombrePerfil = "KarimYulexiCastilloGarnicaADSO";
//     let respuestGit = await fetch(`https://api.github.com/users/${NombrePerfil}/Repos`);
//     let usuariosGit = await respuestGit.json();
//     console
    
//     let comidaRepos = usuariosGit.filter(x => x.name === "comida");
//     console.log(comidaRepos);
  
// })();

(async () => {
    try {
      let response = await fetch('index.json');
      let NombrePerfil = "Lukas"; // Replace with the desired GitHub username
      let respuestGit = await fetch(`https://api.github.com/users/${NombrePerfil}/Repos`);
      let usuariosGit = await respuestGit.json();
  
      console.log(usuariosGit); // Add this line to check the value of usuariosGit
  
      let comidaRepos = usuariosGit.filter(x => x.name === "comida");
      console.log(comidaRepos);
    } catch (error) {
      console.error("hola", error); 
    }
  })();